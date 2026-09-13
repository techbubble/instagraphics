"use client";

// Mockup of the document->subway-map summarizer. The document is distilled
// into as many lines as it has threads (2-6): every thread but the last is
// a horizontal row; the last is a connector that weaves down through the
// rows and junctions wherever it shares a station name with a row. Click a
// station for its extracted detail. Drop a document to analyze it.

import { useMemo, useState } from "react";

type Pt = [number, number];

const COLORS = ["#0d6efd", "#3be8bd", "#f55151", "#6f42c1", "#fd7e14", "#ffc107"];
const CONNECTOR_COLOR = "#ffc107";

const DEFAULT_NAMES = ["Creation", "The Garden", "The Fall", "Mankind"];
const DEFAULTS = [
  "Let there be light, Waters divided, Living creatures, Image of God, Day of rest",
  "Eden planted, Four rivers, Tree of knowledge, Eve created, Not ashamed",
  "Serpent's question, Forbidden fruit, Eyes opened, Curses spoken, Banished",
  "Image of God, Breath of life, Eve created, Mother of all living, East of Eden",
];

const DETAILS: Record<string, string> = {
  "Let there be light": "“And God said, Let there be light: and there was light.” (Genesis 1:3)",
  "Waters divided": "“God made the firmament, and divided the waters... and God called the firmament Heaven.” (1:7–8)",
  "Living creatures": "“Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth.” (1:20)",
  "Image of God": "“So God created man in his own image... male and female created he them.” (1:27) The sixth day of creation and the first station of the human story.",
  "Day of rest": "“And he rested on the seventh day... and God blessed the seventh day, and sanctified it.” (2:2–3)",
  "Breath of life": "“The LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life.” (2:7)",
  "Eve created": "“The rib, which the LORD God had taken from man, made he a woman.” (2:22) The garden narrative and the human thread meet here.",
  "Mother of all living": "“Adam called his wife's name Eve; because she was the mother of all living.” (3:20)",
  "East of Eden": "“So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword.” (3:24)",
  "Eden planted": "“The LORD God planted a garden eastward in Eden; and there he put the man whom he had formed.” (2:8)",
  "Four rivers": "“A river went out of Eden to water the garden; and from thence it was parted, and became into four heads.” (2:10)",
  "Tree of knowledge": "“But of the tree of the knowledge of good and evil, thou shalt not eat of it.” (2:17)",
  "Not ashamed": "“They were both naked, the man and his wife, and were not ashamed.” (2:25)",
  "Serpent's question": "“Now the serpent was more subtil than any beast... Yea, hath God said, Ye shall not eat of every tree of the garden?” (3:1)",
  "Forbidden fruit": "“She took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.” (3:6)",
  "Eyes opened": "“And the eyes of them both were opened, and they knew that they were naked.” (3:7)",
  "Curses spoken": "“Cursed is the ground for thy sake... In the sweat of thy face shalt thou eat bread.” (3:17–19)",
  Banished: "“Therefore the LORD God sent him forth from the garden of Eden, to till the ground from whence he was taken.” (3:23)",
};

// ---- generative geometry: n-1 horizontal rows + one weaving connector ----
type Geometry = {
  spines: Pt[][];
  colors: string[];
  crossings: { lines: [number, number]; at: Pt }[];
  r: number;
};

function buildGeometry(n: number): Geometry {
  const rows = Math.max(1, n - 1);
  const ys =
    rows === 1 ? [500] : Array.from({ length: rows }, (_, k) => 200 + (k * 560) / (rows - 1));
  const xs = Array.from({ length: rows }, (_, k) => 330 + k * (rows > 4 ? 100 : 120));
  const vgap = rows > 1 ? ys[1] - ys[0] : 400;
  const r = Math.max(18, Math.min(40, Math.floor(vgap / 2) - 12));
  const spines: Pt[][] = [];
  for (let k = 0; k < rows; k++) spines.push([[115, ys[k]], [905, ys[k]]]);
  const conn: Pt[] = [[xs[0], 80]];
  for (let k = 0; k < rows - 1; k++) {
    const mid = (ys[k] + ys[k + 1]) / 2;
    conn.push([xs[k], mid], [xs[k + 1], mid]);
  }
  conn.push([xs[rows - 1], 920]);
  spines.push(conn);
  const colors = Array.from({ length: rows }, (_, k) => COLORS[k % COLORS.length]).map((c) =>
    c === CONNECTOR_COLOR ? "#20c997" : c
  );
  colors.push(CONNECTOR_COLOR);
  return {
    spines,
    colors,
    crossings: Array.from({ length: rows }, (_, k) => ({
      lines: [k, rows] as [number, number],
      at: [xs[k], ys[k]] as Pt,
    })),
    r,
  };
}

