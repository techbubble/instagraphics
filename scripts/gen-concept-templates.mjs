// One-shot: append the 14 concept graphics to src/lib/templates.ts as real
// templates (brand slots via data-ig-*, editable universal fields).
import { readFileSync, writeFileSync } from "node:fs";

const P = "primary", S = "secondary", T = "tertiary", Q = "quaternary", A = "accent";
const DARK = "#212529";
const LIGHT = new Set([S, T]); // default fills where dark text reads best

const txt = (key, x, y, size, o = {}) => {
  const anchor = o.anchor ?? "middle";
  const font = o.font ?? "primary";
  const contrast = o.contrast ? ` data-ig-contrast="${o.contrast}"` : "";
  const fill = o.contrast ? (LIGHT.has(o.contrast) ? DARK : "#ffffff") : (o.fill ?? DARK);
  const extra = o.extra ? ` ${o.extra}` : "";
  const bind = key ? ` data-ig-text="${key}"` : "";
  return `<text${contrast}${bind} data-ig-font="${font}" x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="bold" fill="${fill}"${extra}>${o.def ?? ""}</text>`;
};
const chip = (x, y, slot, key, def) =>
  `<rect data-ig-fill="${slot}" x="${x - 110}" y="${y - 35}" width="220" height="70" rx="24"/>` +
  txt(key, x, y + 10, 30, { contrast: slot, def });
const node = (x, y, w, h, slot, key, def) =>
  `<rect data-ig-fill="${slot}" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${Math.min(24, h / 2)}"/>` +
  txt(key, x, y + 11, 30, { contrast: slot, def });
const person = (x, y, s, slot) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle data-ig-fill="${slot}" cx="0" cy="-55" r="26"/><path data-ig-fill="${slot}" d="M -38 50 L -38 20 C -38 -14 38 -14 38 20 L 38 50 Z"/></g>`;
const st = (x, y, r, w) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="${w}"/>`;

const FA_BULB = readFileSync(new URL("../src/app/concepts/shapes.mjs", import.meta.url), "utf8").match(/const FA_BULB = "([^"]+)"/)[1];

const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">\n${body}\n</svg>`;

const templates = [];

// ---- Metro Map (curvy 2-line with junction) ----
{
  const stations = [
    [210, 250, P, "item1", "Kickoff", 210, 205],
    [370, 250, P, "item2", "Research", 370, 210],
    [470, 470, P, "item3", "Design", 525, 480],
    [590, 570, P, "item4", "Prototype", 590, 630],
    [350, 550, S, "item5", "Funding", 290, 540],
    [190, 720, S, "other1", "Hiring", 190, 785],
  ];
  let body = `<path d="M210 250 H420 Q470 250 470 300 V520 Q470 570 520 570 H680 Q730 570 730 620 V700" fill="none" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="22" stroke-linecap="round"/>`;
  body += `<path d="M190 720 H300 Q350 720 350 670 V400 Q350 350 400 350 H620 Q670 350 670 300 V200" fill="none" data-ig-stroke="secondary" stroke="#3be8bd" stroke-width="22" stroke-linecap="round"/>`;
  body += st(210, 250, 20, 10) + st(370, 250, 15, 8) + st(470, 470, 15, 8) + st(590, 570, 15, 8) + st(730, 700, 20, 10);
  body += st(190, 720, 20, 10) + st(350, 550, 15, 8) + st(670, 200, 20, 10);
  body += `<rect x="440" y="326" width="60" height="48" rx="24" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="9"/>`;
  for (const [, , , key, def, lx, ly] of stations) body += txt(key, lx, ly, 30, { def, anchor: lx === 525 ? "start" : lx === 290 ? "end" : "middle" });
  body += txt("other2", 730, 765, 30, { def: "Launch" });
  body += txt("other3", 715, 195, 30, { def: "Next stop", anchor: "start" });
  templates.push({
    id: "metro-map-1", family: "metro-map", title: "Metro Map", category: "Relationship", items: 5,
    description: "Two curved transit lines with stations and a junction.",
    about: "A metro map turns related ideas into stations on intersecting lines: each line is a theme, each station a concept, and the junction is where they meet. Use it for programs with parallel tracks, curricula, product streams, or any story where two efforts share a connection point.",
    usage: { item1: "line 1 station", item2: "line 1 station", item3: "line 1 station", item4: "line 1 station", item5: "line 2 station", other1: "line 2 station", other2: "line 1 terminal", other3: "line 2 terminal" },
    labels: { item1: "Station 1", item2: "Station 2", item3: "Station 3", item4: "Station 4", item5: "Station 5", other1: "Station 6", other2: "Terminal 1", other3: "Terminal 2" },
    svg: wrap(body),
  });
}

