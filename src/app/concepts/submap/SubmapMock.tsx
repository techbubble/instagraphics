"use client";

// Document->subway-map mockup. The analysis (see subwaymap.md) returns both
// content and geometry: lines with octilinear paths (H/V/45), stations with
// grid coordinates, optional single loop line, junction stations shared
// between lines. The renderer scales, rounds corners, snaps stations to
// their paths, and resolves label collisions. Click a station for detail.

import { useMemo, useState } from "react";

type Pt = [number, number];
type MapStation = { label: string; detail: string; at: Pt };
type MapLine = { name: string; loop: boolean; path: Pt[]; stations: MapStation[] };

const COLORS = ["#0d6efd", "#3be8bd", "#f55151", "#ffc107", "#6f42c1", "#fd7e14"];

// Handcrafted Genesis demo in the analysis schema: veering lines, one loop
// (the Garden), junctions at Image of God / Eve created / Banished.
const DEFAULT_MAP: MapLine[] = [
  {
    name: "Creation",
    loop: false,
    path: [[5, 8], [30, 8], [42, 20], [90, 20]],
    stations: [
      { label: "Let there be light", detail: "“And God said, Let there be light: and there was light.” (Genesis 1:3)", at: [5, 8] },
      { label: "Waters divided", detail: "“God made the firmament, and divided the waters... and God called the firmament Heaven.” (1:7–8)", at: [17, 8] },
      { label: "Living creatures", detail: "“Let the waters bring forth abundantly the moving creature that hath life.” (1:20)", at: [27, 8] },
      { label: "Image of God", detail: "“So God created man in his own image... male and female created he them.” (1:27) The sixth day of creation and the start of the human thread.", at: [44, 20] },
      { label: "Day of rest", detail: "“And he rested on the seventh day... and God blessed the seventh day, and sanctified it.” (2:2–3)", at: [90, 20] },
    ],
  },
  {
    name: "The Garden",
    loop: true,
    path: [[18, 50], [28, 40], [48, 40], [58, 50], [48, 60], [28, 60]],
    stations: [
      { label: "Eden planted", detail: "“The LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.” (2:8)", at: [18, 50] },
      { label: "Eve created", detail: "“The rib, which the LORD God had taken from man, made he a woman.” (2:22) The garden circuit meets the human thread here.", at: [38, 40] },
      { label: "Tree of knowledge", detail: "“But of the tree of the knowledge of good and evil, thou shalt not eat of it.” (2:17)", at: [48, 40] },
      { label: "Four rivers", detail: "“A river went out of Eden to water the garden; and from thence it was parted, and became into four heads.” (2:10)", at: [58, 50] },
      { label: "Not ashamed", detail: "“They were both naked, the man and his wife, and were not ashamed.” (2:25)", at: [38, 60] },
    ],
  },
  {
    name: "The Fall",
    loop: false,
    path: [[12, 92], [30, 74], [62, 74], [76, 88], [92, 88]],
    stations: [
      { label: "Serpent's question", detail: "“Now the serpent was more subtil than any beast... Yea, hath God said, Ye shall not eat of every tree of the garden?” (3:1)", at: [12, 92] },
      { label: "Forbidden fruit", detail: "“She took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.” (3:6)", at: [24, 80] },
      { label: "Eyes opened", detail: "“And the eyes of them both were opened, and they knew that they were naked.” (3:7)", at: [40, 74] },
      { label: "Banished", detail: "“Therefore the LORD God sent him forth from the garden of Eden.” (3:23) The fall and the human thread leave the garden together.", at: [59, 74] },
      { label: "Flaming sword", detail: "“He placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way.” (3:24)", at: [92, 88] },
    ],
  },
  {
    name: "Mankind",
    loop: false,
    path: [[50, 2], [50, 14], [38, 26], [38, 40], [55, 57], [55, 70], [70, 85], [70, 98]],
    stations: [
      { label: "Sixth day", detail: "“And the evening and the morning were the sixth day.” (1:31) The human story begins.", at: [50, 2] },
      { label: "Image of God", detail: "“So God created man in his own image... male and female created he them.” (1:27)", at: [44, 20] },
      { label: "Eve created", detail: "“The rib, which the LORD God had taken from man, made he a woman.” (2:22)", at: [38, 40] },
      { label: "Banished", detail: "“Therefore the LORD God sent him forth from the garden of Eden, to till the ground.” (3:23)", at: [59, 74] },
      { label: "East of Eden", detail: "“So he drove out the man” — mankind's road continues east of Eden. (3:24)", at: [70, 98] },
    ],
  },
];

