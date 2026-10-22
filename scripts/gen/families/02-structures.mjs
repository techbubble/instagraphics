import { P, S, T, Q, A, slot, txt, circ, ring, badge, chip, rect, poly, path, stroke, line, shade, light, polar, num, itemFields, KEYS, WHITE } from "../lib.mjs";

export const families = [];

// ---- Strategy house ----
families.push({
  family: "strategy-house", title: "Strategy House", category: "Hierarchy", counts: [3, 4, 5], unit: "pillars",
  description: (n) => `Roof vision over ${n} pillars on a foundation.`,
  familyDescription: "A roof vision over pillars (user-defined) standing on a shared foundation.",
  about: "The strategy house is the consultant's classic: a vision in the roof, strategic pillars holding it up, and the foundation everything rests on. Use it for strategy summaries, operating models, or program charters.",
  draw(n) {
    const x0 = 110, x1 = 890, roofTop = 110, eave = 330, floorY = 760, baseH = 110;
    let body = poly([[500, roofTop], [x1 + 30, eave], [x0 - 30, eave]], A) + light(`M500 ${roofTop} L${x0 - 30} ${eave} L500 ${eave} Z`, 0.12);
    body += txt("other1", 500, eave - 60, 40, { contrast: A, def: "Vision" });
    const gap = 24, w = (x1 - x0 - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * (w + gap);
      body += rect(x, eave + 30, w, floorY - eave - 30, slot(i), { rx: 10 });
      body += `<text data-ig-text="${KEYS[i]}" data-ig-contrast="${slot(i)}" data-ig-font="primary" transform="translate(${num(x + w / 2 + 11)} ${num((eave + 30 + floorY) / 2)}) rotate(-90)" text-anchor="middle" font-size="${n > 4 ? 30 : 34}" font-weight="bold" fill="#ffffff">${this.defaults[i]}</text>`;
    }
    body += rect(x0 - 30, floorY + 20, x1 - x0 + 60, baseH, A, { rx: 12 }) + txt("other2", 500, floorY + 20 + baseH / 2 + 13, 36, { contrast: A, def: "Foundation" });
    const f = itemFields(n, "Pillar", "pillar", this.defaults);
    f.usage.other1 = "roof"; f.labels.other1 = "Vision"; f.fieldDefaults.other1 = "Vision";
    f.usage.other2 = "foundation"; f.labels.other2 = "Foundation"; f.fieldDefaults.other2 = "Foundation";
    f.fieldOrder = ["other1", ...KEYS.slice(0, n), "other2"];
    return { body, ...f };
  },
  defaults: ["People", "Process", "Technology", "Partners", "Culture"],
});

