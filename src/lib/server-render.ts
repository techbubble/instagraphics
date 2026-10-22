import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  BrandKit,
  ColorSlot,
  DEFAULT_BRAND,
  FONT_CHOICES,
  FontSlot,
  GOOGLE_FONTS,
} from "./svg-engine";
import { frameSvg, timeline } from "./animate";

// Server-side SVG -> PNG rasterization. Template SVG source never leaves
// the server; the browser only ever receives rendered PNGs (the raw SVG is
// released solely by the paid download endpoint).

const FONT_SLOTS: FontSlot[] = ["primary", "secondary"];
const COLOR_SLOTS: ColorSlot[] = ["primary", "secondary", "tertiary", "quaternary", "accent"];

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
// The backdrop rect must cover the viewBox explicitly — a 100%/100% rect
// starts at user-space origin and misses cropped (non-zero min-y) views.
function checkerMarkup(svg: string): string {
  const vb = svg.match(/viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"/);
  const [x, y, w, h] = vb ? [vb[1], vb[2], vb[3], vb[4]] : ["0", "0", "800", "600"];
  return (
    '<defs><pattern id="ig-checker" width="24" height="24" patternUnits="userSpaceOnUse">' +
    '<rect width="24" height="24" fill="#ffffff"/>' +
    '<rect width="12" height="12" fill="#dee2e6"/>' +
    '<rect x="12" y="12" width="12" height="12" fill="#dee2e6"/>' +
    `</pattern></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#ig-checker)"/>`
  );
}

// On-screen previews carry a watermark (bottom-left); downloads never do.
export function watermark(svg: string): string {
  return svg.replace(
    /viewBox="([-\d.]+) ([-\d.]+) ([\d.]+) ([\d.]+)"[^>]*>/,
    (m, x, y, w, h) =>
      m +
      `<text x="${Number(x) + 26}" y="${Number(y) + Number(h) - 24}" ` +
      `font-family="Roboto" font-size="30" font-weight="bold" fill="#495057" ` +
      `fill-opacity="0.75" letter-spacing="2">INSTAGRAPHIC.APP</text>`
  );
}

async function rasterizer(
  svg: string,
  width: number,
  opts: { checker?: boolean; background?: string; systemFonts?: boolean }
) {
  const files = await fontFiles().catch(() => [] as string[]);
  const { Resvg } = await import("@resvg/resvg-js");
  let aliased = svg;
  for (const [real, alias] of Object.entries(SERVER_FONT_ALIASES)) {
    aliased = aliased.replaceAll(`font-family="${real}"`, `font-family="${alias}"`);
  }
  const checkered =
    opts.checker === false
      ? aliased
      : aliased.replace(/(<svg\b[^>]*>)/, `$1${checkerMarkup(aliased)}`);
  return new Resvg(checkered, {
    fitTo: { mode: "width", value: width },
    background: opts.background,
    font: {
      fontFiles: files,
      // Scanning system fonts costs ~150ms per instance; frame loops skip
      // it since every family they use is in the fetched set.
      loadSystemFonts: opts.systemFonts ?? files.length === 0,
      defaultFontFamily: "Roboto",
    },
  });
}

export async function renderPng(
  svg: string,
  width = 800,
  opts: { checker?: boolean } = {}
): Promise<Buffer> {
  const resvg = await rasterizer(svg, width, { ...opts, systemFonts: true });
  // Copy out of the native-backed buffer (Vercel's response bridge mangles
  // externally-backed Buffers).
  return Buffer.from(resvg.render().asPng());
}

// Animated GIF of the motion: frames are the baked animation states
// rasterized by resvg, encoded with one global palette.
//   opaque (previews): frames after the first carry only the pixels that
//     changed (unchanged pixels map to the transparent index with
//     "leave in place" disposal), so the file stays small.
//   transparent (downloads): GIF has one-bit alpha and "leave in place"
//     cannot clear pixels, so every frame is complete and the previous one
//     is disposed to background; alpha is thresholded at 50%.
// The finished state holds for the plan's rest time before the loop
// restarts.
export async function renderGif(
  svg: string,
  width = 640,
  opts: {
    checker?: boolean;
    transparent?: boolean;
    fps?: number;
    hold?: number;
    decorate?: (frame: string) => string;
  } = {}
): Promise<Buffer> {
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
  const fps = opts.fps ?? 15;
  const frameMs = Math.round(1000 / fps / 10) * 10;
  const { active, rest } = timeline(svg);
  const count = Math.ceil((active * 1000) / frameMs) + 1;
  const decorate = opts.decorate ?? ((f: string) => f);
  const alpha = opts.transparent === true;

  const frames: Uint8Array[] = [];
  let w = 0;
  let h = 0;
  for (let i = 0; i < count; i++) {
    const t = i === count - 1 ? active + rest + 1 : (i * frameMs) / 1000;
    const resvg = await rasterizer(decorate(frameSvg(svg, t)), width, {
      checker: alpha ? false : opts.checker,
      background: alpha ? undefined : "#ffffff",
    });
    const img = resvg.render();
    w = img.width;
    h = img.height;
    const px = new Uint8Array(img.pixels);
    if (alpha) {
      // resvg pixels are premultiplied; recover the straight color for
      // pixels we keep and blank the ones that drop out.
      for (let p = 0; p < px.length; p += 4) {
        const a = px[p + 3];
        if (a < 128) {
          px[p] = px[p + 1] = px[p + 2] = px[p + 3] = 0;
        } else if (a < 255) {
          px[p] = Math.min(255, Math.round((px[p] * 255) / a));
          px[p + 1] = Math.min(255, Math.round((px[p + 1] * 255) / a));
          px[p + 2] = Math.min(255, Math.round((px[p + 2] * 255) / a));
          px[p + 3] = 255;
        }
      }
    }
    frames.push(px);
  }

  // Global palette from the finished frame plus two mid-motion samples
  // (for the blended tones a fade passes through); 255 colors + 1 reserved
  // transparent index.
  const samples = [frames[count - 1], frames[Math.floor(count / 3)], frames[Math.floor((2 * count) / 3)]];
  const sampleLen = samples.reduce((n, f) => n + f.length, 0);
  const sample = new Uint8Array(sampleLen);
  let off = 0;
  for (const f of samples) {
    sample.set(f, off);
    off += f.length;
  }
  const palette = quantize(sample, 255, { format: "rgb444" });
  const TRANSPARENT = palette.length;
  const encPalette = [...palette, [255, 0, 255]];

  const gif = GIFEncoder();
  let prev: Uint8Array | null = null;
  for (let i = 0; i < count; i++) {
    const rgba = frames[i];
    const index = applyPalette(rgba, palette, "rgb444");
    if (alpha) {
      for (let p = 0, q = 3; p < index.length; p++, q += 4) {
        if (rgba[q] === 0) index[p] = TRANSPARENT;
      }
    } else if (prev) {
      for (let p = 0; p < index.length; p++) {
        if (index[p] === prev[p]) index[p] = TRANSPARENT;
      }
    }
    const last = i === count - 1;
    gif.writeFrame(index, w, h, {
      palette: encPalette,
      delay: last ? (opts.hold ?? rest * 1000) : frameMs,
      transparent: alpha || i > 0,
      transparentIndex: TRANSPARENT,
      dispose: alpha ? 2 : 1,
      repeat: 0,
    });
    if (!alpha) {
      // Keep the composed state (what the viewer sees) for the next diff.
      if (prev) for (let p = 0; p < index.length; p++) if (index[p] === TRANSPARENT) index[p] = prev[p];
      prev = index;
    }
  }
  gif.finish();
  return Buffer.from(gif.bytes());
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
    for (const slot of FONT_SLOTS) {
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
      quaternary: `#${sp.get("qc") || ""}`,
      accent: `#${sp.get("ac") || ""}`,
    },
    fonts: {
      primary: sp.get("pf") || "",
      secondary: sp.get("sf") || "",
    },
  });
}
