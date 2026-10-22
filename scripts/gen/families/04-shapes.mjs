import { P, S, T, Q, A, slot, txt, circ, ring, badge, chip, rect, poly, path, stroke, line, shade, light, polar, num, arcD, sectorD, wedgeD, arrowHead, itemFields, KEYS, WHITE, DARK } from "../lib.mjs";

const anchorFor = (dx) => (dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle");
export const families = [];

// ---- Radar axes ----
families.push({
  family: "radar", title: "Radar Axes", category: "Analysis", counts: [5, 6], unit: "axes",
  description: (n) => `${n} labeled axes on a radar web with a shaded profile.`,
  familyDescription: "Labeled axes (user-defined) on a radar web with a shaded profile shape.",
  about: "The radar web lays competing dimensions around a center so a profile shape emerges. Use it for skill assessments, product comparisons, or balanced scorecards where shape matters more than numbers.",
  draw(n) {
    const cx = 500, cy = 510, R = 300;
    let body = "";
    for (let k = 1; k <= 4; k++) {
      const pts = []; for (let i = 0; i < n; i++) pts.push(polar(cx, cy, (R * k) / 4, -90 + (360 * i) / n));
      body += `<polygon points="${pts.map(([x, y]) => `${num(x)},${num(y)}`).join(" ")}" fill="none" stroke="#adb5bd" stroke-width="${k === 4 ? 4 : 2}"/>`;
    }
    for (let i = 0; i < n; i++) { const [x, y] = polar(cx, cy, R, -90 + (360 * i) / n); body += line(cx, cy, x, y, A, 3, { opacity: 0.5 }); }
    const prof = [0.85, 0.6, 0.9, 0.5, 0.7, 0.8];
    const pts = []; for (let i = 0; i < n; i++) pts.push(polar(cx, cy, R * prof[i], -90 + (360 * i) / n));
    body += poly(pts, P, { opacity: 0.35 }) + stroke(pts.map(([x, y], i) => `${i ? "L" : "M"}${num(x)} ${num(y)}`).join(" ") + " Z", P, 8);
    pts.forEach(([x, y], i) => { body += ring(x, y, 12, slot(i), 8); });
    for (let i = 0; i < n; i++) {
      const a = -90 + (360 * i) / n, [x, y] = polar(cx, cy, R + 60, a);
      body += txt(KEYS[i], x, y + 10, 28, { def: this.defaults[i], anchor: anchorFor(Math.cos((a * Math.PI) / 180)) });
    }
    return { body, ...itemFields(n, "Axis", "axis", this.defaults) };
  },
  defaults: ["Speed", "Quality", "Cost", "Reach", "Support", "Design"],
});

// ---- Network ring ----
families.push({
  family: "network", title: "Network", category: "Relationship", counts: [5, 6], unit: "nodes",
  description: (n) => `${n} nodes on a ring, every one linked to every other.`,
  familyDescription: "Nodes (user-defined) on a ring with every node linked to every other.",
  about: "The network shows peers, not a hierarchy: every node connects to every other. Use it for partner ecosystems, cross-functional teams, or integrations where everything talks to everything.",
  draw(n) {
    const cx = 500, cy = 500, R = 310;
    const pts = []; for (let i = 0; i < n; i++) pts.push(polar(cx, cy, R, -90 + (360 * i) / n));
    let body = "";
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) body += line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], A, 4, { opacity: 0.45 });
    pts.forEach(([x, y], i) => {
      const a = -90 + (360 * i) / n, [lx, ly] = polar(cx, cy, R + 78, a);
      body += badge(x, y, 44, slot(i), i + 1, 36) + txt(KEYS[i], lx, ly + 10, 28, { def: this.defaults[i], anchor: anchorFor(Math.cos((a * Math.PI) / 180)) });
    });
    return { body, ...itemFields(n, "Node", "node", this.defaults) };
  },
  defaults: ["Sales", "Product", "Support", "Finance", "Marketing", "Ops"],
});

