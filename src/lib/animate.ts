// Motion for rendered graphics (string-based, isomorphic).
//
// Every top-level element of the SVG is an animation unit, revealed in
// document (draw) order with motion that depends on what it is:
//   shape  - filled shapes and groups pop in from their own center with a
//            small overshoot
//   stroke - connectors and outlines draw on along their length
//   fade   - text (and anything else) fades in and settles upward
// Once built, a highlight pulse ripples through the shapes in order and
// repeats, so the loop never sits still.
//
// The same plan is emitted two ways:
//   - toAnimatedSvg(): SMIL children, which browsers play (also inside
//     <img>) and every other renderer ignores: the base attributes are the
//     finished graphic, so static viewers show exactly that.
//   - frameSvg(t):     the state at time t baked into attributes, which
//     resvg rasterizes for GIF frames.

const PASSIVE = new Set([
  "defs",
  "style",
  "clipPath",
  "mask",
  "pattern",
  "linearGradient",
  "radialGradient",
  "filter",
  "marker",
  "symbol",
  "title",
  "desc",
  "metadata",
]);

// Timing (seconds)
const SPAN = 1.9; // target spread of the last reveal delay
const DUR = { shape: 0.6, stroke: 0.7, fade: 0.5 };
const RISE = 10; // user units a fading unit settles from
const OVERSHOOT = 1.1;
const PULSE_LEAD = 0.5; // pause after the build before the ripple
const PULSE_SPAN = 2.5;
const PULSE_DUR = 0.5;
const PULSE_SCALE = 1.07;
const REST = 1.2; // hold on the finished frame before the loop restarts

type Kind = "passive" | "shape" | "stroke" | "fade";
type Unit = {
  markup: string;
  kind: Kind;
  cx: number;
  cy: number;
  len: number; // stroke length, for draw-on
  delay: number;
  pulse: number; // ripple start (absolute), shapes only
};

type Plan = {
  head: string;
  tail: string;
  units: Unit[];
  reveal: number; // seconds until the last unit has settled
  cycle: number; // ripple period (after reveal)
};

// ---- tokenizing -----------------------------------------------------------

// Depth-0 elements of `body`, each with its trailing text.
function topLevel(body: string): string[] {
  const out: string[] = [];
  const tagRe = /<!--[\s\S]*?-->|<\/?([A-Za-z][\w:-]*)[^>]*?(\/?)>/g;
  let depth = 0;
  let start = -1;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(body))) {
    if (m[0].startsWith("<!--")) continue;
    const closing = m[0].startsWith("</");
    const selfClosing = m[2] === "/";
    if (depth === 0 && start < 0) start = m.index;
    if (closing) depth--;
    else if (!selfClosing) depth++;
    if (depth === 0 && start >= 0) {
      const after = body.indexOf("<", tagRe.lastIndex);
      const end = after < 0 ? body.length : after;
      out.push(body.slice(start, end));
      tagRe.lastIndex = end;
      start = -1;
    }
  }
  return out;
}

function tagName(markup: string): string {
  const m = markup.match(/^<([A-Za-z][\w:-]*)/);
  return m ? m[1] : "";
}

function openTag(markup: string): string {
  const m = markup.match(/^<[^>]*>/);
  return m ? m[0] : "";
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : null;
}

function numAttr(tag: string, name: string, def = 0): number {
  const v = attr(tag, name);
  const n = v === null ? NaN : parseFloat(v);
  return Number.isFinite(n) ? n : def;
}

function setAttr(tag: string, name: string, value: string): string {
  const re = new RegExp(`\\s${name}="[^"]*"`);
  if (re.test(tag)) return tag.replace(re, ` ${name}="${value}"`);
  return tag.replace(/(\s*\/?>)$/, ` ${name}="${value}"$1`);
}

// ---- geometry -------------------------------------------------------------

type Box = { x0: number; y0: number; x1: number; y1: number };
type Mat = [number, number, number, number, number, number]; // a b c d e f

const IDENT: Mat = [1, 0, 0, 1, 0, 0];

function mul(m: Mat, n: Mat): Mat {
  return [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4],
    m[1] * n[4] + m[3] * n[5] + m[5],
  ];
}

