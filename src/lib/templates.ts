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
  { key: "item1", label: "Item 1", maxLength: 30 },
  { key: "item2", label: "Item 2", maxLength: 30 },
  { key: "item3", label: "Item 3", maxLength: 30 },
  { key: "item4", label: "Item 4", maxLength: 30 },
  { key: "item5", label: "Item 5", maxLength: 30 },
  { key: "other1", label: "Other 1", maxLength: 40 },
  { key: "other2", label: "Other 2", maxLength: 40 },
  { key: "other3", label: "Other 3", maxLength: 40 },
];

export type Template = {
  id: string;
  family: string; // variant group (e.g. all funnel sizes share "funnel")
  title: string;
  category: string;
  items: number; // item slots on the graphic; drives the "#" sort
  description: string;
  about: string; // longer copy for the template's landing page
  usage: Partial<Record<string, string>>;
  labels: Partial<Record<string, string>>; // contextual field labels (fall back to universal)
  svg: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "process-arrow-3",
    family: "process-arrow",
    title: "Process Arrows (3 steps)",
    category: "Process",
    items: 3,
    description: "3 chevron arrows showing a left-to-right process.",
    about: "Chevron arrows are the classic way to show forward motion: each step hands off to the next, left to right. Use the 3-step version for onboarding flows, delivery pipelines, hiring processes, or any procedure your audience should read as a sequence with a clear start and finish. The arrow shapes make direction unmistakable even at a glance, and captions under each arrow (3-step layout) leave room for a short explanation.",
    usage: {
      item1: "arrow 1",
      item2: "arrow 2",
      item3: "arrow 3",
      other1: "below arrow 1",
      other2: "below arrow 2",
      other3: "below arrow 3",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      other1: "Caption 1",
      other2: "Caption 2",
      other3: "Caption 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-29.41 67.62) scale(1.3235)">
<polygon data-ig-fill="primary" points="60,240 273,240 313,300 273,360 60,360"/>
<polygon data-ig-fill="secondary" points="273,240 487,240 527,300 487,360 273,360 313,300"/>
<polygon data-ig-fill="tertiary" points="487,240 700,240 740,300 700,360 487,360 527,300"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="187" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Plan</text>
<text data-ig-text="other1" data-ig-font="secondary" x="187" y="410" text-anchor="middle" font-size="16" fill="#495057">Define the goal</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="400" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Build</text>
<text data-ig-text="other2" data-ig-font="secondary" x="400" y="410" text-anchor="middle" font-size="16" fill="#495057">Execute the work</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="613" y="308" text-anchor="middle" font-size="24" fill="#ffffff">Launch</text>
<text data-ig-text="other3" data-ig-font="secondary" x="613" y="410" text-anchor="middle" font-size="16" fill="#495057">Ship and iterate</text>
</g>
</svg>`,
  },
  {
    id: "process-arrow-4",
    family: "process-arrow",
    title: "Process Arrows (4 steps)",
    category: "Process",
    items: 4,
    description: "4 chevron arrows showing a left-to-right process.",
    about: "Chevron arrows are the classic way to show forward motion: each step hands off to the next, left to right. Use the 4-step version for onboarding flows, delivery pipelines, hiring processes, or any procedure your audience should read as a sequence with a clear start and finish. The arrow shapes make direction unmistakable even at a glance, and captions under each arrow (3-step layout) leave room for a short explanation.",
    usage: {
      item1: "arrow 1",
      item2: "arrow 2",
      item3: "arrow 3",
      item4: "arrow 4",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      item4: "Step 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-29.41 102.94) scale(1.3235)">
<polygon data-ig-fill="primary" points="60,240 220,240 260,300 220,360 60,360"/>
<polygon data-ig-fill="secondary" points="220,240 380,240 420,300 380,360 220,360 260,300"/>
<polygon data-ig-fill="tertiary" points="380,240 540,240 580,300 540,360 380,360 420,300"/>
<polygon data-ig-fill="primary" points="540,240 700,240 740,300 700,360 540,360 580,300"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="160" y="307" text-anchor="middle" font-size="21" fill="#ffffff">Plan</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="320" y="307" text-anchor="middle" font-size="21" fill="#ffffff">Build</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="480" y="307" text-anchor="middle" font-size="21" fill="#ffffff">Launch</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="640" y="307" text-anchor="middle" font-size="21" fill="#ffffff">Measure</text>
</g>
</svg>`,
  },
  {
    id: "process-arrow-5",
    family: "process-arrow",
    title: "Process Arrows (5 steps)",
    category: "Process",
    items: 5,
    description: "5 chevron arrows showing a left-to-right process.",
    about: "Chevron arrows are the classic way to show forward motion: each step hands off to the next, left to right. Use the 5-step version for onboarding flows, delivery pipelines, hiring processes, or any procedure your audience should read as a sequence with a clear start and finish. The arrow shapes make direction unmistakable even at a glance, and captions under each arrow (3-step layout) leave room for a short explanation.",
    usage: {
      item1: "arrow 1",
      item2: "arrow 2",
      item3: "arrow 3",
      item4: "arrow 4",
      item5: "arrow 5",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      item4: "Step 4",
      item5: "Step 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-29.41 102.94) scale(1.3235)">
<polygon data-ig-fill="primary" points="60,240 188,240 228,300 188,360 60,360"/>
<polygon data-ig-fill="secondary" points="188,240 316,240 356,300 316,360 188,360 228,300"/>
<polygon data-ig-fill="tertiary" points="316,240 444,240 484,300 444,360 316,360 356,300"/>
<polygon data-ig-fill="primary" points="444,240 572,240 612,300 572,360 444,360 484,300"/>
<polygon data-ig-fill="secondary" points="572,240 700,240 740,300 700,360 572,360 612,300"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="144" y="306" text-anchor="middle" font-size="18" fill="#ffffff">Plan</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="272" y="306" text-anchor="middle" font-size="18" fill="#ffffff">Build</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="306" text-anchor="middle" font-size="18" fill="#ffffff">Launch</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="528" y="306" text-anchor="middle" font-size="18" fill="#ffffff">Measure</text>
<text data-ig-contrast="secondary" data-ig-text="item5" data-ig-font="primary" x="656" y="306" text-anchor="middle" font-size="18" fill="#ffffff">Iterate</text>
</g>
</svg>`,
  },
  {
    id: "cycle-3",
    family: "cycle",
    title: "Cycle (3 parts)",
    category: "Cycle",
    items: 3,
    description: "3 stages arranged in a continuous circular flow.",
    about: "A cycle diagram shows a process that never ends: each stage feeds the next and the last loops back to the first. The 3-part ring suits continuous-improvement loops (plan-do-check-act), product iteration cadences, customer lifecycle stories, and operating rhythms. Connecting arrows carry your accent color so the flow stays visible on any background.",
    usage: {
      item1: "1st circle",
      item2: "2nd circle",
      item3: "3rd circle",
    },
    labels: {
      item1: "Stage 1",
      item2: "Stage 2",
      item3: "Stage 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-365.38 -165.26) scale(2.1635)">
<path d="M 486 222 A 150 150 0 0 1 547 315" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="549,333 538,317 556,313"/>
<path d="M 464 481 A 150 150 0 0 1 353 487" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="336,481 356,479 350,496"/>
<path d="M 251 333 A 150 150 0 0 1 300 233" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="314,222 306,240 294,226"/>
<circle data-ig-fill="primary" cx="400" cy="195" r="78"/>
<circle data-ig-fill="secondary" cx="530" cy="420" r="78"/>
<circle data-ig-fill="tertiary" cx="270" cy="420" r="78"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="400" y="203" text-anchor="middle" font-size="24" fill="#ffffff">Plan</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="530" y="428" text-anchor="middle" font-size="24" fill="#ffffff">Build</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="270" y="428" text-anchor="middle" font-size="24" fill="#ffffff">Launch</text>
</g>
</svg>`,
  },
  {
    id: "cycle-4",
    family: "cycle",
    title: "Cycle (4 parts)",
    category: "Cycle",
    items: 4,
    description: "4 stages arranged in a continuous circular flow.",
    about: "A cycle diagram shows a process that never ends: each stage feeds the next and the last loops back to the first. The 4-part ring suits continuous-improvement loops (plan-do-check-act), product iteration cadences, customer lifecycle stories, and operating rhythms. Connecting arrows carry your accent color so the flow stays visible on any background.",
    usage: {
      item1: "1st circle",
      item2: "2nd circle",
      item3: "3rd circle",
      item4: "4th circle",
    },
    labels: {
      item1: "Stage 1",
      item2: "Stage 2",
      item3: "Stage 3",
      item4: "Stage 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-325.69 -212.16) scale(2.0642)">
<path d="M 476 216 A 150 150 0 0 1 519 254" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="529,269 512,260 527,249"/>
<path d="M 529 421 A 150 150 0 0 1 491 464" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="476,474 485,457 496,472"/>
<path d="M 324 474 A 150 150 0 0 1 281 436" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="271,421 288,430 273,441"/>
<path d="M 271 269 A 150 150 0 0 1 309 226" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="324,216 315,233 304,218"/>
<circle data-ig-fill="primary" cx="400" cy="195" r="68"/>
<circle data-ig-fill="secondary" cx="550" cy="345" r="68"/>
<circle data-ig-fill="tertiary" cx="400" cy="495" r="68"/>
<circle data-ig-fill="primary" cx="250" cy="345" r="68"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="400" y="202" text-anchor="middle" font-size="22" fill="#ffffff">Plan</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="550" y="352" text-anchor="middle" font-size="22" fill="#ffffff">Build</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="502" text-anchor="middle" font-size="22" fill="#ffffff">Launch</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="250" y="352" text-anchor="middle" font-size="22" fill="#ffffff">Measure</text>
</g>
</svg>`,
  },
  {
    id: "cycle-5",
    family: "cycle",
    title: "Cycle (5 parts)",
    category: "Cycle",
    items: 5,
    description: "5 stages arranged in a continuous circular flow.",
    about: "A cycle diagram shows a process that never ends: each stage feeds the next and the last loops back to the first. The 5-part ring suits continuous-improvement loops (plan-do-check-act), product iteration cadences, customer lifecycle stories, and operating rhythms. Connecting arrows carry your accent color so the flow stays visible on any background.",
    usage: {
      item1: "1st circle",
      item2: "2nd circle",
      item3: "3rd circle",
      item4: "4th circle",
      item5: "5th circle",
    },
    labels: {
      item1: "Stage 1",
      item2: "Stage 2",
      item3: "Stage 3",
      item4: "Stage 4",
      item5: "Stage 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-409.09 -251.14) scale(2.2727)">
<path d="M 463 209 A 150 150 0 0 1 497 230" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="510,243 491,237 503,224"/>
<path d="M 549 363 A 150 150 0 0 1 539 402" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="531,418 531,398 547,405"/>
<path d="M 429 492 A 150 150 0 0 1 389 495" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="371,492 390,486 388,504"/>
<path d="M 269 418 A 150 150 0 0 1 254 381" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="251,363 263,379 246,383"/>
<path d="M 290 243 A 150 150 0 0 1 321 218" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="337,209 326,225 316,210"/>
<circle data-ig-fill="primary" cx="400" cy="195" r="55"/>
<circle data-ig-fill="secondary" cx="543" cy="299" r="55"/>
<circle data-ig-fill="tertiary" cx="488" cy="466" r="55"/>
<circle data-ig-fill="primary" cx="312" cy="466" r="55"/>
<circle data-ig-fill="secondary" cx="257" cy="299" r="55"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="400" y="201" text-anchor="middle" font-size="18" fill="#ffffff">Plan</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="543" y="305" text-anchor="middle" font-size="18" fill="#ffffff">Build</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="488" y="472" text-anchor="middle" font-size="18" fill="#ffffff">Launch</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="312" y="472" text-anchor="middle" font-size="18" fill="#ffffff">Measure</text>
<text data-ig-contrast="secondary" data-ig-text="item5" data-ig-font="primary" x="257" y="305" text-anchor="middle" font-size="18" fill="#ffffff">Iterate</text>
</g>
</svg>`,
  },
  {
    id: "pyramid-3",
    family: "pyramid",
    title: "Pyramid (3 levels)",
    category: "Hierarchy",
    items: 3,
    description: "3 stacked levels from broad base to narrow peak.",
    about: "Pyramids communicate hierarchy and proportion: a broad foundation carrying progressively narrower levels. The 3-level version fits strategy cascades (vision down to execution), needs hierarchies, skill ladders, and any argument where lower layers support upper ones. Side labels with leader lines keep every level readable regardless of band size.",
    usage: {
      item1: "peak",
      item2: "second level",
      item3: "base level",
    },
    labels: {
      item1: "Level 1",
      item2: "Level 2",
      item3: "Level 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-61.25 2.57) scale(1.5892)">
<polygon data-ig-fill="primary" points="300,140 374,251 226,251"/>
<polygon data-ig-fill="secondary" points="221,259 379,259 451,367 149,367"/>
<polygon data-ig-fill="tertiary" points="144,375 456,375 530,486 70,486"/>
<line x1="347" y1="196" x2="550" y2="196" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item1" data-ig-font="primary" x="562" y="203" font-size="20" fill="#223333">Vision</text>
<line x1="425" y1="313" x2="550" y2="313" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item2" data-ig-font="primary" x="562" y="320" font-size="20" fill="#223333">Strategy</text>
<line x1="503" y1="430" x2="550" y2="430" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item3" data-ig-font="primary" x="562" y="437" font-size="20" fill="#223333">Tactics</text>
</g>
</svg>`,
  },
  {
    id: "pyramid-4",
    family: "pyramid",
    title: "Pyramid (4 levels)",
    category: "Hierarchy",
    items: 4,
    description: "4 stacked levels from broad base to narrow peak.",
    about: "Pyramids communicate hierarchy and proportion: a broad foundation carrying progressively narrower levels. The 4-level version fits strategy cascades (vision down to execution), needs hierarchies, skill ladders, and any argument where lower layers support upper ones. Side labels with leader lines keep every level readable regardless of band size.",
    usage: {
      item1: "peak",
      item2: "second level",
      item3: "third level",
      item4: "base level",
    },
    labels: {
      item1: "Level 1",
      item2: "Level 2",
      item3: "Level 3",
      item4: "Level 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-56.95 21.78) scale(1.5279)">
<polygon data-ig-fill="primary" points="300,140 355,222 245,222"/>
<polygon data-ig-fill="secondary" points="240,230 360,230 412,309 188,309"/>
<polygon data-ig-fill="tertiary" points="182,317 418,317 470,396 130,396"/>
<polygon data-ig-fill="primary" points="125,404 475,404 530,486 70,486"/>
<line x1="337" y1="181" x2="550" y2="181" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item1" data-ig-font="primary" x="562" y="188" font-size="20" fill="#223333">Vision</text>
<line x1="396" y1="270" x2="550" y2="270" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item2" data-ig-font="primary" x="562" y="277" font-size="20" fill="#223333">Strategy</text>
<line x1="454" y1="356" x2="550" y2="356" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item3" data-ig-font="primary" x="562" y="363" font-size="20" fill="#223333">Tactics</text>
<line x1="513" y1="445" x2="550" y2="445" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item4" data-ig-font="primary" x="562" y="452" font-size="20" fill="#223333">Operations</text>
</g>
</svg>`,
  },
  {
    id: "pyramid-5",
    family: "pyramid",
    title: "Pyramid (5 levels)",
    category: "Hierarchy",
    items: 5,
    description: "5 stacked levels from broad base to narrow peak.",
    about: "Pyramids communicate hierarchy and proportion: a broad foundation carrying progressively narrower levels. The 5-level version fits strategy cascades (vision down to execution), needs hierarchies, skill ladders, and any argument where lower layers support upper ones. Side labels with leader lines keep every level readable regardless of band size.",
    usage: {
      item1: "peak",
      item2: "second level",
      item3: "third level",
      item4: "fourth level",
      item5: "base level",
    },
    labels: {
      item1: "Level 1",
      item2: "Level 2",
      item3: "Level 3",
      item4: "Level 4",
      item5: "Level 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-56.65 23.11) scale(1.5236)">
<polygon data-ig-fill="primary" points="300,140 343,205 257,205"/>
<polygon data-ig-fill="secondary" points="251,213 349,213 389,274 211,274"/>
<polygon data-ig-fill="tertiary" points="205,282 395,282 435,344 165,344"/>
<polygon data-ig-fill="primary" points="159,352 441,352 481,413 119,413"/>
<polygon data-ig-fill="secondary" points="113,421 487,421 530,486 70,486"/>
<line x1="332" y1="173" x2="550" y2="173" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item1" data-ig-font="primary" x="562" y="180" font-size="20" fill="#223333">Vision</text>
<line x1="379" y1="244" x2="550" y2="244" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item2" data-ig-font="primary" x="562" y="251" font-size="20" fill="#223333">Strategy</text>
<line x1="425" y1="313" x2="550" y2="313" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item3" data-ig-font="primary" x="562" y="320" font-size="20" fill="#223333">Tactics</text>
<line x1="471" y1="382" x2="550" y2="382" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item4" data-ig-font="primary" x="562" y="389" font-size="20" fill="#223333">Operations</text>
<line x1="518" y1="453" x2="550" y2="453" stroke="#495057" stroke-width="2" data-ig-stroke="accent"/>
<text data-ig-text="item5" data-ig-font="primary" x="562" y="460" font-size="20" fill="#223333">Foundation</text>
</g>
</svg>`,
  },
  {
    id: "venn-3",
    family: "venn",
    title: "Venn (3 circles)",
    category: "Relationship",
    items: 3,
    description: "Three overlapping circles with a shared center.",
    about: "Three overlapping circles frame a sweet spot: the place where all three forces align. Classic uses include design-tech-business, people-process-technology, and passion-skill-market framings. The center label names what only the full intersection delivers.",
    usage: {
      item1: "top-left circle",
      item2: "top-right circle",
      item3: "bottom circle",
      other1: "center overlap",
    },
    labels: {
      item1: "1st Circle",
      item2: "2nd Circle",
      item3: "3rd Circle",
      other1: "Center",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-357.14 -250.00) scale(2.1429)">
<circle data-ig-fill="primary" cx="330" cy="290" r="140" fill-opacity="0.7"/>
<circle data-ig-fill="secondary" cx="470" cy="290" r="140" fill-opacity="0.7"/>
<circle data-ig-fill="tertiary" cx="400" cy="410" r="140" fill-opacity="0.7"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="275" y="255" text-anchor="middle" font-size="22" fill="#ffffff">Design</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="525" y="255" text-anchor="middle" font-size="22" fill="#ffffff">Tech</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="490" text-anchor="middle" font-size="22" fill="#ffffff">Business</text>
<text data-ig-contrast="secondary" data-ig-text="other1" data-ig-font="primary" x="400" y="338" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Sweet spot</text>
</g>
</svg>`,
  },
  {
    id: "funnel-3",
    family: "funnel",
    title: "Funnel (3 stages)",
    category: "Process",
    items: 3,
    description: "3 narrowing stages from awareness to action.",
    about: "Funnels show narrowing: many enter, fewer remain at each stage. The 3-stage version is the standard shape for sales pipelines, marketing conversion paths, recruiting flows, and any qualification story. Band widths reinforce the message that each stage filters the last.",
    usage: {
      item1: "widest band",
      item2: "second band",
      item3: "narrowest band",
    },
    labels: {
      item1: "Stage 1",
      item2: "Stage 2",
      item3: "Stage 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-142.86 -46.43) scale(1.6071)">
<polygon data-ig-fill="primary" points="120,170 680,170 609,279 191,279"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="400" y="232" text-anchor="middle" font-size="22" fill="#ffffff">Awareness</text>
<polygon data-ig-fill="secondary" points="196,287 604,287 536,393 264,393"/>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="400" y="346" text-anchor="middle" font-size="19" fill="#ffffff">Interest</text>
<polygon data-ig-fill="tertiary" points="269,401 531,401 460,510 340,510"/>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="460" text-anchor="middle" font-size="16" fill="#ffffff">Decision</text>
</g>
</svg>`,
  },
  {
    id: "funnel-4",
    family: "funnel",
    title: "Funnel (4 stages)",
    category: "Process",
    items: 4,
    description: "4 narrowing stages from awareness to action.",
    about: "Funnels show narrowing: many enter, fewer remain at each stage. The 4-stage version is the standard shape for sales pipelines, marketing conversion paths, recruiting flows, and any qualification story. Band widths reinforce the message that each stage filters the last.",
    usage: {
      item1: "widest band",
      item2: "second band",
      item3: "third band",
      item4: "narrowest band",
    },
    labels: {
      item1: "Stage 1",
      item2: "Stage 2",
      item3: "Stage 3",
      item4: "Stage 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-142.86 -46.43) scale(1.6071)">
<polygon data-ig-fill="primary" points="120,170 680,170 628,251 172,251"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="400" y="218" text-anchor="middle" font-size="22" fill="#ffffff">Awareness</text>
<polygon data-ig-fill="secondary" points="178,259 622,259 573,336 227,336"/>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="400" y="304" text-anchor="middle" font-size="20" fill="#ffffff">Interest</text>
<polygon data-ig-fill="tertiary" points="233,344 567,344 518,421 282,421"/>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="388" text-anchor="middle" font-size="18" fill="#ffffff">Consideration</text>
<polygon data-ig-fill="primary" points="288,429 512,429 460,510 340,510"/>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="400" y="474" text-anchor="middle" font-size="16" fill="#ffffff">Decision</text>
</g>
</svg>`,
  },
  {
    id: "funnel-5",
    family: "funnel",
    title: "Funnel (5 stages)",
    category: "Process",
    items: 5,
    description: "5 narrowing stages from awareness to action.",
    about: "Funnels show narrowing: many enter, fewer remain at each stage. The 5-stage version is the standard shape for sales pipelines, marketing conversion paths, recruiting flows, and any qualification story. Band widths reinforce the message that each stage filters the last.",
    usage: {
      item1: "widest band",
      item2: "second band",
      item3: "third band",
      item4: "fourth band",
      item5: "narrowest band",
    },
    labels: {
      item1: "Stage 1",
      item2: "Stage 2",
      item3: "Stage 3",
      item4: "Stage 4",
      item5: "Stage 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-142.86 -46.43) scale(1.6071)">
<polygon data-ig-fill="primary" points="120,170 680,170 639,234 161,234"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="400" y="209" text-anchor="middle" font-size="22" fill="#ffffff">Awareness</text>
<polygon data-ig-fill="secondary" points="167,242 633,242 595,302 205,302"/>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="400" y="278" text-anchor="middle" font-size="20" fill="#ffffff">Interest</text>
<polygon data-ig-fill="tertiary" points="211,310 589,310 551,370 249,370"/>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="346" text-anchor="middle" font-size="19" fill="#ffffff">Consideration</text>
<polygon data-ig-fill="primary" points="255,378 545,378 507,438 293,438"/>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="400" y="414" text-anchor="middle" font-size="18" fill="#ffffff">Decision</text>
<polygon data-ig-fill="secondary" points="299,446 501,446 460,510 340,510"/>
<text data-ig-contrast="secondary" data-ig-text="item5" data-ig-font="primary" x="400" y="483" text-anchor="middle" font-size="16" fill="#ffffff">Action</text>
</g>
</svg>`,
  },
  {
    id: "timeline-3",
    family: "timeline",
    title: "Timeline (3 milestones)",
    category: "Timeline",
    items: 3,
    description: "Horizontal timeline with 3 milestones.",
    about: "A horizontal timeline puts events in order and distance. With 3 milestones plus an optional subtitle line, it covers product roadmaps, project phase plans, company history slides, and launch countdowns. Milestone markers pick up your brand colors in sequence.",
    usage: {
      item1: "milestone 1",
      item2: "milestone 2",
      item3: "milestone 3",
      other1: "subtitle below line",
    },
    labels: {
      item1: "Milestone 1",
      item2: "Milestone 2",
      item3: "Milestone 3",
      other1: "Subtitle",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-59.01 34.87) scale(1.3975)">
<line x1="80" y1="330" x2="720" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<circle data-ig-fill="primary" cx="150" cy="330" r="18"/>
<circle data-ig-fill="secondary" cx="400" cy="330" r="18"/>
<circle data-ig-fill="tertiary" cx="650" cy="330" r="18"/>
<text data-ig-text="item1" data-ig-font="primary" x="150" y="280" text-anchor="middle" font-size="20" fill="#212529">Kickoff</text>
<text data-ig-text="item2" data-ig-font="primary" x="400" y="280" text-anchor="middle" font-size="20" fill="#212529">Alpha</text>
<text data-ig-text="item3" data-ig-font="primary" x="650" y="280" text-anchor="middle" font-size="20" fill="#212529">Beta</text>
<text data-ig-text="other1" data-ig-font="secondary" x="400" y="400" text-anchor="middle" font-size="18" fill="#495057">Fiscal Year</text>
</g>
</svg>`,
  },
  {
    id: "timeline-4",
    family: "timeline",
    title: "Timeline (4 milestones)",
    category: "Timeline",
    items: 4,
    description: "Horizontal timeline with 4 milestones.",
    about: "A horizontal timeline puts events in order and distance. With 4 milestones plus an optional subtitle line, it covers product roadmaps, project phase plans, company history slides, and launch countdowns. Milestone markers pick up your brand colors in sequence.",
    usage: {
      item1: "milestone 1",
      item2: "milestone 2",
      item3: "milestone 3",
      item4: "milestone 4",
      other1: "subtitle below line",
    },
    labels: {
      item1: "Milestone 1",
      item2: "Milestone 2",
      item3: "Milestone 3",
      item4: "Milestone 4",
      other1: "Subtitle",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-59.01 34.87) scale(1.3975)">
<line x1="80" y1="330" x2="720" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<circle data-ig-fill="primary" cx="150" cy="330" r="18"/>
<circle data-ig-fill="secondary" cx="317" cy="330" r="18"/>
<circle data-ig-fill="tertiary" cx="483" cy="330" r="18"/>
<circle data-ig-fill="primary" cx="650" cy="330" r="18"/>
<text data-ig-text="item1" data-ig-font="primary" x="150" y="280" text-anchor="middle" font-size="20" fill="#212529">Kickoff</text>
<text data-ig-text="item2" data-ig-font="primary" x="317" y="280" text-anchor="middle" font-size="20" fill="#212529">Alpha</text>
<text data-ig-text="item3" data-ig-font="primary" x="483" y="280" text-anchor="middle" font-size="20" fill="#212529">Beta</text>
<text data-ig-text="item4" data-ig-font="primary" x="650" y="280" text-anchor="middle" font-size="20" fill="#212529">Launch</text>
<text data-ig-text="other1" data-ig-font="secondary" x="400" y="400" text-anchor="middle" font-size="18" fill="#495057">Fiscal Year</text>
</g>
</svg>`,
  },
  {
    id: "timeline-5",
    family: "timeline",
    title: "Timeline (5 milestones)",
    category: "Timeline",
    items: 5,
    description: "Horizontal timeline with 5 milestones.",
    about: "A horizontal timeline puts events in order and distance. With 5 milestones plus an optional subtitle line, it covers product roadmaps, project phase plans, company history slides, and launch countdowns. Milestone markers pick up your brand colors in sequence.",
    usage: {
      item1: "milestone 1",
      item2: "milestone 2",
      item3: "milestone 3",
      item4: "milestone 4",
      item5: "milestone 5",
      other1: "subtitle below line",
    },
    labels: {
      item1: "Milestone 1",
      item2: "Milestone 2",
      item3: "Milestone 3",
      item4: "Milestone 4",
      item5: "Milestone 5",
      other1: "Subtitle",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-59.01 33.35) scale(1.3975)">
<line x1="80" y1="330" x2="720" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<circle data-ig-fill="primary" cx="150" cy="330" r="16"/>
<circle data-ig-fill="secondary" cx="275" cy="330" r="16"/>
<circle data-ig-fill="tertiary" cx="400" cy="330" r="16"/>
<circle data-ig-fill="primary" cx="525" cy="330" r="16"/>
<circle data-ig-fill="secondary" cx="650" cy="330" r="16"/>
<text data-ig-text="item1" data-ig-font="primary" x="150" y="280" text-anchor="middle" font-size="17" fill="#212529">Kickoff</text>
<text data-ig-text="item2" data-ig-font="primary" x="275" y="280" text-anchor="middle" font-size="17" fill="#212529">Alpha</text>
<text data-ig-text="item3" data-ig-font="primary" x="400" y="280" text-anchor="middle" font-size="17" fill="#212529">Beta</text>
<text data-ig-text="item4" data-ig-font="primary" x="525" y="280" text-anchor="middle" font-size="17" fill="#212529">Launch</text>
<text data-ig-text="item5" data-ig-font="primary" x="650" y="280" text-anchor="middle" font-size="17" fill="#212529">Scale</text>
<text data-ig-text="other1" data-ig-font="secondary" x="400" y="400" text-anchor="middle" font-size="18" fill="#495057">Fiscal Year</text>
</g>
</svg>`,
  },
  {
    id: "steps-3",
    family: "steps",
    title: "Step Circles (3 steps)",
    category: "Process",
    items: 3,
    description: "3 numbered circles with step labels.",
    about: "Numbered circles present instructions people should follow one at a time. The 3-step layout works for how-to guides, setup instructions, and service explainers; the 3-step variant adds caption lines under each circle for a sentence of detail.",
    usage: {
      item1: "step 1 circle",
      item2: "step 2 circle",
      item3: "step 3 circle",
      other1: "under step 1",
      other2: "under step 2",
      other3: "under step 3",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      other1: "Caption 1",
      other2: "Caption 2",
      other3: "Caption 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-4.91 67.31) scale(1.2623)">
<circle cx="150" cy="320" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="150" cy="320" r="88"/>
<circle data-ig-fill="primary" cx="74" cy="238" r="26"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="74" y="249" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="150" y="328" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Step one</text>
<text data-ig-text="other1" data-ig-font="secondary" x="150" y="470" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
<circle cx="400" cy="320" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="400" cy="320" r="88"/>
<circle data-ig-fill="secondary" cx="324" cy="238" r="26"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="324" y="249" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="400" y="328" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Step two</text>
<text data-ig-text="other2" data-ig-font="secondary" x="400" y="470" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
<circle cx="650" cy="320" r="105" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="650" cy="320" r="88"/>
<circle data-ig-fill="tertiary" cx="574" cy="238" r="26"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="574" y="249" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="650" y="328" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Step three</text>
<text data-ig-text="other3" data-ig-font="secondary" x="650" y="470" text-anchor="middle" font-size="18" fill="#556666">Short caption here</text>
</g>
</svg>`,
  },
  {
    id: "steps-4",
    family: "steps",
    title: "Step Circles (4 steps)",
    category: "Process",
    items: 4,
    description: "4 numbered circles with step labels.",
    about: "Numbered circles present instructions people should follow one at a time. The 4-step layout works for how-to guides, setup instructions, and service explainers; the 3-step variant adds caption lines under each circle for a sentence of detail.",
    usage: {
      item1: "step 1 circle",
      item2: "step 2 circle",
      item3: "step 3 circle",
      item4: "step 4 circle",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      item4: "Step 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-9.19 93.60) scale(1.2730)">
<circle cx="130" cy="320" r="82" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="130" cy="320" r="69"/>
<circle data-ig-fill="primary" cx="71" cy="256" r="21"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="71" y="265" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="130" y="326" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Step one</text>
<circle cx="310" cy="320" r="82" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="310" cy="320" r="69"/>
<circle data-ig-fill="secondary" cx="251" cy="256" r="21"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="251" y="265" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="310" y="326" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Step two</text>
<circle cx="490" cy="320" r="82" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="490" cy="320" r="69"/>
<circle data-ig-fill="tertiary" cx="431" cy="256" r="21"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="431" y="265" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="490" y="326" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Step three</text>
<circle cx="670" cy="320" r="82" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="670" cy="320" r="69"/>
<circle data-ig-fill="primary" cx="611" cy="256" r="21"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="611" y="265" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="670" y="326" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Step four</text>
</g>
</svg>`,
  },
  {
    id: "steps-5",
    family: "steps",
    title: "Step Circles (5 steps)",
    category: "Process",
    items: 5,
    description: "5 numbered circles with step labels.",
    about: "Numbered circles present instructions people should follow one at a time. The 5-step layout works for how-to guides, setup instructions, and service explainers; the 3-step variant adds caption lines under each circle for a sentence of detail.",
    usage: {
      item1: "step 1 circle",
      item2: "step 2 circle",
      item3: "step 3 circle",
      item4: "step 4 circle",
      item5: "step 5 circle",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      item4: "Step 4",
      item5: "Step 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(10.20 108.47) scale(1.2245)">
<circle cx="100" cy="320" r="66" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="100" cy="320" r="55"/>
<circle data-ig-fill="primary" cx="52" cy="269" r="17"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="52" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="100" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step one</text>
<circle cx="250" cy="320" r="66" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="250" cy="320" r="55"/>
<circle data-ig-fill="secondary" cx="202" cy="269" r="17"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="202" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="250" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step two</text>
<circle cx="400" cy="320" r="66" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="400" cy="320" r="55"/>
<circle data-ig-fill="tertiary" cx="352" cy="269" r="17"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="352" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="400" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step three</text>
<circle cx="550" cy="320" r="66" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="primary" cx="550" cy="320" r="55"/>
<circle data-ig-fill="primary" cx="502" cy="269" r="17"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="502" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="550" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step four</text>
<circle cx="700" cy="320" r="66" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="700" cy="320" r="55"/>
<circle data-ig-fill="secondary" cx="652" cy="269" r="17"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="652" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">5</text>
<text data-ig-contrast="secondary" data-ig-text="item5" data-ig-font="primary" x="700" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step five</text>
</g>
</svg>`,
  },
  {
    id: "venn-2",
    family: "venn",
    title: "Venn (2 circles)",
    category: "Relationship",
    items: 2,
    description: "Two overlapping circles with a shared middle value.",
    about: "Two overlapping circles are the fastest way to show where two ideas meet. Use it for positioning statements (quality meets speed), partnership stories, or skills intersections; the overlap label names the value created where the circles meet.",
    usage: {
      item1: "left circle",
      item2: "right circle",
      other1: "overlap",
    },
    labels: {
      item1: "Left Circle",
      item2: "Right Circle",
      other1: "Overlap",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-234.69 -124.49) scale(1.8367)">
<circle data-ig-fill="primary" cx="315" cy="340" r="160" fill-opacity="0.75"/>
<circle data-ig-fill="secondary" cx="485" cy="340" r="160" fill-opacity="0.75"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="240" y="348" text-anchor="middle" font-size="24" fill="#ffffff">Quality</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="560" y="348" text-anchor="middle" font-size="24" fill="#ffffff">Speed</text>
<text data-ig-contrast="secondary" data-ig-text="other1" data-ig-font="primary" x="400" y="348" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Value</text>
</g>
</svg>`,
  },
  {
    id: "list-3",
    family: "list",
    title: "Numbered List (3 items)",
    category: "List",
    items: 3,
    description: "Three numbered items in stacked bars.",
    about: "A numbered list ranks things: priorities, principles, agenda points, product pillars. The 3-item layout gives each entry a full-width bar with a numbered badge, making order and importance obvious. Alternating bar colors keep long lists scannable.",
    usage: {
      item1: "bar 1",
      item2: "bar 2",
      item3: "bar 3",
    },
    labels: {
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-192.31 -53.85) scale(1.7308)">
<rect data-ig-fill="primary" x="140" y="170" width="520" height="84" rx="12"/>
<rect data-ig-fill="secondary" x="140" y="278" width="520" height="84" rx="12"/>
<rect data-ig-fill="primary" x="140" y="386" width="520" height="84" rx="12"/>
<circle data-ig-fill="tertiary" cx="185" cy="212" r="26"/>
<circle data-ig-fill="tertiary" cx="185" cy="320" r="26"/>
<circle data-ig-fill="tertiary" cx="185" cy="428" r="26"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="221" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="329" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="437" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="235" y="221" font-size="24" fill="#ffffff">Grow revenue</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="235" y="329" font-size="24" fill="#ffffff">Delight customers</text>
<text data-ig-contrast="primary" data-ig-text="item3" data-ig-font="primary" x="235" y="437" font-size="24" fill="#ffffff">Reduce costs</text>
</g>
</svg>`,
  },
  {
    id: "list-4",
    family: "list",
    title: "Numbered List (4 items)",
    category: "List",
    items: 4,
    description: "Four numbered items in stacked bars.",
    about: "A numbered list ranks things: priorities, principles, agenda points, product pillars. The 4-item layout gives each entry a full-width bar with a numbered badge, making order and importance obvious. Alternating bar colors keep long lists scannable.",
    usage: {
      item1: "bar 1",
      item2: "bar 2",
      item3: "bar 3",
      item4: "bar 4",
    },
    labels: {
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
      item4: "Item 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-192.31 -60.77) scale(1.7308)">
<rect data-ig-fill="primary" x="140" y="150" width="520" height="72" rx="12"/>
<rect data-ig-fill="secondary" x="140" y="242" width="520" height="72" rx="12"/>
<rect data-ig-fill="primary" x="140" y="334" width="520" height="72" rx="12"/>
<rect data-ig-fill="secondary" x="140" y="426" width="520" height="72" rx="12"/>
<circle data-ig-fill="tertiary" cx="185" cy="186" r="24"/>
<circle data-ig-fill="tertiary" cx="185" cy="278" r="24"/>
<circle data-ig-fill="tertiary" cx="185" cy="370" r="24"/>
<circle data-ig-fill="tertiary" cx="185" cy="462" r="24"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="194" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="286" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="378" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="185" y="470" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="235" y="194" font-size="22" fill="#ffffff">Grow revenue</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="235" y="286" font-size="22" fill="#ffffff">Delight customers</text>
<text data-ig-contrast="primary" data-ig-text="item3" data-ig-font="primary" x="235" y="378" font-size="22" fill="#ffffff">Reduce costs</text>
<text data-ig-contrast="secondary" data-ig-text="item4" data-ig-font="primary" x="235" y="470" font-size="22" fill="#ffffff">Develop talent</text>
</g>
</svg>`,
  },
  {
    id: "list-5",
    family: "list",
    title: "Numbered List (5 items)",
    category: "List",
    items: 5,
    description: "Five numbered items in stacked bars.",
    about: "A numbered list ranks things: priorities, principles, agenda points, product pillars. The 5-item layout gives each entry a full-width bar with a numbered badge, making order and importance obvious. Alternating bar colors keep long lists scannable.",
    usage: {
      item1: "bar 1",
      item2: "bar 2",
      item3: "bar 3",
      item4: "bar 4",
      item5: "bar 5",
    },
    labels: {
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
      item4: "Item 4",
      item5: "Item 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-192.31 -74.62) scale(1.7308)">
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
<text data-ig-contrast="tertiary" data-ig-font="primary" x="180" y="187" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="180" y="263" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="180" y="339" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="180" y="415" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="180" y="491" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">5</text>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="220" y="187" font-size="20" fill="#ffffff">Grow revenue</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="220" y="263" font-size="20" fill="#ffffff">Delight customers</text>
<text data-ig-contrast="primary" data-ig-text="item3" data-ig-font="primary" x="220" y="339" font-size="20" fill="#ffffff">Reduce costs</text>
<text data-ig-contrast="secondary" data-ig-text="item4" data-ig-font="primary" x="220" y="415" font-size="20" fill="#ffffff">Develop talent</text>
<text data-ig-contrast="primary" data-ig-text="item5" data-ig-font="primary" x="220" y="491" font-size="20" fill="#ffffff">Expand markets</text>
</g>
</svg>`,
  },
  {
    id: "matrix-2x2",
    family: "matrix",
    title: "2x2 Matrix",
    category: "Comparison",
    items: 4,
    description: "Four quadrants with axis labels.",
    about: "The 2x2 matrix is the consultant's favorite for a reason: two axes, four quadrants, instant prioritization. Label the axes (effort vs impact, urgency vs importance) and name each quadrant to sort ideas, projects, or competitors into actionable buckets.",
    usage: {
      item1: "top-left cell",
      item2: "top-right cell",
      item3: "bottom-left cell",
      item4: "bottom-right cell",
      other1: "bottom axis",
      other2: "left axis",
    },
    labels: {
      item1: "Top Left",
      item2: "Top Right",
      item3: "Bottom Left",
      item4: "Bottom Right",
      other1: "X-Axis Label",
      other2: "Y-Axis Label",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-142.06 -86.94) scale(1.6299)">
<rect data-ig-fill="primary" x="170" y="150" width="245" height="185" rx="8"/>
<rect data-ig-fill="secondary" x="425" y="150" width="245" height="185" rx="8"/>
<rect data-ig-fill="tertiary" x="170" y="345" width="245" height="185" rx="8"/>
<rect data-ig-fill="primary" x="425" y="345" width="245" height="185" rx="8"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="292" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Quick Wins</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="547" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Big Bets</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="292" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Fill-Ins</text>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="547" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Money Pits</text>
<text data-ig-text="other1" data-ig-font="secondary" x="420" y="570" text-anchor="middle" font-size="17" fill="#495057">Effort</text>
<text data-ig-text="other2" data-ig-font="secondary" x="130" y="340" text-anchor="middle" font-size="17" fill="#495057" transform="rotate(-90 130 340)">Impact</text>
</g>
</svg>`,
  },
  {
    id: "hub-spoke-3",
    family: "hub-spoke",
    title: "Hub & Spoke (3 spokes)",
    category: "Relationship",
    items: 3,
    description: "Central hub connected to 3 spokes.",
    about: "Hub and spoke puts one thing at the center and everything else in orbit: a core product with its channels, a team with its functions, a platform with its integrations. Spokes make the relationships explicit without implying order or hierarchy.",
    usage: {
      item1: "spoke 1",
      item2: "spoke 2",
      item3: "spoke 3",
      other1: "center hub",
    },
    labels: {
      item1: "Spoke 1",
      item2: "Spoke 2",
      item3: "Spoke 3",
      other1: "Hub",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-116.44 112.41) scale(1.5411)">
<line x1="400" y1="310" x2="400" y2="75" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="604" y2="428" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="196" y2="428" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<circle data-ig-fill="primary" cx="400" cy="310" r="92"/>
<rect data-ig-fill="secondary" x="312" y="43" width="176" height="64" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="82" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Sales</text>
<rect data-ig-fill="tertiary" x="516" y="396" width="176" height="64" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="604" y="434" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Support</text>
<rect data-ig-fill="primary" x="108" y="396" width="176" height="64" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="196" y="434" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Marketing</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="318" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">Core Product</text>
</g>
</svg>`,
  },
  {
    id: "hub-spoke-4",
    family: "hub-spoke",
    title: "Hub & Spoke (4 spokes)",
    category: "Relationship",
    items: 4,
    description: "Central hub connected to 4 spokes.",
    about: "Hub and spoke puts one thing at the center and everything else in orbit: a core product with its channels, a team with its functions, a platform with its integrations. Spokes make the relationships explicit without implying order or hierarchy.",
    usage: {
      item1: "spoke 1",
      item2: "spoke 2",
      item3: "spoke 3",
      item4: "spoke 4",
      other1: "center hub",
    },
    labels: {
      item1: "Spoke 1",
      item2: "Spoke 2",
      item3: "Spoke 3",
      item4: "Spoke 4",
      other1: "Hub",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-57.28 68.11) scale(1.3932)">
<line x1="400" y1="310" x2="400" y2="75" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="635" y2="310" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="400" y2="545" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="165" y2="310" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<circle data-ig-fill="primary" cx="400" cy="310" r="92"/>
<rect data-ig-fill="secondary" x="312" y="43" width="176" height="64" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="82" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Sales</text>
<rect data-ig-fill="tertiary" x="547" y="278" width="176" height="64" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="635" y="317" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Support</text>
<rect data-ig-fill="primary" x="312" y="513" width="176" height="64" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="400" y="552" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Marketing</text>
<rect data-ig-fill="secondary" x="77" y="278" width="176" height="64" rx="10"/>
<text data-ig-text="item4" data-ig-contrast="secondary" data-ig-font="primary" x="165" y="317" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Partners</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="318" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">Core Product</text>
</g>
</svg>`,
  },
  {
    id: "hub-spoke-5",
    family: "hub-spoke",
    title: "Hub & Spoke (5 spokes)",
    category: "Relationship",
    items: 5,
    description: "Central hub connected to 5 spokes.",
    about: "Hub and spoke puts one thing at the center and everything else in orbit: a core product with its channels, a team with its functions, a platform with its integrations. Spokes make the relationships explicit without implying order or hierarchy.",
    usage: {
      item1: "spoke 1",
      item2: "spoke 2",
      item3: "spoke 3",
      item4: "spoke 4",
      item5: "spoke 5",
      other1: "center hub",
    },
    labels: {
      item1: "Spoke 1",
      item2: "Spoke 2",
      item3: "Spoke 3",
      item4: "Spoke 4",
      item5: "Spoke 5",
      other1: "Hub",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-78.78 84.00) scale(1.4469)">
<line x1="400" y1="310" x2="400" y2="75" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="623" y2="237" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="538" y2="500" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="262" y2="500" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="310" x2="177" y2="237" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<circle data-ig-fill="primary" cx="400" cy="310" r="92"/>
<rect data-ig-fill="secondary" x="312" y="43" width="176" height="64" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="82" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Sales</text>
<rect data-ig-fill="tertiary" x="535" y="205" width="176" height="64" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="623" y="244" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Support</text>
<rect data-ig-fill="primary" x="450" y="468" width="176" height="64" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="538" y="507" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Marketing</text>
<rect data-ig-fill="secondary" x="174" y="468" width="176" height="64" rx="10"/>
<text data-ig-text="item4" data-ig-contrast="secondary" data-ig-font="primary" x="262" y="507" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Partners</text>
<rect data-ig-fill="tertiary" x="89" y="205" width="176" height="64" rx="10"/>
<text data-ig-text="item5" data-ig-contrast="tertiary" data-ig-font="primary" x="177" y="244" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Community</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="318" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">Core Product</text>
</g>
</svg>`,
  },
  {
    id: "before-after-1",
    family: "before-after",
    title: "Before / After",
    category: "Comparison",
    items: 2,
    description: "Side-by-side panels contrasting old and new.",
    about: "Nothing sells a change like a side-by-side. The before/after panels frame the old state and the new state with a caption line under each for the numbers that prove the difference. Use it for process improvements, redesigns, and results slides.",
    usage: {
      item1: "before panel",
      item2: "after panel",
      other1: "under before",
      other2: "under after",
    },
    labels: {
      item1: "Before",
      item2: "After",
      other1: "Before Caption",
      other2: "After Caption",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-100.00 -16.28) scale(1.5000)">
<rect data-ig-fill="secondary" x="100" y="180" width="280" height="280" rx="14"/>
<rect data-ig-fill="primary" x="420" y="180" width="280" height="280" rx="14"/>
<text data-ig-contrast="secondary" data-ig-font="secondary" x="240" y="220" text-anchor="middle" font-size="17" font-weight="bold" fill="#495057">BEFORE</text>
<text data-ig-contrast="primary" data-ig-font="secondary" x="560" y="220" text-anchor="middle" font-size="17" font-weight="bold" fill="#495057">AFTER</text>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="240" y="330" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Manual process</text>
<text data-ig-text="item2" data-ig-contrast="primary" data-ig-font="primary" x="560" y="330" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Automated flow</text>
<line x1="372" y1="320" x2="412" y2="320" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/><polygon data-ig-fill="accent" fill="#495057" points="428,320 412,311 412,329"/>
<text data-ig-text="other1" data-ig-font="secondary" x="240" y="505" text-anchor="middle" font-size="17" fill="#212529">12 hours per week</text>
<text data-ig-text="other2" data-ig-font="secondary" x="560" y="505" text-anchor="middle" font-size="17" fill="#212529">20 minutes per week</text>
</g>
</svg>`,
  },
  {
    id: "pillars-3",
    family: "pillars",
    title: "Pillars (3)",
    category: "Hierarchy",
    items: 3,
    description: "3 pillars carrying a shared roof.",
    about: "Pillars communicate that a structure stands on named supports: company values, strategy pillars, program workstreams. The roof and base bind them into one story - remove a pillar and the roof falls.",
    usage: {
      item1: "pillar 1",
      item2: "pillar 2",
      item3: "pillar 3",
      other1: "base slab",
    },
    labels: {
      item1: "Pillar 1",
      item2: "Pillar 2",
      item3: "Pillar 3",
      other1: "Base",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-29.41 59.26) scale(1.3235)">
<polygon data-ig-fill="primary" points="400,120 740,196 60,196"/>
<rect data-ig-fill="primary" x="90" y="208" width="620" height="34"/>
<rect data-ig-fill="primary" x="90" y="490" width="620" height="56" rx="6"/>
<rect data-ig-fill="secondary" x="120" y="254" width="110" height="224"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="175" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 175 366)" fill="#ffffff">Quality</text>
<rect data-ig-fill="tertiary" x="345" y="254" width="110" height="224"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="400" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 400 366)" fill="#ffffff">Service</text>
<rect data-ig-fill="primary" x="570" y="254" width="110" height="224"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="625" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 625 366)" fill="#ffffff">Trust</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="526" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Our Foundation</text>
</g>
</svg>`,
  },
  {
    id: "pillars-4",
    family: "pillars",
    title: "Pillars (4)",
    category: "Hierarchy",
    items: 4,
    description: "4 pillars carrying a shared roof.",
    about: "Pillars communicate that a structure stands on named supports: company values, strategy pillars, program workstreams. The roof and base bind them into one story - remove a pillar and the roof falls.",
    usage: {
      item1: "pillar 1",
      item2: "pillar 2",
      item3: "pillar 3",
      item4: "pillar 4",
      other1: "base slab",
    },
    labels: {
      item1: "Pillar 1",
      item2: "Pillar 2",
      item3: "Pillar 3",
      item4: "Pillar 4",
      other1: "Base",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-29.41 59.26) scale(1.3235)">
<polygon data-ig-fill="primary" points="400,120 740,196 60,196"/>
<rect data-ig-fill="primary" x="90" y="208" width="620" height="34"/>
<rect data-ig-fill="primary" x="90" y="490" width="620" height="56" rx="6"/>
<rect data-ig-fill="secondary" x="120" y="254" width="92" height="224"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="166" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 166 366)" fill="#ffffff">Quality</text>
<rect data-ig-fill="tertiary" x="276" y="254" width="92" height="224"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="322" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 322 366)" fill="#ffffff">Service</text>
<rect data-ig-fill="primary" x="432" y="254" width="92" height="224"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="478" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 478 366)" fill="#ffffff">Trust</text>
<rect data-ig-fill="secondary" x="588" y="254" width="92" height="224"/>
<text data-ig-text="item4" data-ig-contrast="secondary" data-ig-font="primary" x="634" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 634 366)" fill="#ffffff">Value</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="526" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Our Foundation</text>
</g>
</svg>`,
  },
  {
    id: "pillars-5",
    family: "pillars",
    title: "Pillars (5)",
    category: "Hierarchy",
    items: 5,
    description: "5 pillars carrying a shared roof.",
    about: "Pillars communicate that a structure stands on named supports: company values, strategy pillars, program workstreams. The roof and base bind them into one story - remove a pillar and the roof falls.",
    usage: {
      item1: "pillar 1",
      item2: "pillar 2",
      item3: "pillar 3",
      item4: "pillar 4",
      item5: "pillar 5",
      other1: "base slab",
    },
    labels: {
      item1: "Pillar 1",
      item2: "Pillar 2",
      item3: "Pillar 3",
      item4: "Pillar 4",
      item5: "Pillar 5",
      other1: "Base",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-29.41 59.26) scale(1.3235)">
<polygon data-ig-fill="primary" points="400,120 740,196 60,196"/>
<rect data-ig-fill="primary" x="90" y="208" width="620" height="34"/>
<rect data-ig-fill="primary" x="90" y="490" width="620" height="56" rx="6"/>
<rect data-ig-fill="secondary" x="120" y="254" width="76" height="224"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="158" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 158 366)" fill="#ffffff">Quality</text>
<rect data-ig-fill="tertiary" x="241" y="254" width="76" height="224"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="279" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 279 366)" fill="#ffffff">Service</text>
<rect data-ig-fill="primary" x="362" y="254" width="76" height="224"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="400" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 400 366)" fill="#ffffff">Trust</text>
<rect data-ig-fill="secondary" x="483" y="254" width="76" height="224"/>
<text data-ig-text="item4" data-ig-contrast="secondary" data-ig-font="primary" x="521" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 521 366)" fill="#ffffff">Value</text>
<rect data-ig-fill="tertiary" x="604" y="254" width="76" height="224"/>
<text data-ig-text="item5" data-ig-contrast="tertiary" data-ig-font="primary" x="642" y="366" text-anchor="middle" font-size="19" font-weight="bold" transform="rotate(-90 642 366)" fill="#ffffff">People</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="526" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Our Foundation</text>
</g>
</svg>`,
  },
  {
    id: "swot-1",
    family: "swot",
    title: "SWOT Analysis",
    category: "Analysis",
    items: 4,
    description: "Four-quadrant strengths, weaknesses, opportunities, threats grid.",
    about: "The SWOT grid is the classic four-way analysis: internal strengths and weaknesses against external opportunities and threats. Quadrant headers are fixed; your content goes inside each cell.",
    usage: {
      item1: "strengths cell",
      item2: "weaknesses cell",
      item3: "opportunities cell",
      item4: "threats cell",
    },
    labels: {
      item1: "Strengths",
      item2: "Weaknesses",
      item3: "Opportunities",
      item4: "Threats",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-175.00 -10.00) scale(1.5000)">
<rect data-ig-fill="primary" x="150" y="150" width="290" height="180" rx="10"/>
<text data-ig-contrast="primary" data-ig-font="secondary" x="295" y="186" text-anchor="middle" font-size="16" font-weight="bold" fill="#495057">STRENGTHS</text>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="295" y="258" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Strong brand</text>
<rect data-ig-fill="secondary" x="460" y="150" width="290" height="180" rx="10"/>
<text data-ig-contrast="secondary" data-ig-font="secondary" x="605" y="186" text-anchor="middle" font-size="16" font-weight="bold" fill="#495057">WEAKNESSES</text>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="605" y="258" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Limited reach</text>
<rect data-ig-fill="tertiary" x="150" y="350" width="290" height="180" rx="10"/>
<text data-ig-contrast="tertiary" data-ig-font="secondary" x="295" y="386" text-anchor="middle" font-size="16" font-weight="bold" fill="#495057">OPPORTUNITIES</text>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="295" y="458" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">New markets</text>
<rect data-ig-fill="primary" x="460" y="350" width="290" height="180" rx="10"/>
<text data-ig-contrast="primary" data-ig-font="secondary" x="605" y="386" text-anchor="middle" font-size="16" font-weight="bold" fill="#495057">THREATS</text>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="605" y="458" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Competition</text>
</g>
</svg>`,
  },
  {
    id: "pros-cons-1",
    family: "pros-cons",
    title: "Pros / Cons",
    category: "Comparison",
    items: 3,
    description: "Two columns weighing a decision, three points each.",
    about: "A two-column pros and cons list is the fastest honest way to present a decision. Three slots per side keep it disciplined - if it does not fit, it is not a top consideration.",
    usage: {
      item1: "pro 1",
      item2: "pro 2",
      item3: "pro 3",
      other1: "con 1",
      other2: "con 2",
      other3: "con 3",
    },
    labels: {
      item1: "Pro 1",
      item2: "Pro 2",
      item3: "Pro 3",
      other1: "Con 1",
      other2: "Con 2",
      other3: "Con 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-120.69 22.07) scale(1.5517)">
<rect data-ig-fill="primary" x="110" y="150" width="270" height="58" rx="10"/>
<rect data-ig-fill="secondary" x="420" y="150" width="270" height="58" rx="10"/>
<text data-ig-contrast="primary" data-ig-font="secondary" x="245" y="187" text-anchor="middle" font-size="20" font-weight="bold" fill="#495057">PROS</text>
<text data-ig-contrast="secondary" data-ig-font="secondary" x="555" y="187" text-anchor="middle" font-size="20" font-weight="bold" fill="#495057">CONS</text>
<rect x="110" y="228" width="270" height="66" rx="10" fill="#e9ecef"/>
<rect x="420" y="228" width="270" height="66" rx="10" fill="#e9ecef"/>
<text data-ig-text="item1" data-ig-font="primary" x="245" y="268" text-anchor="middle" font-size="18" fill="#212529">Lower cost</text>
<text data-ig-text="other1" data-ig-font="primary" x="555" y="268" text-anchor="middle" font-size="18" fill="#212529">Learning curve</text>
<rect x="110" y="314" width="270" height="66" rx="10" fill="#e9ecef"/>
<rect x="420" y="314" width="270" height="66" rx="10" fill="#e9ecef"/>
<text data-ig-text="item2" data-ig-font="primary" x="245" y="354" text-anchor="middle" font-size="18" fill="#212529">Faster setup</text>
<text data-ig-text="other2" data-ig-font="primary" x="555" y="354" text-anchor="middle" font-size="18" fill="#212529">Migration effort</text>
<rect x="110" y="400" width="270" height="66" rx="10" fill="#e9ecef"/>
<rect x="420" y="400" width="270" height="66" rx="10" fill="#e9ecef"/>
<text data-ig-text="item3" data-ig-font="primary" x="245" y="440" text-anchor="middle" font-size="18" fill="#212529">Less risk</text>
<text data-ig-text="other3" data-ig-font="primary" x="555" y="440" text-anchor="middle" font-size="18" fill="#212529">New vendor</text>
</g>
</svg>`,
  },
  {
    id: "roadmap-3",
    family: "roadmap",
    title: "Roadmap (3 stops)",
    category: "Timeline",
    items: 3,
    description: "Winding road with 3 numbered stops.",
    about: "The winding-road roadmap tells a journey story that a straight timeline cannot: numbered stops along a road that visibly continues. Use it for product phases, change programs, and learning paths.",
    usage: {
      item1: "stop 1",
      item2: "stop 2",
      item3: "stop 3",
    },
    labels: {
      item1: "Stop 1",
      item2: "Stop 2",
      item3: "Stop 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-69.43 -13.71) scale(1.4051)">



<path d="M 100 540 Q 420 540 700 160" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="30" stroke-linecap="round"/>
<path d="M 100 540 Q 420 540 700 160" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round"/>
<circle data-ig-fill="primary" cx="151" cy="538" r="24"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="151" y="545" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-text="item1" data-ig-font="primary" x="181" y="586" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Research</text>
<circle data-ig-fill="secondary" cx="410" cy="445" r="24"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="410" y="452" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-text="item2" data-ig-font="primary" x="440" y="493" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Prototype</text>
<circle data-ig-fill="tertiary" cx="655" cy="218" r="24"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="655" y="225" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-text="item3" data-ig-font="primary" x="685" y="266" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Beta</text>
</g>
</svg>`,
  },
  {
    id: "roadmap-4",
    family: "roadmap",
    title: "Roadmap (4 stops)",
    category: "Timeline",
    items: 4,
    description: "Winding road with 4 numbered stops.",
    about: "The winding-road roadmap tells a journey story that a straight timeline cannot: numbered stops along a road that visibly continues. Use it for product phases, change programs, and learning paths.",
    usage: {
      item1: "stop 1",
      item2: "stop 2",
      item3: "stop 3",
      item4: "stop 4",
    },
    labels: {
      item1: "Stop 1",
      item2: "Stop 2",
      item3: "Stop 3",
      item4: "Stop 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-64.82 6.14) scale(1.3508)">



<path d="M 100 540 Q 420 540 700 160" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="30" stroke-linecap="round"/>
<path d="M 100 540 Q 420 540 700 160" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round"/>
<circle data-ig-fill="primary" cx="151" cy="538" r="24"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="151" y="545" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-text="item1" data-ig-font="primary" x="181" y="586" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Research</text>
<circle data-ig-fill="secondary" cx="325" cy="491" r="24"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="325" y="498" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-text="item2" data-ig-font="primary" x="355" y="539" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Prototype</text>
<circle data-ig-fill="tertiary" cx="493" cy="384" r="24"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="493" y="391" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-text="item3" data-ig-font="primary" x="523" y="432" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Beta</text>
<circle data-ig-fill="primary" cx="655" cy="218" r="24"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="655" y="225" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-text="item4" data-ig-font="primary" x="685" y="266" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Launch</text>
</g>
</svg>`,
  },
  {
    id: "roadmap-5",
    family: "roadmap",
    title: "Roadmap (5 stops)",
    category: "Timeline",
    items: 5,
    description: "Winding road with 5 numbered stops.",
    about: "The winding-road roadmap tells a journey story that a straight timeline cannot: numbered stops along a road that visibly continues. Use it for product phases, change programs, and learning paths.",
    usage: {
      item1: "stop 1",
      item2: "stop 2",
      item3: "stop 3",
      item4: "stop 4",
      item5: "stop 5",
    },
    labels: {
      item1: "Stop 1",
      item2: "Stop 2",
      item3: "Stop 3",
      item4: "Stop 4",
      item5: "Stop 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-67.89 -7.08) scale(1.3869)">



<path d="M 100 540 Q 420 540 700 160" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="30" stroke-linecap="round"/>
<path d="M 100 540 Q 420 540 700 160" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="14 12" stroke-linecap="round"/>
<circle data-ig-fill="primary" cx="151" cy="538" r="24"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="151" y="545" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-text="item1" data-ig-font="primary" x="181" y="586" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Research</text>
<circle data-ig-fill="secondary" cx="282" cy="508" r="24"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="282" y="515" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-text="item2" data-ig-font="primary" x="312" y="556" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Prototype</text>
<circle data-ig-fill="tertiary" cx="410" cy="445" r="24"/>
<text data-ig-contrast="tertiary" data-ig-font="primary" x="410" y="452" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-text="item3" data-ig-font="primary" x="440" y="493" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Beta</text>
<circle data-ig-fill="primary" cx="534" cy="348" r="24"/>
<text data-ig-contrast="primary" data-ig-font="primary" x="534" y="355" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-text="item4" data-ig-font="primary" x="564" y="396" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Launch</text>
<circle data-ig-fill="secondary" cx="655" cy="218" r="24"/>
<text data-ig-contrast="secondary" data-ig-font="primary" x="655" y="225" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">5</text>
<text data-ig-text="item5" data-ig-font="primary" x="685" y="266" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Scale</text>
</g>
</svg>`,
  },
  {
    id: "cause-effect-1",
    family: "cause-effect",
    title: "Cause & Effect",
    category: "Analysis",
    items: 3,
    description: "Three causes converging on one effect.",
    about: "Multiple causes converging on one effect - the shape of every root-cause and risk story. Three cause boxes feed a single outcome, making the causal claim visible instead of implied.",
    usage: {
      item1: "cause 1",
      item2: "cause 2",
      item3: "cause 3",
      other1: "effect box",
    },
    labels: {
      item1: "Cause 1",
      item2: "Cause 2",
      item3: "Cause 3",
      other1: "Effect",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-80.65 38.39) scale(1.4516)">
<rect data-ig-fill="secondary" x="90" y="160" width="210" height="76" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="195" y="205" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Rising costs</text>

<rect data-ig-fill="tertiary" x="90" y="280" width="210" height="76" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="195" y="325" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Slow tooling</text>

<rect data-ig-fill="primary" x="90" y="400" width="210" height="76" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="195" y="445" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Manual work</text>

<line x1="305" y1="198" x2="454" y2="269" stroke="#495057" data-ig-stroke="accent" stroke-width="5"/><polygon data-ig-fill="accent" fill="#495057" points="468,276 450,277 457,261"/><line x1="305" y1="318" x2="452" y2="318" stroke="#495057" data-ig-stroke="accent" stroke-width="5"/><polygon data-ig-fill="accent" fill="#495057" points="468,318 452,327 452,309"/><line x1="305" y1="438" x2="454" y2="367" stroke="#495057" data-ig-stroke="accent" stroke-width="5"/><polygon data-ig-fill="accent" fill="#495057" points="468,360 457,375 450,359"/>
<rect data-ig-fill="primary" x="480" y="238" width="230" height="160" rx="14"/>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="595" y="326" text-anchor="middle" font-size="23" font-weight="bold" fill="#ffffff">Missed deadlines</text>
</g>
</svg>`,
  },
  {
    id: "ipo-1",
    family: "ipo",
    title: "Input - Process - Output",
    category: "Process",
    items: 3,
    description: "Classic three-stage input, process, output flow.",
    about: "Input, process, output: the oldest model in systems thinking. Three chained boxes show what goes in, what happens, and what comes out - perfect for explaining a service, a pipeline, or an algorithm to a non-technical audience.",
    usage: {
      item1: "input box",
      item2: "process box",
      item3: "output box",
    },
    labels: {
      item1: "Input",
      item2: "Process",
      item3: "Output",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-62.50 71.09) scale(1.4063)">
<rect data-ig-fill="primary" x="80" y="230" width="180" height="150" rx="12"/>
<text data-ig-contrast="primary" data-ig-font="secondary" x="170" y="264" text-anchor="middle" font-size="15" font-weight="bold" fill="#495057">INPUT</text>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="170" y="322" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Raw data</text>
<rect data-ig-fill="secondary" x="310" y="230" width="180" height="150" rx="12"/>
<text data-ig-contrast="secondary" data-ig-font="secondary" x="400" y="264" text-anchor="middle" font-size="15" font-weight="bold" fill="#495057">PROCESS</text>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="322" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Analysis</text>
<rect data-ig-fill="tertiary" x="540" y="230" width="180" height="150" rx="12"/>
<text data-ig-contrast="tertiary" data-ig-font="secondary" x="630" y="264" text-anchor="middle" font-size="15" font-weight="bold" fill="#495057">OUTPUT</text>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="630" y="322" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Insights</text>
<line x1="262" y1="305" x2="292" y2="305" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/><polygon data-ig-fill="accent" fill="#495057" points="308,305 292,296 292,314"/>
<line x1="492" y1="305" x2="522" y2="305" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/><polygon data-ig-fill="accent" fill="#495057" points="538,305 522,296 522,314"/>
</g>
</svg>`,
  },
  {
    id: "layers-3",
    family: "layers",
    title: "Stacked Layers (3)",
    category: "Hierarchy",
    items: 3,
    description: "3 stacked slabs, each resting on the one below.",
    about: "Stacked layers show architecture: each slab rests on the one below it. Use it for technology stacks, service tiers, or any capability model where higher levels depend on lower ones.",
    usage: {
      item1: "top layer",
      item2: "layer 2",
      item3: "bottom layer",
    },
    labels: {
      item1: "Layer 1",
      item2: "Layer 2",
      item3: "Layer 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-287.50 -180.63) scale(1.8750)">
<polygon data-ig-fill="tertiary" points="180,432 620,432 660,410 220,410"/>
<polygon points="180,432 620,432 660,410 220,410" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="tertiary" x="180" y="432" width="440" height="60"/>
<polygon data-ig-fill="tertiary" points="620,432 660,410 660,470 620,492"/>
<polygon points="620,432 660,410 660,470 620,492" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="400" y="469" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Platform</text>
<polygon data-ig-fill="secondary" points="180,344 620,344 660,322 220,322"/>
<polygon points="180,344 620,344 660,322 220,322" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="secondary" x="180" y="344" width="440" height="60"/>
<polygon data-ig-fill="secondary" points="620,344 660,322 660,382 620,404"/>
<polygon points="620,344 660,322 660,382 620,404" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="381" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Services</text>
<polygon data-ig-fill="primary" points="180,256 620,256 660,234 220,234"/>
<polygon points="180,256 620,256 660,234 220,234" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="primary" x="180" y="256" width="440" height="60"/>
<polygon data-ig-fill="primary" points="620,256 660,234 660,294 620,316"/>
<polygon points="620,256 660,234 660,294 620,316" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="293" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Experience</text>
</g>
</svg>`,
  },
  {
    id: "layers-4",
    family: "layers",
    title: "Stacked Layers (4)",
    category: "Hierarchy",
    items: 4,
    description: "4 stacked slabs, each resting on the one below.",
    about: "Stacked layers show architecture: each slab rests on the one below it. Use it for technology stacks, service tiers, or any capability model where higher levels depend on lower ones.",
    usage: {
      item1: "top layer",
      item2: "layer 2",
      item3: "layer 3",
      item4: "bottom layer",
    },
    labels: {
      item1: "Layer 1",
      item2: "Layer 2",
      item3: "Layer 3",
      item4: "Layer 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-287.50 -180.63) scale(1.8750)">
<polygon data-ig-fill="primary" points="180,476 620,476 660,454 220,454"/>
<polygon points="180,476 620,476 660,454 220,454" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="primary" x="180" y="476" width="440" height="60"/>
<polygon data-ig-fill="primary" points="620,476 660,454 660,514 620,536"/>
<polygon points="620,476 660,454 660,514 620,536" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="400" y="513" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Data</text>
<polygon data-ig-fill="tertiary" points="180,388 620,388 660,366 220,366"/>
<polygon points="180,388 620,388 660,366 220,366" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="tertiary" x="180" y="388" width="440" height="60"/>
<polygon data-ig-fill="tertiary" points="620,388 660,366 660,426 620,448"/>
<polygon points="620,388 660,366 660,426 620,448" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="400" y="425" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Platform</text>
<polygon data-ig-fill="secondary" points="180,300 620,300 660,278 220,278"/>
<polygon points="180,300 620,300 660,278 220,278" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="secondary" x="180" y="300" width="440" height="60"/>
<polygon data-ig-fill="secondary" points="620,300 660,278 660,338 620,360"/>
<polygon points="620,300 660,278 660,338 620,360" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="337" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Services</text>
<polygon data-ig-fill="primary" points="180,212 620,212 660,190 220,190"/>
<polygon points="180,212 620,212 660,190 220,190" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="primary" x="180" y="212" width="440" height="60"/>
<polygon data-ig-fill="primary" points="620,212 660,190 660,250 620,272"/>
<polygon points="620,212 660,190 660,250 620,272" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="249" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Experience</text>
</g>
</svg>`,
  },
  {
    id: "layers-5",
    family: "layers",
    title: "Stacked Layers (5)",
    category: "Hierarchy",
    items: 5,
    description: "5 stacked slabs, each resting on the one below.",
    about: "Stacked layers show architecture: each slab rests on the one below it. Use it for technology stacks, service tiers, or any capability model where higher levels depend on lower ones.",
    usage: {
      item1: "top layer",
      item2: "layer 2",
      item3: "layer 3",
      item4: "layer 4",
      item5: "bottom layer",
    },
    labels: {
      item1: "Layer 1",
      item2: "Layer 2",
      item3: "Layer 3",
      item4: "Layer 4",
      item5: "Layer 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-287.50 -180.63) scale(1.8750)">
<polygon data-ig-fill="secondary" points="180,520 620,520 660,498 220,498"/>
<polygon points="180,520 620,520 660,498 220,498" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="secondary" x="180" y="520" width="440" height="60"/>
<polygon data-ig-fill="secondary" points="620,520 660,498 660,558 620,580"/>
<polygon points="620,520 660,498 660,558 620,580" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item5" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="557" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Infrastructure</text>
<polygon data-ig-fill="primary" points="180,432 620,432 660,410 220,410"/>
<polygon points="180,432 620,432 660,410 220,410" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="primary" x="180" y="432" width="440" height="60"/>
<polygon data-ig-fill="primary" points="620,432 660,410 660,470 620,492"/>
<polygon points="620,432 660,410 660,470 620,492" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="400" y="469" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Data</text>
<polygon data-ig-fill="tertiary" points="180,344 620,344 660,322 220,322"/>
<polygon points="180,344 620,344 660,322 220,322" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="tertiary" x="180" y="344" width="440" height="60"/>
<polygon data-ig-fill="tertiary" points="620,344 660,322 660,382 620,404"/>
<polygon points="620,344 660,322 660,382 620,404" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="400" y="381" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Platform</text>
<polygon data-ig-fill="secondary" points="180,256 620,256 660,234 220,234"/>
<polygon points="180,256 620,256 660,234 220,234" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="secondary" x="180" y="256" width="440" height="60"/>
<polygon data-ig-fill="secondary" points="620,256 660,234 660,294 620,316"/>
<polygon points="620,256 660,234 660,294 620,316" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="293" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Services</text>
<polygon data-ig-fill="primary" points="180,168 620,168 660,146 220,146"/>
<polygon points="180,168 620,168 660,146 220,146" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="primary" x="180" y="168" width="440" height="60"/>
<polygon data-ig-fill="primary" points="620,168 660,146 660,206 620,228"/>
<polygon points="620,168 660,146 660,206 620,228" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="205" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Experience</text>
</g>
</svg>`,
  },
  {
    id: "radial-3",
    family: "radial",
    title: "Ecosystem (3 nodes)",
    category: "Relationship",
    items: 3,
    description: "Central circle with 3 connected nodes.",
    about: "An ecosystem diagram: one center, many connected nodes, no implied order. Where hub-and-spoke emphasizes structure, the radial layout emphasizes community - everything orbits and connects.",
    usage: {
      item1: "node 1",
      item2: "node 2",
      item3: "node 3",
      other1: "center",
    },
    labels: {
      item1: "Node 1",
      item2: "Node 2",
      item3: "Node 3",
      other1: "Center",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-225.81 34.58) scale(1.8145)">
<line x1="400" y1="310" x2="400" y2="95" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="586" y2="418" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="214" y2="418" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="primary" cx="400" cy="310" r="84"/>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="317" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Ecosystem</text>
<circle data-ig-fill="secondary" cx="400" cy="95" r="62"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="101" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Apps</text>
<circle data-ig-fill="tertiary" cx="586" cy="418" r="62"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="586" y="424" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">APIs</text>
<circle data-ig-fill="primary" cx="214" cy="418" r="62"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="214" y="424" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Partners</text>
</g>
</svg>`,
  },
  {
    id: "radial-4",
    family: "radial",
    title: "Ecosystem (4 nodes)",
    category: "Relationship",
    items: 4,
    description: "Central circle with 4 connected nodes.",
    about: "An ecosystem diagram: one center, many connected nodes, no implied order. Where hub-and-spoke emphasizes structure, the radial layout emphasizes community - everything orbits and connects.",
    usage: {
      item1: "node 1",
      item2: "node 2",
      item3: "node 3",
      item4: "node 4",
      other1: "center",
    },
    labels: {
      item1: "Node 1",
      item2: "Node 2",
      item3: "Node 3",
      item4: "Node 4",
      other1: "Center",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-159.34 -10.99) scale(1.6484)">
<line x1="400" y1="310" x2="400" y2="95" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="615" y2="310" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="400" y2="525" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="185" y2="310" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="primary" cx="400" cy="310" r="84"/>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="317" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Ecosystem</text>
<circle data-ig-fill="secondary" cx="400" cy="95" r="58"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="101" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Apps</text>
<circle data-ig-fill="tertiary" cx="615" cy="310" r="58"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="615" y="316" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">APIs</text>
<circle data-ig-fill="primary" cx="400" cy="525" r="58"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="400" y="531" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Partners</text>
<circle data-ig-fill="secondary" cx="185" cy="310" r="58"/>
<text data-ig-text="item4" data-ig-contrast="secondary" data-ig-font="primary" x="185" y="316" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Devices</text>
</g>
</svg>`,
  },
  {
    id: "radial-5",
    family: "radial",
    title: "Ecosystem (5 nodes)",
    category: "Relationship",
    items: 5,
    description: "Central circle with 5 connected nodes.",
    about: "An ecosystem diagram: one center, many connected nodes, no implied order. Where hub-and-spoke emphasizes structure, the radial layout emphasizes community - everything orbits and connects.",
    usage: {
      item1: "node 1",
      item2: "node 2",
      item3: "node 3",
      item4: "node 4",
      item5: "node 5",
      other1: "center",
    },
    labels: {
      item1: "Node 1",
      item2: "Node 2",
      item3: "Node 3",
      item4: "Node 4",
      item5: "Node 5",
      other1: "Center",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-203.13 -8.89) scale(1.7578)">
<line x1="400" y1="310" x2="400" y2="95" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="604" y2="244" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="526" y2="484" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="274" y2="484" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="400" y1="310" x2="196" y2="244" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="primary" cx="400" cy="310" r="84"/>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="317" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Ecosystem</text>
<circle data-ig-fill="secondary" cx="400" cy="95" r="52"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="101" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Apps</text>
<circle data-ig-fill="tertiary" cx="604" cy="244" r="52"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="604" y="250" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">APIs</text>
<circle data-ig-fill="primary" cx="526" cy="484" r="52"/>
<text data-ig-text="item3" data-ig-contrast="primary" data-ig-font="primary" x="526" y="490" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Partners</text>
<circle data-ig-fill="secondary" cx="274" cy="484" r="52"/>
<text data-ig-text="item4" data-ig-contrast="secondary" data-ig-font="primary" x="274" y="490" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Devices</text>
<circle data-ig-fill="tertiary" cx="196" cy="244" r="52"/>
<text data-ig-text="item5" data-ig-contrast="tertiary" data-ig-font="primary" x="196" y="250" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Data</text>
</g>
</svg>`,
  },
  {
    id: "staircase-3",
    family: "staircase",
    title: "Staircase (3 steps)",
    category: "Process",
    items: 3,
    description: "3 rising steps toward a goal.",
    about: "A staircase turns progression into geometry: each step is higher than the last. Use it for maturity models, skill ladders, and growth stages where the message is upward movement.",
    usage: {
      item1: "step 1",
      item2: "step 2",
      item3: "step 3",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-81.92 -13.03) scale(1.4658)">
<rect data-ig-fill="primary" x="90" y="407" width="201" height="113"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="190" y="437" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Learn</text>
<rect data-ig-fill="secondary" x="297" y="293" width="201" height="227"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="397" y="323" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Practice</text>
<rect data-ig-fill="tertiary" x="503" y="180" width="201" height="340"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="604" y="210" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Master</text>
</g>
</svg>`,
  },
  {
    id: "staircase-4",
    family: "staircase",
    title: "Staircase (4 steps)",
    category: "Process",
    items: 4,
    description: "4 rising steps toward a goal.",
    about: "A staircase turns progression into geometry: each step is higher than the last. Use it for maturity models, skill ladders, and growth stages where the message is upward movement.",
    usage: {
      item1: "step 1",
      item2: "step 2",
      item3: "step 3",
      item4: "step 4",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      item4: "Step 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-81.92 -13.03) scale(1.4658)">
<rect data-ig-fill="primary" x="90" y="435" width="149" height="85"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="164" y="465" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Learn</text>
<rect data-ig-fill="secondary" x="245" y="350" width="149" height="170"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="320" y="380" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Practice</text>
<rect data-ig-fill="tertiary" x="400" y="265" width="149" height="255"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="474" y="295" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Master</text>
<rect data-ig-fill="primary" x="555" y="180" width="149" height="340"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="630" y="210" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Teach</text>
</g>
</svg>`,
  },
  {
    id: "staircase-5",
    family: "staircase",
    title: "Staircase (5 steps)",
    category: "Process",
    items: 5,
    description: "5 rising steps toward a goal.",
    about: "A staircase turns progression into geometry: each step is higher than the last. Use it for maturity models, skill ladders, and growth stages where the message is upward movement.",
    usage: {
      item1: "step 1",
      item2: "step 2",
      item3: "step 3",
      item4: "step 4",
      item5: "step 5",
    },
    labels: {
      item1: "Step 1",
      item2: "Step 2",
      item3: "Step 3",
      item4: "Step 4",
      item5: "Step 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-81.92 -13.03) scale(1.4658)">
<rect data-ig-fill="primary" x="90" y="452" width="118" height="68"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="149" y="482" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Learn</text>
<rect data-ig-fill="secondary" x="214" y="384" width="118" height="136"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="273" y="414" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Practice</text>
<rect data-ig-fill="tertiary" x="338" y="316" width="118" height="204"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="397" y="346" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Master</text>
<rect data-ig-fill="primary" x="462" y="248" width="118" height="272"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="521" y="278" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Teach</text>
<rect data-ig-fill="secondary" x="586" y="180" width="118" height="340"/>
<text data-ig-text="item5" data-ig-contrast="secondary" data-ig-font="primary" x="645" y="210" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Lead</text>
</g>
</svg>`,
  },
  {
    id: "bridge-1",
    family: "bridge",
    title: "Bridge",
    category: "Relationship",
    items: 2,
    description: "Two sides joined by a labeled bridge.",
    about: "The bridge diagram frames transformation: where you stand, where you are going, and the thing that gets you across. Label the two sides and name the bridge - strategy, product, or plan.",
    usage: {
      item1: "left side",
      item2: "right side",
      other1: "above the bridge",
    },
    labels: {
      item1: "Left Side",
      item2: "Right Side",
      other1: "Bridge",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-62.50 3.99) scale(1.4063)">
<rect data-ig-fill="primary" x="80" y="320" width="200" height="200" rx="8"/>
<rect data-ig-fill="tertiary" x="520" y="320" width="200" height="200" rx="8"/>
<path d="M 270 330 Q 400 200 530 330" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="14" stroke-linecap="round"/>
<line x1="320" y1="292" x2="320" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/>
<line x1="400" y1="266" x2="400" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/>
<line x1="480" y1="292" x2="480" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/>
<line x1="256" y1="330" x2="544" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="8"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="180" y="428" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Today</text>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="620" y="428" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Vision</text>
<text data-ig-text="other1" data-ig-font="primary" x="400" y="200" text-anchor="middle" font-size="20" font-weight="bold" fill="#212529">Strategy</text>
</g>
</svg>`,
  },
  {
    id: "target-3",
    family: "target",
    title: "Target (3 rings)",
    category: "Analysis",
    items: 3,
    description: "3 concentric rings narrowing to a bullseye.",
    about: "Concentric rings narrow from a broad outer field to a bullseye. Use it for market focus (market, segment, niche), priority models, or proximity maps - the closer to the center, the more essential.",
    usage: {
      item1: "outer ring",
      item2: "ring 2",
      item3: "bullseye",
    },
    labels: {
      item1: "Outer Ring",
      item2: "Ring 2",
      item3: "Bullseye",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-114.45 6.65) scale(1.4950)">
<circle data-ig-fill="primary" cx="320" cy="330" r="210"/>
<circle data-ig-fill="secondary" cx="320" cy="330" r="140"/>
<circle data-ig-fill="tertiary" cx="320" cy="330" r="70"/>
<line x1="320" y1="155" x2="620" y2="155" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item1" data-ig-font="primary" x="632" y="161" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Market</text>
<line x1="320" y1="225" x2="620" y2="225" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item2" data-ig-font="primary" x="632" y="231" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Segment</text>
<line x1="320" y1="295" x2="620" y2="295" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item3" data-ig-font="primary" x="632" y="301" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Niche</text>
</g>
</svg>`,
  },
  {
    id: "target-4",
    family: "target",
    title: "Target (4 rings)",
    category: "Analysis",
    items: 4,
    description: "4 concentric rings narrowing to a bullseye.",
    about: "Concentric rings narrow from a broad outer field to a bullseye. Use it for market focus (market, segment, niche), priority models, or proximity maps - the closer to the center, the more essential.",
    usage: {
      item1: "outer ring",
      item2: "ring 2",
      item3: "ring 3",
      item4: "bullseye",
    },
    labels: {
      item1: "Outer Ring",
      item2: "Ring 2",
      item3: "Ring 3",
      item4: "Bullseye",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-97.06 14.71) scale(1.4706)">
<circle data-ig-fill="primary" cx="320" cy="330" r="220"/>
<circle data-ig-fill="secondary" cx="320" cy="330" r="165"/>
<circle data-ig-fill="tertiary" cx="320" cy="330" r="110"/>
<circle data-ig-fill="primary" cx="320" cy="330" r="55"/>
<line x1="320" y1="138" x2="620" y2="138" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item1" data-ig-font="primary" x="632" y="144" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Market</text>
<line x1="320" y1="192" x2="620" y2="192" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item2" data-ig-font="primary" x="632" y="198" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Segment</text>
<line x1="320" y1="248" x2="620" y2="248" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item3" data-ig-font="primary" x="632" y="254" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Niche</text>
<line x1="320" y1="302" x2="620" y2="302" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item4" data-ig-font="primary" x="632" y="308" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Focus</text>
</g>
</svg>`,
  },
  {
    id: "target-5",
    family: "target",
    title: "Target (5 rings)",
    category: "Analysis",
    items: 5,
    description: "5 concentric rings narrowing to a bullseye.",
    about: "Concentric rings narrow from a broad outer field to a bullseye. Use it for market focus (market, segment, niche), priority models, or proximity maps - the closer to the center, the more essential.",
    usage: {
      item1: "outer ring",
      item2: "ring 2",
      item3: "ring 3",
      item4: "ring 4",
      item5: "bullseye",
    },
    labels: {
      item1: "Outer Ring",
      item2: "Ring 2",
      item3: "Ring 3",
      item4: "Ring 4",
      item5: "Bullseye",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-88.57 18.64) scale(1.4587)">
<circle data-ig-fill="primary" cx="320" cy="330" r="225"/>
<circle data-ig-fill="secondary" cx="320" cy="330" r="180"/>
<circle data-ig-fill="tertiary" cx="320" cy="330" r="135"/>
<circle data-ig-fill="primary" cx="320" cy="330" r="90"/>
<circle data-ig-fill="secondary" cx="320" cy="330" r="45"/>
<line x1="320" y1="128" x2="620" y2="128" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item1" data-ig-font="primary" x="632" y="134" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Market</text>
<line x1="320" y1="172" x2="620" y2="172" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item2" data-ig-font="primary" x="632" y="178" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Segment</text>
<line x1="320" y1="218" x2="620" y2="218" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item3" data-ig-font="primary" x="632" y="224" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Niche</text>
<line x1="320" y1="262" x2="620" y2="262" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item4" data-ig-font="primary" x="632" y="268" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Focus</text>
<line x1="320" y1="308" x2="620" y2="308" stroke="#495057" data-ig-stroke="accent" stroke-width="2"/>
<text data-ig-text="item5" data-ig-font="primary" x="632" y="314" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Core</text>
</g>
</svg>`,
  },
];

export const CATEGORIES = [...new Set(TEMPLATES.map((t) => t.category))];

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

// Client-safe template metadata: everything except the SVG source, which
// stays server-side (previews are delivered as rendered PNGs). `rev` is a
// content hash of the SVG used to cache-bust preview URLs.
export type TemplateMeta = Omit<Template, "svg"> & { rev: string };

function svgRev(svg: string): string {
  let h = 5381;
  for (let i = 0; i < svg.length; i++) h = ((h * 33) ^ svg.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

export function toMeta(t: Template): TemplateMeta {
  const meta: (Omit<Template, "svg"> & { svg?: string; rev: string }) = {
    ...t,
    rev: svgRev(t.svg),
  };
  delete meta.svg;
  return meta;
}

export function itemCount(t: TemplateMeta): number {
  return t.items;
}

// Family helpers: variants of one layout differing only in item count.
export function familyTitle(t: TemplateMeta): string {
  return t.title.replace(/\s*\(.*\)$/, "");
}

// The representative variant of a family: closest to 4 items (larger wins ties).
export function familyDefault<T extends { items: number }>(variants: T[]): T {
  return [...variants].sort(
    (a, b) => Math.abs(a.items - 4) - Math.abs(b.items - 4) || b.items - a.items
  )[0];
}

// Count-neutral family descriptions for grouped tiles (variant pills pick
// the item count).
export const FAMILY_DESCRIPTIONS: Record<string, string> = {
  "process-arrow": "Multiple chevron arrows (user-defined) showing a left-to-right process.",
  cycle: "Multiple stages (user-defined) arranged in a continuous circular flow.",
  pyramid: "Multiple stacked levels (user-defined) from broad base to narrow peak.",
  venn: "Overlapping circles (2 or 3, user-defined) with a shared center.",
  funnel: "Multiple narrowing stages (user-defined) from awareness to action.",
  timeline: "Horizontal timeline with multiple milestones (user-defined).",
  steps: "Multiple numbered circles (user-defined) with step labels.",
  list: "Multiple numbered items (user-defined) in stacked bars.",
  "hub-spoke": "Central hub connected to multiple spokes (user-defined).",
  pillars: "Multiple pillars (user-defined) carrying a shared roof.",
  roadmap: "Winding road with multiple numbered stops (user-defined).",
  layers: "Multiple stacked slabs (user-defined), each resting on the one below.",
  radial: "Central circle with multiple connected nodes (user-defined).",
  staircase: "Multiple rising steps (user-defined) toward a goal.",
  target: "Multiple concentric rings (user-defined) narrowing to a bullseye.",
};
