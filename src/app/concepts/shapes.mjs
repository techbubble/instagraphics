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

// Font Awesome Free 6.7.2 glyphs (regular/lightbulb, regular/hand).
// License: CC BY 4.0 - https://fontawesome.com/license/free
// Strokes thinned uniformly via feMorphology erode.
const FA_BULB = "M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7c0 0 0 0 0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5L109 384c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8c0 0 0 0 0 0s0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4c0 0 0 0 0 0s0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5l-48.6 0c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80l0-16 160 0 0 16c0 44.2-35.8 80-80 80z";
const FA_HAND = "M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64l0 165.5-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75l8.5 0 8 0c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5l0-176c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2l0-2c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1l0-.1 0-32c0-8.8 7.2-16 16-16s16 7.2 16 16l0 31.9 0 .1 0 136c0 13.3 10.7 24 24 24s24-10.7 24-24l0-136c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16l0 55.9c0 0 0 .1 0 .1l0 80c0 13.3 10.7 24 24 24s24-10.7 24-24l0-71.9c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16l0 172.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2l-4.9 0-8.5 0c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2L160 96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9L192 232c0 13.3 10.7 24 24 24s24-10.7 24-24l0-135.9z";

function lightBulb() {
  // FA lightbulb (thinned), idea chips with leader dots on both sides.
  const chip = (x, y, c, l) =>
    `<rect x="${x - 110}" y="${y - 35}" width="220" height="70" rx="24" fill="${c}"/>` +
    txt(x, y + 10, 30, onLight(c) ? DARK : "#fff", l);
  const leaders = [
    [275, 363, 370, 220], [275, 331, 338, 370], [275, 398, 405, 520],
    [725, 637, 630, 220], [725, 669, 662, 370], [725, 602, 595, 520],
  ];
  return (
    `<defs><filter id="bulbThin"><feMorphology operator="erode" radius="7"/></filter></defs>` +
    `<g transform="translate(298 130) scale(1.05)"><path d="${FA_BULB}" fill="${ACCENT}" filter="url(#bulbThin)"/></g>` +
    leaders
      .map(
        ([xa, xb, dx, y]) =>
          `<line x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" stroke="${ACCENT}" stroke-width="6"/>` +
          `<circle cx="${dx}" cy="${y}" r="8" fill="${ACCENT}"/>`
      )
      .join("") +
    chip(165, 220, BLUE, "Topic 1") +
    chip(165, 370, TEAL, "Topic 2") +
    chip(165, 520, BLUE, "Topic 3") +
    chip(835, 220, CORAL, "Topic 4") +
    chip(835, 370, TEAL, "Topic 5") +
    chip(835, 520, CORAL, "Topic 6")
  );
}

function openHand() {
  // FA hand (thinned); colored dot and label per fingertip.
  const dots = [
    [290, 642, "#22a06b", 158, 655, "Topic 1"],
    [450, 298, BLUE, 378, 200, "Topic 2"],
    [508, 262, TEAL, 505, 158, "Topic 3"],
    [582, 300, YELLOW, 632, 200, "Topic 4"],
    [665, 368, CORAL, 722, 285, "Topic 5"],
  ];
  return (
    `<defs><filter id="handThin"><feMorphology operator="erode" radius="10"/></filter></defs>` +
    `<g transform="translate(180 180) scale(1.25)"><path d="${FA_HAND}" fill="${DARK}" filter="url(#handThin)"/></g>` +
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