function parseTransform(s: string | null): Mat {
  if (!s) return IDENT;
  let m = IDENT;
  const re = /(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^)]*)\)/g;
  let t: RegExpExecArray | null;
  while ((t = re.exec(s))) {
    const a = t[2].split(/[\s,]+/).filter(Boolean).map(Number);
    let n: Mat = IDENT;
    switch (t[1]) {
      case "matrix":
        if (a.length === 6) n = a as Mat;
        break;
      case "translate":
        n = [1, 0, 0, 1, a[0] || 0, a[1] || 0];
        break;
      case "scale":
        n = [a[0] ?? 1, 0, 0, a[1] ?? a[0] ?? 1, 0, 0];
        break;
      case "rotate": {
        const r = ((a[0] || 0) * Math.PI) / 180;
        const cos = Math.cos(r);
        const sin = Math.sin(r);
        n = [cos, sin, -sin, cos, 0, 0];
        if (a.length === 3) {
          n = mul(mul([1, 0, 0, 1, a[1], a[2]], n), [1, 0, 0, 1, -a[1], -a[2]]);
        }
        break;
      }
      case "skewX":
        n = [1, 0, Math.tan(((a[0] || 0) * Math.PI) / 180), 1, 0, 0];
        break;
      case "skewY":
        n = [1, Math.tan(((a[0] || 0) * Math.PI) / 180), 0, 1, 0, 0];
        break;
    }
    m = mul(m, n);
  }
  return m;
}

function apply(m: Mat, x: number, y: number): [number, number] {
  return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
}

function boxOfPoints(pts: [number, number][], m: Mat): Box | null {
  if (pts.length === 0) return null;
  const b: Box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  for (const [px, py] of pts) {
    const [x, y] = apply(m, px, py);
    if (x < b.x0) b.x0 = x;
    if (y < b.y0) b.y0 = y;
    if (x > b.x1) b.x1 = x;
    if (y > b.y1) b.y1 = y;
  }
  return b;
}

function union(a: Box | null, b: Box | null): Box | null {
  if (!a) return b;
  if (!b) return a;
  return {
    x0: Math.min(a.x0, b.x0),
    y0: Math.min(a.y0, b.y0),
    x1: Math.max(a.x1, b.x1),
    y1: Math.max(a.y1, b.y1),
  };
}

