// Isomorphic SVG substitution engine (string-based; runs on server and client).
//
// Annotation convention inside template SVGs:
//   data-ig-fill="primary|secondary|tertiary|accent"   -> fill from that color slot
//   data-ig-stroke="primary|secondary|tertiary|accent" -> stroke from that color slot
//   data-ig-font="primary|secondary|tertiary"    -> font-family is set to that font slot
//   data-ig-text="<fieldKey>"                    -> text content bound to a form field
//   data-ig-contrast="primary|secondary|tertiary"-> fill becomes black or white,
//                                                   whichever contrasts with that
//                                                   slot's current color

export type Slot = "primary" | "secondary" | "tertiary";
// Accent is a color-only slot used by strokes/connectors (arrows, lines,
// leaders) so they stay visible on any background the user picks.
export type ColorSlot = Slot | "accent";

export type BrandKit = {
  colors: Record<ColorSlot, string>;
  fonts: Record<Slot, string>;
};

export const DEFAULT_BRAND: BrandKit = {
  colors: {
    primary: "#0d6efd",
    secondary: "#6c757d",
    tertiary: "#ffc107",
    accent: "#495057",
  },
  fonts: { primary: "Roboto", secondary: "Roboto", tertiary: "Roboto" },
};

// Classic web-safe fonts: present on end-user machines, so downloads render
// natively. Server previews substitute metric-compatible open fonts (see
// server-render.ts).
export const SYSTEM_FONTS = [
  "Arial",
  "Helvetica",
  "Verdana",
  "Trebuchet MS",
  "Georgia",
  "Times New Roman",
  "Palatino",
  "Garamond",
  "Courier New",
  "Impact",
];

// Loaded via a stylesheet link in the root layout; embedded as data URIs
// into downloaded/rasterized SVGs by embedGoogleFonts().
export const GOOGLE_FONTS = [
  "Lato",
  "Merriweather",
  "Montserrat",
  "Nunito",
  "Open Sans",
  "Oswald",
  "Playfair Display",
  "Poppins",
  "Raleway",
  "Roboto",
];

export const FONT_CHOICES = [...SYSTEM_FONTS, ...GOOGLE_FONTS];

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setAttr(tag: string, attr: string, value: string): string {
  const re = new RegExp(`\\s${attr}="[^"]*"`);
  if (re.test(tag)) return tag.replace(re, ` ${attr}="${value}"`);
  return tag.replace(/(\s*\/?>)$/, ` ${attr}="${value}"$1`);
}

const SLOT_RE = /^(primary|secondary|tertiary)$/;
const COLOR_SLOT_RE = /^(primary|secondary|tertiary|accent)$/;

function slotIn(tag: string, name: string): Slot | null {
  const m = tag.match(new RegExp(`data-${name}="([^"]*)"`));
  return m && SLOT_RE.test(m[1]) ? (m[1] as Slot) : null;
}

function colorSlotIn(tag: string, name: string): ColorSlot | null {
  const m = tag.match(new RegExp(`data-${name}="([^"]*)"`));
  return m && COLOR_SLOT_RE.test(m[1]) ? (m[1] as ColorSlot) : null;
}

// YIQ luminance: readable black-or-white for text over a colored shape.
export function contrastColor(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 >= 140 ? "#212529" : "#ffffff";
}

export function renderTemplate(
  svgSource: string,
  brand: BrandKit,
  values: Record<string, string>,
  opts: { hideKeys?: string[] } = {}
): string {
  const hide = new Set(opts.hideKeys ?? []);
  let src = svgSource;
  if (hide.has("title")) {
    // Crop the empty title band so the graphic fills the canvas.
    src = src.replace('viewBox="0 0 800 600"', 'viewBox="0 112 800 488"');
  }
  let out = src.replace(/<[^>]+>/g, (tag) => {
    const textKey = tag.match(/data-ig-text="([^"]+)"/)?.[1];
    if (textKey && hide.has(textKey)) tag = setAttr(tag, "display", "none");
    const fill = colorSlotIn(tag, "ig-fill");
    if (fill) tag = setAttr(tag, "fill", brand.colors[fill]);
    const stroke = colorSlotIn(tag, "ig-stroke");
    if (stroke) tag = setAttr(tag, "stroke", brand.colors[stroke]);
    const font = slotIn(tag, "ig-font");
    if (font) tag = setAttr(tag, "font-family", brand.fonts[font]);
    const contrast = colorSlotIn(tag, "ig-contrast");
    if (contrast) tag = setAttr(tag, "fill", contrastColor(brand.colors[contrast]));
    return tag;
  });

  out = out.replace(
    /(<text\b[^>]*\bdata-ig-text="([^"]+)"[^>]*>)([\s\S]*?)(<\/text>)/g,
    (_m, open: string, key: string, body: string, close: string) => {
      const value = values[key];
      return open + (value !== undefined ? escapeXml(value) : body) + close;
    }
  );

  return out;
}

// ---- Browser-only helpers ----

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}

// Inline any Google fonts referenced by the SVG as data-URI @font-face
// rules, so downloaded SVGs and canvas-rasterized PNGs render the chosen
// fonts without network access. Inlined CSS is cached per family set, so
// live-preview rasterization only fetches fonts once.
const fontCssCache = new Map<string, Promise<string>>();

function inlinedFontCss(families: string[]): Promise<string> {
  const key = families.join("|");
  let cached = fontCssCache.get(key);
  if (!cached) {
    cached = (async () => {
      const query = families
        .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;700`)
        .join("&");
      let css = await (
        await fetch(`https://fonts.googleapis.com/css2?${query}&display=swap`)
      ).text();
      const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
      await Promise.all(
        urls.map(async (u) => {
          const buf = await (await fetch(u)).arrayBuffer();
          css = css.replaceAll(u, `data:font/woff2;base64,${bufToBase64(buf)}`);
        })
      );
      return css;
    })();
    cached.catch(() => fontCssCache.delete(key));
    fontCssCache.set(key, cached);
  }
  return cached;
}

export async function embedGoogleFonts(svg: string): Promise<string> {
  const used = new Set<string>();
  for (const m of svg.matchAll(/font-family="([^"]+)"/g)) used.add(m[1]);
  const families = GOOGLE_FONTS.filter((f) => used.has(f));
  if (families.length === 0) return svg;
  try {
    const css = await inlinedFontCss(families);
    return svg.replace(/(<svg\b[^>]*>)/, `$1<style>${css}</style>`);
  } catch {
    return svg; // viewer falls back to default fonts
  }
}

// Rasterize a rendered SVG string to a PNG blob at 2x scale. Pass
// background: null for a transparent PNG (used by on-screen previews).
export async function svgToPngBlob(
  svgString: string,
  opts: { background?: string | null } = {}
): Promise<Blob> {
  const background = opts.background === undefined ? "#ffffff" : opts.background;
  const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load SVG for PNG export"));
      img.src = url;
    });
    const scale = 2;
    const width = img.naturalWidth || 800;
    const height = img.naturalHeight || 600;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d")!;
    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("PNG encoding failed"))),
        "image/png"
      )
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