// ---- arc-length parameterisation of a rounded polyline ----
type Seg =
  | { kind: "line"; a: Pt; b: Pt; len: number }
  | { kind: "arc"; c: Pt; a0: number; a1: number; r: number; len: number };

function unit(a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const l = Math.hypot(dx, dy);
  return [dx / l, dy / l];
}
function buildSegs(spine: Pt[], r: number): Seg[] {
  const segs: Seg[] = [];
  let cur: Pt = spine[0];
  for (let i = 1; i < spine.length - 1; i++) {
    const v = spine[i];
    const dIn = unit(spine[i - 1], v);
    const dOut = unit(v, spine[i + 1]);
    const p1: Pt = [v[0] - dIn[0] * r, v[1] - dIn[1] * r];
    const p2: Pt = [v[0] + dOut[0] * r, v[1] + dOut[1] * r];
    segs.push({ kind: "line", a: cur, b: p1, len: Math.hypot(p1[0] - cur[0], p1[1] - cur[1]) });
    const c: Pt = [p1[0] + dOut[0] * r, p1[1] + dOut[1] * r];
    const a0 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
    let a1 = Math.atan2(p2[1] - c[1], p2[0] - c[0]);
    let sweep = a1 - a0;
    if (sweep > Math.PI) sweep -= 2 * Math.PI;
    if (sweep < -Math.PI) sweep += 2 * Math.PI;
    a1 = a0 + sweep;
    segs.push({ kind: "arc", c, a0, a1, r, len: Math.abs(sweep) * r });
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
function pathD(spine: Pt[], r: number): string {
  let d = `M${spine[0][0]} ${spine[0][1]}`;
  for (let i = 1; i < spine.length - 1; i++) {
    const v = spine[i];
    const dIn = unit(spine[i - 1], v);
    const dOut = unit(v, spine[i + 1]);
    d += ` L${v[0] - dIn[0] * r} ${v[1] - dIn[1] * r} Q${v[0]} ${v[1]} ${v[0] + dOut[0] * r} ${v[1] + dOut[1] * r}`;
  }
  d += ` L${spine[spine.length - 1][0]} ${spine[spine.length - 1][1]}`;
  return d;
}

type Station = { name: string; p: Pt; d: Pt; terminal: boolean; junction: boolean; line: number };
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

// Post-layout pass: no label may overlap another label or a track. Any
// offender steps through a widening grid (with anchor flips) to the
// nearest fully clear spot; junction labels stay close to their capsule.
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
    if (box.y0 < 30 || box.y1 > 950 || box.x0 < 10 || box.x1 > 990) return false;
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
  const [texts, setTexts] = useState<string[]>(DEFAULTS);
  const [names, setNames] = useState<string[]>(DEFAULT_NAMES);
  const [details, setDetails] = useState<Record<string, string>>(DETAILS);
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
      const lines = data.lines as { name: string; stations: { label: string; detail: string }[] }[];
      if (!Array.isArray(lines) || lines.length < 2) throw new Error("Unexpected analysis shape.");
      const trimmed = lines.slice(0, 6);
      setTexts(trimmed.map((l) => l.stations.map((st) => st.label).join(", ")));
      setNames(trimmed.map((l) => l.name));
      const d: Record<string, string> = {};
      for (const l of trimmed) for (const st of l.stations) d[st.label] = st.detail;
      setDetails(d);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      setBusy(false);
    }
  }

  const n = texts.length;
  const geo = useMemo(() => buildGeometry(n), [n]);

  const { stations, obstacles } = useMemo(() => {
    const lists = texts.map((t) => t.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10));
    const segsPer = geo.spines.map((sp) => buildSegs(sp, geo.r));
    const pins = new Map<number, Map<number, number>>();
    const junctionNames = new Set<string>();
    for (const cr of geo.crossings) {
      const [la, lb] = cr.lines;
      if (!lists[la] || !lists[lb]) continue;
      const shared = lists[la].find((nm) => lists[lb].some((m) => m.toLowerCase() === nm.toLowerCase()));
      if (!shared) continue;
      for (const li of [la, lb]) {
        const idx = lists[li].findIndex((nm) => nm.toLowerCase() === shared.toLowerCase());
        if (idx < 0) continue;
        if (!pins.has(li)) pins.set(li, new Map());
        pins.get(li)!.set(idx, lengthAtPoint(segsPer[li], cr.at));
      }
      junctionNames.add(shared.toLowerCase());
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
        const { p, d } = pointAt(segs, arcOf(i));
        stations.push({
          name,
          p,
          d,
          terminal: i === 0 || i === list.length - 1,
          junction: junctionNames.has(name.toLowerCase()),
          line: li,
        });
      });
    });
    const obstacles = geo.spines.flatMap((sp) =>
      sp.slice(0, -1).map((a, i) => {
        const b = sp[i + 1];
        return {
          x0: Math.min(a[0], b[0]) - 14,
          x1: Math.max(a[0], b[0]) + 14,
          y0: Math.min(a[1], b[1]) - 14,
          y1: Math.max(a[1], b[1]) + 14,
        };
      })
    );
    return { stations, obstacles };
  }, [texts, geo]);

  const seen = new Set<string>();
  const drawable = stations.filter((s) => {
    if (!s.junction) return true;
    const k = s.name.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const labelFor = (s: Station): Label => {
    const horizontal = Math.abs(s.d[0]) >= Math.abs(s.d[1]);
    if (s.junction) return { x: s.p[0] - 44, y: s.p[1] - 34, anchor: "end" };
    if (horizontal) {
      const x = Math.min(848, Math.max(152, s.p[0]));
      if (s.terminal && s.p[0] > 820) return { x, y: s.p[1] + 54, anchor: "middle" };
      if (s.terminal) return { x, y: s.p[1] - 36, anchor: "middle" };
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

  const legendCols = Math.min(n, 4);
  return (
    <div className="row g-4">
      <div className="col-md-4">
        <h1 className="h4 fw-bold">Submap</h1>
        <p className="text-secondary small">
          A document distilled into as many lines as it has threads. Each
          station is a point; shared station names become junctions with the
          connector line (listed last). Click any station for the passage.
        </p>
        <label
          className={`d-block border border-2 rounded text-center py-3 mb-3 ${busy ? "border-primary bg-light" : "border-secondary-subtle"}`}
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
            {busy ? "Extracting lines of thought" : "PDF, TXT or MD — or click to browse"}
          </div>
        </label>
        {uploadError && <div className="alert alert-danger py-2 small">{uploadError}</div>}
        {texts.map((t, i) => (
          <div className="mb-3" key={i}>
            <label className="form-label fw-bold small mb-1">
              <span className="d-inline-block me-2 rounded-pill" style={{ width: 26, height: 10, background: geo.colors[i], verticalAlign: "middle" }} />
              {names[i] ?? `Line ${i + 1}`}
              {i === n - 1 && <span className="text-secondary fw-normal"> (connector)</span>}
            </label>
            <textarea
              className="form-control form-control-sm"
              rows={2}
              value={t}
              onChange={(e) => setTexts((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))}
            />
          </div>
        ))}
        <p className="text-secondary" style={{ fontSize: "0.75rem" }}>
          A station name shared between the connector and another line pins
          to their crossing as a junction.
        </p>
      </div>
      <div className="col-md-8 position-relative">
        <svg viewBox="0 0 1000 1000" style={{ width: "100%", display: "block", background: "#fff", border: "1px solid #dee2e6", borderRadius: 8 }}>
          {geo.spines.map((sp, i) => (
            <path key={i} d={pathD(sp, geo.r)} fill="none" stroke={geo.colors[i]} strokeWidth="20" strokeLinecap="round" />
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
                {s.junction ? (
                  <rect x={s.p[0] - 21} y={s.p[1] - 26} width={42} height={52} rx={21} fill="#fff" stroke="#212529" strokeWidth="8" />
                ) : (
                  <circle cx={s.p[0]} cy={s.p[1]} r={s.terminal ? 17 : 13} fill="#fff" stroke="#212529" strokeWidth={s.terminal ? 9 : 7} />
                )}
                <text x={lab.x} y={lab.y} textAnchor={lab.anchor} fontFamily="Roboto, Helvetica, Arial, sans-serif" fontSize="27" fontWeight="bold" fill="#212529">
                  {s.name}
                </text>
              </g>
            );
          })}
          {geo.colors.map((c, i) => (
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
                {names[i] ?? `Line ${i + 1}`}
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
                {details[active.name] ?? `Extracted point "${active.name}" — supporting detail would appear here.`}
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
