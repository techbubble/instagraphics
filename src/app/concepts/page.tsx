// Hidden concept gallery: experimental graphics rendered inline as SVG.
// Not in the template library, not in the database, excluded from robots.
// Reachable only by direct URL: /concepts

const C = {
  blue: "#0d6efd",
  teal: "#3be8bd",
  yellow: "#ffc107",
  coral: "#f55151",
  accent: "#495057",
  dark: "#212529",
};
const F = "Roboto, Helvetica, Arial, sans-serif";

export const metadata = { robots: { index: false, follow: false } };

function Frame({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div className="col-md-6">
      <div className="card h-100">
        <div className="card-body p-2">
          <svg viewBox="0 0 1000 1000" style={{ width: "100%", display: "block" }}>{children}</svg>
        </div>
        <div className="card-footer bg-light">
          <span className="fw-semibold">{title}</span>
          <span className="small text-secondary ms-2">{note}</span>
        </div>
      </div>
    </div>
  );
}

function MetroMap() {
  const stations: [number, number, string, string][] = [
    [180, 320, C.blue, "Kickoff"],
    [400, 320, C.blue, "Research"],
    [180, 500, C.teal, "Design"],
    [420, 500, C.teal, "Prototype"],
    [180, 680, C.yellow, "Funding"],
    [400, 680, C.yellow, "Hiring"],
  ];
  return (
    <>
      <path d="M120 320 H480 C620 320 640 470 760 495" fill="none" stroke={C.blue} strokeWidth="26" strokeLinecap="round" />
      <path d="M120 500 H760" fill="none" stroke={C.teal} strokeWidth="26" strokeLinecap="round" />
      <path d="M120 680 H480 C620 680 640 530 760 505" fill="none" stroke={C.yellow} strokeWidth="26" strokeLinecap="round" />
      {stations.map(([x, y, col, label]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="30" fill="#fff" stroke={col} strokeWidth="12" />
          <text x={x} y={y - 55} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
        </g>
      ))}
      <circle cx="820" cy="500" r="58" fill="#fff" stroke={C.accent} strokeWidth="16" />
      <circle cx="820" cy="500" r="22" fill={C.coral} />
      <text x="820" y="620" textAnchor="middle" fontFamily={F} fontSize="40" fontWeight="700" fill={C.dark}>Launch</text>
    </>
  );
}

function Balloon() {
  // Teardrop envelope built from vertical gore panels alternating two colors.
  const down = (h: number) =>
    `C ${500 + 0.73 * h} 140 ${500 + h} 280 ${500 + h} 400 ` +
    `C ${500 + h} 520 ${500 + 0.53 * h} 605 ${500 + h * 0.05} 652`;
  const up = (h: number) =>
    `C ${500 + 0.53 * h} 605 ${500 + h} 520 ${500 + h} 400 ` +
    `C ${500 + h} 280 ${500 + 0.73 * h} 140 500 140`;
  const bounds = [-300, -200, -100, 0, 100, 200, 300];
  return (
    <>
      {bounds.slice(0, -1).map((b1, i) => {
        const b2 = bounds[i + 1];
        return (
          <path
            key={b1}
            d={`M500 140 ${down(b2)} L${500 + b1 * 0.05} 652 ${up(b1)} Z`}
            fill={i % 2 === 0 ? "#22a06b" : "#dc3545"}
          />
        );
      })}
      <path d={`M500 140 ${down(300)} L485 652 ${up(-300)} Z`} fill="none" stroke={C.accent} strokeWidth="8" />
      <line x1="486" y1="652" x2="464" y2="760" stroke={C.accent} strokeWidth="7" />
      <line x1="514" y1="652" x2="536" y2="760" stroke={C.accent} strokeWidth="7" />
      <rect x="440" y="760" width="120" height="90" rx="12" fill="#fff" stroke={C.accent} strokeWidth="8" />
      {["Vision", "Talent", "Focus"].map((label, i) => (
        <g key={label}>
          <path d={`M120 ${300 + i * 150} l0 -70 m-24 26 l24 -26 l24 26`} fill="none" stroke="#22a06b" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <text x="120" y={352 + i * 150} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
        </g>
      ))}
      {["Doubt", "Debt", "Drag"].map((label, i) => (
        <g key={label}>
          <path d={`M880 ${230 + i * 150} l0 70 m-24 -26 l24 26 l24 -26`} fill="none" stroke="#dc3545" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <text x="880" y={352 + i * 150} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
        </g>
      ))}
      <text x="500" y="930" textAnchor="middle" fontFamily={F} fontSize="42" fontWeight="700" fill={C.dark}>What lifts you vs. what weighs you down</text>
    </>
  );
}