// ---- Subway Map 1 Line ----
{
  let body = `<path d="M150 250 H450 Q500 250 500 300 V450 Q500 500 550 500 H700 Q750 500 750 550 V700 Q750 750 700 750 H350" fill="none" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="22" stroke-linecap="round"/>`;
  body += st(150, 250, 20, 10) + st(350, 250, 15, 8) + st(620, 500, 15, 8) + st(750, 640, 15, 8) + st(350, 750, 20, 10);
  body += txt("item1", 150, 205, 30, { def: "Discover" }) + txt("item2", 350, 205, 30, { def: "Define" });
  body += txt("item3", 620, 555, 30, { def: "Design" }) + txt("item4", 795, 650, 30, { def: "Deliver", anchor: "start" });
  body += txt("item5", 350, 815, 30, { def: "Debrief" });
  templates.push({
    id: "subway-1line-1", family: "subway-1line", title: "Subway Map 1 Line", category: "Process", items: 5,
    description: "One winding transit line through 5 stations.",
    about: "A single subway line is the friendliest way to show a journey: five stations, one track, no branches. Use it for onboarding paths, learning journeys, project phases, or any story told strictly in order.",
    usage: { item1: "station 1", item2: "station 2", item3: "station 3", item4: "station 4", item5: "station 5" },
    labels: { item1: "Station 1", item2: "Station 2", item3: "Station 3", item4: "Station 4", item5: "Station 5" },
    svg: wrap(body),
  });
}

// ---- Subway Map 2 Lines ----
{
  let body = `<path d="M150 300 H400 Q450 300 450 350 V600 Q450 650 500 650 H820" fill="none" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="22" stroke-linecap="round"/>`;
  body += `<path d="M180 760 H520 Q570 760 570 710 V400 Q570 350 620 350 H830" fill="none" data-ig-stroke="secondary" stroke="#3be8bd" stroke-width="22" stroke-linecap="round"/>`;
  body += st(150, 300, 20, 10) + st(300, 300, 15, 8) + st(450, 480, 15, 8) + st(700, 650, 15, 8) + st(820, 650, 20, 10);
  body += st(180, 760, 20, 10) + st(380, 760, 15, 8) + st(830, 350, 20, 10);
  body += `<rect x="546" y="620" width="48" height="60" rx="24" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="9"/>`;
  body += txt("item1", 150, 255, 30, { def: "Research" }) + txt("item2", 300, 255, 30, { def: "Insight" });
  body += txt("item3", 395, 490, 30, { def: "Concept", anchor: "end" }) + txt("item4", 700, 605, 30, { def: "Test" });
  body += txt("item5", 820, 715, 30, { def: "Launch" }) + txt("other1", 180, 825, 30, { def: "Plan" });
  body += txt("other2", 380, 825, 30, { def: "Fund" }) + txt("other3", 830, 295, 30, { def: "Scale" });
  body += txt(null, 505, 710, 30, { def: "Junction", anchor: "end" });
  body += `<line x1="160" y1="905" x2="250" y2="905" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="16" stroke-linecap="round"/>` + txt(null, 270, 915, 28, { def: "Line one", anchor: "start" });
  body += `<line x1="540" y1="905" x2="630" y2="905" data-ig-stroke="secondary" stroke="#3be8bd" stroke-width="16" stroke-linecap="round"/>` + txt(null, 650, 915, 28, { def: "Line two", anchor: "start" });
  templates.push({
    id: "subway-2line-1", family: "subway-2line", title: "Subway Map 2 Lines", category: "Relationship", items: 5,
    description: "Two transit lines, 8 stations, one junction.",
    about: "Two subway lines crossing at a junction show parallel workstreams that share one decisive meeting point. Name the stations along each line, and let the junction carry the moment the tracks connect: a shared milestone, dependency, or decision.",
    usage: { item1: "line 1 station", item2: "line 1 station", item3: "line 1 station", item4: "line 1 station", item5: "line 1 terminal", other1: "line 2 station", other2: "line 2 station", other3: "line 2 terminal" },
    labels: { item1: "Station 1", item2: "Station 2", item3: "Station 3", item4: "Station 4", item5: "Station 5", other1: "Station 6", other2: "Station 7", other3: "Station 8" },
    svg: wrap(body),
  });
}

