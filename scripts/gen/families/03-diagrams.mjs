import { P, S, T, Q, A, slot, txt, circ, ring, badge, chip, rect, poly, path, stroke, line, shade, light, polar, num, arcD, sectorD, wedgeD, arrowHead, itemFields, KEYS, WHITE, DARK } from "../lib.mjs";

const anchorFor = (dx) => (dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle");
export const families = [];

// ---- Calendar (rendered dynamically by src/lib/calendar.ts; this body is a placeholder) ----
families.push({
  family: "calendar", title: "Calendar Month", category: "Timeline", counts: [3, 4, 5], unit: "dates",
  description: (n) => `A real month grid with ${n} highlighted dates and their labels.`,
  familyDescription: "A real month grid (user-defined month) with highlighted dates and a label for each.",
  about: "The calendar month pins events to actual days instead of an abstract line. Type the month and year, then each date as 'day, label' and the grid lays itself out with the right weekdays. Use it for launch months, campaign schedules, or any plan where the date itself is the message.",
  draw(n) {
    const defs = ["2, Kickoff", "9, Beta", "16, Press day", "23, Launch", "30, Review"];
    const f = itemFields(n, "Date", "day number, label", defs);
    f.usage.other1 = "month and year"; f.labels.other1 = "Month"; f.fieldDefaults.other1 = "March 2027";
    f.fieldOrder = ["other1", ...KEYS.slice(0, n)];
    f.fieldMax = Object.fromEntries(KEYS.slice(0, n).map((k) => [k, 40]));
    return { body: rect(70, 70, 860, 860, A, { rx: 20 }), ...f };
  },
});

// ---- Kanban ----
families.push({
  family: "kanban", title: "Kanban Board", category: "Process", counts: null, items: 5,
  description: "Three columns with cards moving from to-do to done.",
  about: "The kanban board shows work in flight: three columns, cards in each. Use it for status updates, workflow explanations, or a snapshot of where a project stands.",
  draw() {
    const cols = ["other1", "other2", "other3"], colDefs = ["To Do", "In Progress", "Done"];
    const cards = [[0, "item1", "Research"], [0, "item2", "Wireframes"], [1, "item3", "Prototype"], [1, "item4", "User tests"], [2, "item5", "Kickoff"]];
    const x0 = 60, g = 20, w = (880 - 2 * g) / 3, top = 120, h = 560;
    let body = "";
    cols.forEach((k, i) => {
      const x = x0 + i * (w + g);
      body += `<rect x="${x}" y="${top}" width="${num(w)}" height="${h}" rx="18" fill="#f1f3f5"/>` + rect(x, top, w, 70, slot(i), { rx: 18 }) + rect(x, top + 50, w, 20, slot(i)) + txt(k, x + w / 2, top + 46, 30, { contrast: slot(i), def: colDefs[i] });
    });
    const perCol = [0, 0, 0];
    cards.forEach(([c, k, def]) => {
      const x = x0 + c * (w + g) + 16, y = top + 95 + perCol[c] * 150; perCol[c]++;
      body += `<rect x="${x}" y="${y}" width="${num(w - 32)}" height="128" rx="14" fill="#ffffff" stroke="#dee2e6" stroke-width="2"/>` + rect(x, y, 12, 128, slot(c), { rx: 6 }) + txt(k, x + 32, y + 56, 26, { def, anchor: "start" }) + line(x + 32, y + 86, x + w - 90, y + 86, A, 6, { opacity: 0.18 }) + line(x + 32, y + 104, x + w - 140, y + 104, A, 6, { opacity: 0.18 });
    });
    return { body, usage: { item1: "to-do card", item2: "to-do card", item3: "in-progress card", item4: "in-progress card", item5: "done card", other1: "column 1 title", other2: "column 2 title", other3: "column 3 title" }, labels: { item1: "Card 1", item2: "Card 2", item3: "Card 3", item4: "Card 4", item5: "Card 5", other1: "Column 1", other2: "Column 2", other3: "Column 3" }, fieldDefaults: { item1: "Research", item2: "Wireframes", item3: "Prototype", item4: "User tests", item5: "Kickoff", other1: "To Do", other2: "In Progress", other3: "Done" }, fieldOrder: ["other1", "other2", "other3", "item1", "item2", "item3", "item4", "item5"] };
  },
});

// ---- Tournament bracket ----
families.push({
  family: "bracket", title: "Bracket", category: "Comparison", counts: null, items: 4,
  description: "Four contenders, two semifinal winners, one champion.",
  about: "The bracket narrows options the way a tournament does: four in, two through, one out on top. Use it for option shortlists, vendor selection, or playful head-to-head comparisons.",
  draw() {
    const r1 = [150, 350, 650, 850], x1 = 60, w1 = 230, x2 = 400, w2 = 200, x3 = 720, w3 = 220;
    let body = "";
    const bx = (x, y, w, s, k, def, size = 26) => rect(x, y - 36, w, 72, s, { rx: 14 }) + txt(k, x + w / 2, y + 9, size, { contrast: s, def });
    r1.forEach((y, i) => { body += bx(x1, y, w1, slot(i), KEYS[i], this.defaults[i]); });
    const y2 = [250, 750];
    y2.forEach((y, j) => {
      const ya = r1[j * 2], yb = r1[j * 2 + 1];
      body += stroke(`M${x1 + w1} ${ya} H${x2 - 50} V${yb} H${x1 + w1} M${x2 - 50} ${y} H${x2}`, A, 8, { cap: "butt" });
      body += bx(x2, y, w2, A, j ? "other2" : "other1", j ? "Finalist 2" : "Finalist 1");
    });
    body += stroke(`M${x2 + w2} 250 H${x3 - 50} V750 H${x2 + w2} M${x3 - 50} 500 H${x3}`, A, 8, { cap: "butt" });
    body += rect(x3, 500 - 50, w3, 100, T, { rx: 18 }) + txt("other3", x3 + w3 / 2, 511, 30, { contrast: T, def: "Champion" });
    return { body, usage: { item1: "contender 1", item2: "contender 2", item3: "contender 3", item4: "contender 4", other1: "finalist 1", other2: "finalist 2", other3: "champion" }, labels: { item1: "Contender 1", item2: "Contender 2", item3: "Contender 3", item4: "Contender 4", other1: "Finalist 1", other2: "Finalist 2", other3: "Champion" }, fieldDefaults: { item1: "Option A", item2: "Option B", item3: "Option C", item4: "Option D", other1: "Finalist 1", other2: "Finalist 2", other3: "Champion" } };
  },
  defaults: ["Option A", "Option B", "Option C", "Option D"],
});

// ---- Decision tree ----
families.push({
  family: "decision-tree", title: "Decision Tree", category: "Analysis", counts: null, items: 4,
  description: "A question branching into two choices and four outcomes.",
  about: "The decision tree shows how one question splits into choices and outcomes. Use it for triage logic, eligibility rules, or explaining a decision you want others to follow.",
  draw() {
    let body = "";
    const root = [500, 130], mid = [[270, 420], [730, 420]], leaf = [[150, 760], [390, 760], [610, 760], [850, 760]];
    body += stroke(`M${root[0]} ${root[1] + 50} V300 H${mid[0][0]} V${mid[0][1] - 45} M500 300 H${mid[1][0]} V${mid[1][1] - 45}`, A, 8, { cap: "butt" });
    mid.forEach(([mx, my], j) => { body += stroke(`M${mx} ${my + 45} V620 H${leaf[j * 2][0]} V${leaf[j * 2][1] - 45} M${mx} 620 H${leaf[j * 2 + 1][0]} V${leaf[j * 2 + 1][1] - 45}`, A, 8, { cap: "butt" }); });
    body += `<rect x="${500 - 190}" y="${root[1] - 50}" width="380" height="100" rx="50" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="8"/>` + txt("other1", 500, root[1] + 11, 30, { def: "Is it urgent?" });
    body += chip(mid[0][0], mid[0][1], 260, 90, P, "other2", "Yes", 30) + chip(mid[1][0], mid[1][1], 260, 90, S, "other3", "No", 30);
    const lefts = [P, P, S, S];
    leaf.forEach(([x, y], i) => { body += chip(x, y, 220, 90, slot(i), KEYS[i], this.defaults[i], 24); });
    body += txt(null, 365, 290, 22, { def: "yes", fill: "#6c757d", font: "secondary" }) + txt(null, 635, 290, 22, { def: "no", fill: "#6c757d", font: "secondary" });
    return { body, usage: { other1: "root question", other2: "left branch", other3: "right branch", item1: "outcome 1", item2: "outcome 2", item3: "outcome 3", item4: "outcome 4" }, labels: { other1: "Question", other2: "Branch 1", other3: "Branch 2", item1: "Outcome 1", item2: "Outcome 2", item3: "Outcome 3", item4: "Outcome 4" }, fieldDefaults: { other1: "Is it urgent?", other2: "Yes", other3: "No", item1: "Do it now", item2: "Delegate", item3: "Schedule", item4: "Drop it" }, fieldOrder: ["other1", "other2", "other3", "item1", "item2", "item3", "item4"] };
  },
  defaults: ["Do it now", "Delegate", "Schedule", "Drop it"],
});

// ---- Flowchart ----
families.push({
  family: "flowchart", title: "Flowchart", category: "Process", counts: null, items: 5,
  description: "Start, step, decision diamond, two outcomes and an end.",
  about: "The flowchart is the universal language of procedures: a start, a step, a diamond that asks a question, and the paths that follow. Use it for SOPs, support scripts, or approval flows.",
  draw() {
    let body = "";
    const pill = (x, y, k, def, s) => `<rect data-ig-fill="${s}" x="${x - 150}" y="${y - 40}" width="300" height="80" rx="40"/>` + txt(k, x, y + 10, 28, { contrast: s, def });
    const box = (x, y, k, def, s) => rect(x - 160, y - 42, 320, 84, s, { rx: 12 }) + txt(k, x, y + 10, 28, { contrast: s, def });
    const dia = (x, y, k, def, s) => poly([[x, y - 95], [x + 200, y], [x, y + 95], [x - 200, y]], s) + txt(k, x, y + 10, 26, { contrast: s, def });
    const arrow = (d, tipx, tipy, deg) => stroke(d, A, 8, { cap: "butt" }) + arrowHead(tipx, tipy, deg, 26, A);
    body += pill(500, 110, "other1", "Start", A) + arrow(`M500 150 V228`, 500, 250, 90);
    body += box(500, 292, "item1", "Receive request", P) + arrow(`M500 334 V400`, 500, 422, 90);
    body += dia(500, 517, "item2", "Approved?", T);
    body += arrow(`M300 517 H210 V676`, 210, 700, 90) + arrow(`M700 517 H790 V676`, 790, 700, 90);
    body += txt(null, 250, 500, 22, { def: "yes", fill: "#6c757d", font: "secondary" }) + txt(null, 750, 500, 22, { def: "no", fill: "#6c757d", font: "secondary" });
    body += box(210, 742, "item3", "Fulfil", S) + box(790, 742, "item4", "Notify", Q);
    body += stroke(`M210 784 V850 H790 V784`, A, 8, { cap: "butt" }) + arrow(`M500 850 V868`, 500, 884, 90);
    body += pill(500, 924, "other2", "End", A);
    // keep end pill above the arrows
    return { body, usage: { other1: "start", item1: "first step", item2: "decision", item3: "yes outcome", item4: "no outcome", other2: "end" }, labels: { other1: "Start", item1: "Step", item2: "Decision", item3: "Yes path", item4: "No path", other2: "End" }, fieldDefaults: { other1: "Start", item1: "Receive request", item2: "Approved?", item3: "Fulfil", item4: "Notify", other2: "End" }, fieldOrder: ["other1", "item1", "item2", "item3", "item4", "other2"] };
  },
});

// ---- Circuit ----
families.push({
  family: "circuit", title: "Circuit Board", category: "Relationship", counts: [4, 5, 6], unit: "nodes",
  description: (n) => `${n} nodes wired together by right-angled traces.`,
  familyDescription: "Nodes (user-defined) wired together by right-angled circuit traces from a central chip.",
  about: "The circuit board connects a central chip to its components with crisp right-angle traces. Use it for system overviews, platform integrations, or any hub with technical flavor.",
  draw(n) {
    const cx = 500, cy = 500, half = 110;
    let body = "";
    const spots = { 4: [[160, 200], [840, 200], [160, 800], [840, 800]], 5: [[160, 170], [840, 170], [160, 500], [160, 830], [840, 830]], 6: [[160, 170], [840, 170], [160, 500], [840, 500], [160, 830], [840, 830]] }[n];
    spots.forEach(([x, y], i) => {
      const left = x < cx;
      const sx = left ? cx - half : cx + half, sy = cy + (y - cy) * 0.35;
      const midx = left ? x + 140 : x - 140;
      body += stroke(`M${sx} ${num(sy)} H${num(midx + (left ? 60 : -60))} L${num(midx)} ${num(y)} H${num(x)}`, A, 10, { cap: "butt" });
      body += circ(sx, sy, 10, A) + ring(x + (left ? 0 : 0), y, 14, A, 8);
      body += chip(left ? x - 10 : x + 10, y, 240, 72, slot(i), KEYS[i], this.defaults[i], 26);
    });
    body += rect(cx - half, cy - half, half * 2, half * 2, A, { rx: 18 }) + `<rect x="${cx - half + 18}" y="${cy - half + 18}" width="${half * 2 - 36}" height="${half * 2 - 36}" rx="10" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="4"/>`;
    for (let k = -2; k <= 2; k++) { body += rect(cx + k * 34 - 7, cy - half - 26, 14, 26, A) + rect(cx + k * 34 - 7, cy + half, 14, 26, A); }
    body += txt("other1", cx, cy + 10, 30, { contrast: A, def: "Core" });
    const f = itemFields(n, "Node", "node", this.defaults);
    f.usage.other1 = "center chip"; f.labels.other1 = "Chip"; f.fieldDefaults.other1 = "Core";
    return { body, ...f };
  },
  defaults: ["Payments", "Analytics", "CRM", "Email", "Storage", "Auth"],
});

// ---- Chain ----
families.push({
  family: "chain", title: "Chain Links", category: "Process", counts: [3, 4, 5], unit: "links",
  description: (n) => `${n} interlocking chain links in a row.`,
  familyDescription: "Interlocking chain links (user-defined) in a row, each depending on the next.",
  about: "The chain says the whole is only as strong as its links. Use it for supply chains, dependency sequences, or value chains where every step must hold.",
  draw(n) {
    const w = n > 4 ? 230 : 260, h = n > 4 ? 120 : 140, overlap = 52, total = n * w - (n - 1) * overlap, x0 = 500 - total / 2, cy = 500, sw = 34;
    let body = "";
    for (let i = 0; i < n; i++) {
      const x = x0 + i * (w - overlap);
      const tall = i % 2 === 0;
      const ww = tall ? w : w, hh = tall ? h : h - 20;
      body += `<rect x="${num(x)}" y="${num(cy - hh / 2)}" width="${ww}" height="${hh}" rx="${hh / 2}" fill="none" data-ig-stroke="${slot(i)}" stroke="#000" stroke-width="${sw}"/>`;
      body += txt(KEYS[i], x + w / 2, i % 2 ? cy + h / 2 + 70 : cy - h / 2 - 40, 28, { def: this.defaults[i] });
      body += txt(null, x + w / 2, cy + 10, 30, { def: String(i + 1) });
    }
    // weave: each link passes over the next at the top of the overlap
    for (let i = 0; i < n - 1; i++) {
      const x = x0 + i * (w - overlap), ox = x + w - overlap - sw;
      const hh = i % 2 === 0 ? h : h - 20;
      body += `<clipPath id="chain-${i}"><rect x="${num(ox)}" y="${num(cy - h / 2 - sw)}" width="${overlap + 2 * sw}" height="${num(h / 2 + sw)}"/></clipPath>`;
      body += `<rect clip-path="url(#chain-${i})" x="${num(x)}" y="${num(cy - hh / 2)}" width="${w}" height="${hh}" rx="${hh / 2}" fill="none" data-ig-stroke="${slot(i)}" stroke="#000" stroke-width="${sw}"/>`;
    }
    return { body, ...itemFields(n, "Link", "link", this.defaults) };
  },
  defaults: ["Source", "Make", "Deliver", "Sell", "Support"],
});

// ---- Zipper ----
families.push({
  family: "zipper", title: "Zipper", category: "Comparison", counts: [6, 8], unit: "teeth",
  description: (n) => `Two sides with ${n / 2} teeth each, interlocking down the middle.`,
  familyDescription: "Two sides of interlocking teeth (user-defined), joined down the middle.",
  about: "The zipper joins two lists tooth by tooth, so each item on one side pairs with the next on the other. Use it for needs and solutions, questions and answers, or two teams meshing together.",
  draw(n) {
    const k = n / 2, cx = 500, y0 = 110, dy = (780) / k, w = 330, h = Math.min(90, dy - 26);
    let body = line(cx, y0 - 20, cx, 900, A, 10, { dash: "10 12" });
    for (let j = 0; j < k; j++) {
      const yl = y0 + j * dy + h / 2, yr = yl + dy / 2;
      body += rect(cx - w - 8, yl - h / 2, w + 40, h, P, { rx: 16 }) + txt(KEYS[j], cx - w / 2 + 6, yl + 10, 26, { contrast: P, def: this.defaults[j] });
      body += rect(cx - 32, yr - h / 2, w + 40, h, S, { rx: 16 }) + txt(KEYS[k + j], cx + w / 2 - 6, yr + 10, 26, { contrast: S, def: this.rights[j] });
    }
    body += `<rect x="${cx - 30}" y="${y0 - 70}" width="60" height="60" rx="14" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="10"/>`;
    const f = { usage: {}, labels: {}, fieldDefaults: {} };
    for (let j = 0; j < k; j++) { f.usage[KEYS[j]] = `left tooth ${j + 1}`; f.labels[KEYS[j]] = `Left ${j + 1}`; f.fieldDefaults[KEYS[j]] = this.defaults[j]; }
    for (let j = 0; j < k; j++) { f.usage[KEYS[k + j]] = `right tooth ${j + 1}`; f.labels[KEYS[k + j]] = `Right ${j + 1}`; f.fieldDefaults[KEYS[k + j]] = this.rights[j]; }
    return { body, ...f };
  },
  defaults: ["Need: speed", "Need: trust", "Need: scale", "Need: insight"],
  rights: ["Fast delivery", "Transparency", "Elastic infra", "Dashboards"],
});

// ---- Petals ----
families.push({
  family: "petals", title: "Petals", category: "Relationship", counts: [4, 5, 6], unit: "petals",
  description: (n) => `${n} petals around a center, each a labeled aspect.`,
  familyDescription: "Petals (user-defined) around a center, each a labeled aspect of the core.",
  about: "Petals radiate from one center without implying order. Use it for facets of a brand, dimensions of wellbeing, or pillars of a program when none comes first.",
  draw(n) {
    const cx = 500, cy = 500, R = 230, rx = 150, ry = 95;
    let body = "";
    for (let i = 0; i < n; i++) {
      const a = -90 + (360 * i) / n;
      const [x, y] = polar(cx, cy, R, a);
      body += `<ellipse data-ig-fill="${slot(i)}" cx="${num(x)}" cy="${num(y)}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${num(x)} ${num(y)})"/>`;
    }
    body += circ(cx, cy, 120, A) + `<circle cx="${cx}" cy="${cy}" r="104" fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="4"/>` + txt("other1", cx, cy + 12, 32, { contrast: A, def: "Core" });
    for (let i = 0; i < n; i++) {
      const a = -90 + (360 * i) / n;
      const [x, y] = polar(cx, cy, R + 40, a);
      const [lx, ly] = polar(cx, cy, R + 20, a);
      body += txt(KEYS[i], lx, ly + 9, n > 5 ? 24 : 26, { contrast: slot(i), def: this.defaults[i], extra: `transform="rotate(${a > 90 && a < 270 ? a + 180 : a} ${num(lx)} ${num(ly)})"` });
    }
    const f = itemFields(n, "Petal", "petal", this.defaults);
    f.usage.other1 = "center"; f.labels.other1 = "Center"; f.fieldDefaults.other1 = "Core";
    return { body, ...f };
  },
  defaults: ["Quality", "Service", "Price", "Design", "Trust", "Speed"],
});

// ---- Pinwheel ----
families.push({
  family: "pinwheel", title: "Pinwheel", category: "Cycle", counts: [4], unit: "blades",
  description: "Four blades spinning around a center hub.",
  familyDescription: "Four blades (user-defined) spinning around a center hub.",
  about: "The pinwheel turns four parts into one spinning whole, each blade pushing the next. Use it for four-part frameworks with momentum: plan-do-check-act, or four teams driving one goal.",
  draw(n) {
    const cx = 500, cy = 500, L = 380;
    let body = "";
    for (let i = 0; i < 4; i++) {
      const a = i * 90;
      const d = `M0 0 L${L} 0 Q${L} ${-L * 0.55} ${L * 0.45} ${-L * 0.55} Q${L * 0.1} ${-L * 0.55} 0 0 Z`;
      body += `<path data-ig-fill="${slot(i)}" d="${d}" transform="translate(${cx} ${cy}) rotate(${a})"/>`;
      const [lx, ly] = polar(cx, cy, L * 0.62, a - 28);
      body += txt(KEYS[i], lx, ly + 10, 30, { contrast: slot(i), def: this.defaults[i] });
    }
    body += circ(cx, cy, 60, A) + ring(cx, cy, 28, A, 6);
    return { body, ...itemFields(4, "Blade", "blade", this.defaults) };
  },
  defaults: ["Plan", "Do", "Check", "Act"],
});

// ---- Compass ----
families.push({
  family: "compass", title: "Compass", category: "Relationship", counts: [4], unit: "directions",
  description: "A compass rose with four labeled directions and a center.",
  familyDescription: "A compass rose with four labeled directions (user-defined) and a center.",
  about: "The compass gives four directions a center of gravity. Use it for strategic bearings, stakeholder quadrants, or a north-star framing where every option points somewhere.",
  draw() {
    const cx = 500, cy = 500, R = 300;
    let body = ring(cx, cy, R, A, 6) + ring(cx, cy, R - 40, A, 2, { extra: 'stroke-dasharray="4 10"' });
    for (let i = 0; i < 4; i++) {
      const a = -90 + i * 90;
      const [tx, ty] = polar(cx, cy, R - 10, a), [lx, ly] = polar(cx, cy, 60, a - 90), [rx, ry] = polar(cx, cy, 60, a + 90);
      body += poly([[tx, ty], [lx, ly], [cx, cy]], slot(i)) + poly([[tx, ty], [rx, ry], [cx, cy]], slot(i)) + shade(`M${num(tx)} ${num(ty)} L${num(rx)} ${num(ry)} L${cx} ${cy} Z`, 0.2);
    }
    for (let i = 0; i < 4; i++) { const a = -45 + i * 90; const [tx, ty] = polar(cx, cy, 150, a), [lx, ly] = polar(cx, cy, 36, a - 90), [rx, ry] = polar(cx, cy, 36, a + 90); body += poly([[tx, ty], [lx, ly], [cx, cy]], A, { opacity: 0.5 }) + poly([[tx, ty], [rx, ry], [cx, cy]], A, { opacity: 0.3 }); }
    body += circ(cx, cy, 70, A) + txt("other1", cx, cy + 10, 26, { contrast: A, def: "Us" });
    const pos = [[cx, cy - R - 50, "middle"], [cx + R + 40, cy + 10, "start"], [cx, cy + R + 70, "middle"], [cx - R - 40, cy + 10, "end"]];
    pos.forEach(([x, y, anchor], i) => { body += txt(KEYS[i], x, y, 30, { def: this.defaults[i], anchor }); });
    const f = itemFields(4, "Direction", "compass point", this.defaults);
    f.labels = { item1: "North", item2: "East", item3: "South", item4: "West" };
    f.usage.other1 = "center"; f.labels.other1 = "Center"; f.fieldDefaults.other1 = "Us";
    return { body, ...f };
  },
  defaults: ["Vision", "Customers", "Execution", "Culture"],
});

// ---- Fan (half donut) ----
families.push({
  family: "fan", title: "Fan Segments", category: "Relationship", counts: [3, 4, 5], unit: "segments",
  description: (n) => `${n} fan segments spreading from a base pivot.`,
  familyDescription: "Fan segments (user-defined) spreading from a base pivot, like a hand of cards.",
  about: "The fan spreads options from one pivot, so all of them clearly come from the same source. Use it for service lines, program tracks, or choices that share one origin.",
  draw(n) {
    const cx = 500, cy = 760, r0 = 170, r1 = 520, gap = 3;
    let body = "";
    for (let i = 0; i < n; i++) {
      const a0 = 180 + (180 * i) / n + gap, a1 = 180 + (180 * (i + 1)) / n - gap;
      body += path(sectorD(cx, cy, r0, r1, a0, a1), slot(i));
      const am = (a0 + a1) / 2, [lx, ly] = polar(cx, cy, (r0 + r1) / 2 + 10, am);
      const rot = am + 90;
      body += txt(KEYS[i], lx, ly, n > 4 ? 26 : 30, { contrast: slot(i), def: this.defaults[i], extra: `transform="rotate(${num(rot)} ${num(lx)} ${num(ly)})"` });
    }
    body += path(sectorD(cx, cy, 0, r0 - 24, 180, 360), A) + txt("other1", cx, cy - 50, 32, { contrast: A, def: "Hub" });
    const f = itemFields(n, "Segment", "fan segment", this.defaults);
    f.usage.other1 = "pivot"; f.labels.other1 = "Pivot"; f.fieldDefaults.other1 = "Hub";
    return { body, ...f };
  },
  defaults: ["Consulting", "Training", "Support", "Licensing", "Research"],
});
