// The content panel is the same for every graphic: one universal set of
// fields, persisted per account. Each template maps the subset it uses via
// its `usage` map (key -> where the text lands); unmapped fields are inert.
export type UniversalField = {
  key: string;
  label: string;
  maxLength: number;
  indent?: boolean;
};

export const UNIVERSAL_FIELDS: UniversalField[] = [
  { key: "title", label: "Title", maxLength: 60 },
  { key: "item1", label: "Item 1", maxLength: 30, indent: true },
  { key: "item2", label: "Item 2", maxLength: 30, indent: true },
  { key: "item3", label: "Item 3", maxLength: 30, indent: true },
  { key: "item4", label: "Item 4", maxLength: 30, indent: true },
  { key: "item5", label: "Item 5", maxLength: 30, indent: true },
  { key: "other1", label: "Other 1", maxLength: 40 },
  { key: "other2", label: "Other 2", maxLength: 40 },
  { key: "other3", label: "Other 3", maxLength: 40 },
];

export type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
  usage: Partial<Record<string, string>>;
  svg: string;
};

function title(defaultText: string) {
  return `<text data-ig-text="title" data-ig-font="primary" x="400" y="84" text-anchor="middle" font-size="34" font-weight="bold" fill="#212529">${defaultText}</text>`;
}