function RootsAndBranches() {
  const branches: [number, number, string, string][] = [
    [230, 250, C.blue, "Growth"],
    [500, 155, C.teal, "Trust"],
    [770, 250, C.yellow, "Revenue"],
  ];
  const roots: [number, string][] = [
    [250, "Values"],
    [500, "Habits"],
    [750, "Skills"],
  ];
  return (
    <>
      {/* Tapered trunk: flared base, narrowing to the fork. */}
      <path
        d="M425 712 C 460 700 462 640 468 560 C 472 505 476 470 480 440 C 486 415 492 405 500 400 C 508 405 514 415 520 440 C 524 470 528 505 532 560 C 538 640 540 700 575 712 Z"
        fill={C.accent}
      />
      {/* Branches curve from the fork out to each canopy node. */}
      <path d="M494 440 C 450 380 360 330 285 295" fill="none" stroke={C.accent} strokeWidth="22" strokeLinecap="round" />
      <path d="M500 420 C 500 350 500 300 500 245" fill="none" stroke={C.accent} strokeWidth="24" strokeLinecap="round" />
      <path d="M506 440 C 550 380 640 330 715 295" fill="none" stroke={C.accent} strokeWidth="22" strokeLinecap="round" />
      {/* Foliage: soft satellite circles behind each labeled node. */}
      {branches.map(([x, y, col, label]) => (
        <g key={label}>
          <circle cx={x + 62} cy={y - 38} r="52" fill={col} opacity="0.35" />
          <circle cx={x - 58} cy={y + 40} r="44" fill={col} opacity="0.35" />
          <circle cx={x + 30} cy={y + 62} r="36" fill={col} opacity="0.25" />
          <circle cx={x} cy={y} r="95" fill={col} />
          <text x={x} y={y + 12} textAnchor="middle" fontFamily={F} fontSize="36" fontWeight="700" fill={col === C.yellow || col === C.teal ? C.dark : "#fff"}>{label}</text>
        </g>
      ))}
      {/* Ground */}
      <line x1="120" y1="712" x2="880" y2="712" stroke={C.accent} strokeWidth="6" strokeDasharray="18 14" />
      {/* Tapered roots with rootlets */}
      <path d="M468 706 C 420 745 340 755 255 800" fill="none" stroke={C.accent} strokeWidth="16" strokeLinecap="round" />
      <path d="M500 710 C 500 750 500 775 500 805" fill="none" stroke={C.accent} strokeWidth="16" strokeLinecap="round" />
      <path d="M532 706 C 580 745 660 755 745 800" fill="none" stroke={C.accent} strokeWidth="16" strokeLinecap="round" />
      <path d="M400 750 C 370 765 350 780 330 795 M600 750 C 630 765 650 780 670 795 M500 770 C 470 785 455 795 445 805 M500 770 C 530 785 545 795 555 805" fill="none" stroke={C.accent} strokeWidth="8" strokeLinecap="round" />
      {roots.map(([x, label]) => (
        <text key={label} x={x} y="870" textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
      ))}
      <text x="500" y="960" textAnchor="middle" fontFamily={F} fontSize="32" fill={C.accent}>Visible results grow from hidden roots</text>
    </>
  );
}

function Orbits() {
  const rings: [number, number, string, string][] = [
    [180, -35, C.blue, "Core"],
    [280, 40, C.teal, "Next"],
    [380, 150, C.coral, "Later"],
  ];
  return (
    <>
      {rings.map(([r]) => (
        <circle key={r} cx="500" cy="500" r={r} fill="none" stroke={C.accent} strokeWidth="4" strokeDasharray="4 12" />
      ))}
      <circle cx="500" cy="500" r="90" fill={C.yellow} />
      <text x="500" y="513" textAnchor="middle" fontFamily={F} fontSize="38" fontWeight="700" fill={C.dark}>Mission</text>
      {rings.map(([r, deg, col, label]) => {
        const a = (deg * Math.PI) / 180;
        const x = 500 + r * Math.cos(a);
        const y = 500 + r * Math.sin(a);
        return (
          <g key={label}>
            <circle cx={x} cy={y} r={64 - rings.findIndex((q) => q[3] === label) * 10} fill={col} />
            <text x={x} y={y + 11} textAnchor="middle" fontFamily={F} fontSize="30" fontWeight="700" fill={col === C.teal ? C.dark : "#fff"}>{label}</text>
          </g>
        );
      })}
      <text x="500" y="960" textAnchor="middle" fontFamily={F} fontSize="32" fill={C.accent}>Closer orbit = higher priority</text>
    </>
  );
}

