"use client";

// Mockup of the document->subway-map summarizer. Four hardcoded lines of
// thought; shared station names become junctions (line 1 x line 3 and
// line 2 x line 3 have fixed crossing points). Click a station for its
// extracted detail.

import { useMemo, useState } from "react";

type Pt = [number, number];
const R = 40;

const LINES = [
  { name: "Market", color: "#0d6efd", spine: [[115, 230], [905, 230]] as Pt[] },
  { name: "Operations", color: "#3be8bd", spine: [[115, 650], [790, 650], [790, 750], [905, 750]] as Pt[] },
  { name: "Strategy", color: "#ffc107", spine: [[560, 70], [560, 450], [660, 450], [660, 930]] as Pt[] },
  { name: "Risks", color: "#f55151", spine: [[115, 450], [460, 450], [460, 850], [905, 850]] as Pt[] },
];

// Crossing points that can host a junction: [lineA, lineB] -> grid point.
const CROSSINGS: { lines: [number, number]; at: Pt; vertical: boolean }[] = [
  { lines: [0, 2], at: [560, 230], vertical: true },
  { lines: [1, 2], at: [660, 650], vertical: true },
];

const DEFAULTS = [
  "Demand shift, Remote work, New segments, Pricing pressure",
  "Hiring freeze, Automation, Vendor costs, Cycle time",
  "Focus markets, New segments, Automation, Platform bet",
  "Churn risk, Debt load, Competition",
];

const DETAILS: Record<string, string> = {
  "Demand shift": "Enterprise demand moved down-market in Q2; SMB now drives 61% of new pipeline (p. 4).",
  "Remote work": "Remote-first buyers renew 1.8x more often than office-based accounts (p. 6).",
  "New segments": "Healthcare and education emerged as unplanned segments, 22% of revenue. Shared focus of Market and Strategy threads (p. 9).",
  "Pricing pressure": "Two competitors cut list prices ~30%; win-rate impact concentrated in deals under $10k (p. 11).",
  "Hiring freeze": "Headcount frozen since March; support backlog doubled (p. 14).",
  Automation: "Ticket auto-triage recovered 60% of the backlog. Named by both Operations and Strategy as the highest-leverage investment (p. 15).",
  "Vendor costs": "Cloud spend grew 41% YoY, outpacing revenue growth (p. 17).",
  "Cycle time": "Release cycle stretched from 2 to 5 weeks after the freeze (p. 18).",
  "Focus markets": "Recommendation: concentrate GTM on two verticals instead of five (p. 21).",
  "Platform bet": "Board approved platform re-architecture; 3-quarter payback projected (p. 24).",
  "Churn risk": "Churn concentrated in accounts without onboarding calls: 4.1x baseline (p. 27).",
  "Debt load": "Deferred maintenance estimated at 30% of engineering capacity (p. 28).",
  Competition: "Two funded entrants launched overlapping products in June (p. 29).",
};

// ---- arc-length parameterisation (rounded polyline) ----
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
    const ang = s.a0 + (dir * rem) / R;
    return { p: [s.c[0] + R * Math.cos(ang), s.c[1] + R * Math.sin(ang)], d: [-Math.sin(ang) * dir, Math.cos(ang) * dir] };
  }
  const last = segs[segs.length - 1] as Extract<Seg, { kind: "line" }>;
  return { p: last.b, d: unit(last.a, last.b) };
}
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

type Station = { name: string; p: Pt; d: Pt; terminal: boolean; junction: boolean; line: number };
type Label = { x: number; y: number; anchor: "start" | "middle" | "end" };

// Approximate bbox of a rendered label (font 27 bold).
function labelBox(l: Label, name: string) {
  const w = name.length * 14.5;
  const x0 = l.anchor === "middle" ? l.x - w / 2 : l.anchor === "start" ? l.x : l.x - w;
  return { x0, x1: x0 + w, y0: l.y - 24, y1: l.y + 6 };
}
function boxesOverlap(a: ReturnType<typeof labelBox>, b: ReturnType<typeof labelBox>) {
  const pad = 4;
  return a.x0 < b.x1 + pad && b.x0 < a.x1 + pad && a.y0 < b.y1 + pad && b.y0 < a.y1 + pad;
}

// Track segments inflated to strips; labels should not sit on the rails.
const OBSTACLES = LINES.flatMap((l) =>
  l.spine.slice(0, -1).map((a, i) => {
    const b = l.spine[i + 1];
    return {
      x0: Math.min(a[0], b[0]) - 14,
      x1: Math.max(a[0], b[0]) + 14,
      y0: Math.min(a[1], b[1]) - 14,
      y1: Math.max(a[1], b[1]) + 14,
    };
  })
);