export const TEMPLATES: Template[] = [
  {
    id: "process-arrow-3",
    title: "3-Step Process Arrows",
    category: "Process",
    description: "Three chevron arrows showing a left-to-right process.",
    usage: {
      title: "heading",
      item1: "arrow 1",
      item2: "arrow 2",
      item3: "arrow 3",
      other1: "below arrow 1",
      other2: "below arrow 2",
      other3: "below arrow 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Our Process")}
<polygon data-ig-fill="primary" points="60,240 230,240 270,300 230,360 60,360"/>
<polygon data-ig-fill="secondary" points="250,240 420,240 460,300 420,360 250,360 290,300"/>
<polygon data-ig-fill="tertiary" points="440,240 610,240 650,300 610,360 440,360 480,300"/>
<text data-ig-text="item1" data-ig-font="secondary" x="155" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Plan</text>
<text data-ig-text="item2" data-ig-font="secondary" x="360" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Build</text>
<text data-ig-text="item3" data-ig-font="secondary" x="550" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Launch</text>
<text data-ig-text="other1" data-ig-font="tertiary" x="155" y="410" text-anchor="middle" font-size="16" fill="#495057">Define the goal</text>
<text data-ig-text="other2" data-ig-font="tertiary" x="360" y="410" text-anchor="middle" font-size="16" fill="#495057">Execute the work</text>
<text data-ig-text="other3" data-ig-font="tertiary" x="550" y="410" text-anchor="middle" font-size="16" fill="#495057">Ship and iterate</text>
</svg>`,
  },
  {
    id: "cycle-4",
    title: "4-Part Cycle",
    category: "Cycle",
    description: "Four stages arranged in a continuous circular flow.",
    usage: {
      title: "heading",
      item1: "top circle",
      item2: "right circle",
      item3: "bottom circle",
      item4: "left circle",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
<defs>
<marker id="cyc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M 0 0 L 10 5 L 0 10 z" fill="#6c757d" data-ig-fill="secondary"/>
</marker>
</defs>
${title("Improvement Cycle")}
<path d="M 470 230 Q 530 250 545 300" fill="none" stroke="#6c757d" data-ig-stroke="secondary" stroke-width="4" marker-end="url(#cyc-arrow)"/>
<path d="M 545 400 Q 530 460 470 480" fill="none" stroke="#6c757d" data-ig-stroke="secondary" stroke-width="4" marker-end="url(#cyc-arrow)"/>
<path d="M 330 480 Q 270 460 255 410" fill="none" stroke="#6c757d" data-ig-stroke="secondary" stroke-width="4" marker-end="url(#cyc-arrow)"/>
<path d="M 255 310 Q 270 250 330 230" fill="none" stroke="#6c757d" data-ig-stroke="secondary" stroke-width="4" marker-end="url(#cyc-arrow)"/>
<circle data-ig-fill="primary" cx="400" cy="200" r="68"/>
<circle data-ig-fill="secondary" cx="560" cy="355" r="68"/>
<circle data-ig-fill="tertiary" cx="400" cy="510" r="68"/>
<circle data-ig-fill="primary" cx="240" cy="355" r="68"/>
<text data-ig-text="item1" data-ig-font="secondary" x="400" y="208" text-anchor="middle" font-size="22" fill="#ffffff">Plan</text>
<text data-ig-text="item2" data-ig-font="secondary" x="560" y="363" text-anchor="middle" font-size="22" fill="#ffffff">Do</text>
<text data-ig-text="item3" data-ig-font="secondary" x="400" y="518" text-anchor="middle" font-size="22" fill="#ffffff">Check</text>
<text data-ig-text="item4" data-ig-font="secondary" x="240" y="363" text-anchor="middle" font-size="22" fill="#ffffff">Act</text>
</svg>`,
  },
  {
    id: "pyramid-3",
    title: "3-Level Pyramid",
    category: "Hierarchy",
    description: "Three stacked levels from broad base to narrow peak.",
    usage: {
      title: "heading",
      item1: "peak",
      item2: "middle band",
      item3: "base band",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Strategy Pyramid")}
<polygon data-ig-fill="primary" points="400,140 478,250 322,250"/>
<polygon data-ig-fill="secondary" points="322,258 478,258 557,368 243,368"/>
<polygon data-ig-fill="tertiary" points="243,376 557,376 637,486 163,486"/>
<text data-ig-text="item1" data-ig-font="secondary" x="400" y="232" text-anchor="middle" font-size="20" fill="#ffffff">Vision</text>
<text data-ig-text="item2" data-ig-font="secondary" x="400" y="322" text-anchor="middle" font-size="22" fill="#ffffff">Strategy</text>
<text data-ig-text="item3" data-ig-font="secondary" x="400" y="440" text-anchor="middle" font-size="24" fill="#ffffff">Execution</text>
</svg>`,
  },
  {
    id: "venn-2",
    title: "2-Circle Venn",
    category: "Relationship",
    description: "Two overlapping circles with a shared middle value.",
    usage: {
      title: "heading",
      item1: "left circle",
      item2: "right circle",
      item3: "overlap",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Where We Win")}
<circle data-ig-fill="primary" cx="315" cy="340" r="160" fill-opacity="0.75"/>
<circle data-ig-fill="secondary" cx="485" cy="340" r="160" fill-opacity="0.75"/>
<text data-ig-text="item1" data-ig-font="secondary" x="240" y="348" text-anchor="middle" font-size="24" fill="#ffffff">Quality</text>
<text data-ig-text="item2" data-ig-font="secondary" x="560" y="348" text-anchor="middle" font-size="24" fill="#ffffff">Speed</text>
<text data-ig-text="item3" data-ig-font="secondary" x="400" y="348" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Value</text>
</svg>`,
  },
  {
    id: "funnel-4",
    title: "4-Stage Funnel",
    category: "Process",
    description: "Four narrowing stages from awareness to action.",
    usage: {
      title: "heading",
      item1: "widest band",
      item2: "second band",
      item3: "third band",
      item4: "narrowest band",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Sales Funnel")}
<polygon data-ig-fill="primary" points="120,170 680,170 625,250 175,250"/>
<polygon data-ig-fill="secondary" points="175,258 625,258 570,338 230,338"/>
<polygon data-ig-fill="tertiary" points="230,346 570,346 515,426 285,426"/>
<polygon data-ig-fill="primary" points="285,434 515,434 460,514 340,514"/>
<text data-ig-text="item1" data-ig-font="secondary" x="400" y="218" text-anchor="middle" font-size="22" fill="#ffffff">Awareness</text>
<text data-ig-text="item2" data-ig-font="secondary" x="400" y="306" text-anchor="middle" font-size="21" fill="#ffffff">Interest</text>
<text data-ig-text="item3" data-ig-font="secondary" x="400" y="394" text-anchor="middle" font-size="20" fill="#ffffff">Decision</text>
<text data-ig-text="item4" data-ig-font="secondary" x="400" y="482" text-anchor="middle" font-size="18" fill="#ffffff">Action</text>
</svg>`,
  },
  {
    id: "timeline-4",
    title: "4-Milestone Timeline",
    category: "Timeline",
    description: "Horizontal timeline with four dated milestones.",
    usage: {
      title: "heading",
      item1: "milestone 1",
      item2: "milestone 2",
      item3: "milestone 3",
      item4: "milestone 4",
      other1: "subtitle below line",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Roadmap")}
<line x1="80" y1="330" x2="720" y2="330" stroke="#6c757d" data-ig-stroke="secondary" stroke-width="4"/>
<circle data-ig-fill="primary" cx="170" cy="330" r="18"/>
<circle data-ig-fill="secondary" cx="330" cy="330" r="18"/>
<circle data-ig-fill="tertiary" cx="490" cy="330" r="18"/>
<circle data-ig-fill="primary" cx="650" cy="330" r="18"/>
<text data-ig-text="item1" data-ig-font="secondary" x="170" y="280" text-anchor="middle" font-size="20" fill="#212529">Kickoff</text>
<text data-ig-text="item2" data-ig-font="secondary" x="330" y="280" text-anchor="middle" font-size="20" fill="#212529">Alpha</text>
<text data-ig-text="item3" data-ig-font="secondary" x="490" y="280" text-anchor="middle" font-size="20" fill="#212529">Beta</text>
<text data-ig-text="item4" data-ig-font="secondary" x="650" y="280" text-anchor="middle" font-size="20" fill="#212529">Launch</text>
<text data-ig-text="other1" data-ig-font="tertiary" x="400" y="400" text-anchor="middle" font-size="18" fill="#495057">Fiscal Year</text>
</svg>`,
  },
  {
    id: "list-3",
    title: "Numbered List (3 items)",
    category: "List",
    description: "Three numbered items in stacked bars.",
    usage: {
      title: "heading",
      item1: "bar 1",
      item2: "bar 2",
      item3: "bar 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
<text data-ig-text="title" data-ig-font="primary" x="400" y="84" text-anchor="middle" font-size="34" font-weight="bold" fill="#212529">Key Priorities</text>
<rect data-ig-fill="primary" x="140" y="170" width="520" height="84" rx="12"/>
<rect data-ig-fill="secondary" x="140" y="278" width="520" height="84" rx="12"/>
<rect data-ig-fill="primary" x="140" y="386" width="520" height="84" rx="12"/>
<circle data-ig-fill="tertiary" cx="185" cy="212" r="26"/>
<circle data-ig-fill="tertiary" cx="185" cy="320" r="26"/>
<circle data-ig-fill="tertiary" cx="185" cy="428" r="26"/>
<text data-ig-font="secondary" x="185" y="221" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-font="secondary" x="185" y="329" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-font="secondary" x="185" y="437" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-text="item1" data-ig-font="secondary" x="235" y="221" font-size="24" fill="#ffffff">Grow revenue</text>
<text data-ig-text="item2" data-ig-font="secondary" x="235" y="329" font-size="24" fill="#ffffff">Delight customers</text>
<text data-ig-text="item3" data-ig-font="secondary" x="235" y="437" font-size="24" fill="#ffffff">Reduce costs</text>
</svg>`,
  },
  {
    id: "list-4",
    title: "Numbered List (4 items)",
    category: "List",
    description: "Four numbered items in stacked bars.",
    usage: {
      title: "heading",
      item1: "bar 1",
      item2: "bar 2",
      item3: "bar 3",
      item4: "bar 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Key Priorities")}
<rect data-ig-fill="primary" x="140" y="150" width="520" height="72" rx="12"/>
<rect data-ig-fill="secondary" x="140" y="242" width="520" height="72" rx="12"/>
<rect data-ig-fill="primary" x="140" y="334" width="520" height="72" rx="12"/>
<rect data-ig-fill="secondary" x="140" y="426" width="520" height="72" rx="12"/>
<circle data-ig-fill="tertiary" cx="185" cy="186" r="24"/>
<circle data-ig-fill="tertiary" cx="185" cy="278" r="24"/>
<circle data-ig-fill="tertiary" cx="185" cy="370" r="24"/>
<circle data-ig-fill="tertiary" cx="185" cy="462" r="24"/>
<text data-ig-font="secondary" x="185" y="194" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-font="secondary" x="185" y="286" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-font="secondary" x="185" y="378" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-font="secondary" x="185" y="470" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-text="item1" data-ig-font="secondary" x="235" y="194" font-size="22" fill="#ffffff">Grow revenue</text>
<text data-ig-text="item2" data-ig-font="secondary" x="235" y="286" font-size="22" fill="#ffffff">Delight customers</text>
<text data-ig-text="item3" data-ig-font="secondary" x="235" y="378" font-size="22" fill="#ffffff">Reduce costs</text>
<text data-ig-text="item4" data-ig-font="secondary" x="235" y="470" font-size="22" fill="#ffffff">Develop talent</text>
</svg>`,
  },
  {
    id: "list-5",
    title: "Numbered List (5 items)",
    category: "List",
    description: "Five numbered items in stacked bars.",
    usage: {
      title: "heading",
      item1: "bar 1",
      item2: "bar 2",
      item3: "bar 3",
      item4: "bar 4",
      item5: "bar 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
<text data-ig-text="title" data-ig-font="primary" x="400" y="84" text-anchor="middle" font-size="34" font-weight="bold" fill="#212529">Key Priorities</text>
<rect data-ig-fill="primary" x="140" y="150" width="520" height="60" rx="10"/>
<rect data-ig-fill="secondary" x="140" y="226" width="520" height="60" rx="10"/>
<rect data-ig-fill="primary" x="140" y="302" width="520" height="60" rx="10"/>
<rect data-ig-fill="secondary" x="140" y="378" width="520" height="60" rx="10"/>
<rect data-ig-fill="primary" x="140" y="454" width="520" height="60" rx="10"/>
<circle data-ig-fill="tertiary" cx="180" cy="180" r="20"/>
<circle data-ig-fill="tertiary" cx="180" cy="256" r="20"/>
<circle data-ig-fill="tertiary" cx="180" cy="332" r="20"/>
<circle data-ig-fill="tertiary" cx="180" cy="408" r="20"/>
<circle data-ig-fill="tertiary" cx="180" cy="484" r="20"/>
<text data-ig-font="secondary" x="180" y="187" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-font="secondary" x="180" y="263" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-font="secondary" x="180" y="339" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-font="secondary" x="180" y="415" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-font="secondary" x="180" y="491" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">5</text>
<text data-ig-text="item1" data-ig-font="secondary" x="220" y="187" font-size="20" fill="#ffffff">Grow revenue</text>
<text data-ig-text="item2" data-ig-font="secondary" x="220" y="263" font-size="20" fill="#ffffff">Delight customers</text>
<text data-ig-text="item3" data-ig-font="secondary" x="220" y="339" font-size="20" fill="#ffffff">Reduce costs</text>
<text data-ig-text="item4" data-ig-font="secondary" x="220" y="415" font-size="20" fill="#ffffff">Develop talent</text>
<text data-ig-text="item5" data-ig-font="secondary" x="220" y="491" font-size="20" fill="#ffffff">Expand markets</text>
</svg>`,
  },
  {
    id: "matrix-2x2",
    title: "2x2 Matrix",
    category: "Comparison",
    description: "Four quadrants with axis labels.",
    usage: {
      title: "heading",
      item1: "top-left cell",
      item2: "top-right cell",
      item3: "bottom-left cell",
      item4: "bottom-right cell",
      other1: "bottom axis",
      other2: "left axis",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Priority Matrix")}
<rect data-ig-fill="primary" x="170" y="150" width="245" height="185" rx="8"/>
<rect data-ig-fill="secondary" x="425" y="150" width="245" height="185" rx="8"/>
<rect data-ig-fill="tertiary" x="170" y="345" width="245" height="185" rx="8"/>
<rect data-ig-fill="primary" x="425" y="345" width="245" height="185" rx="8"/>
<text data-ig-text="item1" data-ig-font="secondary" x="292" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Quick Wins</text>
<text data-ig-text="item2" data-ig-font="secondary" x="547" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Big Bets</text>
<text data-ig-text="item3" data-ig-font="secondary" x="292" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Fill-Ins</text>
<text data-ig-text="item4" data-ig-font="secondary" x="547" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Money Pits</text>
<text data-ig-text="other1" data-ig-font="tertiary" x="420" y="570" text-anchor="middle" font-size="17" fill="#495057">Effort</text>
<text data-ig-text="other2" data-ig-font="tertiary" x="130" y="340" text-anchor="middle" font-size="17" fill="#495057" transform="rotate(-90 130 340)">Impact</text>
</svg>`,
  },
  {
    id: "steps-3",
    title: "3-Step Circles",
    category: "Process",
    description: "Three numbered circles with step titles and captions.",
    usage: {
      title: "heading",
      item1: "step 1 title",
      item2: "step 2 title",
      item3: "step 3 title",
      other1: "under step 1",
      other2: "under step 2",
      other3: "under step 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
<text data-ig-text="title" data-ig-font="primary" data-ig-fill="primary" x="400" y="100" text-anchor="middle" font-size="52" font-weight="bold" fill="#0d6efd">How to use</text>
<circle cx="150" cy="330" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="150" cy="330" r="88"/>
<circle data-ig-fill="primary" cx="72" cy="248" r="26"/>
<text data-ig-font="primary" x="72" y="259" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">1</text>
<circle cx="400" cy="330" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="400" cy="330" r="88"/>
<circle data-ig-fill="secondary" cx="322" cy="248" r="26"/>
<text data-ig-font="primary" x="322" y="259" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">2</text>
<circle cx="650" cy="330" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="650" cy="330" r="88"/>
<circle data-ig-fill="tertiary" cx="572" cy="248" r="26"/>
<text data-ig-font="primary" x="572" y="259" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-text="item1" data-ig-font="secondary" x="150" y="340" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Step one</text>
<text data-ig-text="item2" data-ig-font="secondary" x="400" y="340" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Step two</text>
<text data-ig-text="item3" data-ig-font="secondary" x="650" y="340" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Step three</text>
<text data-ig-text="other1" data-ig-font="tertiary" x="150" y="478" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
<text data-ig-text="other2" data-ig-font="tertiary" x="400" y="478" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
<text data-ig-text="other3" data-ig-font="tertiary" x="650" y="478" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
</svg>`,
  },
];

export const CATEGORIES = [...new Set(TEMPLATES.map((t) => t.category))];

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function itemCount(t: Template): number {
  return Object.keys(t.usage).filter((k) => k.startsWith("item")).length;
}
