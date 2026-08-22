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
  const gores = [C.blue, C.teal, C.yellow, C.coral];
  return (
    <>
      {gores.map((col, i) => (
        <path
          key={col}
          d={`M500 130 C ${290 + i * 105} 130, ${290 + i * 105} 560, 500 660 C ${710 - (3 - i) * 105} 560, ${710 - (3 - i) * 105} 130, 500 130`}
          fill={col}
          opacity={0.92}
        />
      ))}
      <path d="M500 130 C 290 130, 290 560, 500 660 C 710 560, 710 130, 500 130" fill="none" stroke={C.accent} strokeWidth="8" />
      <line x1="445" y1="648" x2="462" y2="760" stroke={C.accent} strokeWidth="7" />
      <line x1="555" y1="648" x2="538" y2="760" stroke={C.accent} strokeWidth="7" />
      <rect x="440" y="760" width="120" height="90" rx="12" fill="#fff" stroke={C.accent} strokeWidth="8" />
      {["Vision", "Talent", "Focus"].map((label, i) => (
        <g key={label}>
          <path d={`M150 ${300 + i * 150} l0 -70 m-24 26 l24 -26 l24 26`} fill="none" stroke={C.teal} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <text x="150" y={352 + i * 150} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
        </g>
      ))}
      {["Doubt", "Debt", "Drag"].map((label, i) => (
        <g key={label}>
          <path d={`M850 ${230 + i * 150} l0 70 m-24 -26 l24 26 l24 -26`} fill="none" stroke={C.coral} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          <text x="850" y={352 + i * 150} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
        </g>
      ))}
      <text x="500" y="930" textAnchor="middle" fontFamily={F} fontSize="42" fontWeight="700" fill={C.dark}>What lifts you vs. what weighs you down</text>
    </>
  );
}

function RootsAndBranches() {
  const branches: [number, number, string, string][] = [
    [230, 250, C.blue, "Growth"],
    [500, 160, C.teal, "Trust"],
    [770, 250, C.yellow, "Revenue"],
  ];
  const roots: [number, string][] = [
    [250, "Values"],
    [500, "Habits"],
    [750, "Skills"],
  ];
  return (
    <>
      <path d="M470 700 C 470 560, 460 520, 380 420 M500 700 L500 380 M530 700 C 530 560, 540 520, 620 420" fill="none" stroke={C.accent} strokeWidth="34" strokeLinecap="round" />
      <rect x="455" y="560" width="90" height="150" fill={C.accent} />
      {branches.map(([x, y, col, label]) => (
        <g key={label}>
          <line x1="500" y1="560" x2={x} y2={y + 60} stroke={C.accent} strokeWidth="18" strokeLinecap="round" />
          <circle cx={x} cy={y} r="95" fill={col} />
          <text x={x} y={y + 12} textAnchor="middle" fontFamily={F} fontSize="36" fontWeight="700" fill={col === C.yellow || col === C.teal ? C.dark : "#fff"}>{label}</text>
        </g>
      ))}
      <line x1="120" y1="712" x2="880" y2="712" stroke={C.accent} strokeWidth="6" strokeDasharray="18 14" />
      {roots.map(([x, label]) => (
        <g key={label}>
          <path d={`M500 710 C ${x < 500 ? x + 80 : x - 80} 760, ${x} 790, ${x} 840`} fill="none" stroke={C.accent} strokeWidth="14" strokeLinecap="round" />
          <text x={x} y="900" textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>{label}</text>
        </g>
      ))}
      <text x="500" y="980" textAnchor="middle" fontFamily={F} fontSize="32" fill={C.accent}>Visible results grow from hidden roots</text>
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
  const cells: [number, number, string, string][] = [
    [500, 275, C.blue, "Plan"],
    [695, 388, C.teal, "Build"],
    [695, 613, C.yellow, "Test"],
    [500, 725, C.coral, "Ship"],
    [305, 613, C.blue, "Learn"],
    [305, 388, C.teal, "Refine"],
  ];
  return (
    <>
      {cells.map(([x, y, col, label]) => (
        <g key={label}>
          <polygon points={hex(x, y, 108)} fill={col} stroke="#fff" strokeWidth="10" />
          <text x={x} y={y + 12} textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={col === C.teal || col === C.yellow ? C.dark : "#fff"}>{label}</text>
        </g>
      ))}
      <polygon points={hex(500, 500, 108)} fill="#fff" stroke={C.accent} strokeWidth="12" />
      <text x="500" y="512" textAnchor="middle" fontFamily={F} fontSize="34" fontWeight="700" fill={C.dark}>Team</text>
    </>
  );
}

function Dominoes() {
  const tiles: [number, number, string, string][] = [
    [180, 0, C.coral, "One email"],
    [340, 12, C.yellow, "One reply"],
    [500, 30, C.teal, "One deal"],
    [660, 52, C.blue, "One hire"],
    [820, 74, C.accent, "New market"],
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
        <Frame title="Honeycomb" note="Interlocking capabilities around a core">
          <Honeycomb />
        </Frame>
        <Frame title="Domino Effect" note="Compounding chain of small wins">
          <Dominoes />
        </Frame>
      </div>
    </>
  );
}