function Honeycomb() {
  const hex = (cx: number, cy: number, r: number) =>
    [0, 1, 2, 3, 4, 5]
      .map((i) => {
        const a = ((60 * i - 90) * Math.PI) / 180;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      })
      .join(" ");
  // r=108 gives a flat-to-flat width of 187; centers 199 apart leave a
  // uniform 12-unit gap between every pair of neighbors, center included.
  const R = 108;
  const D = 199;
  const ring: [number, string, string][] = [
    [-120, C.blue, "Plan"],
    [-60, C.teal, "Build"],
    [0, C.yellow, "Test"],
    [60, C.coral, "Ship"],
    [120, C.blue, "Learn"],
    [180, C.teal, "Refine"],
  ];
  return (
    <>
      {ring.map(([deg, col, label]) => {
        const a = (deg * Math.PI) / 180;
        const x = 500 + D * Math.cos(a);
        const y = 500 + D * Math.sin(a);
        return (
          <g key={label}>
            <polygon points={hex(x, y, R)} fill={col} />
            <text x={x} y={y + 12} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={col === C.teal || col === C.yellow ? C.dark : "#fff"}>{label}</text>
          </g>
        );
      })}
      <polygon points={hex(500, 500, R)} fill={C.accent} />
      <text x="500" y="512" textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill="#fff">Team</text>
    </>
  );
}

