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
  title: string;
  category: string;
  items: number; // item slots on the graphic; drives the "#" sort
  description: string;
  about: string; // longer copy for the template's landing page
  usage: Partial<Record<string, string>>;
  svg: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "process-arrow-3",
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
