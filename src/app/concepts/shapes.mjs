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
  // Five people on an even pentagon (point down); top kept open.
  const spots = [
    [323.7, 227.3], [676.3, 227.3], [785.3, 562.7], [500.0, 770.0], [214.7, 562.7],
  ];
  const cols = [BLUE, TEAL, YELLOW, CORAL, BLUE];
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

function lightBulb() {
  // Modern bulb: empty glass, screw cap, rays. No filament.
  const chip = (x, y, c, l) =>
    `<rect x="${x - 110}" y="${y - 35}" width="220" height="70" rx="24" fill="${c}"/>` +
    txt(x, y + 10, 30, onLight(c) ? DARK : "#fff", l);
  let rays = "";
  for (const deg of [-150, -120, -90, -60, -30]) {
    const a = (deg * Math.PI) / 180;
    rays += `<line x1="${(500 + 232 * Math.cos(a)).toFixed(1)}" y1="${(400 + 232 * Math.sin(a)).toFixed(1)}" x2="${(500 + 278 * Math.cos(a)).toFixed(1)}" y2="${(400 + 278 * Math.sin(a)).toFixed(1)}" stroke="${YELLOW}" stroke-width="14" stroke-linecap="round"/>`;
  }
  const leaders = [
    [285, 330, 337, 260], [265, 278, 286, 410], [285, 350, 357, 560],
    [715, 670, 663, 260], [735, 722, 714, 410], [715, 650, 643, 560],
  ];
  return (
    rays +
    `<circle cx="500" cy="400" r="210" fill="${YELLOW}"/>` +
    `<rect x="442" y="604" width="116" height="82" rx="16" fill="${ACCENT}"/>` +
    `<line x1="450" y1="628" x2="550" y2="623" stroke="#fff" stroke-width="6"/>` +
    `<line x1="450" y1="650" x2="550" y2="645" stroke="#fff" stroke-width="6"/>` +
    `<line x1="450" y1="672" x2="550" y2="667" stroke="#fff" stroke-width="6"/>` +
    `<rect x="478" y="686" width="44" height="22" rx="11" fill="${ACCENT}"/>` +
    txt(500, 412, 44, DARK, "Big Idea") +
    leaders
      .map(
        ([xa, xb, dx, y]) =>
          `<line x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" stroke="${ACCENT}" stroke-width="6"/>` +
          `<circle cx="${dx}" cy="${y}" r="8" fill="${ACCENT}"/>`
      )
      .join("") +
    chip(175, 260, BLUE, "Topic 1") +
    chip(155, 410, TEAL, "Topic 2") +
    chip(175, 560, BLUE, "Topic 3") +
    chip(825, 260, CORAL, "Topic 4") +
    chip(845, 410, TEAL, "Topic 5") +
    chip(825, 560, CORAL, "Topic 6")
  );
}

function openHand() {
  // Stylized flat hand: dark palm, brand-colored capsule fingers,
  // one idea per fingertip.
  const fingers = [
    [415, 360, TEAL, 60], [497, 310, YELLOW, 60], [579, 350, CORAL, 60], [652, 430, BLUE, 54],
  ];
  const labels = [
    [210, 485, "Topic 1"], [400, 298, "Topic 2"], [497, 246, "Topic 3"],
    [596, 298, "Topic 4"], [672, 378, "Topic 5"],
  ];
  return (
    `<line x1="340" y1="690" x2="245" y2="550" stroke="${BLUE}" stroke-width="62" stroke-linecap="round"/>` +
    fingers
      .map(([x, tip, c, w]) => `<line x1="${x}" y1="600" x2="${x}" y2="${tip}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`)
      .join("") +
    `<rect x="355" y="570" width="330" height="250" rx="62" fill="${ACCENT}"/>` +
    labels.map(([x, y, l]) => txt(x, y, 30, DARK, l)).join("") +
    txt(500, 950, 34, DARK, "Five ideas, one hand")
  );
}

export const CONCEPT_SHAPES = [
  { key: "mindmap-radial", title: "Mind Map (Radial)", note: "Center idea, six branches", body: mindMapRadial() },
  { key: "mindmap-split", title: "Mind Map (Split)", note: "Center idea, 4 + 4 branches", body: mindMapSplit() },
  { key: "team-ring", title: "Team Ring", note: "People around a shared goal", body: teamRing() },
  { key: "light-bulb", title: "Light Bulb", note: "One big idea, six sparks", body: lightBulb() },
  { key: "open-hand", title: "Open Hand", note: "Five ideas at your fingertips", body: openHand() },
];
