// Shared primitives for generated template families. Every family module
// exports `families: FamilyDef[]`; build.mjs expands counts into variants,
// auto-fits each SVG into the 900x900 safe area and writes templates-gen.ts.

export const P = "primary", S = "secondary", T = "tertiary", Q = "quaternary", A = "accent";
export const DARK = "#212529";
export const WHITE = "#ffffff";
export const HEX = { primary: "#0d6efd", secondary: "#3be8bd", tertiary: "#ffc107", quaternary: "#f55151", accent: "#495057" };
const LIGHT = new Set([S, T]);

export const KEYS = ["item1", "item2", "item3", "item4", "item5", "other1", "other2", "other3"];
// Slot sequence for n items: 5th item uses accent (house convention).
export const SLOTS = [P, S, T, Q, A];
export const slot = (i) => SLOTS[i % SLOTS.length];

export const num = (v) => (Math.round(v * 100) / 100).toString();
export const polar = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

// Text element. `contrast` ties fill to a slot's readability; `fill` otherwise.
export function txt(key, x, y, size, o = {}) {
  const anchor = o.anchor ?? "middle";
  const font = o.font ?? "primary";
  const contrast = o.contrast ? ` data-ig-contrast="${o.contrast}"` : "";
  const fill = o.contrast ? (LIGHT.has(o.contrast) ? DARK : WHITE) : (o.fill ?? DARK);
  const weight = o.weight ?? "bold";
  const extra = o.extra ? ` ${o.extra}` : "";
  const bind = key ? ` data-ig-text="${key}"` : "";
  return `<text${contrast}${bind} data-ig-font="${font}" x="${num(x)}" y="${num(y)}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}"${extra}>${o.def ?? ""}</text>`;
}

export const rect = (x, y, w, h, s, o = {}) =>
  `<rect data-ig-fill="${s}" x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}"${o.rx != null ? ` rx="${o.rx}"` : ""}${o.opacity != null ? ` fill-opacity="${o.opacity}"` : ""}${o.extra ? ` ${o.extra}` : ""}/>`;
export const circ = (cx, cy, r, s, o = {}) =>
  `<circle data-ig-fill="${s}" cx="${num(cx)}" cy="${num(cy)}" r="${num(r)}"${o.opacity != null ? ` fill-opacity="${o.opacity}"` : ""}${o.extra ? ` ${o.extra}` : ""}/>`;
export const ring = (cx, cy, r, s, w, o = {}) =>
  `<circle cx="${num(cx)}" cy="${num(cy)}" r="${num(r)}" fill="${o.fill ?? WHITE}" data-ig-stroke="${s}" stroke="${HEX[s]}" stroke-width="${w}"${o.extra ? ` ${o.extra}` : ""}/>`;
export const poly = (pts, s, o = {}) =>
  `<polygon data-ig-fill="${s}" points="${pts.map(([x, y]) => `${num(x)},${num(y)}`).join(" ")}"${o.opacity != null ? ` fill-opacity="${o.opacity}"` : ""}${o.extra ? ` ${o.extra}` : ""}/>`;
export const path = (d, s, o = {}) =>
  `<path data-ig-fill="${s}" d="${d}"${o.opacity != null ? ` fill-opacity="${o.opacity}"` : ""}${o.extra ? ` ${o.extra}` : ""}/>`;
export const stroke = (d, s, w, o = {}) =>
  `<path d="${d}" fill="none" data-ig-stroke="${s}" stroke="${HEX[s]}" stroke-width="${w}" stroke-linecap="${o.cap ?? "round"}" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.opacity != null ? ` stroke-opacity="${o.opacity}"` : ""}${o.extra ? ` ${o.extra}` : ""}/>`;
export const line = (x1, y1, x2, y2, s, w, o = {}) => stroke(`M${num(x1)} ${num(y1)} L${num(x2)} ${num(y2)}`, s, w, o);

// Shading overlays (fixed black/white, brand-independent).
export const shade = (d, k = 0.14) => `<path d="${d}" fill="#000000" fill-opacity="${k}"/>`;
export const light = (d, k = 0.18) => `<path d="${d}" fill="#ffffff" fill-opacity="${k}"/>`;

// Numbered badge: filled circle with contrast number.
export const badge = (x, y, r, s, n, size = r * 1.1) => circ(x, y, r, s, { extra: 'stroke="#ffffff" stroke-width="5"' }) + txt(null, x, y + size * 0.36, size, { contrast: s, def: String(n) });

// Rounded label chip bound to a key.
export const chip = (x, y, w, h, s, key, def, size = 28) =>
  rect(x - w / 2, y - h / 2, w, h, s, { rx: Math.min(h / 2, 20) }) + txt(key, x, y + size * 0.36, size, { contrast: s, def });

// Arc path from angle a0 to a1 (degrees, clockwise in screen space).
export function arcD(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${num(x0)} ${num(y0)} A${num(r)} ${num(r)} 0 ${large} ${sweep} ${num(x1)} ${num(y1)}`;
}
// Annular sector between radii r0<r1 from a0 to a1.
export function sectorD(cx, cy, r0, r1, a0, a1) {
  const [ax, ay] = polar(cx, cy, r1, a0);
  const [bx, by] = polar(cx, cy, r1, a1);
  const [cxi, cyi] = polar(cx, cy, r0, a1);
  const [dx, dy] = polar(cx, cy, r0, a0);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${num(ax)} ${num(ay)} A${num(r1)} ${num(r1)} 0 ${large} 1 ${num(bx)} ${num(by)} L${num(cxi)} ${num(cyi)} A${num(r0)} ${num(r0)} 0 ${large} 0 ${num(dx)} ${num(dy)} Z`;
}
// Pie wedge (r0 = 0).
export function wedgeD(cx, cy, r, a0, a1) {
  const [ax, ay] = polar(cx, cy, r, a0);
  const [bx, by] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${num(cx)} ${num(cy)} L${num(ax)} ${num(ay)} A${num(r)} ${num(r)} 0 ${large} 1 ${num(bx)} ${num(by)} Z`;
}

// Arrowhead pointing along angle deg at tip (x,y).
export function arrowHead(x, y, deg, size, s) {
  const [bx, by] = polar(x, y, size, deg + 180);
  const [lx, ly] = polar(bx, by, size * 0.6, deg + 90);
  const [rx, ry] = polar(bx, by, size * 0.6, deg - 90);
  return poly([[x, y], [lx, ly], [rx, ry]], s);
}

export const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">\n${body}\n</svg>`;

// Keys/labels/usage helpers for n items (optionally with extra named fields).
export function itemFields(n, noun, where, defaults) {
  const usage = {}, labels = {}, fieldDefaults = {};
  for (let i = 0; i < n; i++) {
    const k = KEYS[i];
    usage[k] = `${where} ${i + 1}`;
    labels[k] = `${noun} ${i + 1}`;
    fieldDefaults[k] = defaults[i % defaults.length];
  }
  return { usage, labels, fieldDefaults };
}

// Define a family. `counts` lists item counts; draw(n) returns
// { body, usage?, labels?, fieldDefaults?, extras? } where extras maps
// extra keys -> {usage,label,def}.
export function family(def) {
  return { ...def };
}