// ---- Subway Map 3 Lines ----
{
  let body = `<path d="M150 250 H450 Q500 250 500 300 V450 Q500 500 550 500 H850" fill="none" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="22" stroke-linecap="round"/>`;
  body += `<path d="M180 780 H620 Q670 780 670 730 V300 Q670 250 720 250 H860" fill="none" data-ig-stroke="secondary" stroke="#3be8bd" stroke-width="22" stroke-linecap="round"/>`;
  body += `<path d="M150 380 H560 Q610 380 610 330 V180" fill="none" data-ig-stroke="tertiary" stroke="#ffc107" stroke-width="22" stroke-linecap="round"/>`;
  body += st(150, 250, 20, 10) + st(320, 250, 15, 8) + st(850, 500, 20, 10);
  body += st(180, 780, 20, 10) + st(400, 780, 15, 8) + st(860, 250, 20, 10);
  body += st(150, 380, 20, 10) + st(610, 180, 20, 10);
  body += `<rect x="470" y="356" width="60" height="48" rx="24" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="9"/>`;
  body += `<rect x="646" y="470" width="48" height="60" rx="24" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="9"/>`;
  body += txt("item1", 150, 205, 30, { def: "Brand" }) + txt("item2", 320, 205, 30, { def: "Content" });
  body += txt("item3", 850, 565, 30, { def: "Sales" }) + txt("item4", 180, 845, 30, { def: "Product" });
  body += txt("item5", 400, 845, 30, { def: "Pricing" }) + txt("other1", 860, 205, 30, { def: "Growth" });
  body += txt("other2", 150, 445, 30, { def: "Support" }) + txt("other3", 610, 145, 30, { def: "Success" });
  body += txt(null, 445, 440, 30, { def: "Junction 1", anchor: "end" }) + txt(null, 700, 455, 30, { def: "Junction 2", anchor: "start" });
  body += `<line x1="100" y1="920" x2="170" y2="920" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="16" stroke-linecap="round"/>` + txt(null, 190, 930, 28, { def: "Line one", anchor: "start" });
  body += `<line x1="400" y1="920" x2="470" y2="920" data-ig-stroke="secondary" stroke="#3be8bd" stroke-width="16" stroke-linecap="round"/>` + txt(null, 490, 930, 28, { def: "Line two", anchor: "start" });
  body += `<line x1="700" y1="920" x2="770" y2="920" data-ig-stroke="tertiary" stroke="#ffc107" stroke-width="16" stroke-linecap="round"/>` + txt(null, 790, 930, 28, { def: "Line three", anchor: "start" });
  templates.push({
    id: "subway-3line-1", family: "subway-3line", title: "Subway Map 3 Lines", category: "Relationship", items: 5,
    description: "Three transit lines, 8 stations, two junctions.",
    about: "Three subway lines with two junctions map a system, not just a journey: several themes, each with its own stations, intersecting where work genuinely overlaps. Ideal for org strategy views, multi-team roadmaps, and ecosystem stories.",
    usage: { item1: "line 1 station", item2: "line 1 station", item3: "line 1 terminal", item4: "line 2 station", item5: "line 2 station", other1: "line 2 terminal", other2: "line 3 station", other3: "line 3 terminal" },
    labels: { item1: "Station 1", item2: "Station 2", item3: "Station 3", item4: "Station 4", item5: "Station 5", other1: "Station 6", other2: "Station 7", other3: "Station 8" },
    svg: wrap(body),
  });
}

