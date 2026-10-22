import { P, S, T, Q, A, slot, txt, circ, ring, badge, chip, rect, poly, stroke, line, polar, num, arcD, arrowHead, itemFields, KEYS } from "../lib.mjs";

const anchorFor = (dx) => (dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle");

export const families = [];

// ---- Serpentine: numbered nodes on an S-shaped path, 3 per row ----
families.push({
  family: "serpentine", title: "Serpentine Path", category: "Process", counts: [5, 6, 8], unit: "steps",
  description: (n) => `${n} numbered steps snaking left-to-right, then back.`,
  familyDescription: "Numbered steps (user-defined) on a snaking path that turns back at the end of each row.",
  about: "The serpentine path lays a long sequence out in rows that read like a paragraph: left to right, turn, right to left. Use it for onboarding flows, curricula, or any process with more steps than fit on a single line.",
  draw(n) {
    const xs = [220, 500, 780], dy = 240, y0 = 170;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const row = Math.floor(i / 3), col = i % 3;
      const x = row % 2 === 0 ? xs[col] : xs[2 - col];
      pts.push([x, y0 + row * dy]);
    }
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < n; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
      if (ay === by) d += ` L${bx} ${by}`;
      else d += ` A${dy / 2} ${dy / 2} 0 0 ${ax > 500 ? 1 : 0} ${bx} ${by}`;
    }
    let body = stroke(d, A, 16);
    pts.forEach(([x, y], i) => { body += badge(x, y, 46, slot(i), i + 1, 40) + txt(KEYS[i], x, y + 92, 28, { def: this.defaults[i] }); });
    return { body, ...itemFields(n, "Step", "step", this.defaults) };
  },
  defaults: ["Discover", "Define", "Design", "Build", "Test", "Launch", "Measure", "Improve"],
});

// ---- Zigzag timeline ----
families.push({
  family: "zigzag", title: "Zigzag Timeline", category: "Timeline", counts: [4, 5, 6], unit: "milestones",
  description: (n) => `${n} milestones on a zigzag line, labels alternating above and below.`,
  familyDescription: "Milestones (user-defined) on a sharp zigzag line, labels alternating above and below.",
  about: "A zigzag timeline gives every milestone its own peak or valley, so labels never crowd. Use it for project histories, release trains, or any sequence where alternating emphasis helps the eye.",
  draw(n) {
    const x0 = 110, x1 = 890, yTop = 380, yBot = 620;
    const pts = [];
    for (let i = 0; i < n; i++) pts.push([x0 + ((x1 - x0) * i) / (n - 1), i % 2 === 0 ? yTop : yBot]);
    let body = stroke(pts.map(([x, y], i) => `${i ? "L" : "M"}${num(x)} ${num(y)}`).join(" "), A, 12);
    pts.forEach(([x, y], i) => {
      const up = i % 2 === 0;
      body += badge(x, y, 40, slot(i), i + 1, 34) + txt(KEYS[i], x, up ? y - 70 : y + 95, 28, { def: this.defaults[i] });
    });
    return { body, ...itemFields(n, "Milestone", "milestone", this.defaults) };
  },
  defaults: ["Founded", "First hire", "Seed round", "Product launch", "Series A", "Expansion"],
});

// ---- Arch timeline ----
families.push({
  family: "arch", title: "Arch Timeline", category: "Timeline", counts: [3, 4, 5], unit: "milestones",
  description: (n) => `${n} milestones along a semicircular arch with a center theme.`,
  familyDescription: "Milestones (user-defined) along a rainbow arch with a theme beneath it.",
  about: "The arch timeline bends a sequence into a rainbow so the beginning and end sit on the same baseline. Use it for journeys that return to a starting point, program phases, or a year in review with the theme underneath.",
  draw(n) {
    const cx = 500, cy = 640, r = 360;
    let body = stroke(arcD(cx, cy, r, 180, 360), A, 18);
    for (let i = 0; i < n; i++) {
      const a = 180 + (180 * i) / (n - 1);
      const [x, y] = polar(cx, cy, r, a);
      const [lx, ly] = polar(cx, cy, r + 85, a);
      const dx = Math.cos((a * Math.PI) / 180);
      body += badge(x, y, 42, slot(i), i + 1, 36) + txt(KEYS[i], lx, ly + 10, 28, { def: this.defaults[i], anchor: anchorFor(dx) });
    }
    body += txt("other1", cx, cy - 20, 44, { def: "Our Journey" });
    const f = itemFields(n, "Milestone", "milestone", this.defaults);
    f.usage.other1 = "center theme"; f.labels.other1 = "Theme"; f.fieldDefaults.other1 = "Our Journey";
    return { body, ...f };
  },
  defaults: ["Start", "Learn", "Grow", "Lead", "Give back"],
});