// ---- Umbrella ----
families.push({
  family: "umbrella", title: "Umbrella", category: "Relationship", counts: [3, 4, 5], unit: "items",
  description: (n) => `One canopy sheltering ${n} items beneath it.`,
  familyDescription: "A single canopy sheltering items (user-defined) grouped beneath it.",
  about: "The umbrella shows one thing covering many: a brand over products, a policy over teams, a platform over services. Label the canopy and line up what it protects underneath.",
  draw(n) {
    const cx = 500, apexY = 150, edgeY = 430, rx = 420, ry = edgeY - apexY, k = Math.max(n, 4);
    const tips = []; for (let i = 0; i <= k; i++) tips.push(cx - rx + (2 * rx * i) / k);
    const rib = (x, toApex) => {
      const r = Math.abs(x - cx);
      if (r < 1) return toApex ? `L${cx} ${apexY}` : `L${num(x)} ${edgeY}`;
      const sweep = toApex ? (x < cx ? 1 : 0) : (x < cx ? 0 : 1);
      return toApex ? `A${num(r)} ${ry} 0 0 ${sweep} ${cx} ${apexY}` : `A${num(r)} ${ry} 0 0 ${sweep} ${num(x)} ${edgeY}`;
    };
    let body = "";
    for (let i = 0; i < k; i++) {
      const xa = tips[i], xb = tips[i + 1], chord = xb - xa;
      const d = `M${cx} ${apexY} ${rib(xa, false)} A${num(chord * 0.62)} ${num(chord * 0.62)} 0 0 1 ${num(xb)} ${edgeY} ${rib(xb, true)} Z`;
      body += path(d, i % 2 ? S : P);
    }
    for (let i = 1; i < k; i++) {
      const x = tips[i], r = Math.abs(x - cx);
      body += stroke(r < 1 ? `M${cx} ${apexY} L${cx} ${edgeY}` : `M${cx} ${apexY} A${num(r)} ${ry} 0 0 ${x < cx ? 0 : 1} ${num(x)} ${edgeY}`, A, 3, { opacity: 0.22 });
    }
    body += rect(cx - 7, apexY - 34, 14, 36, A, { rx: 5 }) + circ(cx, apexY - 36, 10, A);
    body += line(cx, apexY, cx, 800, A, 14) + stroke(`M${cx} 800 A42 42 0 0 1 ${cx - 84} 800 V782`, A, 14);
    body += `<rect x="${cx - 170}" y="${num(apexY + 110)}" width="340" height="70" rx="35" fill="#ffffff" fill-opacity="0.92"/>` + txt("other1", cx, apexY + 157, 34, { def: "Our Brand" });
    const gap = 20, w = (820 - gap * (n - 1)) / n, y = 900;
    for (let i = 0; i < n; i++) {
      const x = 90 + i * (w + gap) + w / 2;
      body += chip(x, y, w, 80, slot(i), KEYS[i], this.defaults[i], n > 4 ? 24 : 28);
    }
    const f = itemFields(n, "Item", "item under canopy", this.defaults);
    f.usage.other1 = "canopy"; f.labels.other1 = "Canopy"; f.fieldDefaults.other1 = "Our Brand";
    f.fieldOrder = ["other1", ...KEYS.slice(0, n)];
    return { body, ...f };
  },
  defaults: ["Product A", "Product B", "Product C", "Product D", "Product E"],
});

// ---- Prism ----
families.push({
  family: "prism", title: "Prism", category: "Relationship", counts: [3, 4, 5], unit: "outputs",
  description: (n) => `One input beam split into ${n} colored outputs.`,
  familyDescription: "One input beam entering a prism and splitting into outputs (user-defined).",
  about: "The prism takes one input and refracts it into a spectrum of outputs. Use it for one strategy producing many initiatives, one dataset feeding many insights, or one investment paying out in several ways.",
  draw(n) {
    const px = 500, py = 500, h = 300;
    const tri = [[px, py - h * 0.62], [px + h * 0.58, py + h * 0.38], [px - h * 0.58, py + h * 0.38]];
    let body = line(60, py + 20, px - 120, py + 20, A, 16) + txt("other1", 60, py - 30, 32, { def: "Input", anchor: "start" });
    const x1 = 920, y0 = 150, y1 = 850;
    for (let i = 0; i < n; i++) {
      const y = y0 + ((y1 - y0) * (i + 0.5)) / n;
      const ya = py - 40 + (80 * (i + 0.5)) / n;
      body += stroke(`M${px + 60} ${num(ya)} L${x1 - 250} ${num(y)}`, slot(i), 14) + chip(x1 - 120, y, 240, 72, slot(i), KEYS[i], this.defaults[i], 26);
    }
    body += poly(tri, A) + light(`M${tri[0][0]} ${tri[0][1]} L${tri[2][0]} ${tri[2][1]} L${px} ${py + h * 0.38} Z`, 0.16);
    const f = itemFields(n, "Output", "output ray", this.defaults);
    f.usage.other1 = "input beam"; f.labels.other1 = "Input"; f.fieldDefaults.other1 = "Input";
    f.fieldOrder = ["other1", ...KEYS.slice(0, n)];
    return { body, ...f };
  },
  defaults: ["Insight", "Revenue", "Reach", "Loyalty", "Efficiency"],
});

