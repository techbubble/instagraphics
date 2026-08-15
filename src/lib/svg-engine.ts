// Isomorphic SVG substitution engine (string-based; runs on server and client).
//
// Annotation convention inside template SVGs:
//   data-ig-fill="primary|secondary|tertiary"    -> fill is set to that color slot
//   data-ig-stroke="primary|secondary|tertiary"  -> stroke is set to that color slot
//   data-ig-font="primary|secondary|tertiary"    -> font-family is set to that font slot
//   data-ig-text="<fieldKey>"                    -> text content bound to a form field

export type Slot = "primary" | "secondary" | "tertiary";

export type BrandKit = {
  colors: Record<Slot, string>;
  fonts: Record<Slot, string>;
};

export const DEFAULT_BRAND: BrandKit = {
  colors: { primary: "#0d6efd", secondary: "#6c757d", tertiary: "#ffc107" },
  fonts: { primary: "Arial", secondary: "Arial", tertiary: "Arial" },
};

export const FONT_CHOICES = [
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

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function setAttr(tag: string, attr: string, value: string): string {
  const re = new RegExp(`\\s${attr}="[^"]*"`);
  if (re.test(tag)) return tag.replace(re, ` ${attr}="${value}"`);
  return tag.replace(/(\s*\/?>)$/, ` ${attr}="${value}"$1`);
}

const SLOT_RE = /^(primary|secondary|tertiary)$/;

function slotIn(tag: string, name: string): Slot | null {
  const m = tag.match(new RegExp(`data-${name}="([^"]*)"`));
  return m && SLOT_RE.test(m[1]) ? (m[1] as Slot) : null;
}

export function renderTemplate(
  svgSource: string,
  brand: BrandKit,
  values: Record<string, string>
): string {
  let out = svgSource.replace(/<[^>]+>/g, (tag) => {
    const fill = slotIn(tag, "ig-fill");
    if (fill) tag = setAttr(tag, "fill", brand.colors[fill]);
    const stroke = slotIn(tag, "ig-stroke");
    if (stroke) tag = setAttr(tag, "stroke", brand.colors[stroke]);
    const font = slotIn(tag, "ig-font");
    if (font) tag = setAttr(tag, "font-family", brand.fonts[font]);
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

// Rasterize a rendered SVG string to a PNG blob at 2x scale.
export async function svgToPngBlob(svgString: string): Promise<Blob> {
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
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