// ---- Wave timeline ----
families.push({
  family: "wave", title: "Wave Timeline", category: "Timeline", counts: [4, 5, 6], unit: "milestones",
  description: (n) => `${n} milestones riding the crests and troughs of a wave.`,
  familyDescription: "Milestones (user-defined) on the crests and troughs of a smooth wave.",
  about: "The wave timeline puts highs on crests and lows in troughs, making the rhythm of a story visible. Use it for company histories with ups and downs, product cycles, or seasonal plans.",
  draw(n) {
    const x0 = 100, x1 = 900, yc = 500, amp = 130;
    const pts = [];
    for (let i = 0; i < n; i++) pts.push([x0 + ((x1 - x0) * i) / (n - 1), yc + (i % 2 === 0 ? -amp : amp)]);
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < n; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
      const k = (bx - ax) * 0.5;
      d += ` C${num(ax + k)} ${ay} ${num(bx - k)} ${by} ${num(bx)} ${by}`;
    }
    let body = stroke(d, P, 20);
    pts.forEach(([x, y], i) => {
      const up = i % 2 === 0;
      body += ring(x, y, 30, slot(i), 14) + txt(KEYS[i], x, up ? y - 62 : y + 86, 28, { def: this.defaults[i] });
    });
    return { body, ...itemFields(n, "Milestone", "milestone", this.defaults) };
  },
  defaults: ["Launch", "Dip", "Recovery", "Peak", "Plateau", "Next wave"],
});

// ---- Spiral ----
families.push({
  family: "spiral", title: "Spiral Path", category: "Process", counts: [4, 5, 6], unit: "stages",
  description: (n) => `${n} stages spiraling outward from a core.`,
  familyDescription: "Stages (user-defined) spiraling outward from a central core.",
  about: "A spiral shows growth that circles back over the same ground at a larger scale. Use it for iterative development, learning loops, or expansion stages where each turn builds on the last.",
  draw(n) {
    const cx = 500, cy = 500, r0 = 100, pitch = 68;
    const rAt = (deg) => r0 + (pitch * deg) / 90;
    const maxDeg = 90 * (n - 1);
    let d = "";
    for (let a = 0; a <= maxDeg; a += 4) {
      const [x, y] = polar(cx, cy, rAt(a), a);
      d += `${a === 0 ? "M" : "L"}${num(x)} ${num(y)} `;
    }
    let body = stroke(d, A, 14);
    for (let i = 0; i < n; i++) {
      const a = 90 * i, r = rAt(a);
      const [x, y] = polar(cx, cy, r, a);
      const [lx, ly] = polar(cx, cy, r + 72, a);
      const dx = Math.cos((a * Math.PI) / 180);
      body += badge(x, y, 38, slot(i), i + 1, 32) + txt(KEYS[i], lx, ly + 10, 28, { def: this.defaults[i], anchor: anchorFor(dx) });
    }
    return { body, ...itemFields(n, "Stage", "stage", this.defaults) };
  },
  defaults: ["Idea", "Prototype", "Pilot", "Scale", "Optimize", "Expand"],
});

// ---- Horseshoe ----
families.push({
  family: "horseshoe", title: "Horseshoe Path", category: "Process", counts: [4, 5, 6], unit: "steps",
  description: (n) => `${n} steps down one side, around the bend and up the other.`,
  familyDescription: "Steps (user-defined) running down one leg, around a U-bend and up the other leg.",
  about: "The horseshoe path descends, turns, and climbs back, so the first and last steps face each other across the top. Use it for processes that end where they began, before-and-after transformations, or customer journeys that loop to renewal.",
  draw(n) {
    const xl = 220, xr = 780, yTop = 140, yBend = 600, R = (xr - xl) / 2, cx = 500;
    const legLen = yBend - yTop, arcLen = Math.PI * R, total = 2 * legLen + arcLen;
    let body = stroke(`M${xl} ${yTop} V${yBend} A${R} ${R} 0 0 0 ${xr} ${yBend} V${yTop + 90}`, A, 16) + arrowHead(xr, yTop + 46, -90, 46, A);
    for (let i = 0; i < n; i++) {
      const s = (total * i) / (n - 1);
      let x, y, lx, ly, anchor;
      if (s <= legLen) { x = xl; y = yTop + s; lx = x + 70; ly = y + 10; anchor = "start"; }
      else if (s <= legLen + arcLen) {
        const a = 180 - (180 * (s - legLen)) / arcLen;
        [x, y] = polar(cx, yBend, R, a); [lx, ly] = polar(cx, yBend, R + 78, a); ly += 10;
        anchor = anchorFor(Math.cos((a * Math.PI) / 180));
      } else { x = xr; y = yBend - (s - legLen - arcLen); lx = x - 70; ly = y + 10; anchor = "end"; }
      body += badge(x, y, 40, slot(i), i + 1, 34) + txt(KEYS[i], lx, ly, 28, { def: this.defaults[i], anchor });
    }
    return { body, ...itemFields(n, "Step", "step", this.defaults) };
  },
  defaults: ["Awareness", "Interest", "Trial", "Purchase", "Loyalty", "Advocacy"],
});

