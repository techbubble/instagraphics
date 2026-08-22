// Concept graphics authored as raw SVG body strings (1000x1000 viewBox).
// Shared by the hidden /concepts page and the local render-check script.

const BLUE = "#0d6efd";
const TEAL = "#3be8bd";
const YELLOW = "#ffc107";
const CORAL = "#f55151";
const ACCENT = "#495057";
const DARK = "#212529";
const FONT = "Roboto, Helvetica, Arial, sans-serif";

const txt = (x, y, size, fill, label, anchor = "middle", weight = 700) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}">${label}</text>`;

const node = (cx, cy, w, h, fill, label, textFill) =>
  `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${Math.min(24, h / 2)}" fill="${fill}"/>` +
  txt(cx, cy + 11, 30, textFill, label);

const onLight = (c) => c === TEAL || c === YELLOW;

// Person icon: head + dome body, ~131 units tall at scale 1, centered on x.
const person = (x, y, s, fill) =>
  `<g transform="translate(${x} ${y}) scale(${s})">` +
  `<circle cx="0" cy="-55" r="26" fill="${fill}"/>` +
  `<path d="M -38 50 L -38 20 C -38 -14 38 -14 38 20 L 38 50 Z" fill="${fill}"/>` +
  `</g>`;

const cloud = (x, y, label) =>
  `<g transform="translate(${x} ${y})">` +
  `<circle cx="-80" cy="-25" r="48" fill="#dee2e6"/>` +
  `<circle cx="0" cy="-45" r="58" fill="#dee2e6"/>` +
  `<circle cx="80" cy="-25" r="48" fill="#dee2e6"/>` +
  `<rect x="-140" y="-20" width="280" height="60" rx="30" fill="#dee2e6"/>` +
  txt(0, 18, 30, DARK, label) +
  `</g>`;

const DROP_PATH = "M0 -34 C 17 -8 22 4 22 14 A 22 22 0 1 1 -22 14 C -22 4 -17 -8 0 -34 Z";

const drop = (x, y, label, labelAbove = false) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="${DROP_PATH}" fill="${BLUE}"/>` +
  txt(0, labelAbove ? -58 : 92, 28, DARK, label) +
  `</g>`;

const smallDrop = (x, y) =>
  `<g transform="translate(${x} ${y}) scale(0.6)"><path d="${DROP_PATH}" fill="${BLUE}" opacity="0.7"/></g>`;

function mindMapRadial() {
  const nodes = [
    [250, 220, BLUE, "Topic 1"],
    [750, 220, TEAL, "Topic 2"],
    [170, 500, YELLOW, "Topic 3"],
    [830, 500, CORAL, "Topic 4"],
    [250, 780, TEAL, "Topic 5"],
    [750, 780, BLUE, "Topic 6"],
  ];
  const links = [
    `M420 460 C 350 380 320 320 270 258`,
    `M580 460 C 650 380 680 320 730 258`,
    `M390 500 H 268`,
    `M610 500 H 732`,
    `M420 545 C 350 620 320 680 270 742`,
    `M580 545 C 650 620 680 680 730 742`,
  ];
  return (
    links.map((d) => `<path d="${d}" fill="none" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round"/>`).join("") +
    nodes.map(([x, y, c, l]) => node(x, y, 190, 70, c, l, onLight(c) ? DARK : "#fff")).join("") +
    `<rect x="390" y="455" width="220" height="90" rx="24" fill="${ACCENT}"/>` +
    txt(500, 512, 34, "#fff", "Main Idea")
  );
}

function mindMapSplit() {
  const side = (cx, sign, first) =>
    [200, 400, 600, 800]
      .map((y, i) => {
        const c = [BLUE, TEAL, YELLOW, CORAL][i];
        const edge = cx - sign * 85;
        return (
          `<path d="M${500 + sign * 110} 500 C ${500 + sign * 170} 500 ${500 + sign * 170} ${y} ${edge} ${y}" fill="none" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/>` +
          node(cx, y, 170, 64, c, `Topic ${first + i}`, onLight(c) ? DARK : "#fff")
        );
      })
      .join("");
  return (
    side(190, -1, 1) +
    side(810, 1, 5) +
    `<rect x="390" y="450" width="220" height="100" rx="24" fill="${ACCENT}"/>` +
    txt(500, 512, 34, "#fff", "Main Idea")
  );
}

function teamRing() {
  const spots = [
    [500, 200], [734, 335], [734, 605], [500, 740], [266, 605], [266, 335],
  ];
  const cols = [BLUE, TEAL, YELLOW, CORAL, BLUE, TEAL];
  return (
    `<circle cx="500" cy="470" r="178" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-dasharray="4 14"/>` +
    spots
      .map(
        ([x, y], i) =>
          person(x, y, 1.1, cols[i]) + txt(x, y + 105, 28, DARK, `Topic ${i + 1}`)
      )
      .join("") +
    `<circle cx="500" cy="470" r="110" fill="${CORAL}"/>` +
    txt(500, 484, 40, "#fff", "Goal")
  );
}

