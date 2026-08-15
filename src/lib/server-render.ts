import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  BrandKit,
  ColorSlot,
  DEFAULT_BRAND,
  FONT_CHOICES,
  GOOGLE_FONTS,
  Slot,
} from "./svg-engine";

// Server-side SVG -> PNG rasterization. Template SVG source never leaves
// the server; the browser only ever receives rendered PNGs (the raw SVG is
// released solely by the paid download endpoint).

const SLOTS: Slot[] = ["primary", "secondary", "tertiary"];
const COLOR_SLOTS: ColorSlot[] = ["primary", "secondary", "tertiary", "accent"];

// Classic fonts are not installed on the server, so previews substitute
// metric-compatible (or visually close) open fonts. Downloaded SVGs keep
// the real family name and render natively on the user's machine.
const SERVER_FONT_ALIASES: Record<string, string> = {
  Arial: "Arimo",
  Helvetica: "Arimo",
  Verdana: "Open Sans",
  "Trebuchet MS": "Fira Sans",
  Georgia: "Gelasio",
  "Times New Roman": "Tinos",
  Palatino: "PT Serif",
  Garamond: "EB Garamond",
  "Courier New": "Cousine",
  Impact: "Anton",
};

const SERVER_FONT_FAMILIES = [
  ...new Set([...GOOGLE_FONTS, ...Object.values(SERVER_FONT_ALIASES)]),
];

// Fetch the font TTFs once per instance and cache them in /tmp so resvg
// can shape text with the same fonts the client previews use.
let fontsPromise: Promise<string[]> | null = null;

export function fontFiles(): Promise<string[]> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      const dir = path.join(os.tmpdir(), "ig-fonts");
      await mkdir(dir, { recursive: true });
      const query = SERVER_FONT_FAMILIES.map(
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

// Bake a Photoshop-style transparency checkerboard into every preview PNG,
// so saved/screenshotted previews are visibly not production assets. The
// clean SVG is only released by the paid download endpoint.
const CHECKER =
  '<defs><pattern id="ig-checker" width="24" height="24" patternUnits="userSpaceOnUse">' +
  '<rect width="24" height="24" fill="#ffffff"/>' +
  '<rect width="12" height="12" fill="#dee2e6"/>' +
  '<rect x="12" y="12" width="12" height="12" fill="#dee2e6"/>' +
  '</pattern></defs><rect width="100%" height="100%" fill="url(#ig-checker)"/>';

export async function renderPng(
  svg: string,
  width = 800,
  opts: { checker?: boolean } = {}
): Promise<Buffer> {
  const files = await fontFiles().catch(() => [] as string[]);
  const { Resvg } = await import("@resvg/resvg-js");
  let aliased = svg;
  for (const [real, alias] of Object.entries(SERVER_FONT_ALIASES)) {
    aliased = aliased.replaceAll(`font-family="${real}"`, `font-family="${alias}"`);
  }
  const checkered =
    opts.checker === false
      ? aliased
      : aliased.replace(/(<svg\b[^>]*>)/, `$1${CHECKER}`);
  const resvg = new Resvg(checkered, {
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
    for (const slot of COLOR_SLOTS) {
      const c = s.colors?.[slot];
      if (typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c)) {
        brand.colors[slot] = c.toLowerCase();
      }
    }
    for (const slot of SLOTS) {
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
      accent: `#${sp.get("ac") || ""}`,
    },
    fonts: {
      primary: sp.get("pf") || "",
      secondary: sp.get("sf") || "",
      tertiary: sp.get("tf") || "",
    },
  });
}
