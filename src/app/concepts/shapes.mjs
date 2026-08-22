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
  // Original hex layout minus the top person; slightly wider radius so
  // labels clear the dashed ring.
  const spots = [
    [759.8, 320], [759.8, 620], [500, 770], [240.2, 620], [240.2, 320],
  ];
  const cols = [TEAL, YELLOW, CORAL, BLUE, TEAL];
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
  // Classic pear-shaped bulb: round glass tapering to a threaded screw
  // base, yellow rays, idea chips with leader dots on both sides.
  const chip = (x, y, c, l) =>
    `<rect x="${x - 110}" y="${y - 35}" width="220" height="70" rx="24" fill="${c}"/>` +
    txt(x, y + 10, 30, onLight(c) ? DARK : "#fff", l);
  let rays = "";
  for (const deg of [-150, -120, -90, -60, -30]) {
    const a = (deg * Math.PI) / 180;
    rays += `<line x1="${(500 + 175 * Math.cos(a)).toFixed(1)}" y1="${(330 + 175 * Math.sin(a)).toFixed(1)}" x2="${(500 + 222 * Math.cos(a)).toFixed(1)}" y2="${(330 + 222 * Math.sin(a)).toFixed(1)}" stroke="${YELLOW}" stroke-width="14" stroke-linecap="round"/>`;
  }
  const leaders = [
    [275, 343, 350, 340], [275, 373, 380, 420], [275, 421, 428, 500],
    [725, 657, 650, 340], [725, 627, 620, 420], [725, 579, 572, 500],
  ];
  return (
    rays +
    `<path d="M445 565 C 415 505 350 470 350 335 A 150 150 0 1 1 650 335 C 650 470 585 505 555 565" fill="none" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    `<line x1="448" y1="592" x2="552" y2="592" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    `<line x1="452" y1="620" x2="548" y2="620" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    `<line x1="462" y1="648" x2="538" y2="648" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    `<line x1="480" y1="676" x2="520" y2="676" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>` +
    txt(500, 345, 36, DARK, "Big Idea") +
    leaders
      .map(
        ([xa, xb, dx, y]) =>
          `<line x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" stroke="${ACCENT}" stroke-width="6"/>` +
          `<circle cx="${dx}" cy="${y}" r="8" fill="${ACCENT}"/>`
      )
      .join("") +
    chip(165, 340, BLUE, "Topic 1") +
    chip(165, 420, TEAL, "Topic 2") +
    chip(165, 500, BLUE, "Topic 3") +
    chip(835, 340, CORAL, "Topic 4") +
    chip(835, 420, TEAL, "Topic 5") +
    chip(835, 500, CORAL, "Topic 6")
  );
}

function openHand() {
  // Tabler Icons "hand-stop" (MIT) as large line art; a colored dot and
  // label at each fingertip.
  const dots = [
    [305, 498, BLUE, 198, 440, "Topic 1"],
    [425, 235, BLUE, 398, 190, "Topic 2"],
    [515, 175, TEAL, 515, 128, "Topic 3"],
    [605, 235, YELLOW, 628, 190, "Topic 4"],
    [695, 295, CORAL, 742, 252, "Topic 5"],
  ];
  return (
    `<g transform="translate(140 120) scale(30)" fill="#fff" stroke="${DARK}" stroke-width="0.55" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"/>` +
    `<path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" fill="none"/>` +
    `<path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" fill="none"/>` +
    `<path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" fill="none"/>` +
    `</g>` +
    dots
      .map(
        ([dx, dy, c, lx, ly, l]) =>
          `<circle cx="${dx}" cy="${dy}" r="13" fill="${c}"/>` + txt(lx, ly, 30, DARK, l)
      )
      .join("") +
    txt(500, 920, 34, DARK, "Five ideas, one hand")
  );
}

export const CONCEPT_SHAPES = [
  { key: "mindmap-radial", title: "Mind Map (Radial)", note: "Center idea, six branches", body: mindMapRadial() },
  { key: "mindmap-split", title: "Mind Map (Split)", note: "Center idea, 4 + 4 branches", body: mindMapSplit() },
  { key: "team-ring", title: "Team Ring", note: "People around a shared goal", body: teamRing() },
  { key: "light-bulb", title: "Light Bulb", note: "One big idea, six sparks", body: lightBulb() },
  { key: "open-hand", title: "Open Hand", note: "Five ideas at your fingertips", body: openHand() },
];