function pictogram() {
  // One row of 10, grouped 6/3/1 with square brackets under each group.
  const groups = [
    [0, 5, BLUE, "Topic 1", "6 of 10"],
    [6, 8, TEAL, "Topic 2", "3 of 10"],
    [9, 9, YELLOW, "Topic 3", "1 of 10"],
  ];
  const px = (i) => 115 + i * 86;
  let out = "";
  for (const [a, b, c] of groups) {
    for (let i = a; i <= b; i++) out += person(px(i), 460, 0.95, c);
  }
  for (const [a, b, c, label, count] of groups) {
    const x1 = px(a) - 38;
    const x2 = px(b) + 38;
    const mid = (x1 + x2) / 2;
    out +=
      `<path d="M${x1} 545 V 566 H ${x2} V 545" fill="none" stroke="${c}" stroke-width="8" stroke-linecap="round"/>` +
      txt(mid, 630, 32, DARK, label) +
      txt(mid, 676, 28, ACCENT, count, "middle", 400);
  }
  return out;
}

function conversation() {
  // Chat layout: left speaker's bubbles left-aligned, right speaker's
  // right-aligned, tails angling down toward their speaker.
  const bubble = (cx, y, c, l, tail) =>
    `<rect x="${cx - 170}" y="${y - 46}" width="340" height="92" rx="46" fill="${c}"/>` +
    `<polygon points="${tail}" fill="${c}"/>` +
    txt(cx, y + 11, 32, onLight(c) ? DARK : "#fff", l);
  return (
    person(215, 850, 2.0, BLUE) +
    person(785, 850, 2.0, TEAL) +
    bubble(340, 230, BLUE, "Topic 1", "255,272 305,272 235,330") +
    bubble(660, 400, TEAL, "Topic 2", "745,442 695,442 765,500") +
    bubble(340, 570, BLUE, "Topic 3", "255,612 305,612 235,670")
  );
}

function sunClouds() {
  let rays = "";
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    const len = i % 2 === 0 ? 250 : 222;
    rays += `<line x1="${(500 + 182 * Math.cos(a)).toFixed(1)}" y1="${(400 + 182 * Math.sin(a)).toFixed(1)}" x2="${(500 + len * Math.cos(a)).toFixed(1)}" y2="${(400 + len * Math.sin(a)).toFixed(1)}" stroke="${YELLOW}" stroke-width="16" stroke-linecap="round"/>`;
  }
  return (
    rays +
    `<circle cx="500" cy="400" r="160" fill="${YELLOW}"/>` +
    txt(500, 415, 46, DARK, "Goal") +
    cloud(280, 250, "Topic 1") +
    cloud(720, 300, "Topic 2") +
    cloud(450, 590, "Topic 3") +
    txt(500, 900, 34, DARK, "Clouds pass. The sun stays.")
  );
}