// ---- Infinity loop ----
families.push({
  family: "infinity", title: "Infinity Loop", category: "Cycle", counts: [4, 6, 8], unit: "stages",
  description: (n) => `${n} stages on a continuous figure-eight loop.`,
  familyDescription: "Stages (user-defined) on a continuous figure-eight loop with two colored lobes.",
  about: "The infinity loop joins two cycles into one endless flow, the shape behind DevOps and plan-do-check-act. Use it for dual loops like build and run, learn and apply, or supply and demand.",
  draw(n) {
    const cx = 500, cy = 500, a = 430;
    const pt = (t) => { const s = Math.sin(t), c = Math.cos(t), k = 1 + s * s; return [cx + (a * c) / k, cy + (a * s * c) / k]; };
    const seg = (t0, t1) => { let d = ""; for (let t = t0; t <= t1 + 1e-9; t += 0.03) { const [x, y] = pt(Math.min(t, t1)); d += `${d ? "L" : "M"}${num(x)} ${num(y)} `; } return d; };
    let body = stroke(seg(Math.PI / 2, (3 * Math.PI) / 2), P, 22) + stroke(seg(-Math.PI / 2, Math.PI / 2), S, 22);
    const k = n / 2, m = 0.55;
    const ts = [];
    for (let j = 0; j < k; j++) ts.push(Math.PI / 2 + m + ((Math.PI - 2 * m) * (j + 0.5)) / k);
    for (let j = 0; j < k; j++) ts.push(-Math.PI / 2 + m + ((Math.PI - 2 * m) * (j + 0.5)) / k);
    for (let i = 0; i < n; i++) {
      const t = ts[i];
      const [x, y] = pt(t);
      const lobe = Math.cos(t) < 0 ? cx - 215 : cx + 215;
      let dx = x - lobe, dy = y - cy; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
      body += ring(x, y, 28, slot(i), 12) + txt(KEYS[i], x + dx * 82, y + dy * 82 + 10, 28, { def: this.defaults[i], anchor: anchorFor(dx) });
    }
    return { body, ...itemFields(n, "Stage", "stage", this.defaults) };
  },
  defaults: ["Plan", "Code", "Build", "Test", "Release", "Deploy", "Operate", "Monitor"],
});