// ---- Hot Air Balloon ----
{
  let body = `<g transform="translate(140 140) scale(30)" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">`;
  body += `<path d="M9 21v-3h6v3a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1"/>`;
  body += `<path d="M9 18c-2.347 -2.169 -5 -5.226 -5 -8a8 8 0 1 1 16 0c0 2.774 -2.653 5.831 -5 8"/>`;
  body += `<path d="M5.5 14h13"/><path d="M10 14c-1.69 -4.712 -.924 -8.197 0 -11.602"/><path d="M14 14c1.469 -3.867 1.19 -7.735 0 -11.602"/></g>`;
  const arrow = (x, y, up, slot) =>
    `<path d="${up ? `M${x} ${y} l0 -70 m-24 26 l24 -26 l24 26` : `M${x} ${y - 70} l0 70 m-24 -26 l24 26 l24 -26`}" fill="none" data-ig-stroke="${slot}" stroke="${slot === S ? "#3be8bd" : "#f55151"}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
  const rows = [[270, "item1", "Vision", "other1", "Doubt"], [420, "item2", "Talent", "other2", "Debt"], [570, "item3", "Focus", "other3", "Drag"]];
  for (const [y, ik, idef, ok, odef] of rows) {
    body += arrow(120, y, true, S) + txt(ik, 120, y + 52, 34, { def: idef });
    body += arrow(880, y, false, Q) + txt(ok, 880, y + 52, 34, { def: odef });
  }
  templates.push({
    id: "balloon-1", family: "balloon", title: "Hot Air Balloon", category: "Comparison", items: 3,
    description: "Balloon with lift forces on one side, drag on the other.",
    about: "The balloon makes forces tangible: what lifts you rises on one side, what weighs you down pulls on the other. Use it for retrospectives, SWOT-style force reviews, or change-management stories where momentum and friction deserve equal billing.",
    usage: { item1: "lift 1", item2: "lift 2", item3: "lift 3", other1: "weight 1", other2: "weight 2", other3: "weight 3" },
    labels: { item1: "Lift 1", item2: "Lift 2", item3: "Lift 3", other1: "Weight 1", other2: "Weight 2", other3: "Weight 3" },
    svg: wrap(body),
  });
}

// ---- Roots & Branches ----
{
  let body = `<path d="M425 712 C 460 700 462 640 468 560 C 472 505 476 470 480 440 C 486 415 492 405 500 400 C 508 405 514 415 520 440 C 524 470 528 505 532 560 C 538 640 540 700 575 712 Z" data-ig-fill="accent"/>`;
  body += `<path d="M494 440 C 450 380 360 330 285 295" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="22" stroke-linecap="round"/>`;
  body += `<path d="M500 420 C 500 350 500 300 500 245" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="24" stroke-linecap="round"/>`;
  body += `<path d="M506 440 C 550 380 640 330 715 295" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="22" stroke-linecap="round"/>`;
  const branches = [[230, 250, P, "item1", "Growth"], [500, 155, S, "item2", "Trust"], [770, 250, T, "item3", "Revenue"]];
  for (const [x, y, slot, key, def] of branches) {
    body += `<circle data-ig-fill="${slot}" cx="${x + 62}" cy="${y - 38}" r="52" opacity="0.35"/><circle data-ig-fill="${slot}" cx="${x - 58}" cy="${y + 40}" r="44" opacity="0.35"/><circle data-ig-fill="${slot}" cx="${x + 30}" cy="${y + 62}" r="36" opacity="0.25"/>`;
    body += `<circle data-ig-fill="${slot}" cx="${x}" cy="${y}" r="95"/>` + txt(key, x, y + 12, 36, { contrast: slot, def });
  }
  body += `<line x1="120" y1="712" x2="880" y2="712" data-ig-stroke="accent" stroke="#495057" stroke-width="6" stroke-dasharray="18 14"/>`;
  body += `<path d="M445 706 C 400 748 340 760 265 800" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="16" stroke-linecap="round"/>`;
  body += `<path d="M500 710 C 500 750 500 775 500 805" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="16" stroke-linecap="round"/>`;
  body += `<path d="M555 706 C 600 748 660 760 735 800" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="16" stroke-linecap="round"/>`;
  body += txt("other1", 250, 870, 34, { def: "Values" }) + txt("other2", 500, 870, 34, { def: "Habits" }) + txt("other3", 750, 870, 34, { def: "Skills" });
  templates.push({
    id: "tree-roots-1", family: "tree-roots", title: "Roots &amp; Branches", category: "Analysis", items: 3,
    description: "Visible outcomes above ground, hidden causes below.",
    about: "The tree splits any story into what people see and what makes it possible: branches carry outcomes, roots carry the values, habits, and skills feeding them. Use it for culture decks, personal development, and cause-and-effect narratives.",
    usage: { item1: "branch 1", item2: "branch 2", item3: "branch 3", other1: "root 1", other2: "root 2", other3: "root 3" },
    labels: { item1: "Branch 1", item2: "Branch 2", item3: "Branch 3", other1: "Root 1", other2: "Root 2", other3: "Root 3" },
    svg: wrap(body),
  });
}

// ---- Orbits ----
{
  let body = "";
  for (const r of [180, 280, 380]) body += `<circle cx="500" cy="500" r="${r}" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="4" stroke-dasharray="4 12"/>`;
  body += `<circle data-ig-fill="tertiary" cx="500" cy="500" r="90"/>` + txt("other1", 500, 513, 38, { contrast: T, def: "Mission" });
  const rings = [[180, -35, P, "item1", "Core", 64], [280, 40, S, "item2", "Next", 54], [380, 150, Q, "item3", "Later", 44]];
  for (const [r, deg, slot, key, def, pr] of rings) {
    const a = (deg * Math.PI) / 180;
    const x = (500 + r * Math.cos(a)).toFixed(1);
    const y = (500 + r * Math.sin(a)).toFixed(1);
    body += `<circle data-ig-fill="${slot}" cx="${x}" cy="${y}" r="${pr}"/>` + txt(key, x, Number(y) + 11, 30, { contrast: slot, def });
  }
  templates.push({
    id: "orbits-1", family: "orbits", title: "Orbits", category: "Hierarchy", items: 3,
    description: "Priorities orbiting a mission; closer means more important.",
    about: "Orbits rank by gravity: the mission sits at the center and everything else circles it at a distance that signals priority. Use it for now/next/later roadmaps, strategic focus areas, or stakeholder maps.",
    usage: { item1: "inner orbit", item2: "middle orbit", item3: "outer orbit", other1: "center" },
    labels: { item1: "Inner", item2: "Middle", item3: "Outer", other1: "Center" },
    svg: wrap(body),
  });
}

// ---- Honeycomb 2 ----
{
  const hex = (cx, cy, r) =>
    [0, 1, 2, 3, 4, 5].map((i) => {
      const a = ((60 * i - 90) * Math.PI) / 180;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
  const ring = [[-120, P, "item1", "Plan"], [-60, S, "item2", "Build"], [0, T, "item3", "Test"], [60, Q, "item4", "Ship"], [120, P, "item5", "Learn"], [180, S, "other1", "Refine"]];
  let body = "";
  for (const [deg, slot, key, def] of ring) {
    const a = (deg * Math.PI) / 180;
    const x = Number((500 + 199 * Math.cos(a)).toFixed(1));
    const y = Number((500 + 199 * Math.sin(a)).toFixed(1));
    body += `<polygon data-ig-fill="${slot}" points="${hex(x, y, 108)}"/>` + txt(key, x, y + 12, 34, { contrast: slot, def });
  }
  body += `<polygon data-ig-fill="accent" points="${hex(500, 500, 108)}"/>` + txt("other2", 500, 512, 34, { contrast: A, def: "Team" });
  templates.push({
    id: "honeycomb2-1", family: "honeycomb2", title: "Honeycomb 2", category: "Relationship", items: 5,
    description: "Six cells locked around a central core.",
    about: "A honeycomb ring shows capabilities that interlock: six cells around a core, each touching its neighbors. Use it for team models, service catalogs, or platform components that only work together.",
    usage: { item1: "cell 1", item2: "cell 2", item3: "cell 3", item4: "cell 4", item5: "cell 5", other1: "cell 6", other2: "center cell" },
    labels: { item1: "Cell 1", item2: "Cell 2", item3: "Cell 3", item4: "Cell 4", item5: "Cell 5", other1: "Cell 6", other2: "Center" },
    svg: wrap(body),
  });
}

// ---- Domino Effect ----
{
  const tiles = [[180, 0, Q, "item1", "One email"], [340, 12, T, "item2", "One reply"], [500, 30, S, "item3", "One deal"], [660, 52, P, "item4", "One hire"], [820, 74, A, null, ""]];
  let body = `<line x1="90" y1="700" x2="910" y2="700" data-ig-stroke="accent" stroke="#495057" stroke-width="8" stroke-linecap="round"/>`;
  tiles.forEach(([x, tilt, slot, key, def], i) => {
    body += `<g transform="rotate(${tilt} ${x} 700)"><rect data-ig-fill="${slot}" x="${x - 45}" y="380" width="90" height="320" rx="16" stroke="#ffffff" stroke-width="6"/>`;
    if (key) body += txt(key, x, 540, 32, { contrast: slot, def, extra: `transform="rotate(-90 ${x} 540)"` });
    if (i === 0) body += `<path d="M${x - 130} 430 h60 m-24 -24 l28 24 l-28 24" fill="none" stroke="#212529" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
    body += `</g>`;
  });
  body += txt("other1", 500, 850, 40, { def: "Small actions topple big outcomes" });
  templates.push({
    id: "dominoes-1", family: "dominoes", title: "Domino Effect", category: "Process", items: 4,
    description: "Falling dominoes compounding into a big outcome.",
    about: "Dominoes dramatize compounding: one small push knocks over progressively larger outcomes. Use it for growth loops, risk cascades, or any chain where the first step matters most.",
    usage: { item1: "domino 1", item2: "domino 2", item3: "domino 3", item4: "domino 4", other1: "caption" },
    labels: { item1: "Domino 1", item2: "Domino 2", item3: "Domino 3", item4: "Domino 4", other1: "Caption" },
    svg: wrap(body),
  });
}