function umbrella() {
  // Canopy of four colored panels with curved seams and scalloped hem.
  const bases = [150, 325, 500, 675, 850];
  const cols = [BLUE, TEAL, YELLOW, CORAL];
  const downSide = (bx) => `C ${500 + (bx - 500) * 0.35} 200 ${bx} 300 ${bx} 430`;
  const upSide = (bx) => `C ${bx} 300 ${500 + (bx - 500) * 0.35} 200 500 132`;
  let canopy = "";
  for (let i = 0; i < 4; i++) {
    const b1 = bases[i];
    const b2 = bases[i + 1];
    canopy += `<path d="M500 132 ${downSide(b1)} A ${(b2 - b1) / 2} 42 0 0 0 ${b2} 430 ${upSide(b2)} Z" fill="${cols[i]}"/>`;
  }
  return (
    smallDrop(235, 190) +
    smallDrop(765, 190) +
    smallDrop(90, 150) +
    smallDrop(910, 150) +
    `<line x1="500" y1="78" x2="500" y2="124" stroke="${ACCENT}" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M500 430 V 760 Q500 815 452 815 Q418 815 418 782" fill="none" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    canopy +
    `<rect x="350" y="540" width="300" height="76" rx="38" fill="${ACCENT}"/>` +
    txt(500, 590, 32, "#fff", "Topic 5") +
    drop(105, 310, "Topic 1", true) +
    drop(320, 140, "Topic 2", true) +
    drop(680, 140, "Topic 3", true) +
    drop(895, 310, "Topic 4", true) +
    txt(500, 930, 34, DARK, "Protected from the storm")
  );
}

function daisy() {
  // Teardrop petals: narrow base near the core, rounded tip outward.
  const cols = [BLUE, TEAL, CORAL, BLUE, TEAL, CORAL];
  const PETAL = "M0 0 C -55 -30 -72 -95 -46 -142 C -26 -176 26 -176 46 -142 C 72 -95 55 -30 0 0 Z";
  let petals = "";
  let labels = "";
  for (let i = 0; i < 6; i++) {
    const deg = -90 + i * 60;
    const a = (deg * Math.PI) / 180;
    const bx = (500 + 100 * Math.cos(a)).toFixed(1);
    const by = (485 + 100 * Math.sin(a)).toFixed(1);
    petals += `<g transform="translate(${bx} ${by}) rotate(${deg + 90}) scale(1.55)"><path d="${PETAL}" fill="${cols[i]}"/></g>`;
    const lx = (500 + 240 * Math.cos(a)).toFixed(1);
    const ly = (485 + 240 * Math.sin(a) + 10).toFixed(1);
    labels += txt(lx, ly, 28, onLight(cols[i]) ? DARK : "#fff", `Topic ${i + 1}`);
  }
  return (
    petals +
    `<circle cx="500" cy="485" r="100" fill="${YELLOW}"/>` +
    txt(500, 499, 36, DARK, "Core") +
    labels
  );
}

function flowerStem() {
  // Potted plant: gently curved stem, proper pointed leaves, full bloom.
  const LEAF = "M0 0 C 28 -20 72 -24 102 -6 C 74 20 30 18 0 0 Z";
  const leaves = [
    [497, 720, true, "Topic 1"],
    [503, 640, false, "Topic 2"],
    [497, 560, true, "Topic 3"],
    [503, 480, false, "Topic 4"],
  ];
  let bloom = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 * Math.PI) / 180;
    const x = (500 + 55 * Math.cos(a)).toFixed(1);
    const y = (300 + 55 * Math.sin(a)).toFixed(1);
    bloom += `<ellipse cx="${x}" cy="${y}" rx="26" ry="52" transform="rotate(${i * 45 + 90} ${x} ${y})" fill="${CORAL}"/>`;
  }
  return (
    `<path d="M500 810 C 485 700 515 640 500 550 C 488 470 510 430 500 360" fill="none" stroke="${TEAL}" stroke-width="14"/>` +
    leaves
      .map(([x, y, left, l]) =>
        `<g transform="translate(${x} ${y})${left ? " scale(-1 1)" : ""} rotate(25) scale(1.25)"><path d="${LEAF}" fill="${TEAL}"/></g>` +
        txt(left ? 385 : 615, y + 14, 30, DARK, l, left ? "end" : "start")
      )
      .join("") +
    bloom +
    `<circle cx="500" cy="300" r="46" fill="${YELLOW}"/>` +
    txt(500, 312, 26, DARK, "Goal") +
    `<rect x="410" y="782" width="180" height="28" rx="8" fill="${CORAL}"/>` +
    `<path d="M425 810 L575 810 L553 905 L447 905 Z" fill="#d13c3c"/>` +
    txt(500, 965, 34, DARK, "Growth feeds the bloom")
  );
}

function persona() {
  // Avatar in a ring; two trait chips per side, curved connectors with
  // dots where they meet the ring.
  const chips = [
    [190, 260, BLUE, "Topic 1", "M320 260 C 348 260 354 305 362 342", 364, 346],
    [810, 260, TEAL, "Topic 2", "M680 260 C 652 260 646 305 638 342", 636, 346],
    [190, 600, YELLOW, "Topic 3", "M320 600 C 350 600 356 545 366 502", 367, 499],
    [810, 600, CORAL, "Topic 4", "M680 600 C 650 600 644 545 634 502", 633, 499],
  ];
  return (
    chips.map(([, , , , d]) => `<path d="${d}" fill="none" stroke="${ACCENT}" stroke-width="6"/>`).join("") +
    `<circle cx="500" cy="420" r="155" fill="#e9ecef" stroke="${ACCENT}" stroke-width="8"/>` +
    person(500, 455, 1.65, ACCENT) +
    chips.map(([, , , , , dx, dy]) => `<circle cx="${dx}" cy="${dy}" r="9" fill="${ACCENT}"/>`).join("") +
    chips.map(([x, y, c, l]) => node(x, y, 260, 80, c, l, onLight(c) ? DARK : "#fff")).join("") +
    `<rect x="390" y="630" width="220" height="64" rx="32" fill="${ACCENT}"/>` +
    txt(500, 671, 30, "#fff", "Persona")
  );
}

export const CONCEPT_SHAPES = [
  { key: "mindmap-radial", title: "Mind Map (Radial)", note: "Center idea, six branches", body: mindMapRadial() },
  { key: "mindmap-split", title: "Mind Map (Split)", note: "Center idea, 4 + 4 branches", body: mindMapSplit() },
  { key: "team-ring", title: "Team Ring", note: "People around a shared goal", body: teamRing() },
  { key: "pictogram", title: "Pictogram", note: "6 / 3 / 1 out of 10 people", body: pictogram() },
  { key: "conversation", title: "Conversation", note: "Alternating dialogue", body: conversation() },
  { key: "sun-clouds", title: "Sun & Clouds", note: "The goal behind the obstacles", body: sunClouds() },
  { key: "umbrella", title: "Umbrella", note: "Shelter from labeled risks", body: umbrella() },
  { key: "daisy", title: "Daisy", note: "Six petals around a core", body: daisy() },
  { key: "flower-stem", title: "Flower Stem", note: "Leaves feed the bloom", body: flowerStem() },
  { key: "persona", title: "Persona", note: "One person, four traits", body: persona() },
];