// Flatten an SVG path into polyline points; also returns its length.
function flattenPath(d: string): { pts: [number, number][]; len: number } {
  const pts: [number, number][] = [];
  let len = 0;
  const tok = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let cpx = 0; // last cubic control (for S)
  let cpy = 0;
  let qpx = 0; // last quadratic control (for T)
  let qpy = 0;
  const num = () => parseFloat(tok[i++]);
  const push = (nx: number, ny: number) => {
    if (pts.length) len += Math.hypot(nx - x, ny - y);
    x = nx;
    y = ny;
    pts.push([x, y]);
  };
  const cubic = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    const ox = x;
    const oy = y;
    for (let k = 1; k <= 12; k++) {
      const t = k / 12;
      const u = 1 - t;
      push(
        u * u * u * ox + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
        u * u * u * oy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3
      );
    }
    cpx = x2;
    cpy = y2;
  };
  const quad = (x1: number, y1: number, x2: number, y2: number) => {
    const ox = x;
    const oy = y;
    for (let k = 1; k <= 10; k++) {
      const t = k / 10;
      const u = 1 - t;
      push(u * u * ox + 2 * u * t * x1 + t * t * x2, u * u * oy + 2 * u * t * y1 + t * t * y2);
    }
    qpx = x1;
    qpy = y1;
  };
  const arc = (rx: number, ry: number, rot: number, large: number, sweep: number, x2: number, y2: number) => {
    const x1 = x;
    const y1 = y;
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    if (rx === 0 || ry === 0 || (x1 === x2 && y1 === y2)) {
      push(x2, y2);
      return;
    }
    const phi = (rot * Math.PI) / 180;
    const cph = Math.cos(phi);
    const sph = Math.sin(phi);
    const dx = (x1 - x2) / 2;
    const dy = (y1 - y2) / 2;
    const x1p = cph * dx + sph * dy;
    const y1p = -sph * dx + cph * dy;
    const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
    if (lam > 1) {
      rx *= Math.sqrt(lam);
      ry *= Math.sqrt(lam);
    }
    const sign = large === sweep ? -1 : 1;
    const numer = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
    const denom = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
    const coef = sign * Math.sqrt(Math.max(0, numer / denom));
    const cxp = (coef * rx * y1p) / ry;
    const cyp = (-coef * ry * x1p) / rx;
    const cx = cph * cxp - sph * cyp + (x1 + x2) / 2;
    const cy = sph * cxp + cph * cyp + (y1 + y2) / 2;
    const ang = (ux: number, uy: number, vx: number, vy: number) => {
      const dot = ux * vx + uy * vy;
      const l = Math.hypot(ux, uy) * Math.hypot(vx, vy);
      let a = Math.acos(Math.max(-1, Math.min(1, dot / l)));
      if (ux * vy - uy * vx < 0) a = -a;
      return a;
    };
    const th1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
    let dth = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
    if (!sweep && dth > 0) dth -= 2 * Math.PI;
    else if (sweep && dth < 0) dth += 2 * Math.PI;
    const n = Math.max(4, Math.ceil(Math.abs(dth) / (Math.PI / 12)));
    for (let k = 1; k <= n; k++) {
      const th = th1 + (dth * k) / n;
      const ex = rx * Math.cos(th);
      const ey = ry * Math.sin(th);
      push(cph * ex - sph * ey + cx, sph * ex + cph * ey + cy);
    }
    x = x2;
    y = y2;
  };

  while (i < tok.length) {
    if (/^[A-Za-z]$/.test(tok[i])) cmd = tok[i++];
    else if (cmd === "M") cmd = "L";
    else if (cmd === "m") cmd = "l";
    if (!cmd) break;
    const rel = cmd === cmd.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    switch (cmd.toUpperCase()) {
      case "M": {
        const nx = num() + ox;
        const ny = num() + oy;
        x = nx;
        y = ny;
        sx = x;
        sy = y;
        pts.push([x, y]);
        break;
      }
      case "L":
        push(num() + ox, num() + oy);
        break;
      case "H":
        push(num() + ox, y);
        break;
      case "V":
        push(x, num() + oy);
        break;
      case "C": {
        const a = [num() + ox, num() + oy, num() + ox, num() + oy, num() + ox, num() + oy];
        cubic(a[0], a[1], a[2], a[3], a[4], a[5]);
        break;
      }
      case "S": {
        // cpx/cpy equal the current point unless the previous command was
        // a cubic, so the reflection is right in both cases.
        const a = [num() + ox, num() + oy, num() + ox, num() + oy];
        cubic(2 * x - cpx, 2 * y - cpy, a[0], a[1], a[2], a[3]);
        break;
      }
      case "Q": {
        const a = [num() + ox, num() + oy, num() + ox, num() + oy];
        quad(a[0], a[1], a[2], a[3]);
        break;
      }
      case "T": {
        const a = [num() + ox, num() + oy];
        quad(2 * x - qpx, 2 * y - qpy, a[0], a[1]);
        break;
      }
      case "A": {
        const rx = num();
        const ry = num();
        const rot = num();
        const large = num();
        const sweep = num();
        arc(rx, ry, rot, large, sweep, num() + ox, num() + oy);
        break;
      }
      case "Z":
        push(sx, sy);
        break;
    }
    if (cmd.toUpperCase() !== "C" && cmd.toUpperCase() !== "S") {
      cpx = x;
      cpy = y;
    }
    if (cmd.toUpperCase() !== "Q" && cmd.toUpperCase() !== "T") {
      qpx = x;
      qpy = y;
    }
  }
  return { pts, len };
}