// ---- Three-Legged Stool ----
{
  let body = `<ellipse cx="258" cy="656" rx="64" ry="14" fill="#dee2e6"/><ellipse cx="742" cy="656" rx="64" ry="14" fill="#dee2e6"/><ellipse cx="500" cy="766" rx="70" ry="15" fill="#dee2e6"/>`;
  body += `<line x1="395" y1="300" x2="258" y2="630" data-ig-stroke="primary" stroke="#0d6efd" stroke-width="46" stroke-linecap="round"/>`;
  body += `<line x1="605" y1="300" x2="742" y2="630" data-ig-stroke="tertiary" stroke="#ffc107" stroke-width="46" stroke-linecap="round"/>`;
  body += `<line x1="500" y1="300" x2="500" y2="740" data-ig-stroke="secondary" stroke="#3be8bd" stroke-width="54" stroke-linecap="round"/>`;
  body += `<path d="M220 213 A 280 78 0 0 0 780 213 L780 255 A 280 78 0 0 1 220 255 Z" data-ig-fill="accent"/>`;
  body += `<ellipse data-ig-fill="quaternary" cx="500" cy="212" rx="280" ry="79"/>` + txt("other1", 500, 228, 44, { contrast: Q, def: "Strategy" });
  body += txt("item1", 258, 720, 36, { def: "People" }) + txt("item3", 742, 720, 36, { def: "Technology" }) + txt("item2", 500, 830, 36, { def: "Process" });
  body += txt("other2", 500, 930, 36, { def: "Remove any one leg and it falls" });
  templates.push({
    id: "stool-1", family: "stool", title: "Three-Legged Stool", category: "Analysis", items: 3,
    description: "Three interdependent supports under one seat.",
    about: "The three-legged stool is the consultant's shorthand for interdependence: the seat is the goal, the legs are its supports, and a stool cannot stand on two. Use it for people/process/technology stories or any three non-negotiable pillars.",
    usage: { item1: "front-left leg", item2: "front leg", item3: "right leg", other1: "seat", other2: "caption" },
    labels: { item1: "Leg 1", item2: "Leg 2", item3: "Leg 3", other1: "Seat", other2: "Caption" },
    svg: wrap(body),
  });
}

