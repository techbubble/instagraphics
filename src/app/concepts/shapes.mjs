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

const drop = (x, y, label, labelAbove = false) =>
  `<g transform="translate(${x} ${y})">` +
  `<path d="M0 -34 C 17 -8 22 4 22 14 A 22 22 0 1 1 -22 14 C -22 4 -17 -8 0 -34 Z" fill="${BLUE}"/>` +
  txt(0, labelAbove ? -58 : 92, 28, DARK, label) +
  `</g>`;

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
  const cols = (i) => (i < 6 ? BLUE : i < 9 ? TEAL : YELLOW);
  let out = "";
  for (let i = 0; i < 10; i++) {
    const x = 180 + (i % 5) * 160;
    const y = i < 5 ? 280 : 580;
    out += person(x, y, 1.2, cols(i));
  }
  const legend = [
    [BLUE, "Topic 1 — 6 of 10", 810],
    [TEAL, "Topic 2 — 3 of 10", 872],
    [YELLOW, "Topic 3 — 1 of 10", 934],
  ];
  return (
    out +
    legend
      .map(
        ([c, l, y]) =>
          `<circle cx="290" cy="${y - 10}" r="16" fill="${c}"/>` +
          txt(325, y, 30, DARK, l, "start")
      )
      .join("")
  );
}

function conversation() {
  const bubble = (y, c, l, sign) =>
    `<rect x="330" y="${y - 46}" width="340" height="92" rx="46" fill="${c}"/>` +
    `<polygon points="${500 + sign * 60},${y + 44} ${500 + sign * 110},${y + 44} ${500 + sign * 160},${y + 112}" fill="${c}"/>` +
    txt(500, y + 11, 32, onLight(c) ? DARK : "#fff", l);
  return (
    person(250, 790, 2.1, BLUE) +
    person(750, 790, 2.1, TEAL) +
    bubble(210, BLUE, "Topic 1", -1) +
    bubble(390, TEAL, "Topic 2", 1) +
    bubble(570, BLUE, "Topic 3", -1)
  );
}

function sunClouds() {
  let rays = "";
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    rays += `<line x1="${700 + 145 * Math.cos(a)}" y1="${350 + 145 * Math.sin(a)}" x2="${700 + 195 * Math.cos(a)}" y2="${350 + 195 * Math.sin(a)}" stroke="${YELLOW}" stroke-width="14" stroke-linecap="round"/>`;
  }
  return (
    rays +
    `<circle cx="700" cy="350" r="115" fill="${YELLOW}"/>` +
    txt(700, 364, 40, DARK, "Goal") +
    cloud(260, 190, "Topic 1") +
    cloud(230, 450, "Topic 2") +
    cloud(300, 690, "Topic 3") +
    txt(500, 930, 34, DARK, "Clouds pass. The sun stays.")
  );
}

function umbrella() {
  return (
    `<line x1="500" y1="80" x2="500" y2="120" stroke="${ACCENT}" stroke-width="12" stroke-linecap="round"/>` +
    `<path d="M500 420 V730 Q500 790 455 790 Q420 790 420 755" fill="none" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    `<path d="M200 420 A 300 300 0 0 1 800 420 A 100 45 0 0 1 600 420 A 100 45 0 0 1 400 420 A 100 45 0 0 1 200 420 Z" fill="${CORAL}"/>` +
    `<path d="M500 122 C 380 180 330 300 322 440" fill="none" stroke="#d13c3c" stroke-width="7"/>` +
    `<path d="M500 122 C 620 180 670 300 678 440" fill="none" stroke="#d13c3c" stroke-width="7"/>` +
    `<rect x="330" y="520" width="340" height="80" rx="40" fill="${ACCENT}"/>` +
    txt(500, 570, 32, "#fff", "Topic 5") +
    drop(130, 300, "Topic 1") +
    drop(320, 150, "Topic 2", true) +
    drop(680, 150, "Topic 3", true) +
    drop(870, 300, "Topic 4") +
    txt(500, 930, 34, DARK, "Protected from the storm")
  );
}

function daisy() {
  const cols = [BLUE, TEAL, CORAL, BLUE, TEAL, CORAL];
  let petals = "";
  let labels = "";
  for (let i = 0; i < 6; i++) {
    const deg = -90 + i * 60;
    const a = (deg * Math.PI) / 180;
    const x = 500 + 240 * Math.cos(a);
    const y = 470 + 240 * Math.sin(a);
    petals += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="85" ry="160" transform="rotate(${deg + 90} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${cols[i]}"/>`;
    labels += txt(x.toFixed(1), (y + 11).toFixed(1), 28, onLight(cols[i]) ? DARK : "#fff", `Topic ${i + 1}`);
  }
  return (
    petals +
    `<circle cx="500" cy="470" r="105" fill="${YELLOW}"/>` +
    txt(500, 484, 36, DARK, "Core") +
    labels
  );
}

function flowerStem() {
  const leaves = [
    [430, 730, -35, "end", 340, "Topic 1"],
    [570, 640, 35, "start", 660, "Topic 2"],
    [430, 550, -35, "end", 340, "Topic 3"],
    [570, 460, 35, "start", 660, "Topic 4"],
  ];
  let bloom = "";
  for (let i = 0; i < 8; i++) {
    const a = (i * 45 * Math.PI) / 180;
    const x = 500 + 55 * Math.cos(a);
    const y = 210 + 55 * Math.sin(a);
    bloom += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="28" ry="55" transform="rotate(${i * 45 + 90} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${CORAL}"/>`;
  }
  return (
    `<line x1="150" y1="850" x2="850" y2="850" stroke="${ACCENT}" stroke-width="6" stroke-dasharray="18 14"/>` +
    `<path d="M500 850 V 250" fill="none" stroke="${TEAL}" stroke-width="16"/>` +
    leaves
      .map(
        ([x, y, rot, anchor, lx, l]) =>
          `<ellipse cx="${x}" cy="${y}" rx="70" ry="28" transform="rotate(${rot} ${x} ${y})" fill="${TEAL}"/>` +
          txt(lx, y + 8, 30, DARK, l, anchor)
      )
      .join("") +
    bloom +
    `<circle cx="500" cy="210" r="46" fill="${YELLOW}"/>` +
    txt(500, 222, 26, DARK, "Goal") +
    txt(500, 940, 34, DARK, "Growth feeds the bloom")
  );
}

function persona() {
  const chips = [
    [210, 190, BLUE, "Topic 1"],
    [790, 190, TEAL, "Topic 2"],
    [210, 700, YELLOW, "Topic 3"],
    [790, 700, CORAL, "Topic 4"],
  ];
  return (
    chips
      .map(
        ([x, y]) =>
          `<line x1="${x + (x < 500 ? 90 : -90)}" y1="${y + (y < 450 ? 30 : -30)}" x2="${x < 500 ? 405 : 595}" y2="${y < 450 ? 350 : 520}" stroke="${ACCENT}" stroke-width="6"/>`
      )
      .join("") +
    `<circle cx="500" cy="430" r="130" fill="#e9ecef" stroke="${ACCENT}" stroke-width="8"/>` +
    person(500, 460, 1.4, ACCENT) +
    chips.map(([x, y, c, l]) => node(x, y, 220, 74, c, l, onLight(c) ? DARK : "#fff")).join("") +
    txt(500, 640, 36, DARK, "Persona")
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