// ---- Nested boxes ----
families.push({
  family: "nested", title: "Nested Layers", category: "Hierarchy", counts: [3, 4, 5], unit: "layers",
  description: (n) => `${n} nested rounded frames from outer context to inner core.`,
  familyDescription: "Nested rounded frames (user-defined) from the outermost context to the innermost core.",
  about: "Nested layers show containment: the outer frame is the environment, each inner frame a tighter scope, the center the core. Use it for scope definitions, ecosystem maps, or levels of control.",
  draw(n) {
    const step = 820 / (n * 2 + 1);
    let body = "";
    for (let i = 0; i < n; i++) {
      const inset = 90 + i * step * 1.0;
      const size = 820 - 2 * (i * step);
      const x = 90 + i * step, y = 90 + i * step;
      body += rect(x, y, size, size, slot(i), { rx: 26, opacity: 1 }) + light(`M${x} ${y} h${size} v${size} h-${size} Z`, 0);
      const cy = y + step * 0.55;
      body += txt(KEYS[i], x + size / 2, cy + 10, n > 4 ? 26 : 30, { contrast: slot(i), def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Layer", "frame", this.defaults) };
  },
  defaults: ["Society", "Industry", "Company", "Team", "You"],
});

// ---- Treemap ----
families.push({
  family: "treemap", title: "Treemap", category: "Comparison", counts: [4, 5, 6], unit: "blocks",
  description: (n) => `${n} blocks of decreasing size tiling one square.`,
  familyDescription: "Blocks (user-defined) of decreasing size tiling a single square.",
  about: "A treemap shows parts of a whole by area: the biggest block dominates, the smallest tuck into corners. Use it for portfolio mixes, budget shares, or priority weighting when exact numbers are not the point.",
  draw(n) {
    const x0 = 80, y0 = 80, W = 840, H = 840, g = 10;
    // Fixed layouts per count (slice-and-dice with a decreasing look).
    const L = {
      4: [[0, 0, 0.6, 1], [0.6, 0, 0.4, 0.55], [0.6, 0.55, 0.22, 0.45], [0.82, 0.55, 0.18, 0.45]],
      5: [[0, 0, 0.55, 0.65], [0.55, 0, 0.45, 0.45], [0, 0.65, 0.55, 0.35], [0.55, 0.45, 0.25, 0.55], [0.8, 0.45, 0.2, 0.55]],
      6: [[0, 0, 0.5, 0.6], [0.5, 0, 0.5, 0.4], [0, 0.6, 0.3, 0.4], [0.3, 0.6, 0.2, 0.4], [0.5, 0.4, 0.28, 0.6], [0.78, 0.4, 0.22, 0.6]],
    }[n];
    let body = "";
    L.forEach(([fx, fy, fw, fh], i) => {
      const x = x0 + fx * W + g / 2, y = y0 + fy * H + g / 2, w = fw * W - g, h = fh * H - g;
      body += rect(x, y, w, h, slot(i), { rx: 14 });
      const size = Math.min(34, Math.max(20, w / 7));
      body += txt(KEYS[i], x + w / 2, y + h / 2 + size * 0.36, size, { contrast: slot(i), def: this.defaults[i] });
    });
    return { body, ...itemFields(n, "Block", "block", this.defaults) };
  },
  defaults: ["Core", "Growth", "Explore", "Support", "Admin", "Other"],
});

// ---- Tile grid ----
families.push({
  family: "tile-grid", title: "Tile Grid", category: "List", counts: [4, 6, 8], unit: "tiles",
  description: (n) => `${n} numbered tiles in a neat grid.`,
  familyDescription: "Numbered tiles (user-defined) in an even grid, each with a big index and a label.",
  about: "The tile grid gives every item equal weight and a big index number, like a periodic table of your topic. Use it for principles, values, capability catalogs, or feature sets.",
  draw(n) {
    const cols = n === 4 ? 2 : n === 6 ? 3 : 4, rows = n / cols;
    const g = 24, W = 880, tw = (W - g * (cols - 1)) / cols, th = Math.min(tw, (880 - g * (rows - 1)) / rows);
    const x0 = 60, y0 = 500 - (rows * th + (rows - 1) * g) / 2;
    let body = "";
    for (let i = 0; i < n; i++) {
      const c = i % cols, r = Math.floor(i / cols);
      const x = x0 + c * (tw + g), y = y0 + r * (th + g);
      body += rect(x, y, tw, th, slot(i), { rx: 18 });
      body += txt(null, x + 22, y + th * 0.36, th * 0.34, { contrast: slot(i), def: String(i + 1).padStart(2, "0"), anchor: "start", extra: 'opacity="0.55"' });
      body += txt(KEYS[i], x + tw / 2, y + th - th * 0.18, Math.min(30, tw / 7.5), { contrast: slot(i), def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Tile", "tile", this.defaults) };
  },
  defaults: ["Integrity", "Curiosity", "Ownership", "Speed", "Candor", "Craft", "Focus", "Care"],
});

// ---- Cube ----
families.push({
  family: "cube", title: "Cube", category: "Relationship", counts: null,
  items: 3, description: "Three visible faces of one cube, each labeled.",
  about: "The cube shows three facets of one thing at once. Use it for product, market and team; people, process and technology; or any trio that only makes sense together.",
  draw() {
    const cx = 500, cy = 520, s = 300;
    const top = [[cx, cy - s], [cx + s * 0.87, cy - s / 2], [cx, cy], [cx - s * 0.87, cy - s / 2]];
    const left = [[cx - s * 0.87, cy - s / 2], [cx, cy], [cx, cy + s], [cx - s * 0.87, cy + s / 2]];
    const right = [[cx, cy], [cx + s * 0.87, cy - s / 2], [cx + s * 0.87, cy + s / 2], [cx, cy + s]];
    let body = poly(top, S) + poly(left, P) + poly(right, P) + shade(`M${right.map((p) => p.join(" ")).join(" L")} Z`, 0.22);
    body += txt("item1", cx, cy - s / 2 + 12, 36, { contrast: S, def: "Product" });
    body += `<text data-ig-text="item2" data-ig-contrast="primary" data-ig-font="primary" transform="translate(${cx - s * 0.43} ${cy + s / 2 + 2}) skewY(30)" text-anchor="middle" font-size="36" font-weight="bold" fill="#ffffff">Market</text>`;
    body += `<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" transform="translate(${cx + s * 0.43} ${cy + s / 2 + 2}) skewY(-30)" text-anchor="middle" font-size="36" font-weight="bold" fill="#ffffff">Team</text>`;
    return { body, usage: { item1: "top face", item2: "left face", item3: "right face" }, labels: { item1: "Top", item2: "Left", item3: "Right" }, fieldDefaults: { item1: "Product", item2: "Market", item3: "Team" } };
  },
});

// ---- Cylinders (stacked data tiers) ----
families.push({
  family: "cylinders", title: "Stacked Cylinders", category: "Hierarchy", counts: [3, 4, 5], unit: "tiers",
  description: (n) => `${n} stacked cylinders, each a labeled tier.`,
  familyDescription: "Stacked cylinders (user-defined), each a labeled tier of a column.",
  about: "Stacked cylinders read as a database, a column, or a stack of coins depending on the story. Use it for data tiers, storage layers, accumulated reserves, or architectural layers.",
  draw(n) {
    const cx = 500, rx = 300, ry = 46, total = 700, h = total / n;
    let body = "";
    for (let i = n - 1; i >= 0; i--) {
      const yTop = 130 + i * h;
      const s = slot(n - 1 - i);
      body += path(`M${cx - rx} ${num(yTop)} v${num(h - ry)} a${rx} ${ry} 0 0 0 ${rx * 2} 0 v-${num(h - ry)} Z`, s);
      body += shade(`M${cx} ${num(yTop)} v${num(h - ry)} a${rx} ${ry} 0 0 0 ${rx} 0 v-${num(h - ry)} Z`, 0.12);
      body += `<ellipse data-ig-fill="${s}" cx="${cx}" cy="${num(yTop)}" rx="${rx}" ry="${ry}"/>` + light(`M${cx - rx} ${num(yTop)} a${rx} ${ry} 0 0 1 ${rx * 2} 0 a${rx} ${ry} 0 0 1 -${rx * 2} 0 Z`, 0.3);
      body += txt(KEYS[n - 1 - i], cx, yTop + ry + (h - ry) / 2 + 12, n > 4 ? 28 : 32, { contrast: s, def: this.defaults[n - 1 - i] });
    }
    return { body, ...itemFields(n, "Tier", "tier (top first)", this.defaults) };
  },
  defaults: ["Applications", "Services", "Data", "Infrastructure", "Network"],
});

// ---- Bookshelf ----
families.push({
  family: "bookshelf", title: "Bookshelf", category: "List", counts: [3, 4, 5], unit: "books",
  description: (n) => `${n} book spines standing on a shelf.`,
  familyDescription: "Book spines (user-defined) standing side by side on a shelf.",
  about: "The bookshelf puts each topic on its own spine, side by side like a reference set. Use it for bodies of knowledge, course modules, policy volumes, or product lines.",
  draw(n) {
    const shelfY = 820, x0 = 110, W = 780, g = 14, w = (W - g * (n - 1)) / n;
    let body = "";
    for (let i = 0; i < n; i++) {
      const h = 520 + ((i * 7) % 3) * 50, x = x0 + i * (w + g), y = shelfY - h;
      body += rect(x, y, w, h, slot(i), { rx: 6 }) + shade(`M${x} ${y} h18 v${h} h-18 Z`, 0.18) + line(x + 18, y + 40, x + w - 12, y + 40, A, 4, { opacity: 0.25 }) + line(x + 18, shelfY - 40, x + w - 12, shelfY - 40, A, 4, { opacity: 0.25 });
      body += `<text data-ig-text="${KEYS[i]}" data-ig-contrast="${slot(i)}" data-ig-font="primary" transform="translate(${num(x + w / 2 + 12)} ${num(y + h / 2)}) rotate(-90)" text-anchor="middle" font-size="${n > 4 ? 28 : 32}" font-weight="bold" fill="#ffffff">${this.defaults[i]}</text>`;
    }
    body += rect(60, shelfY, 880, 34, A, { rx: 6 }) + shade(`M60 ${shelfY + 34} h880 v14 h-880 Z`, 0.3);
    return { body, ...itemFields(n, "Book", "spine", this.defaults) };
  },
  defaults: ["Strategy", "Operations", "Finance", "People", "Technology"],
});

// ---- Brick wall ----
families.push({
  family: "brick-wall", title: "Brick Wall", category: "Hierarchy", counts: [5, 7], unit: "bricks",
  description: (n) => `${n} bricks in staggered courses building up a wall.`,
  familyDescription: "Bricks (user-defined) laid in staggered courses, each resting on the ones below.",
  about: "The brick wall says every layer depends on the course beneath it. Use it for foundations and capabilities, prerequisite skills, or incremental trust built over time.",
  draw(n) {
    const rows = n === 5 ? [3, 2] : [4, 3];
    const bw = 280, bh = 200, g = 14;
    let body = "", idx = 0;
    const totalH = rows.length * (bh + g);
    const y0 = 500 + totalH / 2 - bh;
    rows.forEach((count, r) => {
      const rowW = count * bw + (count - 1) * g;
      const x0 = 500 - rowW / 2, y = y0 - r * (bh + g);
      for (let c = 0; c < count; c++) {
        const x = x0 + c * (bw + g);
        body += rect(x, y, bw, bh, slot(idx), { rx: 8 }) + txt(KEYS[idx], x + bw / 2, y + bh / 2 + 11, 28, { contrast: slot(idx), def: this.defaults[idx] });
        idx++;
      }
    });
    return { body, ...itemFields(n, "Brick", "brick (bottom row first)", this.defaults) };
  },
  defaults: ["Trust", "Clarity", "Skills", "Tools", "Habits", "Feedback", "Results"],
});

// ---- Podium ----
families.push({
  family: "podium", title: "Podium", category: "Comparison", counts: [3, 5], unit: "places",
  description: (n) => `Winner's podium with ${n} ranked places.`,
  familyDescription: "A winner's podium with ranked places (user-defined), tallest in the middle.",
  about: "The podium ranks a small set with the winner on the tallest block. Use it for top performers, prioritized options, or competition results where order is the message.",
  draw(n) {
    const order = n === 3 ? [1, 0, 2] : [3, 1, 0, 2, 4]; // left-to-right ranks
    const heights = [420, 320, 250, 190, 140];
    const w = n === 3 ? 240 : 160, g = 10, base = 850;
    const total = n * w + (n - 1) * g, x0 = 500 - total / 2;
    let body = "";
    order.forEach((rank, pos) => {
      const h = heights[rank], x = x0 + pos * (w + g), y = base - h;
      body += rect(x, y, w, h, slot(rank), { rx: 10 }) + light(`M${x} ${y} h${w} v18 h-${w} Z`, 0.25);
      body += txt(null, x + w / 2, y + 70, 56, { contrast: slot(rank), def: String(rank + 1) });
      body += txt(KEYS[rank], x + w / 2, y - 28, n === 3 ? 30 : 24, { def: this.defaults[rank] });
    });
    return { body, ...itemFields(n, "Place", "podium place", this.defaults) };
  },
  defaults: ["Gold", "Silver", "Bronze", "Fourth", "Fifth"],
});

// ---- Signal bars ----
families.push({
  family: "signal-bars", title: "Signal Bars", category: "Process", counts: [3, 4, 5], unit: "bars",
  description: (n) => `${n} ascending bars like a signal-strength meter.`,
  familyDescription: "Ascending bars (user-defined) like a signal-strength meter, each a stronger level.",
  about: "Signal bars show strength growing level by level. Use it for maturity scales, confidence levels, adoption stages, or anything that gets stronger as you move right.",
  draw(n) {
    const w = n > 4 ? 130 : 160, g = 28, base = 700, total = n * w + (n - 1) * g, x0 = 500 - total / 2;
    let body = "";
    for (let i = 0; i < n; i++) {
      const h = 140 + (480 * i) / (n - 1), x = x0 + i * (w + g), y = base - h;
      body += rect(x, y, w, h, slot(i), { rx: 16 }) + badge(x + w / 2, y + 50, 30, A, i + 1, 28);
      body += txt(KEYS[i], x + w / 2, base + 50, 26, { def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Level", "bar", this.defaults) };
  },
  defaults: ["Aware", "Trying", "Using", "Relying", "Advocating"],
});

// ---- Battery ----
families.push({
  family: "battery", title: "Battery", category: "Process", counts: [3, 4, 5], unit: "cells",
  description: (n) => `A battery filling up through ${n} labeled cells.`,
  familyDescription: "A battery filling up through labeled cells (user-defined), from empty to full.",
  about: "The battery charges one cell at a time, so each cell is a stage toward full power. Use it for energy and momentum stories, readiness levels, or funding stages.",
  draw(n) {
    const x0 = 120, y0 = 330, W = 720, H = 340, pad = 24;
    let body = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" rx="36" fill="#ffffff" data-ig-stroke="accent" stroke="#495057" stroke-width="18"/>` + rect(x0 + W + 9, y0 + H / 2 - 60, 50, 120, A, { rx: 14 });
    const g = 14, cw = (W - 2 * pad - g * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const x = x0 + pad + i * (cw + g);
      body += rect(x, y0 + pad, cw, H - 2 * pad, slot(i), { rx: 14 });
      body += txt(null, x + cw / 2, y0 + H / 2 + 20, 56, { contrast: slot(i), def: String(i + 1) });
      body += txt(KEYS[i], x + cw / 2, y0 + H + 60, 26, { def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Cell", "cell", this.defaults) };
  },
  defaults: ["Rest", "Recharge", "Focus", "Deliver", "Sustain"],
});

// ---- Hourglass ----
families.push({
  family: "hourglass", title: "Hourglass", category: "Relationship", counts: [4, 6], unit: "items",
  description: (n) => `${n / 2} inputs narrowing through a neck into ${n / 2} outputs.`,
  familyDescription: "Inputs (user-defined) narrowing through a neck into an equal number of outputs.",
  about: "The hourglass converges many inputs through one narrow point and expands again. Use it for funnel-then-fan stories: research into insight into actions, or many sources into one decision into many consequences.",
  draw(n) {
    const k = n / 2, cx = 500, neckY = 500;
    const topY = 110, botY = 890;
    let body = poly([[cx - 320, topY], [cx + 320, topY], [cx + 40, neckY], [cx - 40, neckY]], P, { opacity: 0.18 }) + poly([[cx - 40, neckY], [cx + 40, neckY], [cx + 320, botY], [cx - 320, botY]], S, { opacity: 0.18 });
    body += stroke(`M${cx - 320} ${topY} H${cx + 320} L${cx + 40} ${neckY} L${cx + 320} ${botY} H${cx - 320} L${cx - 40} ${neckY} Z`, A, 10);
    body += circ(cx, neckY, 34, A) + txt("other1", cx + 60, neckY + 10, 30, { def: "Decision", anchor: "start" });
    for (let j = 0; j < k; j++) {
      const yT = topY + 70 + j * 100, yB = botY - 70 - (k - 1 - j) * 100;
      const wAt = (y) => Math.min(480, 2 * (40 + (280 * Math.abs(y - neckY)) / (neckY - topY) - 50));
      body += chip(cx, yT, wAt(yT), 64, slot(j), KEYS[j], this.defaults[j], 26);
      body += chip(cx, yB, wAt(yB), 64, slot(k + j), KEYS[k + j], this.defaults[k + j], 26);
    }
    const f = { usage: {}, labels: {}, fieldDefaults: {} };
    for (let j = 0; j < k; j++) { f.usage[KEYS[j]] = `input ${j + 1}`; f.labels[KEYS[j]] = `Input ${j + 1}`; f.fieldDefaults[KEYS[j]] = this.defaults[j]; }
    for (let j = 0; j < k; j++) { f.usage[KEYS[k + j]] = `output ${j + 1}`; f.labels[KEYS[k + j]] = `Output ${j + 1}`; f.fieldDefaults[KEYS[k + j]] = this.defaults[k + j]; }
    f.usage.other1 = "neck"; f.labels.other1 = "Neck"; f.fieldDefaults.other1 = "Decision";
    return { body, ...f };
  },
  defaults: ["Surveys", "Interviews", "Analytics", "Roadmap", "Pricing", "Support"],
});

// ---- Bowtie ----
families.push({
  family: "bowtie", title: "Bowtie", category: "Analysis", counts: [4, 6], unit: "items",
  description: (n) => `${n / 2} causes converging on a center event, ${n / 2} consequences fanning out.`,
  familyDescription: "Causes (user-defined) converging on a central event and consequences fanning out the other side.",
  about: "The bowtie is the risk analyst's diagram: causes on the left, the critical event in the knot, consequences on the right. Use it for risk registers, incident reviews, or any cause-event-effect story.",
  draw(n) {
    const k = n / 2, cx = 500, cy = 500;
    let body = poly([[90, 160], [cx - 90, cy], [90, 840]], P, { opacity: 0.12 }) + poly([[910, 160], [cx + 90, cy], [910, 840]], S, { opacity: 0.12 });
    for (let j = 0; j < k; j++) {
      const y = 200 + ((600) * (j + 0.5)) / k;
      body += stroke(`M${260} ${num(y)} L${cx - 110} ${num(cy)}`, P, 8) + stroke(`M${740} ${num(y)} L${cx + 110} ${num(cy)}`, S, 8);
      body += chip(200, y, 260, 70, P, KEYS[j], this.defaults[j], 26) + chip(800, y, 260, 70, S, KEYS[k + j], this.defaults[k + j], 26);
    }
    body += circ(cx, cy, 100, A) + txt("other1", cx, cy + 12, 30, { contrast: A, def: "Event" });
    body += txt(null, 200, 130, 28, { def: "Causes", fill: "#495057", font: "secondary" }) + txt(null, 800, 130, 28, { def: "Consequences", fill: "#495057", font: "secondary" });
    const f = { usage: {}, labels: {}, fieldDefaults: {} };
    for (let j = 0; j < k; j++) { f.usage[KEYS[j]] = `cause ${j + 1}`; f.labels[KEYS[j]] = `Cause ${j + 1}`; f.fieldDefaults[KEYS[j]] = this.defaults[j]; }
    for (let j = 0; j < k; j++) { f.usage[KEYS[k + j]] = `consequence ${j + 1}`; f.labels[KEYS[k + j]] = `Consequence ${j + 1}`; f.fieldDefaults[KEYS[k + j]] = this.defaults[k + j]; }
    f.usage.other1 = "center event"; f.labels.other1 = "Event"; f.fieldDefaults.other1 = "Event";
    return { body, ...f };
  },
  defaults: ["Human error", "Equipment", "Weather", "Downtime", "Injury", "Cost"],
});
