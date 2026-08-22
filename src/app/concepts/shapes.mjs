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

function lightBulb() {
  // Classic pear-shaped bulb: round glass tapering to a threaded screw
  // base, yellow rays, idea chips with leader dots on both sides.
  const chip = (x, y, c, l) =>
    `<rect x="${x - 110}" y="${y - 35}" width="220" height="70" rx="24" fill="${c}"/>` +
    txt(x, y + 10, 30, onLight(c) ? DARK : "#fff", l);
  let rays = "";
  for (const deg of [-150, -120, -90, -60, -30]) {
    const a = (deg * Math.PI) / 180;
    rays += `<line x1="${(500 + 175 * Math.cos(a)).toFixed(1)}" y1="${(330 + 175 * Math.sin(a)).toFixed(1)}" x2="${(500 + 222 * Math.cos(a)).toFixed(1)}" y2="${(330 + 222 * Math.sin(a)).toFixed(1)}" stroke="${ACCENT}" stroke-width="14" stroke-linecap="round"/>`;
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
  // Open palm traced from the user's reference image: four spread
  // fingers, thumb out to the side, wrist cuff. Colored fingertip dots.
  const dots = [
    [286, 388, BLUE, 185, 355, "Topic 1"],
    [398, 245, TEAL, 355, 195, "Topic 2"],
    [472, 190, YELLOW, 472, 130, "Topic 3"],
    [546, 225, CORAL, 590, 165, "Topic 4"],
    [618, 300, ACCENT, 700, 250, "Topic 5"],
  ];
  return (
    `<g fill="#fff" stroke="${DARK}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M 350 630 L 350 520 L 262 405 A 31 31 0 0 1 311 367 L 370 455 L 365 250 A 33 33 0 0 1 431 250 L 431 462 L 435 468 L 439 462 L 439 185 A 33 33 0 0 1 505 185 L 505 464 L 509 470 L 513 464 L 513 220 A 33 33 0 0 1 579 220 L 579 472 L 583 478 L 588 472 L 588 295 A 30 30 0 0 1 648 295 L 650 540 L 650 630 Q 650 655 630 655 L 370 655 Q 350 655 350 630 Z"/>` +
    `<rect x="380" y="685" width="240" height="58" rx="18"/>` +
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