// Post-layout pass: no label may overlap another label or a track. Any
// offender is stepped through a widening grid of offsets to the nearest
// fully clear spot.
function resolveLabelCollisions(labels: Label[], names: string[]): { labels: Label[]; moved: boolean[] } {
  const out = labels.map((l) => ({ ...l }));
  const offsets: { dx: number; dy: number }[] = [];
  for (let dy = -240; dy <= 240; dy += 20) {
    for (let dx = -240; dx <= 240; dx += 20) {
      if (dx !== 0 || dy !== 0) offsets.push({ dx, dy });
    }
  }
  offsets.sort((a, b) => Math.hypot(a.dx, a.dy) - Math.hypot(b.dx, b.dy));
  const clearOfTracks = (box: ReturnType<typeof labelBox>) =>
    OBSTACLES.every((ob) => !(box.x0 < ob.x1 && ob.x0 < box.x1 && box.y0 < ob.y1 && ob.y0 < box.y1));
  const isClear = (cand: Label, self: number) => {
    const box = labelBox(cand, names[self]);
    if (box.y0 < 30 || box.y1 > 950 || box.x0 < 10 || box.x1 > 990) return false;
    if (!clearOfTracks(box)) return false;
    return out.every((o, k) => k === self || !boxesOverlap(box, labelBox(o, names[k])));
  };
  for (let pass = 0; pass < 6; pass++) {
    let moved = false;
    for (let i = 0; i < out.length; i++) {
      if (isClear(out[i], i)) continue;
      for (const { dx, dy } of offsets) {
        const cand = { ...out[i], x: labels[i].x + dx, y: labels[i].y + dy };
        if (isClear(cand, i)) {
          out[i] = cand;
          moved = true;
          break;
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
  const [texts, setTexts] = useState<string[]>(DEFAULTS);
  const [active, setActive] = useState<Station | null>(null);

  const { stations } = useMemo(() => {
    const lists = texts.map((t) => t.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10));
    const segsPer = LINES.map((l) => buildSegs(l.spine));
    const pins = new Map<number, Map<number, number>>();
    const junctions: { at: Pt; vertical: boolean; name: string }[] = [];
    for (const cr of CROSSINGS) {
      const [la, lb] = cr.lines;
      const shared = lists[la].find((n) => lists[lb].some((m) => m.toLowerCase() === n.toLowerCase()));
      if (!shared) continue;
      for (const li of [la, lb]) {
        const idx = lists[li].findIndex((n) => n.toLowerCase() === shared.toLowerCase());
        if (idx < 0) continue;
        if (!pins.has(li)) pins.set(li, new Map());
        pins.get(li)!.set(idx, lengthAtPoint(segsPer[li], cr.at));
      }
      junctions.push({ at: cr.at, vertical: cr.vertical, name: shared });
    }
    const stations: Station[] = [];
    lists.forEach((list, li) => {
      const segs = segsPer[li];
      const L = totalLen(segs);
      const pinned = pins.get(li) ?? new Map<number, number>();
      const anchors = [
        { idx: 0, l: pinned.get(0) ?? 0 },
        ...[...pinned.entries()].filter(([i]) => i > 0 && i < list.length - 1).map(([idx, l]) => ({ idx, l })),
        { idx: list.length - 1, l: pinned.get(list.length - 1) ?? L },
      ].sort((a, b) => a.idx - b.idx);
      const arcOf = (i: number): number => {
        if (list.length === 1) return L / 2;
        let lo = anchors[0], hi = anchors[anchors.length - 1];
        for (const a of anchors) {
          if (a.idx <= i && a.idx >= lo.idx) lo = a;
          if (a.idx >= i && a.idx >= lo.idx) { hi = a; break; }
        }
        if (lo.idx === hi.idx) return lo.l;
        return lo.l + ((hi.l - lo.l) * (i - lo.idx)) / (hi.idx - lo.idx);
      };
      list.forEach((name, i) => {
        const isJ = junctions.some((j) => j.name.toLowerCase() === name.toLowerCase());
        const { p, d } = pointAt(segs, arcOf(i));
        stations.push({ name, p, d, terminal: i === 0 || i === list.length - 1, junction: isJ, line: li });
      });
    });
    return { stations, junctions };
  }, [texts]);

  const seen = new Set<string>();
  const drawable = stations.filter((s) => {
    if (!s.junction) return true;
    const k = s.name.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const labelFor = (s: Station) => {
    const horizontal = Math.abs(s.d[0]) >= Math.abs(s.d[1]);
    if (s.junction) return { x: s.p[0] - 44, y: s.p[1] - 34, anchor: "end" as const };
    if (horizontal) {
      const x = Math.min(848, Math.max(152, s.p[0]));
      if (s.terminal && s.p[0] > 820) return { x, y: s.p[1] + 54, anchor: "middle" as const };
      if (s.terminal) return { x, y: s.p[1] - 36, anchor: "middle" as const };
      const idx = drawable.filter((o) => o.line === s.line).indexOf(s);
      return { x, y: idx % 2 === 0 ? s.p[1] - 36 : s.p[1] + 54, anchor: "middle" as const };
    }
    const right = s.line === 2 && s.p[0] < 620;
    return { x: s.p[0] + (right ? 38 : -38), y: s.p[1] + 8, anchor: right ? ("start" as const) : ("end" as const) };
  };

  const resolved = resolveLabelCollisions(
    drawable.map((s) => labelFor(s)),
    drawable.map((s) => s.name)
  );
  const finalLabels = resolved.labels;

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <h1 className="h4 fw-bold">Submap</h1>
        <p className="text-secondary small">
          Mockup: a document distilled into lines of thought. Each line is a
          thread, each station a point, shared stations are junctions. Click
          any station.
        </p>
        {LINES.map((l, i) => (
          <div className="mb-3" key={l.name}>
            <label className="form-label fw-bold small mb-1" style={{ color: l.color === "#3be8bd" || l.color === "#ffc107" ? "#212529" : l.color }}>
              <span className="d-inline-block me-2 rounded-pill" style={{ width: 26, height: 10, background: l.color, verticalAlign: "middle" }} />
              {l.name}
            </label>
            <textarea
              className="form-control form-control-sm"
              rows={2}
              value={texts[i]}
              onChange={(e) => setTexts((t) => t.map((v, j) => (j === i ? e.target.value : v)))}
            />
          </div>
        ))}
        <p className="text-secondary" style={{ fontSize: "0.75rem" }}>
          Junctions: a station name appearing in Market &amp; Strategy pins to
          the upper crossing; Operations &amp; Strategy to the lower one.
        </p>
      </div>
      <div className="col-md-8 position-relative">
        <svg viewBox="0 0 1000 1000" style={{ width: "100%", display: "block", background: "#fff", border: "1px solid #dee2e6", borderRadius: 8 }}>
          {LINES.map((l) => (
            <path key={l.name} d={pathD(l.spine)} fill="none" stroke={l.color} strokeWidth="20" strokeLinecap="round" />
          ))}
          {drawable.map((s, i) => {
            const lab = finalLabels[i];
            return (
              <g key={`${s.line}-${i}`} style={{ cursor: "pointer" }} onClick={() => setActive(active?.name === s.name ? null : s)}>
                {s.junction ? (
                  <rect x={s.p[0] - 21} y={s.p[1] - 26} width={42} height={52} rx={21} fill="#fff" stroke="#212529" strokeWidth="8" />
                ) : (
                  <circle cx={s.p[0]} cy={s.p[1]} r={s.terminal ? 17 : 13} fill="#fff" stroke="#212529" strokeWidth={s.terminal ? 9 : 7} />
                )}
                {(() => {
                  if (!resolved.moved[i]) return null;
                  const box = labelBox(lab, s.name);
                  const cx = (box.x0 + box.x1) / 2;
                  const cy = (box.y0 + box.y1) / 2;
                  if (Math.hypot(cx - s.p[0], cy - s.p[1]) <= 70) return null;
                  // Stop the leader at the label box edge plus a small gap.
                  const G = 7;
                  const dx = cx - s.p[0], dy = cy - s.p[1];
                  const tx = dx !== 0 ? Math.min((box.x0 - G - s.p[0]) / dx, (box.x1 + G - s.p[0]) / dx) : Infinity;
                  const ty = dy !== 0 ? Math.min((box.y0 - G - s.p[1]) / dy, (box.y1 + G - s.p[1]) / dy) : Infinity;
                  const tHit = Math.max(
                    dx !== 0 ? Math.max((box.x0 - G - s.p[0]) / dx, (box.x1 + G - s.p[0]) / dx) * 0 + tx : 0,
                    dy !== 0 ? ty : 0
                  );
                  const t = Math.max(0.1, Math.min(1, tHit));
                  return (
                    <line x1={s.p[0]} y1={s.p[1]} x2={s.p[0] + dx * t} y2={s.p[1] + dy * t} stroke="#adb5bd" strokeWidth="3" />
                  );
                })()}
                <text x={lab.x} y={lab.y} textAnchor={lab.anchor} fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="27" fontWeight="bold" fill="#212529">
                  {s.name}
                </text>
              </g>
            );
          })}
          {LINES.map((l, i) => (
            <g key={l.name}>
              <line x1={70 + i * 230} y1={975} x2={120 + i * 230} y2={975} stroke={l.color} strokeWidth="12" strokeLinecap="round" />
              <text x={132 + i * 230} y={983} fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#212529">
                {l.name}
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
              <div className="small text-secondary mt-1">
                {DETAILS[active.name] ?? `Extracted point "${active.name}" — supporting detail and source citation would appear here.`}
              </div>
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
