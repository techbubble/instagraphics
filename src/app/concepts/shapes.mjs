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
  const cols = [TEAL, YELLOW, CORAL, BLUE, ACCENT];
  return (
    `<circle cx="500" cy="470" r="178" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-dasharray="4 14"/>` +
    spots
      .map(
        ([x, y], i) =>
          person(x, y, 1.1, cols[i]) + txt(x, y + 105, 28, DARK, `Topic ${i + 1}`)
      )
      .join("") +
    `<circle cx="500" cy="470" r="110" fill="#fff" stroke="${ACCENT}" stroke-width="8"/>` +
    txt(500, 484, 40, DARK, "Goal")
  );
}

// Bulb glyph: Phosphor Icons (thin/lightbulb), MIT — phosphoricons.com
// Hand glyph: Lucide (hand), ISC — lucide.dev
const PH_BULB = "M172,232a4,4,0,0,1-4,4H88a4,4,0,0,1,0-8h80A4,4,0,0,1,172,232Zm40-128a83.59,83.59,0,0,1-32.11,66.06A20.2,20.2,0,0,0,172,186v6a12,12,0,0,1-12,12H96a12,12,0,0,1-12-12v-6a20,20,0,0,0-7.76-15.81A83.58,83.58,0,0,1,44,104.47C43.75,59,80.52,21.09,126,20a84,84,0,0,1,86,84Zm-8,0a76,76,0,0,0-77.83-76C85,29,51.77,63.27,52,104.43a75.62,75.62,0,0,0,29.17,59.43A28,28,0,0,1,92,186v6a4,4,0,0,0,4,4h64a4,4,0,0,0,4-4v-6a28.14,28.14,0,0,1,10.94-22.2A75.62,75.62,0,0,0,204,104ZM136.66,52.06a4,4,0,0,0-1.32,7.88C153.53,63,169,78.45,172.06,96.67A4,4,0,0,0,176,100a3.88,3.88,0,0,0,.67-.06,4,4,0,0,0,3.27-4.61A53.51,53.51,0,0,0,136.66,52.06Z";

function lightBulb() {
  // Thin-stroke bulb glyph, idea chips with leader dots on both sides.
  const chip = (x, y, c, l) =>
    `<rect x="${x - 110}" y="${y - 35}" width="220" height="70" rx="24" fill="${c}"/>` +
    txt(x, y + 10, 30, onLight(c) ? DARK : "#fff", l);
  const leaders = [
    [275, 352, 359, 300], [275, 330, 337, 390], [275, 352, 359, 480],
    [725, 648, 641, 300], [725, 670, 663, 390], [725, 648, 641, 480],
  ];
  return (
    `<g transform="translate(180 120) scale(2.5)"><path d="${PH_BULB}" fill="${DARK}"/></g>` +
    txt(500, 400, 38, DARK, "Big Idea") +
    leaders
      .map(
        ([xa, xb, dx, y]) =>
          `<line x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" stroke="${ACCENT}" stroke-width="6"/>` +
          `<circle cx="${dx}" cy="${y}" r="8" fill="${ACCENT}"/>`
      )
      .join("") +
    chip(165, 300, BLUE, "Topic 1") +
    chip(165, 390, TEAL, "Topic 2") +
    chip(165, 480, BLUE, "Topic 3") +
    chip(835, 300, CORAL, "Topic 4") +
    chip(835, 390, TEAL, "Topic 5") +
    chip(835, 480, CORAL, "Topic 6")
  );
}

function openHand() {
  // Lucide hand as large thin line art; colored dot per fingertip.
  const dots = [
    [270, 530, BLUE, 180, 485, "Topic 1"],
    [380, 285, TEAL, 360, 240, "Topic 2"],
    [500, 225, YELLOW, 500, 170, "Topic 3"],
    [620, 285, CORAL, 640, 240, "Topic 4"],
    [740, 345, ACCENT, 775, 300, "Topic 5"],
  ];
  return (
    `<g transform="translate(140 150) scale(30)" fill="none" stroke="${DARK}" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>` +
    `<path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/>` +
    `<path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/>` +
    `<path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>` +
    `</g>` +
    dots
      .map(
        ([dx, dy, c, lx, ly, l]) =>
          `<circle cx="${dx}" cy="${dy}" r="13" fill="${c}"/>` + txt(lx, ly, 30, DARK, l)
      )
      .join("") +
    txt(500, 940, 34, DARK, "Five ideas, one hand")
  );
}

export const CONCEPT_SHAPES = [
  { key: "mindmap-radial", title: "Mind Map (Radial)", note: "Center idea, six branches", body: mindMapRadial() },
  { key: "mindmap-split", title: "Mind Map (Split)", note: "Center idea, 4 + 4 branches", body: mindMapSplit() },
  { key: "team-ring", title: "Team Ring", note: "People around a shared goal", body: teamRing() },
  { key: "light-bulb", title: "Light Bulb", note: "One big idea, six sparks", body: lightBulb() },
  { key: "open-hand", title: "Open Hand", note: "Five ideas at your fingertips", body: openHand() },
];