// Approximate bounding box of an element (recursing into groups), in the
// coordinate space the unit lives in. Text is estimated from font size.
function bboxOf(markup: string, depth = 0): Box | null {
  const tag = openTag(markup);
  const name = tagName(markup);
  const m = parseTransform(attr(tag, "transform"));
  switch (name) {
    case "circle": {
      const cx = numAttr(tag, "cx");
      const cy = numAttr(tag, "cy");
      const r = numAttr(tag, "r");
      return boxOfPoints(
        [
          [cx - r, cy - r],
          [cx + r, cy + r],
        ],
        m
      );
    }
    case "ellipse": {
      const cx = numAttr(tag, "cx");
      const cy = numAttr(tag, "cy");
      const rx = numAttr(tag, "rx");
      const ry = numAttr(tag, "ry");
      return boxOfPoints(
        [
          [cx - rx, cy - ry],
          [cx + rx, cy + ry],
        ],
        m
      );
    }
    case "rect":
    case "image":
    case "foreignObject": {
      const x = numAttr(tag, "x");
      const y = numAttr(tag, "y");
      return boxOfPoints(
        [
          [x, y],
          [x + numAttr(tag, "width"), y + numAttr(tag, "height")],
        ],
        m
      );
    }
    case "line":
      return boxOfPoints(
        [
          [numAttr(tag, "x1"), numAttr(tag, "y1")],
          [numAttr(tag, "x2"), numAttr(tag, "y2")],
        ],
        m
      );
    case "polygon":
    case "polyline": {
      const nums = (attr(tag, "points") ?? "").split(/[\s,]+/).filter(Boolean).map(Number);
      const pts: [number, number][] = [];
      for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
      return boxOfPoints(pts, m);
    }
    case "path":
      return boxOfPoints(flattenPath(attr(tag, "d") ?? "").pts, m);
    case "text": {
      const x = numAttr(tag, "x");
      const y = numAttr(tag, "y");
      const fs = numAttr(tag, "font-size", 16);
      const text = markup.replace(/<[^>]+>/g, "").trim();
      const w = text.length * fs * 0.55;
      const anchor = attr(tag, "text-anchor");
      const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
      return boxOfPoints(
        [
          [x0, y - fs * 0.75],
          [x0 + w, y + fs * 0.25],
        ],
        m
      );
    }
    case "g":
    case "a": {
      if (depth > 6) return null;
      const close = markup.lastIndexOf(`</${name}>`);
      if (close < 0) return null;
      let box: Box | null = null;
      for (const child of topLevel(markup.slice(tag.length, close))) {
        if (PASSIVE.has(tagName(child))) continue;
        box = union(box, bboxOf(child, depth + 1));
      }
      if (!box) return null;
      return boxOfPoints(
        [
          [box.x0, box.y0],
          [box.x1, box.y0],
          [box.x0, box.y1],
          [box.x1, box.y1],
        ],
        m
      );
    }
    default:
      return null;
  }
}

function strokeLength(markup: string): number {
  const tag = openTag(markup);
  const m = parseTransform(attr(tag, "transform"));
  const scale = Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2])) || 1;
  switch (tagName(markup)) {
    case "line":
      return (
        Math.hypot(numAttr(tag, "x2") - numAttr(tag, "x1"), numAttr(tag, "y2") - numAttr(tag, "y1")) *
        scale
      );
    case "polyline":
    case "polygon": {
      const nums = (attr(tag, "points") ?? "").split(/[\s,]+/).filter(Boolean).map(Number);
      let len = 0;
      for (let i = 2; i + 1 < nums.length; i += 2) {
        len += Math.hypot(nums[i] - nums[i - 2], nums[i + 1] - nums[i - 1]);
      }
      if (tagName(markup) === "polygon" && nums.length >= 4) {
        len += Math.hypot(nums[0] - nums[nums.length - 2], nums[1] - nums[nums.length - 1]);
      }
      return len * scale;
    }
    case "path":
      return flattenPath(attr(tag, "d") ?? "").len * scale;
  }
  return 0;
}

// ---- classification & plan --------------------------------------------------

function classify(markup: string): Kind {
  const name = tagName(markup);
  if (PASSIVE.has(name)) return "passive";
  if (name === "text" || name === "use" || name === "image") return "fade";
  const tag = openTag(markup);
  if (name === "path" || name === "line" || name === "polyline") {
    const fill = attr(tag, "fill");
    const stroked = attr(tag, "stroke") !== null || attr(tag, "data-ig-stroke") !== null;
    const outline = fill === "none" || (fill === null && stroked);
    if (outline && stroked && attr(tag, "stroke-dasharray") === null) return "stroke";
  }
  return "shape";
}

function split(svg: string): { head: string; body: string; tail: string } | null {
  const open = svg.match(/<svg\b[^>]*>/);
  const closeIdx = svg.lastIndexOf("</svg>");
  if (!open || open.index === undefined || closeIdx < 0) return null;
  let head = svg.slice(0, open.index + open[0].length);
  let tail = svg.slice(closeIdx);
  let body = svg.slice(open.index + open[0].length, closeIdx);

  // Generated templates wrap their whole drawing in one fit <g>; animate
  // its children rather than the wrapper (up to a few nesting levels).
  for (let level = 0; level < 3; level++) {
    const parts = topLevel(body);
    const active = parts.filter((p) => !PASSIVE.has(tagName(p)));
    if (active.length !== 1 || tagName(active[0]) !== "g") break;
    const g = active[0];
    const gOpen = g.match(/^<g\b[^>]*>/);
    const gClose = g.lastIndexOf("</g>");
    if (!gOpen || gClose < 0) break;
    const passive = parts.filter((p) => PASSIVE.has(tagName(p))).join("");
    head += passive + gOpen[0];
    tail = g.slice(gClose) + tail;
    body = g.slice(gOpen[0].length, gClose);
  }
  return { head, body, tail };
}