// ---- Mind Map (Radial) ----
{
  const nodes = [[250, 220, P, "item1", "Audience"], [750, 220, S, "item2", "Message"], [170, 500, T, "item3", "Channels"], [830, 500, Q, "item4", "Budget"], [250, 780, S, "item5", "Timing"], [750, 780, P, "other2", "Metrics"]];
  const links = ["M420 460 C 350 380 320 320 270 258", "M580 460 C 650 380 680 320 730 258", "M390 500 H 268", "M610 500 H 732", "M420 545 C 350 620 320 680 270 742", "M580 545 C 650 620 680 680 730 742"];
  let body = links.map((d) => `<path d="${d}" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="8" stroke-linecap="round"/>`).join("");
  for (const [x, y, slot, key, def] of nodes) body += node(x, y, 190, 70, slot, key, def);
  body += `<rect data-ig-fill="accent" x="390" y="455" width="220" height="90" rx="24"/>` + txt("other1", 500, 512, 34, { contrast: A, def: "Main Idea" });
  templates.push({
    id: "mindmap-radial-1", family: "mindmap-radial", title: "Mind Map Radial", category: "Relationship", items: 5,
    description: "Central idea with six branches radiating outward.",
    about: "The radial mind map puts one idea at the center and lets six branches carry everything it touches. Use it for brainstorm summaries, campaign plans, or topic overviews where no branch outranks another.",
    usage: { item1: "branch 1", item2: "branch 2", item3: "branch 3", item4: "branch 4", item5: "branch 5", other1: "center", other2: "branch 6" },
    labels: { item1: "Branch 1", item2: "Branch 2", item3: "Branch 3", item4: "Branch 4", item5: "Branch 5", other1: "Center", other2: "Branch 6" },
    svg: wrap(body),
  });
}

