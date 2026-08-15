export type TemplateField = {
  key: string;
  label: string;
  default: string;
  maxLength?: number;
  usage?: string; // where on the graphic this text lands
  indent?: boolean; // render nested under the preceding top-level field
};

export type Template = {
  id: string;
  title: string;
  category: string;
  description: string;
  fields: TemplateField[];
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
    fields: [
      { key: "title", label: "Title", default: "Our Process", maxLength: 40, usage: "heading" },
      { key: "step1", label: "Step 1", default: "Plan", maxLength: 16, usage: "arrow 1", indent: true },
      { key: "step2", label: "Step 2", default: "Build", maxLength: 16, usage: "arrow 2", indent: true },
      { key: "step3", label: "Step 3", default: "Launch", maxLength: 16, usage: "arrow 3", indent: true },
      { key: "caption1", label: "Caption 1", default: "Define the goal", maxLength: 28, usage: "below arrow 1", indent: true },
      { key: "caption2", label: "Caption 2", default: "Execute the work", maxLength: 28, usage: "below arrow 2", indent: true },
      { key: "caption3", label: "Caption 3", default: "Ship and iterate", maxLength: 28, usage: "below arrow 3", indent: true },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Our Process")}
<polygon data-ig-fill="primary" points="60,240 230,240 270,300 230,360 60,360"/>
<polygon data-ig-fill="secondary" points="250,240 420,240 460,300 420,360 250,360 290,300"/>
<polygon data-ig-fill="tertiary" points="440,240 610,240 650,300 610,360 440,360 480,300"/>
<text data-ig-text="step1" data-ig-font="secondary" x="155" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Plan</text>
<text data-ig-text="step2" data-ig-font="secondary" x="360" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Build</text>
<text data-ig-text="step3" data-ig-font="secondary" x="550" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Launch</text>
<text data-ig-text="caption1" data-ig-font="tertiary" x="155" y="410" text-anchor="middle" font-size="16" fill="#495057">Define the goal</text>
<text data-ig-text="caption2" data-ig-font="tertiary" x="360" y="410" text-anchor="middle" font-size="16" fill="#495057">Execute the work</text>
<text data-ig-text="caption3" data-ig-font="tertiary" x="550" y="410" text-anchor="middle" font-size="16" fill="#495057">Ship and iterate</text>
</svg>`,
  },
  {
    id: "cycle-4",
    title: "4-Part Cycle",
    category: "Cycle",
    description: "Four stages arranged in a continuous circular flow.",
    fields: [
      { key: "title", label: "Title", default: "Improvement Cycle", maxLength: 40, usage: "heading" },
      { key: "item1", label: "Stage 1", default: "Plan", maxLength: 12, usage: "top circle", indent: true },
      { key: "item2", label: "Stage 2", default: "Do", maxLength: 12, usage: "right circle", indent: true },
      { key: "item3", label: "Stage 3", default: "Check", maxLength: 12, usage: "bottom circle", indent: true },
      { key: "item4", label: "Stage 4", default: "Act", maxLength: 12, usage: "left circle", indent: true },
    ],
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
    fields: [
      { key: "title", label: "Title", default: "Strategy Pyramid", maxLength: 40, usage: "heading" },
      { key: "level1", label: "Top Level", default: "Vision", maxLength: 14, usage: "peak", indent: true },
      { key: "level2", label: "Middle Level", default: "Strategy", maxLength: 20, usage: "middle band", indent: true },
      { key: "level3", label: "Base Level", default: "Execution", maxLength: 26, usage: "base band", indent: true },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Strategy Pyramid")}
<polygon data-ig-fill="primary" points="400,140 478,250 322,250"/>
<polygon data-ig-fill="secondary" points="322,258 478,258 557,368 243,368"/>
<polygon data-ig-fill="tertiary" points="243,376 557,376 637,486 163,486"/>
<text data-ig-text="level1" data-ig-font="secondary" x="400" y="232" text-anchor="middle" font-size="20" fill="#ffffff">Vision</text>
<text data-ig-text="level2" data-ig-font="secondary" x="400" y="322" text-anchor="middle" font-size="22" fill="#ffffff">Strategy</text>
<text data-ig-text="level3" data-ig-font="secondary" x="400" y="440" text-anchor="middle" font-size="24" fill="#ffffff">Execution</text>
</svg>`,
  },
  {
    id: "venn-2",
    title: "2-Circle Venn",
    category: "Relationship",
    description: "Two overlapping circles with a shared middle value.",
    fields: [
      { key: "title", label: "Title", default: "Where We Win", maxLength: 40, usage: "heading" },
      { key: "left", label: "Left Circle", default: "Quality", maxLength: 14, usage: "left circle", indent: true },
      { key: "right", label: "Right Circle", default: "Speed", maxLength: 14, usage: "right circle", indent: true },
      { key: "middle", label: "Overlap", default: "Value", maxLength: 12, usage: "overlap", indent: true },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Where We Win")}
<circle data-ig-fill="primary" cx="315" cy="340" r="160" fill-opacity="0.75"/>
<circle data-ig-fill="secondary" cx="485" cy="340" r="160" fill-opacity="0.75"/>
<text data-ig-text="left" data-ig-font="secondary" x="240" y="348" text-anchor="middle" font-size="24" fill="#ffffff">Quality</text>
<text data-ig-text="right" data-ig-font="secondary" x="560" y="348" text-anchor="middle" font-size="24" fill="#ffffff">Speed</text>
<text data-ig-text="middle" data-ig-font="secondary" x="400" y="348" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Value</text>
</svg>`,
  },
  {
    id: "funnel-4",
    title: "4-Stage Funnel",
    category: "Process",
    description: "Four narrowing stages from awareness to action.",
    fields: [
      { key: "title", label: "Title", default: "Sales Funnel", maxLength: 40, usage: "heading" },
      { key: "stage1", label: "Stage 1", default: "Awareness", maxLength: 22, usage: "widest band", indent: true },
      { key: "stage2", label: "Stage 2", default: "Interest", maxLength: 18, usage: "second band", indent: true },
      { key: "stage3", label: "Stage 3", default: "Decision", maxLength: 14, usage: "third band", indent: true },
      { key: "stage4", label: "Stage 4", default: "Action", maxLength: 10, usage: "narrowest band", indent: true },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Sales Funnel")}
<polygon data-ig-fill="primary" points="120,170 680,170 625,250 175,250"/>
<polygon data-ig-fill="secondary" points="175,258 625,258 570,338 230,338"/>
<polygon data-ig-fill="tertiary" points="230,346 570,346 515,426 285,426"/>
<polygon data-ig-fill="primary" points="285,434 515,434 460,514 340,514"/>
<text data-ig-text="stage1" data-ig-font="secondary" x="400" y="218" text-anchor="middle" font-size="22" fill="#ffffff">Awareness</text>
<text data-ig-text="stage2" data-ig-font="secondary" x="400" y="306" text-anchor="middle" font-size="21" fill="#ffffff">Interest</text>
<text data-ig-text="stage3" data-ig-font="secondary" x="400" y="394" text-anchor="middle" font-size="20" fill="#ffffff">Decision</text>
<text data-ig-text="stage4" data-ig-font="secondary" x="400" y="482" text-anchor="middle" font-size="18" fill="#ffffff">Action</text>
</svg>`,
  },
  {
    id: "timeline-4",
    title: "4-Milestone Timeline",
    category: "Timeline",
    description: "Horizontal timeline with four dated milestones.",
    fields: [
      { key: "title", label: "Title", default: "Roadmap", maxLength: 40, usage: "heading" },
      { key: "m1", label: "Milestone 1", default: "Kickoff", maxLength: 14, usage: "milestone 1", indent: true },
      { key: "m2", label: "Milestone 2", default: "Alpha", maxLength: 14, usage: "milestone 2", indent: true },
      { key: "m3", label: "Milestone 3", default: "Beta", maxLength: 14, usage: "milestone 3", indent: true },
      { key: "m4", label: "Milestone 4", default: "Launch", maxLength: 14, usage: "milestone 4", indent: true },
      { key: "d1", label: "Date 1", default: "Q1", maxLength: 12, usage: "under milestone 1", indent: true },
      { key: "d2", label: "Date 2", default: "Q2", maxLength: 12, usage: "under milestone 2", indent: true },
      { key: "d3", label: "Date 3", default: "Q3", maxLength: 12, usage: "under milestone 3", indent: true },
      { key: "d4", label: "Date 4", default: "Q4", maxLength: 12, usage: "under milestone 4", indent: true },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Roadmap")}
<line x1="80" y1="330" x2="720" y2="330" stroke="#6c757d" data-ig-stroke="secondary" stroke-width="4"/>
<circle data-ig-fill="primary" cx="170" cy="330" r="18"/>
<circle data-ig-fill="secondary" cx="330" cy="330" r="18"/>
<circle data-ig-fill="tertiary" cx="490" cy="330" r="18"/>
<circle data-ig-fill="primary" cx="650" cy="330" r="18"/>
<text data-ig-text="m1" data-ig-font="secondary" x="170" y="280" text-anchor="middle" font-size="20" fill="#212529">Kickoff</text>
<text data-ig-text="m2" data-ig-font="secondary" x="330" y="280" text-anchor="middle" font-size="20" fill="#212529">Alpha</text>
<text data-ig-text="m3" data-ig-font="secondary" x="490" y="280" text-anchor="middle" font-size="20" fill="#212529">Beta</text>
<text data-ig-text="m4" data-ig-font="secondary" x="650" y="280" text-anchor="middle" font-size="20" fill="#212529">Launch</text>
<text data-ig-text="d1" data-ig-font="tertiary" x="170" y="388" text-anchor="middle" font-size="16" fill="#495057">Q1</text>
<text data-ig-text="d2" data-ig-font="tertiary" x="330" y="388" text-anchor="middle" font-size="16" fill="#495057">Q2</text>
<text data-ig-text="d3" data-ig-font="tertiary" x="490" y="388" text-anchor="middle" font-size="16" fill="#495057">Q3</text>
<text data-ig-text="d4" data-ig-font="tertiary" x="650" y="388" text-anchor="middle" font-size="16" fill="#495057">Q4</text>
</svg>`,
  },
  {
    id: "list-4",
    title: "Numbered List",
    category: "List",
    description: "Four numbered items in stacked bars.",
    fields: [
      { key: "title", label: "Title", default: "Key Priorities", maxLength: 40, usage: "heading" },
      { key: "item1", label: "Item 1", default: "Grow revenue", maxLength: 34, usage: "bar 1", indent: true },
      { key: "item2", label: "Item 2", default: "Delight customers", maxLength: 34, usage: "bar 2", indent: true },
      { key: "item3", label: "Item 3", default: "Reduce costs", maxLength: 34, usage: "bar 3", indent: true },
      { key: "item4", label: "Item 4", default: "Develop talent", maxLength: 34, usage: "bar 4", indent: true },
    ],
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
    id: "matrix-2x2",
    title: "2x2 Matrix",
    category: "Comparison",
    description: "Four quadrants with axis labels.",
    fields: [
      { key: "title", label: "Title", default: "Priority Matrix", maxLength: 40, usage: "heading" },
      { key: "q1", label: "Top Left", default: "Quick Wins", maxLength: 18, usage: "top-left cell", indent: true },
      { key: "q2", label: "Top Right", default: "Big Bets", maxLength: 18, usage: "top-right cell", indent: true },
      { key: "q3", label: "Bottom Left", default: "Fill-Ins", maxLength: 18, usage: "bottom-left cell", indent: true },
      { key: "q4", label: "Bottom Right", default: "Money Pits", maxLength: 18, usage: "bottom-right cell", indent: true },
      { key: "xaxis", label: "X-Axis Label", default: "Effort", maxLength: 20, usage: "bottom axis" },
      { key: "yaxis", label: "Y-Axis Label", default: "Impact", maxLength: 20, usage: "left axis" },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
${title("Priority Matrix")}
<rect data-ig-fill="primary" x="170" y="150" width="245" height="185" rx="8"/>
<rect data-ig-fill="secondary" x="425" y="150" width="245" height="185" rx="8"/>
<rect data-ig-fill="tertiary" x="170" y="345" width="245" height="185" rx="8"/>
<rect data-ig-fill="primary" x="425" y="345" width="245" height="185" rx="8"/>
<text data-ig-text="q1" data-ig-font="secondary" x="292" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Quick Wins</text>
<text data-ig-text="q2" data-ig-font="secondary" x="547" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Big Bets</text>
<text data-ig-text="q3" data-ig-font="secondary" x="292" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Fill-Ins</text>
<text data-ig-text="q4" data-ig-font="secondary" x="547" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Money Pits</text>
<text data-ig-text="xaxis" data-ig-font="tertiary" x="420" y="570" text-anchor="middle" font-size="17" fill="#495057">Effort</text>
<text data-ig-text="yaxis" data-ig-font="tertiary" x="130" y="340" text-anchor="middle" font-size="17" fill="#495057" transform="rotate(-90 130 340)">Impact</text>
</svg>`,
  },
  {
    id: "steps-3",
    title: "3-Step Circles",
    category: "Process",
    description: "Three numbered circles with step titles and captions.",
    fields: [
      { key: "title", label: "Title", default: "How to use", maxLength: 40, usage: "heading" },
      { key: "step1", label: "Step 1 Title", default: "Step one", maxLength: 16, usage: "step 1 title", indent: true },
      { key: "step2", label: "Step 2 Title", default: "Step two", maxLength: 16, usage: "step 2 title", indent: true },
      { key: "step3", label: "Step 3 Title", default: "Step three", maxLength: 16, usage: "step 3 title", indent: true },
      { key: "caption1", label: "Step 1 Caption", default: "Short caption here", maxLength: 26, usage: "under step 1", indent: true },
      { key: "caption2", label: "Step 2 Caption", default: "Short caption here", maxLength: 26, usage: "under step 2", indent: true },
      { key: "caption3", label: "Step 3 Caption", default: "Short caption here", maxLength: 26, usage: "under step 3", indent: true },
    ],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="Arial">
<text data-ig-text="title" data-ig-font="primary" data-ig-fill="primary" x="400" y="100" text-anchor="middle" font-size="52" font-weight="bold" fill="#0d6efd">How to use</text>
<circle cx="150" cy="330" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="150" cy="330" r="88" fill-opacity="0.15"/>
<circle data-ig-fill="primary" cx="72" cy="248" r="26"/>
<text data-ig-font="primary" x="72" y="259" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">1</text>
<circle cx="400" cy="330" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="400" cy="330" r="88" fill-opacity="0.15"/>
<circle data-ig-fill="secondary" cx="322" cy="248" r="26"/>
<text data-ig-font="primary" x="322" y="259" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">2</text>
<circle cx="650" cy="330" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="650" cy="330" r="88" fill-opacity="0.15"/>
<circle data-ig-fill="tertiary" cx="572" cy="248" r="26"/>
<text data-ig-font="primary" x="572" y="259" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-text="step1" data-ig-font="secondary" x="150" y="488" text-anchor="middle" font-size="28" font-weight="bold" fill="#223333">Step one</text>
<text data-ig-text="step2" data-ig-font="secondary" x="400" y="488" text-anchor="middle" font-size="28" font-weight="bold" fill="#223333">Step two</text>
<text data-ig-text="step3" data-ig-font="secondary" x="650" y="488" text-anchor="middle" font-size="28" font-weight="bold" fill="#223333">Step three</text>
<text data-ig-text="caption1" data-ig-font="tertiary" x="150" y="524" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
<text data-ig-text="caption2" data-ig-font="tertiary" x="400" y="524" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
<text data-ig-text="caption3" data-ig-font="tertiary" x="650" y="524" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
</svg>`,
  },
];

export const CATEGORIES = [...new Set(TEMPLATES.map((t) => t.category))];

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function defaultValues(t: Template): Record<string, string> {
  return Object.fromEntries(t.fields.map((f) => [f.key, f.default]));
}