// ---- Interlocking rings ----
families.push({
  family: "rings", title: "Linked Rings", category: "Relationship", counts: [3, 4, 5], unit: "rings",
  description: (n) => `${n} interlocking rings in a row.`,
  familyDescription: "Interlocking rings (user-defined) in a row, each overlapping its neighbors.",
  about: "Linked rings show units that overlap but keep their own identity. Use it for partnerships, shared responsibilities, or teams that hand off to each other.",
  draw(n) {
    const r = n > 4 ? 120 : 150, sw = 34, step = r * 1.5, total = step * (n - 1), x0 = 500 - total / 2;
    let body = "";
    for (let i = 0; i < n; i++) {
      const x = x0 + i * step, y = 460 + (i % 2 ? 60 : -60);
      body += `<circle cx="${num(x)}" cy="${y}" r="${r}" fill="none" data-ig-stroke="${slot(i)}" stroke="#000" stroke-width="${sw}"/>`;
    }
    for (let i = 0; i < n - 1; i++) {
      const x = x0 + i * step, y = 460 + (i % 2 ? 60 : -60), nx = x + step;
      body += `<clipPath id="ring-${i}"><rect x="${num((x + nx) / 2 - 10)}" y="${y - r - sw}" width="${num(step)}" height="${num(r + sw)}"/></clipPath>`;
      body += `<circle clip-path="url(#ring-${i})" cx="${num(x)}" cy="${y}" r="${r}" fill="none" data-ig-stroke="${slot(i)}" stroke="#000" stroke-width="${sw}"/>`;
    }
    for (let i = 0; i < n; i++) {
      const x = x0 + i * step, y = 460 + (i % 2 ? 60 : -60);
      body += txt(KEYS[i], x, i % 2 ? y + r + 70 : y - r - 40, 28, { def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Ring", "ring", this.defaults) };
  },
  defaults: ["Design", "Engineering", "Marketing", "Sales", "Support"],
});

// ---- Cross / plus ----
families.push({
  family: "cross", title: "Cross", category: "Relationship", counts: [4], unit: "arms",
  description: "Four arms meeting at a center, each a labeled theme.",
  familyDescription: "Four arms (user-defined) meeting at a labeled center.",
  about: "The cross puts four themes on equal footing around one center. Use it for four-part frameworks, balanced priorities, or anything with a core and four directions.",
  draw() {
    const cx = 500, cy = 500, armW = 200, L = 380, g = 14;
    let body = "";
    const arms = [[cx - armW / 2, cy - L, armW, L - g], [cx + g, cy - armW / 2, L - g, armW], [cx - armW / 2, cy + g, armW, L - g], [cx - L, cy - armW / 2, L - g, armW]];
    arms.forEach(([x, y, w, h], i) => { body += rect(x, y, w, h, slot(i), { rx: 24 }); });
    body += txt("item1", cx, cy - L / 2 - 40, 30, { contrast: P, def: this.defaults[0] }) + txt("item2", cx + L / 2 + 60, cy + 10, 30, { contrast: S, def: this.defaults[1] }) + txt("item3", cx, cy + L / 2 + 60, 30, { contrast: T, def: this.defaults[2] }) + txt("item4", cx - L / 2 - 60, cy + 10, 30, { contrast: Q, def: this.defaults[3] });
    body += circ(cx, cy, 120, A) + txt("other1", cx, cy + 12, 32, { contrast: A, def: "Core" });
    const f = itemFields(4, "Arm", "arm", this.defaults);
    f.labels = { item1: "Top", item2: "Right", item3: "Bottom", item4: "Left" };
    f.usage.other1 = "center"; f.labels.other1 = "Center"; f.fieldDefaults.other1 = "Core";
    return { body, ...f };
  },
  defaults: ["Mission", "Market", "Money", "Momentum"],
});

// ---- Bunting ----
families.push({
  family: "bunting", title: "Bunting", category: "List", counts: [4, 5, 6], unit: "flags",
  description: (n) => `${n} pennant flags hanging from a draped string.`,
  familyDescription: "Pennant flags (user-defined) hanging from a draped string.",
  about: "Bunting is celebratory by nature. Use it for wins to announce, event agendas, team shout-outs, or a festive list of highlights.",
  draw(n) {
    const x0 = 60, x1 = 940, y = 220, sag = 150;
    const pt = (t) => [x0 + (x1 - x0) * t, y + sag * 4 * t * (1 - t)];
    const dpt = (t) => [(x1 - x0), sag * 4 * (1 - 2 * t)];
    let body = stroke(`M${x0} ${y} Q500 ${y + sag * 2} ${x1} ${y}`, A, 8);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, [x, yy] = pt(t), [dx, dy] = dpt(t), ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      const w = Math.min(190, (x1 - x0) / n - 20), h = 300;
      body += `<g transform="translate(${num(x)} ${num(yy)}) rotate(${num(ang)})">` + poly([[-w / 2, 0], [w / 2, 0], [0, h]], slot(i)) + shade(`M0 0 L${w / 2} 0 L0 ${h} Z`, 0.12) + `<text data-ig-text="${KEYS[i]}" data-ig-contrast="${slot(i)}" data-ig-font="primary" transform="translate(0 ${h * 0.42}) rotate(-90)" text-anchor="middle" font-size="${n > 5 ? 24 : 26}" font-weight="bold" fill="#ffffff">${this.defaults[i]}</text></g>`;
    }
    body += circ(x0, y, 14, A) + circ(x1, y, 14, A);
    return { body, ...itemFields(n, "Flag", "flag", this.defaults) };
  },
  defaults: ["Launch", "Record Q3", "New office", "Team of 50", "Award", "Partnership"],
});

// ---- Cascade ----
families.push({
  family: "cascade", title: "Cascade", category: "Process", counts: [3, 4, 5], unit: "steps",
  description: (n) => `${n} steps cascading diagonally down and to the right.`,
  familyDescription: "Steps (user-defined) cascading diagonally, each hanging off the one before.",
  about: "The cascade shows how one step leads to the next in a falling diagonal. Use it for consequences, waterfall plans, or anything where each stage flows down from the last.",
  draw(n) {
    const w = 360, h = 120, dx = (900 - w) / (n - 1), dy = (900 - h) / (n - 1);
    let body = "";
    for (let i = 0; i < n; i++) {
      const x = 50 + i * dx, y = 50 + i * dy;
      if (i) body += stroke(`M${num(x - dx + w / 2)} ${num(y - dy + h)} V${num(y + h / 2)} H${num(x - 10)}`, A, 8, { cap: "butt" }) + arrowHead(x, y + h / 2, 0, 24, A);
      body += rect(x, y, w, h, slot(i), { rx: 18 }) + badge(x + 44, y + h / 2, 30, A, i + 1, 28) + txt(KEYS[i], x + w / 2 + 24, y + h / 2 + 10, 28, { contrast: slot(i), def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Step", "step", this.defaults) };
  },
  defaults: ["Trigger", "Response", "Outcome", "Follow-up", "Lesson"],
});

// ---- Block pyramid ----
families.push({
  family: "block-pyramid", title: "Block Pyramid", category: "Hierarchy", counts: [6], unit: "blocks",
  description: "Six individual blocks stacked in rows of one, two and three.",
  familyDescription: "Individual blocks (user-defined) stacked in rows of one, two and three.",
  about: "The block pyramid is built from separate blocks rather than sliced from one triangle, so every block is its own item. Use it for prerequisites, building blocks, or layered hierarchies with distinct members.",
  draw() {
    const bw = 270, bh = 170, g = 14, rows = [1, 2, 3];
    let body = "", idx = 0;
    rows.forEach((count, r) => {
      const rowW = count * bw + (count - 1) * g, x0 = 500 - rowW / 2, y = 130 + r * (bh + g);
      for (let c = 0; c < count; c++) {
        const x = x0 + c * (bw + g);
        body += rect(x, y, bw, bh, slot(idx), { rx: 12 }) + txt(KEYS[idx], x + bw / 2, y + bh / 2 + 11, 28, { contrast: slot(idx), def: this.defaults[idx] });
        idx++;
      }
    });
    return { body, ...itemFields(6, "Block", "block (top first)", this.defaults) };
  },
  defaults: ["Vision", "Strategy", "Goals", "People", "Process", "Tools"],
});

// ---- Helix ----
families.push({
  family: "helix", title: "Double Helix", category: "Process", counts: [4, 6], unit: "stages",
  description: (n) => `${n} stages along two intertwined strands.`,
  familyDescription: "Stages (user-defined) along two intertwined strands joined by rungs.",
  about: "The double helix weaves two strands that keep crossing, with each rung a stage where they connect. Use it for paired tracks like research and delivery, people and technology, or supply and demand.",
  draw(n) {
    const x0 = 80, x1 = 920, cy = 500, amp = 150, turns = n / 2;
    const f = (t, phase) => [x0 + (x1 - x0) * t, cy + amp * Math.sin(2 * Math.PI * turns * t + phase)];
    const strand = (phase) => { let d = ""; for (let s = 0; s <= 200; s++) { const [x, y] = f(s / 200, phase); d += `${s ? "L" : "M"}${num(x)} ${num(y)} `; } return d; };
    let body = "";
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, [ax, ay] = f(t, 0), [bx, by] = f(t, Math.PI);
      body += line(ax, ay, bx, by, A, 8, { opacity: 0.5 });
    }
    body += stroke(strand(0), P, 18) + stroke(strand(Math.PI), S, 18);
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n, [x] = f(t, 0);
      const up = i % 2 === 0;
      body += badge(x, cy, 30, slot(i), i + 1, 26) + txt(KEYS[i], x, up ? cy - amp - 60 : cy + amp + 85, 26, { def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Stage", "stage", this.defaults) };
  },
  defaults: ["Research", "Design", "Build", "Validate", "Ship", "Learn"],
});

// ---- Signpost ----
families.push({
  family: "signpost", title: "Signpost", category: "Comparison", counts: [3, 4, 5], unit: "signs",
  description: (n) => `${n} directional signs pointing from one post.`,
  familyDescription: "Directional signs (user-defined) pointing left and right from a single post.",
  about: "The signpost lays out the directions you could take from here. Use it for strategic options, career paths, or a menu of next steps at a decision point.",
  draw(n) {
    const px = 500, top = 110, base = 900, sh = 86, gap = 26;
    let body = rect(px - 22, top, 44, base - top, A, { rx: 10 }) + rect(px - 60, base - 30, 120, 40, A, { rx: 10 });
    for (let i = 0; i < n; i++) {
      const y = top + 40 + i * (sh + gap), right = i % 2 === 0, w = 360;
      const x = right ? px - 10 : px + 10;
      const pts = right ? [[x, y], [x + w, y], [x + w + 50, y + sh / 2], [x + w, y + sh], [x, y + sh]] : [[x, y], [x - w, y], [x - w - 50, y + sh / 2], [x - w, y + sh], [x, y + sh]];
      body += poly(pts, slot(i)) + txt(KEYS[i], right ? x + w / 2 : x - w / 2, y + sh / 2 + 10, 28, { contrast: slot(i), def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Sign", "sign", this.defaults) };
  },
  defaults: ["Expand", "Specialize", "Partner", "Acquire", "Hold"],
});

// ---- Speech bubbles ----
families.push({
  family: "dialogue", title: "Dialogue", category: "Comparison", counts: [3, 4, 5], unit: "bubbles",
  description: (n) => `${n} speech bubbles alternating between two sides.`,
  familyDescription: "Speech bubbles (user-defined) alternating between two sides of a conversation.",
  about: "Dialogue bubbles turn a list into a conversation: question and answer, objection and response, customer and company. Use it for FAQs, sales objections, or point-counterpoint.",
  draw(n) {
    const w = 560, h = 110, dy = (900 - h) / (n - 1) - 0;
    let body = "";
    for (let i = 0; i < n; i++) {
      const left = i % 2 === 0, y = 50 + i * Math.min(dy, 170), x = left ? 60 : 940 - w, s = left ? P : S;
      body += rect(x, y, w, h, s, { rx: 30 }) + poly(left ? [[x + 40, y + h - 2], [x + 40, y + h + 36], [x + 86, y + h - 2]] : [[x + w - 40, y + h - 2], [x + w - 40, y + h + 36], [x + w - 86, y + h - 2]], s);
      body += txt(KEYS[i], x + w / 2, y + h / 2 + 10, 28, { contrast: s, def: this.defaults[i] });
      body += circ(left ? x - 0 - 0 + w + 70 : x - 70, y + h / 2, 40, A) + circ(left ? x + w + 70 : x - 70, y + h / 2 - 12, 14, left ? S : P);
    }
    return { body, ...itemFields(n, "Bubble", "speech bubble", this.defaults) };
  },
  defaults: ["Is it secure?", "Yes, end to end", "What does it cost?", "Less than you pay now", "When can we start?"],
});

// ---- Bubbles ranking ----
families.push({
  family: "bubbles", title: "Bubble Rank", category: "Comparison", counts: [3, 4, 5], unit: "bubbles",
  description: (n) => `${n} bubbles shrinking from biggest to smallest.`,
  familyDescription: "Bubbles (user-defined) ordered from biggest to smallest.",
  about: "Bubble rank uses size instead of numbers: the biggest circle is the biggest deal. Use it for priorities, market sizes, or effort levels when relative scale tells the story.",
  draw(n) {
    const radii = { 3: [210, 150, 100], 4: [190, 140, 100, 70], 5: [170, 130, 100, 75, 55] }[n];
    const gap = 30; let total = radii.reduce((a, r) => a + 2 * r, 0) + gap * (n - 1), x = 500 - total / 2;
    let body = "";
    radii.forEach((r, i) => {
      const cx = x + r, cy = 480;
      body += circ(cx, cy, r, slot(i)) + light(`M${num(cx - r * 0.5)} ${num(cy - r * 0.5)} a${r * 0.3} ${r * 0.3} 0 1 1 0.1 0 Z`, 0.25) + txt(null, cx, cy + r * 0.22, r * 0.6, { contrast: slot(i), def: String(i + 1) });
      body += txt(KEYS[i], cx, cy + r + 50, Math.max(22, Math.min(30, r / 5)), { def: this.defaults[i] });
      x += 2 * r + gap;
    });
    return { body, ...itemFields(n, "Bubble", "bubble (largest first)", this.defaults) };
  },
  defaults: ["Enterprise", "Mid-market", "SMB", "Startups", "Individuals"],
});

// ---- Tabs ----
families.push({
  family: "tabs", title: "Folder Tabs", category: "List", counts: [3, 4, 5], unit: "tabs",
  description: (n) => `${n} stacked folder tabs with the first one open.`,
  familyDescription: "Stacked folder tabs (user-defined) with the first one open to a summary.",
  about: "Folder tabs organize topics the way a filing cabinet does, with one tab open to show its contents. Use it for sections of a report, policy areas, or categories with one highlighted.",
  draw(n) {
    const x0 = 60, W = 880, tabH = 70, tabW = Math.min(240, (W - 20) / n), top = 160;
    let body = "";
    for (let i = n - 1; i >= 1; i--) {
      const x = x0 + i * ((W - tabW) / (n - 1));
      body += path(`M${num(x)} ${top + tabH} V${top + 22} q0 -22 22 -22 H${num(x + tabW - 22)} q22 0 22 22 V${top + tabH} Z`, slot(i)) + txt(KEYS[i], x + tabW / 2, top + 46, 24, { contrast: slot(i), def: this.defaults[i] });
    }
    body += path(`M${x0} ${top + tabH} V${top + 22} q0 -22 22 -22 H${num(x0 + tabW - 22)} q22 0 22 22 V${top + tabH} Z`, P) + txt("item1", x0 + tabW / 2, top + 46, 24, { contrast: P, def: this.defaults[0] });
    body += rect(x0, top + tabH - 4, W, 620, P, { rx: 22 }) + `<rect x="${x0 + 24}" y="${top + tabH + 24}" width="${W - 48}" height="${620 - 52}" rx="16" fill="#ffffff" fill-opacity="0.92"/>`;
    body += txt("other1", x0 + 60, top + tabH + 110, 34, { def: "Summary", anchor: "start" }) + line(x0 + 60, top + tabH + 150, x0 + 500, top + tabH + 150, A, 6, { opacity: 0.3 });
    for (let r = 0; r < 4; r++) body += line(x0 + 60, top + tabH + 210 + r * 60, x0 + W - 60 - (r % 2) * 180, top + tabH + 210 + r * 60, A, 10, { opacity: 0.12 });
    const f = itemFields(n, "Tab", "tab", this.defaults);
    f.usage.other1 = "open tab heading"; f.labels.other1 = "Heading"; f.fieldDefaults.other1 = "Summary";
    return { body, ...f };
  },
  defaults: ["Overview", "Finance", "People", "Product", "Risks"],
});

// ---- Shields ----
families.push({
  family: "shields", title: "Shields", category: "List", counts: [3, 4, 5], unit: "shields",
  description: (n) => `${n} shields in a row, each a protected principle.`,
  familyDescription: "Shields (user-defined) in a row, each standing for a protected principle.",
  about: "Shields signal protection and principle. Use it for security layers, guarantees, core values, or commitments you stand behind.",
  draw(n) {
    const w = Math.min(230, (880 - 20 * (n - 1)) / n), h = w * 1.2, y = 500 - h / 2, total = n * w + 20 * (n - 1), x0 = 500 - total / 2;
    let body = "";
    for (let i = 0; i < n; i++) {
      const x = x0 + i * (w + 20);
      const d = `M${num(x)} ${num(y + 20)} q${num(w / 2)} -30 ${num(w)} 0 V${num(y + h * 0.55)} q0 ${num(h * 0.3)} -${num(w / 2)} ${num(h * 0.45)} q-${num(w / 2)} -${num(h * 0.15)} -${num(w / 2)} -${num(h * 0.45)} Z`;
      body += path(d, slot(i)) + shade(`M${num(x + w / 2)} ${num(y + 5)} L${num(x + w)} ${num(y + 20)} V${num(y + h * 0.55)} q0 ${num(h * 0.3)} -${num(w / 2)} ${num(h * 0.45)} Z`, 0.12);
      body += badge(x + w / 2, y + h * 0.42, w * 0.18, A, i + 1, w * 0.17) + txt(KEYS[i], x + w / 2, y + h + 50, n > 4 ? 24 : 28, { def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Shield", "shield", this.defaults) };
  },
  defaults: ["Privacy", "Uptime", "Encryption", "Compliance", "Backups"],
});

// ---- Tickets ----
families.push({
  family: "tickets", title: "Ticket Stubs", category: "List", counts: [3, 4, 5], unit: "tickets",
  description: (n) => `${n} ticket stubs with perforated edges.`,
  familyDescription: "Ticket stubs (user-defined) with perforated edges and a numbered stub.",
  about: "Ticket stubs make each item feel like an admission: an event, a pass, a deliverable. Use it for agendas, feature passes, or milestones worth a ticket.",
  draw(n) {
    const w = 700, h = Math.min(130, (880 - 20 * (n - 1)) / n), x = 150, total = n * h + 24 * (n - 1), y0 = 500 - total / 2, stub = 150, r = 22;
    let body = "";
    for (let i = 0; i < n; i++) {
      const y = y0 + i * (h + 24), s = slot(i);
      const d = `M${x + r} ${y} H${x + w - r} a${r} ${r} 0 0 1 ${r} ${r} V${y + h - r} a${r} ${r} 0 0 1 -${r} ${r} H${x + r} a${r} ${r} 0 0 1 -${r} -${r} V${y + r} a${r} ${r} 0 0 1 ${r} -${r} Z`;
      body += path(d, s);
      body += `<circle cx="${x + w - stub}" cy="${y}" r="16" fill="#ffffff"/><circle cx="${x + w - stub}" cy="${y + h}" r="16" fill="#ffffff"/>` + line(x + w - stub, y + 24, x + w - stub, y + h - 24, A, 3, { dash: "6 8", opacity: 0.5 }).replace('data-ig-stroke="accent" stroke="#495057"', 'stroke="#ffffff"');
      body += txt(KEYS[i], x + (w - stub) / 2, y + h / 2 + 10, 28, { contrast: s, def: this.defaults[i] }) + txt(null, x + w - stub / 2, y + h / 2 + 12, 36, { contrast: s, def: String(i + 1).padStart(2, "0") });
    }
    return { body, ...itemFields(n, "Ticket", "ticket", this.defaults) };
  },
  defaults: ["Keynote", "Workshop", "Panel", "Networking", "Afterparty"],
});

// ---- Diamond grid ----
families.push({
  family: "diamond-grid", title: "Diamond Grid", category: "Relationship", counts: [5], unit: "diamonds",
  description: "Four diamonds around a center diamond.",
  familyDescription: "Four diamonds (user-defined) around a central diamond.",
  about: "The diamond grid clusters four themes tightly around a center with no gaps. Use it for frameworks with a core and four supporting elements that touch each other.",
  draw() {
    const cx = 500, cy = 500, s = 150, g = 8;
    const dia = (x, y, slotName, key, def, size) => poly([[x, y - s], [x + s, y], [x, y + s], [x - s, y]], slotName) + txt(key, x, y + 11, size, { contrast: slotName, def });
    let body = "";
    const spots = [[cx, cy - 2 * s - g], [cx + 2 * s + g, cy], [cx, cy + 2 * s + g], [cx - 2 * s - g, cy]];
    spots.forEach(([x, y], i) => { body += dia(x, y, slot(i), KEYS[i], this.defaults[i], 28); });
    body += dia(cx, cy, A, "item5", this.defaults[4], 30);
    const f = itemFields(5, "Diamond", "diamond", this.defaults);
    f.labels = { item1: "Top", item2: "Right", item3: "Bottom", item4: "Left", item5: "Center" };
    return { body, ...f };
  },
  defaults: ["Learn", "Build", "Measure", "Share", "Core"],
});

// ---- Wave layers ----
families.push({
  family: "wave-layers", title: "Wave Layers", category: "Hierarchy", counts: [3, 4, 5], unit: "layers",
  description: (n) => `${n} stacked wave layers from surface to depth.`,
  familyDescription: "Stacked wave layers (user-defined) from the surface down to the depths.",
  about: "Wave layers stack like water depths: surface, shallows, and deeper levels. Use it for levels of depth in an analysis, layers of a market, or how far something reaches.",
  draw(n) {
    const x0 = 60, x1 = 940, top = 150, bottom = 900, H = (bottom - top) / n;
    let body = "";
    for (let i = 0; i < n; i++) {
      const y = top + i * H, amp = 28;
      const d = `M${x0} ${num(y + amp)} C${x0 + 220} ${num(y - amp)} ${x1 - 220} ${num(y + 3 * amp)} ${x1} ${num(y + amp)} V${bottom} H${x0} Z`;
      body += path(d, i % 2 ? S : P, { opacity: 0.35 + (0.65 * i) / Math.max(1, n - 1) });
      body += txt(KEYS[i], 500, y + H / 2 + 36, 30, { contrast: i % 2 ? S : P, def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Layer", "layer (top first)", this.defaults) };
  },
  defaults: ["Awareness", "Engagement", "Conversion", "Retention", "Advocacy"],
});

// ---- Milestone flags ----
families.push({
  family: "flags", title: "Milestone Flags", category: "Timeline", counts: [3, 4, 5], unit: "flags",
  description: (n) => `${n} flags planted along a baseline.`,
  familyDescription: "Flags (user-defined) planted along a baseline, each marking a milestone.",
  about: "Milestone flags plant each achievement in the ground along a path. Use it for roadmaps, goals already claimed, or the checkpoints on a journey.",
  draw(n) {
    const x0 = 120, x1 = 880, base = 760;
    let body = line(60, base, 940, base, A, 10);
    for (let i = 0; i < n; i++) {
      const x = x0 + ((x1 - x0) * i) / (n - 1), h = 300 + (i % 2) * 120, top = base - h;
      body += line(x, base, x, top, A, 10) + circ(x, base, 16, A);
      body += poly([[x + 5, top], [x + 200, top + 45], [x + 5, top + 90]], slot(i)) + badge(x + 48, top + 45, 22, A, i + 1, 22);
      body += txt(KEYS[i], x + 6, top + 130, 26, { def: this.defaults[i], anchor: "start" });
    }
    return { body, ...itemFields(n, "Flag", "flag", this.defaults) };
  },
  defaults: ["MVP", "First 100", "Profitable", "Series B", "Global"],
});

// ---- Gantt ----
families.push({
  family: "gantt", title: "Gantt Bars", category: "Timeline", counts: [3, 4, 5], unit: "tracks",
  description: (n) => `${n} overlapping workstreams on a quarter grid.`,
  familyDescription: "Overlapping workstreams (user-defined) as bars on a quarter grid.",
  about: "Gantt bars show when things run and how they overlap. Use it for project phases, hiring plans, or campaign calendars where timing and overlap matter more than exact dates.",
  draw(n) {
    const x0 = 300, x1 = 940, top = 150, rowH = Math.min(110, 700 / n), cols = ["Q1", "Q2", "Q3", "Q4"];
    let body = "";
    cols.forEach((c, i) => { const x = x0 + ((x1 - x0) * i) / 4; body += `<rect x="${num(x)}" y="${top}" width="${num((x1 - x0) / 4)}" height="${num(n * rowH)}" fill="${i % 2 ? "#f1f3f5" : "#ffffff"}"/>` + txt(null, x + (x1 - x0) / 8, top - 24, 24, { def: c, fill: "#6c757d", font: "secondary" }); });
    const spans = [[0, 0.4], [0.25, 0.65], [0.5, 0.9], [0.1, 0.55], [0.7, 1]];
    for (let i = 0; i < n; i++) {
      const y = top + i * rowH, [a, b] = spans[i];
      body += txt(KEYS[i], x0 - 24, y + rowH / 2 + 10, 28, { def: this.defaults[i], anchor: "end" });
      body += rect(x0 + (x1 - x0) * a + 4, y + rowH * 0.25, (x1 - x0) * (b - a) - 8, rowH * 0.5, slot(i), { rx: rowH * 0.25 });
    }
    body += `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${num(n * rowH)}" fill="none" stroke="#dee2e6" stroke-width="3"/>`;
    return { body, ...itemFields(n, "Track", "workstream", this.defaults) };
  },
  defaults: ["Discovery", "Design", "Build", "Pilot", "Rollout"],
});

// ---- Harvey balls ----
families.push({
  family: "harvey-balls", title: "Harvey Balls", category: "Process", counts: [4, 5], unit: "stages",
  description: (n) => `${n} stages shown as progressively filled circles.`,
  familyDescription: "Stages (user-defined) shown as progressively filled Harvey balls.",
  about: "Harvey balls fill a quarter at a time, so progress is obvious at a glance. Use it for maturity stages, completion levels, or any step-by-step filling up.",
  draw(n) {
    const r = n > 4 ? 72 : 85, gap = 40, total = n * 2 * r + (n - 1) * gap, x0 = 500 - total / 2, cy = 460;
    let body = line(x0 + r, cy, x0 + total - r, cy, A, 6, { opacity: 0.3 });
    for (let i = 0; i < n; i++) {
      const cx = x0 + r + i * (2 * r + gap), frac = i / (n - 1);
      body += ring(cx, cy, r, A, 8);
      if (frac >= 1) body += circ(cx, cy, r - 14, slot(i));
      else if (frac > 0) body += path(wedgeD(cx, cy, r - 14, -90, -90 + 360 * frac), slot(i));
      body += txt(KEYS[i], cx, cy + r + 56, 26, { def: this.defaults[i] });
    }
    return { body, ...itemFields(n, "Stage", "stage", this.defaults) };
  },
  defaults: ["Not started", "Early", "Halfway", "Nearly done", "Complete"],
});

// ---- Sunburst ----
families.push({
  family: "sunburst", title: "Sunburst", category: "Hierarchy", counts: [6], unit: "segments",
  description: "Center, three inner segments, each with a sub-segment outside.",
  familyDescription: "A center with three inner segments (user-defined), each with an outer sub-segment.",
  about: "The sunburst nests hierarchy in rings: the center is the whole, the inner ring its parts, the outer ring their sub-parts. Use it for org structures, taxonomies, or budgets broken down two levels.",
  draw() {
    const cx = 500, cy = 500, r0 = 120, r1 = 270, r2 = 420, g = 2;
    let body = "";
    for (let i = 0; i < 3; i++) {
      const a0 = -90 + 120 * i + g, a1 = -90 + 120 * (i + 1) - g, am = (a0 + a1) / 2;
      body += path(sectorD(cx, cy, r0 + 6, r1, a0, a1), slot(i));
      const [lx, ly] = polar(cx, cy, (r0 + r1) / 2 + 3, am);
      body += txt(KEYS[i], lx, ly + 9, 26, { contrast: slot(i), def: this.defaults[i] });
      body += path(sectorD(cx, cy, r1 + 6, r2, a0, a1), slot(i), { opacity: 0.5 });
      const [ox, oy] = polar(cx, cy, (r1 + r2) / 2 + 3, am);
      body += txt(KEYS[3 + i], ox, oy + 9, 26, { def: this.defaults[3 + i], extra: `transform="rotate(${num(am > 0 && am < 180 ? am - 90 : am + 90)} ${num(ox)} ${num(oy)})"` });
    }
    body += circ(cx, cy, r0, A) + txt("other1", cx, cy + 11, 30, { contrast: A, def: "Company" });
    const f = itemFields(6, "Segment", "segment", this.defaults);
    f.labels = { item1: "Inner 1", item2: "Inner 2", item3: "Inner 3", item4: "Outer 1", item5: "Outer 2", other1: "Outer 3" };
    f.usage = { item1: "inner segment 1", item2: "inner segment 2", item3: "inner segment 3", item4: "outer segment 1", item5: "outer segment 2", other1: "outer segment 3", other2: "center" };
    f.labels.other2 = "Center"; f.fieldDefaults.other2 = "Company";
    body = body.replace('data-ig-text="other1" data-ig-font="primary" x="500" y="511"', 'data-ig-text="other2" data-ig-font="primary" x="500" y="511"');
    return { body, ...f };
  },
  defaults: ["Product", "Sales", "Ops", "Engineering", "Accounts", "Support"],
});