function plan(svg: string): Plan | null {
  const s = split(svg);
  if (!s) return null;
  const units: Unit[] = topLevel(s.body).map((markup) => {
    let kind = classify(markup);
    let cx = 0;
    let cy = 0;
    let len = 0;
    if (kind === "shape") {
      const b = bboxOf(markup);
      if (!b) kind = "fade";
      else {
        cx = (b.x0 + b.x1) / 2;
        cy = (b.y0 + b.y1) / 2;
      }
    } else if (kind === "stroke") {
      len = strokeLength(markup);
      if (!(len > 0)) kind = "fade";
    }
    return { markup, kind, cx, cy, len, delay: 0, pulse: 0 };
  });

  const active = units.filter((u) => u.kind !== "passive");
  const n = Math.max(active.length, 1);
  const step = Math.min(0.14, Math.max(0.025, SPAN / n));
  let reveal = 0;
  active.forEach((u, i) => {
    u.delay = i * step;
    reveal = Math.max(reveal, u.delay + DUR[u.kind as keyof typeof DUR]);
  });

  const shapes = active.filter((u) => u.kind === "shape");
  const m = Math.max(shapes.length, 1);
  const pstep = Math.min(0.12, Math.max(0.03, PULSE_SPAN / m));
  shapes.forEach((u, j) => {
    u.pulse = reveal + PULSE_LEAD + j * pstep;
  });
  const cycle = shapes.length ? PULSE_LEAD + (m - 1) * pstep + PULSE_DUR + REST : REST;

  return { head: s.head, tail: s.tail, units, reveal, cycle };
}

// ---- easing -----------------------------------------------------------------