const SCALE = (v: number) => 80 + v * 8.4;

// ---- rounded polyline with arc-length parameterisation ----
type Seg =
  | { kind: "line"; a: Pt; b: Pt; len: number }
  | { kind: "arc"; c: Pt; a0: number; a1: number; r: number; len: number };

function unit(a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
}
function cornered(spine: Pt[], loop: boolean): { pts: Pt[]; closed: boolean } {
  if (!loop || spine.length < 3) return { pts: spine, closed: false };
  // Close the loop by starting/ending at the midpoint of the closing edge.
  const a = spine[spine.length - 1];
  const b = spine[0];
  const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return { pts: [mid, ...spine, mid], closed: true };
}
function buildSegs(rawSpine: Pt[], loop: boolean, r: number): Seg[] {
  const { pts: spine } = cornered(rawSpine, loop);
  const segs: Seg[] = [];
  let cur: Pt = spine[0];
  for (let i = 1; i < spine.length - 1; i++) {
    const v = spine[i];
    const dIn = unit(spine[i - 1], v);
    const dOut = unit(v, spine[i + 1]);
    const rr = Math.min(
      r,
      Math.hypot(v[0] - spine[i - 1][0], v[1] - spine[i - 1][1]) / 2.2,
      Math.hypot(spine[i + 1][0] - v[0], spine[i + 1][1] - v[1]) / 2.2
    );
    const p1: Pt = [v[0] - dIn[0] * rr, v[1] - dIn[1] * rr];
    const p2: Pt = [v[0] + dOut[0] * rr, v[1] + dOut[1] * rr];
    segs.push({ kind: "line", a: cur, b: p1, len: Math.hypot(p1[0] - cur[0], p1[1] - cur[1]) });
    const c: Pt = [p1[0] + dOut[0] * rr, p1[1] + dOut[1] * rr];
    const a0 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
    let a1 = Math.atan2(p2[1] - c[1], p2[0] - c[0]);
    let sweep = a1 - a0;
    if (sweep > Math.PI) sweep -= 2 * Math.PI;
    if (sweep < -Math.PI) sweep += 2 * Math.PI;
    a1 = a0 + sweep;
    segs.push({ kind: "arc", c, a0, a1, r: rr, len: Math.abs(sweep) * rr });
    cur = p2;
  }
  const last = spine[spine.length - 1];
  segs.push({ kind: "line", a: cur, b: last, len: Math.hypot(last[0] - cur[0], last[1] - cur[1]) });
  return segs;
}
const totalLen = (segs: Seg[]) => segs.reduce((s, x) => s + x.len, 0);
function pointAt(segs: Seg[], l: number): { p: Pt; d: Pt } {
  let rem = Math.max(0, Math.min(l, totalLen(segs)));
  for (const s of segs) {
    if (rem > s.len) { rem -= s.len; continue; }
    if (s.kind === "line") {
      const u = s.len === 0 ? 0 : rem / s.len;
      const d = unit(s.a, s.b);
      return { p: [s.a[0] + (s.b[0] - s.a[0]) * u, s.a[1] + (s.b[1] - s.a[1]) * u], d };
    }
    const dir = s.a1 > s.a0 ? 1 : -1;
    const ang = s.a0 + (dir * rem) / s.r;
    return { p: [s.c[0] + s.r * Math.cos(ang), s.c[1] + s.r * Math.sin(ang)], d: [-Math.sin(ang) * dir, Math.cos(ang) * dir] };
  }
  const last = segs[segs.length - 1] as Extract<Seg, { kind: "line" }>;
  return { p: last.b, d: unit(last.a, last.b) };
}
// Nearest arc position to an arbitrary point (stations may be slightly off).
function snapToPath(segs: Seg[], pt: Pt): number {
  const L = totalLen(segs);
  let best = 0, bestD = Infinity;
  const step = 4;
  for (let l = 0; l <= L; l += step) {
    const { p } = pointAt(segs, l);
    const d = Math.hypot(p[0] - pt[0], p[1] - pt[1]);
    if (d < bestD) { bestD = d; best = l; }
  }
  return best;
}
function pathD(rawSpine: Pt[], loop: boolean, r: number): string {
  const { pts: spine } = cornered(rawSpine, loop);
  let d = `M${spine[0][0].toFixed(1)} ${spine[0][1].toFixed(1)}`;
  for (let i = 1; i < spine.length - 1; i++) {
    const v = spine[i];
    const dIn = unit(spine[i - 1], v);
    const dOut = unit(v, spine[i + 1]);
    const rr = Math.min(
      r,
      Math.hypot(v[0] - spine[i - 1][0], v[1] - spine[i - 1][1]) / 2.2,
      Math.hypot(spine[i + 1][0] - v[0], spine[i + 1][1] - v[1]) / 2.2
    );
    d += ` L${(v[0] - dIn[0] * rr).toFixed(1)} ${(v[1] - dIn[1] * rr).toFixed(1)} Q${v[0].toFixed(1)} ${v[1].toFixed(1)} ${(v[0] + dOut[0] * rr).toFixed(1)} ${(v[1] + dOut[1] * rr).toFixed(1)}`;
  }
  const last = spine[spine.length - 1];
  d += ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

type Station = { name: string; detail: string; p: Pt; d: Pt; terminal: boolean; junction: boolean; line: number };
type Label = { x: number; y: number; anchor: "start" | "middle" | "end" };

function labelBox(l: Label, name: string) {
  const w = name.length * 14.5;
  const x0 = l.anchor === "middle" ? l.x - w / 2 : l.anchor === "start" ? l.x : l.x - w;
  return { x0, x1: x0 + w, y0: l.y - 24, y1: l.y + 6 };
}
function boxesOverlap(a: ReturnType<typeof labelBox>, b: ReturnType<typeof labelBox>) {
  const pad = 4;
  return a.x0 < b.x1 + pad && b.x0 < a.x1 + pad && a.y0 < b.y1 + pad && b.y0 < a.y1 + pad;
}

// No label may overlap another label or a track; offenders step through a
// widening grid (with anchor flips); junction labels stay near the capsule.
function resolveLabelCollisions(
  labels: Label[],
  names: string[],
  junction: boolean[],
  obstacles: { x0: number; x1: number; y0: number; y1: number }[]
): { labels: Label[]; moved: boolean[] } {
  const out = labels.map((l) => ({ ...l }));
  const offsets: { dx: number; dy: number }[] = [];
  for (let dy = -240; dy <= 240; dy += 20) {
    for (let dx = -240; dx <= 240; dx += 20) {
      if (dx !== 0 || dy !== 0) offsets.push({ dx, dy });
    }
  }
  offsets.sort((a, b) => Math.hypot(a.dx, a.dy) - Math.hypot(b.dx, b.dy));
  const clearOfTracks = (box: ReturnType<typeof labelBox>) =>
    obstacles.every((ob) => !(box.x0 < ob.x1 && ob.x0 < box.x1 && box.y0 < ob.y1 && ob.y0 < box.y1));
  const isClear = (cand: Label, self: number) => {
    const box = labelBox(cand, names[self]);
    if (box.y0 < 20 || box.y1 > 945 || box.x0 < 8 || box.x1 > 992) return false;
    if (!clearOfTracks(box)) return false;
    return out.every((o, k) => k === self || !boxesOverlap(box, labelBox(o, names[k])));
  };
  for (let pass = 0; pass < 6; pass++) {
    let moved = false;
    for (let i = 0; i < out.length; i++) {
      if (isClear(out[i], i)) continue;
      const anchors: Label["anchor"][] = [labels[i].anchor, "middle", "start", "end"];
      outer: for (const { dx, dy } of offsets) {
        if (junction[i] && Math.hypot(dx, dy) > 110) break;
        for (const anchor of anchors) {
          const cand = { ...out[i], x: labels[i].x + dx, y: labels[i].y + dy, anchor };
          if (isClear(cand, i)) {
            out[i] = cand;
            moved = true;
            break outer;
          }
        }
      }
    }
    if (!moved) break;
  }
  return {
    labels: out,
    moved: out.map((l, i) => Math.abs(l.x - labels[i].x) > 1 || Math.abs(l.y - labels[i].y) > 1),
  };
}

export default function SubmapMock() {
  const [map, setMap] = useState<MapLine[]>(DEFAULT_MAP);
  const [active, setActive] = useState<Station | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function analyzeFile(file: File) {
    setBusy(true);
    setUploadError(null);
    setActive(null);
    try {
      const payload: { text?: string; pdfBase64?: string } = {};
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        const buf = await file.arrayBuffer();
        let bin = "";
        const bytes = new Uint8Array(buf);
        for (let i = 0; i < bytes.length; i += 0x8000) {
          bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
        }
        payload.pdfBase64 = btoa(bin);
      } else {
        payload.text = await file.text();
      }
      const res = await fetch("/api/submap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Analysis failed.");
      const lines = data.lines as MapLine[];
      if (!Array.isArray(lines) || lines.length < 2) throw new Error("Unexpected analysis shape.");
      // Only one loop allowed; demote extras.
      let loopSeen = false;
      for (const l of lines) {
        if (l.loop && loopSeen) l.loop = false;
        if (l.loop) loopSeen = true;
      }
      setMap(lines.slice(0, 6));
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      setBusy(false);
    }
  }

  const { stations, obstacles, spinesD, colors } = useMemo(() => {
    const colors = map.map((_, i) => COLORS[i % COLORS.length]);
    const scaled = map.map((l) => l.path.map(([x, y]) => [SCALE(x), SCALE(y)] as Pt));
    const segsPer = map.map((l, i) => buildSegs(scaled[i], l.loop, 40));
    // Junction labels: identical label on 2+ lines.
    const count = new Map<string, number>();
    for (const l of map) for (const st of l.stations) {
      const k = st.label.toLowerCase();
      count.set(k, (count.get(k) ?? 0) + 1);
    }
    const stations: Station[] = [];
    map.forEach((l, li) => {
      l.stations.forEach((st, i) => {
        const target: Pt = [SCALE(st.at[0]), SCALE(st.at[1])];
        const { p, d } = pointAt(segsPer[li], snapToPath(segsPer[li], target));
        stations.push({
          name: st.label,
          detail: st.detail,
          p,
          d,
          terminal: !l.loop && (i === 0 || i === l.stations.length - 1),
          junction: (count.get(st.label.toLowerCase()) ?? 0) > 1,
          line: li,
        });
      });
    });
    // Obstacles: subdivide every straight run into short chunks so diagonal
    // segments don't blanket huge rectangles.
    const obstacles: { x0: number; x1: number; y0: number; y1: number }[] = [];
    segsPer.forEach((segs) => {
      const L = totalLen(segs);
      for (let l = 0; l < L; l += 40) {
        const { p } = pointAt(segs, l);
        obstacles.push({ x0: p[0] - 16, x1: p[0] + 16, y0: p[1] - 16, y1: p[1] + 16 });
      }
    });
    const spinesD = map.map((l, i) => pathD(scaled[i], l.loop, 40));
    return { stations, obstacles, spinesD, colors };
  }, [map]);

  const seen = new Set<string>();
  const drawable = stations.filter((s) => {
    if (!s.junction) return true;
    const k = s.name.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const labelFor = (s: Station): Label => {
    if (s.junction) return { x: s.p[0] - 44, y: s.p[1] - 34, anchor: "end" };
    const horizontal = Math.abs(s.d[0]) >= Math.abs(s.d[1]);
    if (horizontal) {
      const x = Math.min(848, Math.max(152, s.p[0]));
      const idx = drawable.filter((o) => o.line === s.line).indexOf(s);
      return { x, y: idx % 2 === 0 ? s.p[1] - 36 : s.p[1] + 54, anchor: "middle" };
    }
    const right = s.p[0] < 500;
    return { x: s.p[0] + (right ? 38 : -38), y: s.p[1] + 8, anchor: right ? "start" : "end" };
  };

  const resolved = resolveLabelCollisions(
    drawable.map((s) => labelFor(s)),
    drawable.map((s) => s.name),
    drawable.map((s) => s.junction),
    obstacles
  );
  const finalLabels = resolved.labels;

  const n = map.length;
  const longest = Math.max(...map.map((l) => l.name.length));
  const legendCols = Math.min(n, longest > 10 ? 3 : 4);
  return (
    <div className="row g-4">
      <div className="col-md-4">
        <h1 className="h4 fw-bold">Submap</h1>
        <p className="text-secondary small">
          A document distilled into a subway map: lines are threads of
          thought, stations are points, junctions are shared concepts. The
          analysis designs the geometry too — veering lines, diagonals, at
          most one loop. Click any station for the passage.
        </p>
        <label
          className={`d-block border border-2 rounded text-center py-4 mb-3 ${busy ? "border-primary bg-light" : "border-secondary-subtle"}`}
          style={{ borderStyle: "dashed", cursor: busy ? "wait" : "pointer" }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f && !busy) analyzeFile(f);
          }}
        >
          <input
            type="file"
            className="d-none"
            accept=".txt,.md,.pdf,text/plain,text/markdown,application/pdf"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) analyzeFile(f);
              e.target.value = "";
            }}
          />
          <div className="fw-bold small">{busy ? "Analyzing document..." : "Drop a document here"}</div>
          <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
            {busy ? "Extracting threads and designing the map" : "PDF, TXT or MD — or click to browse"}
          </div>
        </label>
        {uploadError && <div className="alert alert-danger py-2 small">{uploadError}</div>}
        {map.map((l, i) => (
          <div className="d-flex align-items-baseline mb-2" key={i}>
            <span className="d-inline-block me-2 rounded-pill flex-shrink-0" style={{ width: 26, height: 10, background: colors[i] }} />
            <div>
              <span className="fw-bold small">{l.name}</span>
              {l.loop && <span className="text-secondary small"> (loop)</span>}
              <div className="text-secondary" style={{ fontSize: "0.72rem" }}>
                {l.stations.map((st) => st.label).join(" · ")}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-8 position-relative">
        <svg viewBox="0 0 1000 1000" style={{ width: "100%", display: "block", background: "#fff", border: "1px solid #dee2e6", borderRadius: 8 }}>
          {spinesD.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={colors[i]} strokeWidth="20" strokeLinecap="round" />
          ))}
          {drawable.map((s, i) => {
            const lab = finalLabels[i];
            return (
              <g key={`${s.line}-${i}`} style={{ cursor: "pointer" }} onClick={() => setActive(active?.name === s.name ? null : s)}>
                {(() => {
                  if (s.junction || !resolved.moved[i]) return null;
                  const box = labelBox(lab, s.name);
                  const cx = (box.x0 + box.x1) / 2;
                  const cy = (box.y0 + box.y1) / 2;
                  if (Math.hypot(cx - s.p[0], cy - s.p[1]) <= 70) return null;
                  const G = 7;
                  const dx = cx - s.p[0], dy = cy - s.p[1];
                  const tx = dx !== 0 ? Math.min((box.x0 - G - s.p[0]) / dx, (box.x1 + G - s.p[0]) / dx) : Infinity;
                  const ty = dy !== 0 ? Math.min((box.y0 - G - s.p[1]) / dy, (box.y1 + G - s.p[1]) / dy) : Infinity;
                  const t = Math.max(0.1, Math.min(1, Math.max(dx !== 0 ? tx : 0, dy !== 0 ? ty : 0)));
                  return <line x1={s.p[0]} y1={s.p[1]} x2={s.p[0] + dx * t} y2={s.p[1] + dy * t} stroke="#adb5bd" strokeWidth="3" />;
                })()}
                <circle
                  cx={s.p[0]}
                  cy={s.p[1]}
                  r={s.junction ? 23 : s.terminal ? 17 : 13}
                  fill="#fff"
                  stroke="#212529"
                  strokeWidth={s.junction ? 9 : s.terminal ? 9 : 7}
                />
                <text x={lab.x} y={lab.y} textAnchor={lab.anchor} fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="27" fontWeight="bold" fill="#212529">
                  {s.name}
                </text>
              </g>
            );
          })}
          {colors.map((c, i) => (
            <g key={i}>
              <line
                x1={70 + (i % legendCols) * (860 / legendCols)}
                y1={968 + Math.floor(i / legendCols) * 30}
                x2={115 + (i % legendCols) * (860 / legendCols)}
                y2={968 + Math.floor(i / legendCols) * 30}
                stroke={c}
                strokeWidth="12"
                strokeLinecap="round"
              />
              <text
                x={127 + (i % legendCols) * (860 / legendCols)}
                y={976 + Math.floor(i / legendCols) * 30}
                fontFamily="Roboto, Helvetica, Arial, sans-serif"
                fontSize="22"
                fontWeight="bold"
                fill="#212529"
              >
                {map[i].name}
              </text>
            </g>
          ))}
        </svg>
        {active && (
          <div
            className="card shadow position-absolute"
            style={{
              left: `min(max(${active.p[0] / 10}%, 5%), 60%)`,
              top: `${Math.min(active.p[1] / 10, 78)}%`,
              width: "38%",
              zIndex: 10,
            }}
          >
            <div className="card-body py-2 px-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <strong>{active.name}</strong>
                <button type="button" className="btn-close btn-sm" aria-label="Close" onClick={() => setActive(null)} />
              </div>
              <div className="small text-secondary mt-1">{active.detail}</div>
              {active.junction && (
                <div className="small mt-1 fw-bold" style={{ color: "#0d6efd" }}>
                  Interchange: this point connects two threads.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
