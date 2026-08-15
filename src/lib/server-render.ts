import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  BrandKit,
  DEFAULT_BRAND,
  FONT_CHOICES,
  GOOGLE_FONTS,
  Slot,
} from "./svg-engine";

// Server-side SVG -> PNG rasterization. Template SVG source never leaves
// the server; the browser only ever receives rendered PNGs (the raw SVG is
// released solely by the paid download endpoint).

const SLOTS: Slot[] = ["primary", "secondary", "tertiary"];

// Fetch the Google font TTFs once per instance and cache them in /tmp so
// resvg can shape text with the same fonts the client previews use.
let fontsPromise: Promise<string[]> | null = null;

export function fontFiles(): Promise<string[]> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const dir = path.join(os.tmpdir(), "ig-fonts");
      await mkdir(dir, { recursive: true });
      const query = GOOGLE_FONTS.map(
        (f) => `family=${f.replace(/ /g, "+")}:wght@400;700`
      ).join("&");
      // An ancient UA makes fonts.googleapis.com serve TTF, which resvg reads.
      const css = await (
        await fetch(`https://fonts.googleapis.com/css2?${query}`, {
          headers: { "User-Agent": "Mozilla/4.0" },
        })
      ).text();
      const urls = [
        ...new Set(
          [...css.matchAll(/url\((https:[^)]+\.ttf)\)/g)].map((m) => m[1])
        ),
      ];
      return Promise.all(
        urls.map(async (u, i) => {
          const file = path.join(
            dir,
            `${i}-${path.basename(new URL(u).pathname)}`
          );
          try {
            await readFile(file);
          } catch {
            const buf = Buffer.from(await (await fetch(u)).arrayBuffer());
            await writeFile(file, buf);
          }
          return file;
        })
      );
    })();
    fontsPromise.catch(() => {
      fontsPromise = null;
    });
  }
  return fontsPromise;
}

export async function renderPng(svg: string, width = 800): Promise<Buffer> {
  const files = await fontFiles().catch(() => [] as string[]);
  const { Resvg } = await import("@resvg/resvg-js");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles: files,
      loadSystemFonts: true,
      defaultFontFamily: "Roboto",
    },
  });
  // Copy out of the native-backed buffer (Vercel's response bridge mangles
  // externally-backed Buffers).
  return Buffer.from(resvg.render().asPng());
}

export function sanitizeBrand(input: unknown): BrandKit {
  const brand: BrandKit = {
    colors: { ...DEFAULT_BRAND.colors },
    fonts: { ...DEFAULT_BRAND.fonts },
  };
  if (input && typeof input === "object") {
    const s = input as Partial<BrandKit>;
    for (const slot of SLOTS) {
      const c = s.colors?.[slot];
      if (typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c)) {
        brand.colors[slot] = c.toLowerCase();
      }
      const f = s.fonts?.[slot];
      if (typeof f === "string" && FONT_CHOICES.includes(f)) {
        brand.fonts[slot] = f;
      }
    }
  }
  return brand;
}

export function sanitizeValues(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object") return {};
  return Object.fromEntries(
    Object.entries(input as Record<string, unknown>)
      .filter(([, v]) => typeof v === "string" && (v as string).trim() !== "")
      .slice(0, 20)
      .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 200)])
  );
}

// Brand carried in query params (thumbnail URLs): pc/sc/tc = hex colors
// without "#", pf/sf/tf = font names.
export function brandFromQuery(sp: URLSearchParams): BrandKit {
  return sanitizeBrand({
    colors: {
      primary: `#${sp.get("pc") || ""}`,
      secondary: `#${sp.get("sc") || ""}`,
      tertiary: `#${sp.get("tc") || ""}`,
    },
    fonts: {
      primary: sp.get("pf") || "",
      secondary: sp.get("sf") || "",
      tertiary: sp.get("tf") || "",
    },
  });
}