const clamp01 = (p: number) => Math.min(1, Math.max(0, p));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
// Back-out: starts at 0, overshoots to ~1.10, lands on 1.
const backOut = (p: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

// ---- GIF timeline -------------------------------------------------------------

// Seconds of motion before the final rest frame, and how long that rest
// frame should hold, so renderGif can size its timeline.
export function timeline(svg: string): { active: number; rest: number } {
  const p = plan(svg);
  if (!p) return { active: 0, rest: REST };
  return { active: p.reveal + p.cycle - REST, rest: REST };
}

// State at time t baked into attributes (units not yet started are dropped
// entirely, which also keeps early frames cheap to rasterize).
export function frameSvg(svg: string, t: number): string {
  const p = plan(svg);
  if (!p) return svg;
  const n2 = (v: number) => v.toFixed(2);
  const parts = p.units.map((u) => {
    if (u.kind === "passive") return u.markup;
    const q = clamp01((t - u.delay) / DUR[u.kind as keyof typeof DUR]);
    if (q <= 0) return "";
    if (u.kind === "fade") {
      if (q >= 1) return u.markup;
      const e = easeOut(q);
      return `<g opacity="${e.toFixed(3)}" transform="translate(0 ${n2(RISE * (1 - e))})">${u.markup}</g>`;
    }
    if (u.kind === "stroke") {
      if (q >= 1) return u.markup;
      const drawn = easeInOut(q);
      const L = u.len * 1.01 + 2;
      let tag = openTag(u.markup);
      tag = setAttr(tag, "stroke-dasharray", `${n2(L)} ${n2(L)}`);
      tag = setAttr(tag, "stroke-dashoffset", n2(L * (1 - drawn)));
      const o = clamp01(q / 0.15);
      const el = tag + u.markup.slice(openTag(u.markup).length);
      return o < 1 ? `<g opacity="${o.toFixed(3)}">${el}</g>` : el;
    }
    // shape: pop in, later pulse
    let s = q >= 1 ? 1 : Math.max(0, backOut(q));
    const o = clamp01(q / 0.35);
    if (u.pulse > 0) {
      const pq = (t - u.pulse) / PULSE_DUR;
      if (pq > 0 && pq < 1) s *= 1 + (PULSE_SCALE - 1) * Math.sin(Math.PI * pq);
    }
    if (o >= 1 && Math.abs(s - 1) < 0.0005) return u.markup;
    const tf = `translate(${n2(u.cx)} ${n2(u.cy)}) scale(${s.toFixed(4)}) translate(${n2(-u.cx)} ${n2(-u.cy)})`;
    return `<g opacity="${o.toFixed(3)}" transform="${tf}">${u.markup}</g>`;
  });
  return p.head + parts.join("") + p.tail;
}

// ---- SMIL ---------------------------------------------------------------------

export function toAnimatedSvg(svg: string): string {
  const p = plan(svg);
  if (!p) return svg;
  const T = p.reveal;
  const dur = `dur="${T.toFixed(2)}s"`;
  const k = (t: number) => clamp01(t / T).toFixed(4);
  const n2 = (v: number) => v.toFixed(2);
  const parts = p.units.map((u) => {
    if (u.kind === "passive") return u.markup;
    const d = u.delay;
    const D = DUR[u.kind as keyof typeof DUR];
    const lin = "0 0 1 1";
    if (u.kind === "fade") {
      const common = `begin="0s" ${dur} fill="freeze" keyTimes="0;${k(d)};${k(d + D)};1" calcMode="spline" keySplines="${lin};0.22 1 0.36 1;${lin}"`;
      return (
        `<g>` +
        `<animate attributeName="opacity" values="0;0;1;1" ${common}/>` +
        `<animateTransform attributeName="transform" type="translate" values="0 ${RISE};0 ${RISE};0 0;0 0" ${common}/>` +
        u.markup +
        `</g>`
      );
    }
    if (u.kind === "stroke") {
      const L = n2(u.len * 1.01 + 2);
      const draw = `begin="0s" ${dur} fill="freeze" keyTimes="0;${k(d)};${k(d + D)};1" calcMode="spline" keySplines="${lin};0.65 0 0.35 1;${lin}"`;
      const fade = `begin="0s" ${dur} fill="freeze" keyTimes="0;${k(d)};${k(d + D * 0.15)};1"`;
      const inner =
        // Dash pattern exists only while the animation runs: static viewers
        // never see it (and need no pathLength support).
        `<set attributeName="stroke-dasharray" to="${L} ${L}" begin="0s" ${dur}/>` +
        `<animate attributeName="stroke-dashoffset" values="${L};${L};0;0" ${draw}/>`;
      const open = openTag(u.markup);
      const name = tagName(u.markup);
      const el = open.endsWith("/>")
        ? open.slice(0, -2) + ">" + inner + `</${name}>` + u.markup.slice(open.length)
        : open + inner + u.markup.slice(open.length);
      return `<g><animate attributeName="opacity" values="0;0;1;1" ${fade}/>${el}</g>`;
    }
    // shape
    const pop = `begin="0s" ${dur} fill="freeze" keyTimes="0;${k(d)};${k(d + D * 0.6)};${k(d + D)};1" calcMode="spline" keySplines="${lin};0.33 0 0.67 1;0.33 0 0.67 1;${lin}"`;
    const fade = `begin="0s" ${dur} fill="freeze" keyTimes="0;${k(d)};${k(d + D * 0.35)};1"`;
    let pulse = "";
    if (u.pulse > 0) {
      const C = p.cycle;
      const kk = (t: number) => clamp01(t / C).toFixed(4);
      pulse =
        `<animateTransform attributeName="transform" type="scale" ` +
        `values="1;${PULSE_SCALE};1;1" keyTimes="0;${kk(PULSE_DUR / 2)};${kk(PULSE_DUR)};1" ` +
        `calcMode="spline" keySplines="0.37 0 0.63 1;0.37 0 0.63 1;${lin}" ` +
        `begin="${u.pulse.toFixed(2)}s" dur="${C.toFixed(2)}s" repeatCount="indefinite"/>`;
    }
    return (
      `<g transform="translate(${n2(u.cx)} ${n2(u.cy)})">` +
      `<g>` +
      `<animate attributeName="opacity" values="0;0;1;1" ${fade}/>` +
      `<animateTransform attributeName="transform" type="scale" values="0;0;${OVERSHOOT};1;1" ${pop}/>` +
      `<g>${pulse}<g transform="translate(${n2(-u.cx)} ${n2(-u.cy)})">${u.markup}</g></g>` +
      `</g>` +
      `</g>`
    );
  });
  return p.head + parts.join("") + p.tail;
}