// ---- Mind Map (Split) ----
{
  const left = [["item1", "Strengths"], ["item2", "Skills"], ["item3", "Wins"], ["item4", "Allies"]];
  const right = [["item5", "Risks"], ["other1", "Gaps"], ["other2", "Rivals"], ["other3", "Costs"]];
  const slotFor = (i) => [P, S, T, Q][i];
  let body = "";
  const side = (cx, sign, list) =>
    [200, 400, 600, 800].map((y, i) => {
      const edge = cx - sign * 85;
      const [key, def] = list[i];
      return `<path d="M${500 + sign * 110} 500 C ${500 + sign * 170} 500 ${500 + sign * 170} ${y} ${edge} ${y}" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="7" stroke-linecap="round"/>` +
        node(cx, y, 170, 64, slotFor(i), key, def);
    }).join("");
  body += side(190, -1, left) + side(810, 1, right);
  body += `<rect data-ig-fill="accent" x="390" y="450" width="220" height="100" rx="24"/>` + txt(null, 500, 512, 34, { contrast: A, def: "Main Idea" });
  templates.push({
    id: "mindmap-split-1", family: "mindmap-split", title: "Mind Map Split", category: "Relationship", items: 5,
    description: "Central idea with four branches per side.",
    about: "The split mind map balances a central idea between two hemispheres: four branches left, four right. Use it when the branches naturally divide into two camps, halves of an argument, or paired themes.",
    usage: { item1: "left branch 1", item2: "left branch 2", item3: "left branch 3", item4: "left branch 4", item5: "right branch 1", other1: "right branch 2", other2: "right branch 3", other3: "right branch 4" },
    labels: { item1: "Left 1", item2: "Left 2", item3: "Left 3", item4: "Left 4", item5: "Right 1", other1: "Right 2", other2: "Right 3", other3: "Right 4" },
    svg: wrap(body),
  });
}

