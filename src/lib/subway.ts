// Dynamic subway-map renderer: each line is a comma-separated station list
// typed into one field, so a line can carry any number of stations. A name
// that appears in two lines becomes the interchange and is pinned to the
// fixed crossing point of those lines.

type Pt = [number, number];

const R = 50; // corner radius of the drawn track

// Per-variant fixed geometry: line spines (axis-aligned polylines), the
// crossings between them, and the legend rows.
type Crossing = {
  lines: [number, number]; // indexes of the two lines that meet
  at: Pt;
  vertical: boolean; // capsule orientation
  label: [number, number, "start" | "end"]; // label spot for the shared name
};
type Variant = {
  spines: Pt[][];
  slots: string[]; // color slot per line
  defaults: string[]; // sample station lists
  nameDefaults: string[];
  crossings: Crossing[];
  legendY: number;
};

const VARIANTS: Record<number, Variant> = {
  1: {
    spines: [
      [[150, 250], [500, 250], [500, 500], [750, 500], [750, 750], [350, 750]],
    ],
    slots: ["primary"],
    defaults: ["Discover, Define, Design, Deliver, Debrief"],
    nameDefaults: ["Design sprint"],
    crossings: [],
    legendY: 905,
  },
  2: {
    spines: [
      [[150, 300], [450, 300], [450, 650], [820, 650]],
      [[180, 760], [570, 760], [570, 350], [830, 350]],
    ],
    slots: ["primary", "secondary"],
    defaults: [
      "Research, Wireframe, Prototype, Beta, Launch",
      "Spec, Build, Beta, Scale",
    ],
    nameDefaults: ["Design", "Engineering"],
    crossings: [
      { lines: [0, 1], at: [570, 650], vertical: true, label: [505, 710, "end"] },
    ],
    legendY: 905,
  },
  3: {
    spines: [
      [[150, 250], [500, 250], [500, 500], [850, 500]],
      [[180, 780], [670, 780], [670, 250], [860, 250]],
      [[150, 380], [610, 380], [610, 180]],
    ],
    slots: ["primary", "secondary", "tertiary"],
    defaults: [
      "Idea, Beta, Launch, Scale",
      "Research, Launch, Growth",
      "Hiring, Beta, Support",
    ],
    nameDefaults: ["Product", "Marketing", "Operations"],
    crossings: [
      { lines: [0, 2], at: [500, 380], vertical: false, label: [445, 440, "end"] },
      { lines: [0, 1], at: [670, 500], vertical: true, label: [700, 455, "start"] },
    ],
    legendY: 920,
  },
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// --- arc-length parameterisation of a rounded polyline ---
type Seg =
  | { kind: "line"; a: Pt; b: Pt; len: number }
  | { kind: "arc"; c: Pt; a0: number; a1: number; len: number };

function unit(a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l = Math.hypot(dx, dy);
  return [dx / l, dy / l];
}

function buildSegs(spine: Pt[]): Seg[] {
  const segs: Seg[] = [];
  let cur: Pt = spine[0];
  for (let i = 1; i < spine.length - 1; i++) {
    const v = spine[i];
    const dIn = unit(spine[i - 1], v);
    const dOut = unit(v, spine[i + 1]);
    const p1: Pt = [v[0] - dIn[0] * R, v[1] - dIn[1] * R];
    const p2: Pt = [v[0] + dOut[0] * R, v[1] + dOut[1] * R];
    segs.push({ kind: "line", a: cur, b: p1, len: Math.hypot(p1[0] - cur[0], p1[1] - cur[1]) });
    const c: Pt = [p1[0] + dOut[0] * R, p1[1] + dOut[1] * R];
    const a0 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
    let a1 = Math.atan2(p2[1] - c[1], p2[0] - c[0]);
    let sweep = a1 - a0;
    if (sweep > Math.PI) sweep -= 2 * Math.PI;
    if (sweep < -Math.PI) sweep += 2 * Math.PI;
    a1 = a0 + sweep;
    segs.push({ kind: "arc", c, a0, a1, len: Math.abs(sweep) * R });
    cur = p2;
  }
  const last = spine[spine.length - 1];
  segs.push({ kind: "line", a: cur, b: last, len: Math.hypot(last[0] - cur[0], last[1] - cur[1]) });
  return segs;
}

function totalLen(segs: Seg[]): number {
  return segs.reduce((s, x) => s + x.len, 0);
}

function pointAt(segs: Seg[], l: number): { p: Pt; d: Pt } {
  let rem = Math.max(0, Math.min(l, totalLen(segs)));
  for (const s of segs) {
    if (rem > s.len) {
      rem -= s.len;
      continue;
    }
    if (s.kind === "line") {
      const u = s.len === 0 ? 0 : rem / s.len;
      const d = unit(s.a, s.b);
      return { p: [s.a[0] + (s.b[0] - s.a[0]) * u, s.a[1] + (s.b[1] - s.a[1]) * u], d };
    }
    const dir = s.a1 > s.a0 ? 1 : -1;
    const ang = s.a0 + (dir * rem) / R;
    return {
      p: [s.c[0] + R * Math.cos(ang), s.c[1] + R * Math.sin(ang)],
      d: [-Math.sin(ang) * dir, Math.cos(ang) * dir],
    };
  }
  const lastSeg = segs[segs.length - 1] as Extract<Seg, { kind: "line" }>;
  return { p: lastSeg.b, d: unit(lastSeg.a, lastSeg.b) };
}

// Arc length along the spine at which the (straight-segment) point lies.
function lengthAtPoint(segs: Seg[], pt: Pt): number {
  let acc = 0;
  for (const s of segs) {
    if (s.kind === "line") {
      const d = unit(s.a, s.b);
      const t = (pt[0] - s.a[0]) * d[0] + (pt[1] - s.a[1]) * d[1];
      const proj: Pt = [s.a[0] + d[0] * t, s.a[1] + d[1] * t];
      if (t >= -1 && t <= s.len + 1 && Math.hypot(proj[0] - pt[0], proj[1] - pt[1]) < 2) {
        return acc + Math.max(0, Math.min(t, s.len));
      }
    }
    acc += s.len;
  }
  return acc / 2;
}

function pathD(spine: Pt[]): string {
  let d = `M${spine[0][0]} ${spine[0][1]}`;
  for (let i = 1; i < spine.length - 1; i++) {
    const v = spine[i];
    const dIn = unit(spine[i - 1], v);
    const dOut = unit(v, spine[i + 1]);
    d += ` L${v[0] - dIn[0] * R} ${v[1] - dIn[1] * R} Q${v[0]} ${v[1]} ${v[0] + dOut[0] * R} ${v[1] + dOut[1] * R}`;
  }
  d += ` L${spine[spine.length - 1][0]} ${spine[spine.length - 1][1]}`;
  return d;
}

const SLOT_HEX: Record<string, string> = {
  primary: "#0d6efd",
  secondary: "#3be8bd",
  tertiary: "#ffc107",
};

export function buildSubwaySvg(lines: number, values: Record<string, string>): string {
  const v = VARIANTS[lines] ?? VARIANTS[1];
  const itemKeys = ["item1", "item2", "item3"];
  const nameKeys = ["other1", "other2", "other3"];
  const lists = v.spines.map((_, i) => {
    const raw = (values[itemKeys[i]] || "").trim() || v.defaults[i];
    const parsed = raw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12);
    // A one-word value is a leftover from another template, not a line.
    return parsed.length >= 2 ? parsed : v.defaults[i].split(",").map((s) => s.trim());
  });
  const names = v.spines.map((_, i) => (values[nameKeys[i]] || "").trim() || v.nameDefaults[i]);
  const segsPerLine = v.spines.map(buildSegs);

  // Pin shared names to their crossing's arc position on each line.
  const pins: Map<number, Map<number, number>> = new Map(); // line -> stationIdx -> arcLen
  const junctionDraws: { at: Pt; vertical: boolean; label: string; labelAt: Crossing["label"] }[] = [];
  for (const cr of v.crossings) {
    const [la, lb] = cr.lines;
    const shared = lists[la].find((n) => lists[lb].some((m) => m.toLowerCase() === n.toLowerCase()));
    if (!shared) continue;
    for (const li of [la, lb]) {
      const idx = lists[li].findIndex((n) => n.toLowerCase() === shared.toLowerCase());
      if (idx < 0) continue;
      if (!pins.has(li)) pins.set(li, new Map());
      pins.get(li)!.set(idx, lengthAtPoint(segsPerLine[li], cr.at));
    }
    junctionDraws.push({ at: cr.at, vertical: cr.vertical, label: shared, labelAt: cr.label });
  }

  let tracks = "";
  let stations = "";
  let labels = "";
  v.spines.forEach((spine, li) => {
    const slot = v.slots[li];
    tracks += `<path d="${pathD(spine)}" fill="none" data-ig-stroke="${slot}" stroke="${SLOT_HEX[slot]}" stroke-width="22" stroke-linecap="round"/>`;
    const segs = segsPerLine[li];
    const L = totalLen(segs);
    const list = lists[li];
    const pinned = pins.get(li) ?? new Map<number, number>();
    // Anchors: start, each pinned station, end; spread the rest evenly between.
    const anchors: { idx: number; l: number }[] = [
      { idx: 0, l: 0 },
      ...[...pinned.entries()].filter(([i]) => i > 0 && i < list.length - 1).map(([idx, l]) => ({ idx, l })),
      { idx: list.length - 1, l: L },
    ].sort((a, b) => a.idx - b.idx);
    const arcOf = (i: number): number => {
      if (list.length === 1) return L / 2;
      let lo = anchors[0];
      let hi = anchors[anchors.length - 1];
      for (const a of anchors) {
        if (a.idx <= i && a.idx >= lo.idx) lo = a;
        if (a.idx >= i && a.idx <= hi.idx && a.idx >= lo.idx) {
          hi = a;
          break;
        }
      }
      if (lo.idx === hi.idx) return lo.l;
      return lo.l + ((hi.l - lo.l) * (i - lo.idx)) / (hi.idx - lo.idx);
    };
    list.forEach((name, i) => {
      const isJunction = junctionDraws.some((j) => j.label.toLowerCase() === name.toLowerCase());
      const { p, d } = pointAt(segs, arcOf(i));
      if (isJunction) return; // capsule + label drawn once, below
      const terminal = i === 0 || i === list.length - 1;
      stations += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${terminal ? 20 : 15}" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="${terminal ? 10 : 8}"/>`;
      const horizontal = Math.abs(d[0]) >= Math.abs(d[1]);
      let lx = p[0], ly = p[1], anchor = "middle";
      if (horizontal) {
        // Alternate above/below so crowded runs don't stack labels.
        ly = p[1] > 700 ? p[1] + 62 : i % 2 === 0 ? p[1] - 40 : p[1] + 62;
      } else if (p[0] < 500) {
        lx = p[0] + 42;
        anchor = "start";
        ly = p[1] + 10;
      } else {
        lx = p[0] - 42;
        anchor = "end";
        ly = p[1] + 10;
      }
      labels += `<text data-ig-font="primary" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" font-size="30" font-weight="bold" fill="#212529">${esc(name)}</text>`;
    });
  });

  let junctions = "";
  for (const j of junctionDraws) {
    const [w, h] = j.vertical ? [48, 60] : [60, 48];
    junctions += `<rect x="${j.at[0] - w / 2}" y="${j.at[1] - h / 2}" width="${w}" height="${h}" rx="24" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="9"/>`;
    junctions += `<text data-ig-font="primary" x="${j.labelAt[0]}" y="${j.labelAt[1]}" text-anchor="${j.labelAt[2]}" font-size="30" font-weight="bold" fill="#212529">${esc(j.label)}</text>`;
  }

  let legend = "";
  const legendX = [100, 400, 700];
  v.spines.forEach((_, li) => {
    const x = v.spines.length === 1 ? 400 : legendX[li];
    legend += `<line x1="${x}" y1="${v.legendY}" x2="${x + 70}" y2="${v.legendY}" data-ig-stroke="${v.slots[li]}" stroke="${SLOT_HEX[v.slots[li]]}" stroke-width="16" stroke-linecap="round"/>`;
    legend += `<text data-ig-font="primary" x="${x + 90}" y="${v.legendY + 10}" text-anchor="start" font-size="28" font-weight="bold" fill="#212529">${esc(names[li])}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">\n${tracks}${stations}${junctions}${labels}${legend}\n</svg>`;
}