// ---- Racetrack ----
families.push({
  family: "racetrack", title: "Racetrack", category: "Cycle", counts: [4, 5, 6], unit: "laps",
  description: (n) => `${n} checkpoints around an oval track.`,
  familyDescription: "Checkpoints (user-defined) around an oval racetrack with a center title.",
  about: "The racetrack frames a repeating season or sprint as laps around an oval. Use it for quarterly cycles, training programs, or competitive roadmaps where the center names the prize.",
  draw(n) {
    const xl = 300, xr = 700, yc = 500, R = 230, cy = yc;
    const d = `M${xl} ${cy - R} H${xr} A${R} ${R} 0 0 1 ${xr} ${cy + R} H${xl} A${R} ${R} 0 0 1 ${xl} ${cy - R} Z`;
    let body = stroke(d, A, 64) + stroke(d, P, 4, { dash: "22 18", extra: `stroke-opacity="0.9"` }).replace(`stroke="#0d6efd"`, `stroke="#ffffff"`).replace(`data-ig-stroke="primary" `, "");
    const straight = xr - xl, arc = Math.PI * R, total = 2 * straight + 2 * arc;
    for (let i = 0; i < n; i++) {
      const s = (total * i) / n;
      let x, y, lx, ly, anchor = "middle";
      if (s < straight) { x = xl + s; y = cy - R; lx = x; ly = y - 60; }
      else if (s < straight + arc) { const a = -90 + (180 * (s - straight)) / arc; [x, y] = polar(xr, cy, R, a); [lx, ly] = polar(xr, cy, R + 85, a); ly += 10; anchor = anchorFor(Math.cos((a * Math.PI) / 180)); }
      else if (s < 2 * straight + arc) { x = xr - (s - straight - arc); y = cy + R; lx = x; ly = y + 92; }
      else { const a = 90 + (180 * (s - 2 * straight - arc)) / arc; [x, y] = polar(xl, cy, R, a); [lx, ly] = polar(xl, cy, R + 85, a); ly += 10; anchor = anchorFor(Math.cos((a * Math.PI) / 180)); }
      body += badge(x, y, 36, slot(i), i + 1, 30) + txt(KEYS[i], lx, ly, 28, { def: this.defaults[i], anchor });
    }
    body += txt("other1", 500, cy + 14, 42, { def: "Season" });
    const f = itemFields(n, "Checkpoint", "checkpoint", this.defaults);
    f.usage.other1 = "center title"; f.labels.other1 = "Center"; f.fieldDefaults.other1 = "Season";
    return { body, ...f };
  },
  defaults: ["Kickoff", "Sprint", "Review", "Retro", "Release", "Celebrate"],
});

// ---- Stepping stones ----
families.push({
  family: "stepping-stones", title: "Stepping Stones", category: "Process", counts: [4, 5, 6], unit: "stones",
  description: (n) => `${n} stones crossing from bottom-left to top-right.`,
  familyDescription: "Stones (user-defined) crossing diagonally from the bottom-left to the top-right.",
  about: "Stepping stones make progress feel deliberate: each stone is a safe place to stand before the next. Use it for phased plans, risk-managed rollouts, or skill progressions.",
  draw(n) {
    const pts = [];
    for (let i = 0; i < n; i++) pts.push([i % 2 ? 640 : 360, 860 - ((860 - 140) * i) / (n - 1)]);
    let body = stroke(pts.map(([x, y], i) => `${i ? "L" : "M"}${num(x)} ${num(y)}`).join(" "), A, 6, { dash: "2 22" });
    pts.forEach(([x, y], i) => {
      const rot = i % 2 ? -10 : 10;
      body += `<g transform="rotate(${rot} ${num(x)} ${num(y)})"><ellipse data-ig-fill="${slot(i)}" cx="${num(x)}" cy="${num(y)}" rx="160" ry="68"/><ellipse cx="${num(x)}" cy="${num(y - 9)}" rx="142" ry="50" fill="#ffffff" fill-opacity="0.16"/></g>`;
      body += txt(KEYS[i], x, y + 10, 27, { contrast: slot(i), def: this.defaults[i] });
      body += badge(x - 150, y - 50, 24, A, i + 1, 24);
    });
    return { body, ...itemFields(n, "Stone", "stone", this.defaults) };
  },
  defaults: ["Assess", "Plan", "Pilot", "Rollout", "Embed", "Review"],
});

// ---- Ladder ----
families.push({
  family: "ladder", title: "Ladder", category: "Hierarchy", counts: [3, 4, 5], unit: "rungs",
  description: (n) => `${n} labeled rungs climbing toward a goal.`,
  familyDescription: "Labeled rungs (user-defined) on a ladder climbing toward a goal at the top.",
  about: "The ladder is the plainest picture of progression: every rung is a level, and the goal waits at the top. Use it for career ladders, maturity levels, or capability tiers.",
  draw(n) {
    const xl = 290, xr = 710, yTop = 170, yBot = 900;
    let body = line(xl, yTop, xl, yBot, A, 26) + line(xr, yTop, xr, yBot, A, 26);
    for (let i = 0; i < n; i++) {
      const y = yBot - 70 - ((yBot - yTop - 140) * i) / (n - 1);
      body += chip(500, y, xr - xl - 40, 68, slot(i), KEYS[i], this.defaults[i], 28) + badge(xl, y, 26, A, i + 1, 24);
    }
    body += txt("other1", 500, yTop - 40, 42, { def: "Goal" });
    const f = itemFields(n, "Rung", "rung", this.defaults);
    f.usage.other1 = "goal above ladder"; f.labels.other1 = "Goal"; f.fieldDefaults.other1 = "Goal";
    return { body, ...f };
  },
  defaults: ["Junior", "Mid-level", "Senior", "Lead", "Principal"],
});