// ---- Team Ring ----
{
  const spots = [[759.8, 320, S, "item1", "Design"], [759.8, 620, T, "item2", "Sales"], [500, 770, Q, "item3", "Support"], [240.2, 620, P, "item4", "Product"], [240.2, 320, A, "item5", "Marketing"]];
  let body = `<circle cx="500" cy="470" r="178" fill="none" data-ig-stroke="accent" stroke="#495057" stroke-width="4" stroke-dasharray="4 14"/>`;
  for (const [x, y, slot, key, def] of spots) body += person(x, y, 1.1, slot) + txt(key, x, y + 105, 28, { def });
  body += `<circle cx="500" cy="470" r="110" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="8"/>` + txt("other1", 500, 484, 40, { def: "Goal" });
  templates.push({
    id: "team-ring-1", family: "team-ring", title: "Team Ring", category: "Relationship", items: 5,
    description: "Five people gathered around a shared goal.",
    about: "The team ring puts the goal in the middle and the people who own it around it, all facing the same center. Use it for team charters, cross-functional initiatives, or stakeholder alignment.",
    usage: { item1: "person 1", item2: "person 2", item3: "person 3", item4: "person 4", item5: "person 5", other1: "center" },
    labels: { item1: "Role 1", item2: "Role 2", item3: "Role 3", item4: "Role 4", item5: "Role 5", other1: "Goal" },
    svg: wrap(body),
  });
}

// ---- Light Bulb ----
{
  const leaders = [[275, 365, 372, 315], [275, 331, 338, 465], [275, 396, 403, 615], [725, 635, 628, 315], [725, 669, 662, 465], [725, 604, 597, 615]];
  let body = `<defs><filter id="bulbThin"><feMorphology operator="erode" radius="7"/></filter></defs>`;
  body += `<g transform="translate(298 230) scale(1.05)"><path data-ig-fill="accent" d="${FA_BULB}" filter="url(#bulbThin)"/></g>`;
  body += leaders.map(([xa, xb, dx, y]) => `<line x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" data-ig-stroke="accent" stroke="#495057" stroke-width="6"/><circle data-ig-fill="accent" cx="${dx}" cy="${y}" r="8"/>`).join("");
  body += chip(165, 315, P, "item1", "Research") + chip(165, 465, S, "item2", "Design") + chip(165, 615, P, "item3", "Prototype");
  body += chip(835, 315, Q, "item4", "Feedback") + chip(835, 465, S, "item5", "Iterate") + chip(835, 615, Q, "other1", "Launch");
  templates.push({
    id: "light-bulb-1", family: "light-bulb", title: "Light Bulb", category: "List", items: 5,
    description: "A big idea with six supporting sparks.",
    about: "The light bulb frames one big idea and the six sparks that feed it. Use it for innovation summaries, idea pitches, or workshop outputs where supporting points deserve equal, tidy billing.",
    usage: { item1: "chip 1", item2: "chip 2", item3: "chip 3", item4: "chip 4", item5: "chip 5", other1: "chip 6" },
    labels: { item1: "Idea 1", item2: "Idea 2", item3: "Idea 3", item4: "Idea 4", item5: "Idea 5", other1: "Idea 6" },
    svg: wrap(body),
  });
}

// ---- splice into templates.ts ----
const file = new URL("../src/lib/templates.ts", import.meta.url);
let src = readFileSync(file, "utf8");
const anchor = "\n];\n\nexport const CATEGORIES";
if (!src.includes(anchor)) throw new Error("anchor not found");
const entries = templates
  .map((t) => {
    const usage = Object.entries(t.usage).map(([k, v]) => `      ${k}: ${JSON.stringify(v)},`).join("\n");
    const labels = Object.entries(t.labels).map(([k, v]) => `      ${k}: ${JSON.stringify(v)},`).join("\n");
    return `  {
    id: ${JSON.stringify(t.id)},
    family: ${JSON.stringify(t.family)},
    title: ${JSON.stringify(t.title.replace(/&amp;/g, "&"))},
    category: ${JSON.stringify(t.category)},
    items: ${t.items},
    description: ${JSON.stringify(t.description)},
    about: ${JSON.stringify(t.about)},
    usage: {\n${usage}\n    },
    labels: {\n${labels}\n    },
    svg: \`${t.svg}\`,
  },`;
  })
  .join("\n");
src = src.replace(anchor, `\n${entries}\n];\n\nexport const CATEGORIES`);
writeFileSync(file, src);
console.log(`added ${templates.length} templates:`, templates.map((t) => t.id).join(", "));