function Dominoes() {
  const tiles: [number, number, string, string][] = [
    [180, 0, C.coral, "One email"],
    [340, 12, C.yellow, "One reply"],
    [500, 30, C.teal, "One deal"],
    [660, 52, C.blue, "One hire"],
    [820, 74, C.accent, ""],
  ];
  return (
    <>
      <line x1="90" y1="700" x2="910" y2="700" stroke={C.accent} strokeWidth="8" strokeLinecap="round" />
      {tiles.map(([x, tilt, col, label], i) => (
        <g key={label} transform={`rotate(${tilt} ${x} 700)`}>
          <rect x={x - 45} y="380" width="90" height="320" rx="16" fill={col} stroke="#fff" strokeWidth="6" />
          <text
            x={x}
            y="540"
            textAnchor="middle"
            fontFamily={F}
            fontSize="32"
            fontWeight="700"
            fill={col === C.teal || col === C.yellow ? C.dark : "#fff"}
            transform={`rotate(-90 ${x} 540)`}
          >
            {label}
          </text>
          {i === 0 && <path d={`M${x - 130} 430 h60 m-24 -24 l28 24 l-28 24`} fill="none" stroke={C.dark} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
      <text x="500" y="850" textAnchor="middle" fontFamily={F} fontSize="40" fontWeight="700" fill={C.dark}>Small actions topple big outcomes</text>
    </>
  );
}

function Stool() {
  // 3/4 view: thick seat with sealed rim, round-capped legs, per-foot
  // shadows. Front leg is longest (nearest); back legs sit higher.
  return (
    <>
      <ellipse cx="258" cy="656" rx="64" ry="14" fill="#dee2e6" />
      <ellipse cx="742" cy="656" rx="64" ry="14" fill="#dee2e6" />
      <ellipse cx="500" cy="766" rx="70" ry="15" fill="#dee2e6" />
      <line x1="395" y1="300" x2="258" y2="630" stroke={C.blue} strokeWidth="46" strokeLinecap="round" />
      <line x1="605" y1="300" x2="742" y2="630" stroke={C.yellow} strokeWidth="46" strokeLinecap="round" />
      <line x1="500" y1="300" x2="500" y2="740" stroke={C.teal} strokeWidth="54" strokeLinecap="round" />
      <path d="M220 213 A 280 78 0 0 0 780 213 L780 255 A 280 78 0 0 1 220 255 Z" fill="#d13c3c" />
      <ellipse cx="500" cy="212" rx="280" ry="79" fill={C.coral} />
      <text x="500" y="228" textAnchor="middle" fontFamily={F} fontSize="44" fontWeight="700" fill="#fff">Strategy</text>
      <text x="258" y="720" textAnchor="middle" fontFamily={F} fontSize="36" fontWeight="700" fill={C.dark}>People</text>
      <text x="742" y="720" textAnchor="middle" fontFamily={F} fontSize="36" fontWeight="700" fill={C.dark}>Technology</text>
      <text x="500" y="830" textAnchor="middle" fontFamily={F} fontSize="36" fontWeight="700" fill={C.dark}>Process</text>
      <text x="500" y="930" textAnchor="middle" fontFamily={F} fontSize="36" fontWeight="700" fill={C.dark}>Remove any one leg and it falls</text>
    </>
  );
}

function SubwayMap() {
  // 2-line, 8-station canned map with one interchange. Station labels are
  // the fill-in-the-blank slots (8 = current universal field limit).
  const st = (x: number, y: number, r: number, w: number) => (
    <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff" stroke={C.dark} strokeWidth={w} />
  );
  const labels: [number, number, "start" | "middle" | "end", string][] = [
    [150, 255, "middle", "Topic 1"],
    [300, 255, "middle", "Topic 2"],
    [395, 490, "end", "Topic 3"],
    [700, 605, "middle", "Topic 4"],
    [820, 715, "middle", "Topic 5"],
    [180, 825, "middle", "Topic 6"],
    [380, 825, "middle", "Topic 7"],
    [830, 295, "middle", "Topic 8"],
    [505, 710, "end", "Junction"],
  ];
  return (
    <>
      <path d="M150 300 H400 Q450 300 450 350 V600 Q450 650 500 650 H820" fill="none" stroke={C.blue} strokeWidth="22" strokeLinecap="round" />
      <path d="M180 760 H520 Q570 760 570 710 V400 Q570 350 620 350 H830" fill="none" stroke={C.teal} strokeWidth="22" strokeLinecap="round" />
      {st(150, 300, 20, 10)}
      {st(300, 300, 15, 8)}
      {st(450, 480, 15, 8)}
      {st(700, 650, 15, 8)}
      {st(820, 650, 20, 10)}
      {st(180, 760, 20, 10)}
      {st(380, 760, 15, 8)}
      {st(830, 350, 20, 10)}
      <rect x="546" y="620" width="48" height="60" rx="24" fill="#fff" stroke={C.dark} strokeWidth="9" />
      {labels.map(([x, y, anchor, label]) => (
        <text key={label} x={x} y={y} textAnchor={anchor} fontFamily={F} fontSize="30" fontWeight="700" fill={C.dark}>{label}</text>
      ))}
      <line x1="160" y1="905" x2="250" y2="905" stroke={C.blue} strokeWidth="16" strokeLinecap="round" />
      <text x="270" y="915" fontFamily={F} fontSize="28" fontWeight="700" fill={C.dark}>Line one</text>
      <line x1="540" y1="905" x2="630" y2="905" stroke={C.teal} strokeWidth="16" strokeLinecap="round" />
      <text x="650" y="915" fontFamily={F} fontSize="28" fontWeight="700" fill={C.dark}>Line two</text>
    </>
  );
}

export default function ConceptsPage() {
  return (
    <>
      <div className="text-center pb-3">
        <h1 className="h3 fw-bold">Concepts</h1>
        <p className="text-secondary">Internal previews. Rendered inline — not in the library, not in the database.</p>
      </div>
      <div className="row g-4 pb-5">
        <Frame title="Metro Map" note="Parallel tracks converging on one destination">
          <MetroMap />
        </Frame>
        <Frame title="Hot Air Balloon" note="Lift forces vs. drag forces">
          <Balloon />
        </Frame>
        <Frame title="Roots &amp; Branches" note="Hidden causes, visible outcomes">
          <RootsAndBranches />
        </Frame>
        <Frame title="Orbits" note="Priority by distance from the mission">
          <Orbits />
        </Frame>
        <Frame title="Honeycomb 2" note="Interlocking capabilities around a core">
          <Honeycomb />
        </Frame>
        <Frame title="Domino Effect" note="Compounding chain of small wins">
          <Dominoes />
        </Frame>
        <Frame title="Three-Legged Stool" note="Interdependent supports — all or nothing">
          <Stool />
        </Frame>
        <Frame title="Subway Map" note="2 lines, 8 stations, one junction — fill in the blanks">
          <SubwayMap />
        </Frame>
      </div>
    </>
  );
}
