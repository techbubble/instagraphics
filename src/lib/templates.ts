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
<polygon data-ig-fill="quaternary" points="540,240 700,240 740,300 700,360 540,360 580,300"/>
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
<polygon data-ig-fill="quaternary" points="444,240 572,240 612,300 572,360 444,360 484,300"/>
<polygon data-ig-fill="accent" points="572,240 700,240 740,300 700,360 572,360 612,300"/>
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
<g transform="translate(-147.19 -65.43) scale(1.6576)">
<path d="M 424 137 A 175 175 0 0 1 571 349" fill="none" stroke="#0d6efd" data-ig-stroke="primary" stroke-width="46"/>
<polygon data-ig-fill="primary" fill="#0d6efd" points="562,376 538,337 605,350"/>
<text data-ig-text="item1" data-ig-font="primary" x="619" y="190" text-anchor="start" font-size="21" font-weight="bold" fill="#212529">Plan</text>
<path d="M 538 418 A 175 175 0 0 1 281 438" fill="none" stroke="#0d6efd" data-ig-stroke="secondary" stroke-width="46"/>
<polygon data-ig-fill="secondary" fill="#0d6efd" points="262,418 307,416 263,468"/>
<text data-ig-text="item2" data-ig-font="primary" x="400" y="570" text-anchor="middle" font-size="21" font-weight="bold" fill="#212529">Do</text>
<path d="M 238 376 A 175 175 0 0 1 349 143" fill="none" stroke="#0d6efd" data-ig-stroke="tertiary" stroke-width="46"/>
<polygon data-ig-fill="tertiary" fill="#0d6efd" points="376,137 354,177 332,112"/>
<text data-ig-text="item3" data-ig-font="primary" x="181" y="190" text-anchor="end" font-size="21" font-weight="bold" fill="#212529">Check</text>
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
<g transform="translate(-259.02 -102.63) scale(1.9440)">
<path d="M 424 137 A 175 175 0 0 1 567 259" fill="none" stroke="#0d6efd" data-ig-stroke="primary" stroke-width="46"/>
<polygon data-ig-fill="primary" fill="#0d6efd" points="573,286 533,264 598,242"/>
<text data-ig-text="item1" data-ig-font="primary" x="579" y="138" text-anchor="start" font-size="21" font-weight="bold" fill="#212529">Plan</text>
<path d="M 573 334 A 175 175 0 0 1 451 477" fill="none" stroke="#0d6efd" data-ig-stroke="secondary" stroke-width="46"/>
<polygon data-ig-fill="secondary" fill="#0d6efd" points="424,483 446,443 468,508"/>
<text data-ig-text="item2" data-ig-font="primary" x="579" y="496" text-anchor="start" font-size="21" font-weight="bold" fill="#212529">Do</text>
<path d="M 376 483 A 175 175 0 0 1 233 361" fill="none" stroke="#0d6efd" data-ig-stroke="tertiary" stroke-width="46"/>
<polygon data-ig-fill="tertiary" fill="#0d6efd" points="227,334 267,356 202,378"/>
<text data-ig-text="item3" data-ig-font="primary" x="221" y="496" text-anchor="end" font-size="21" font-weight="bold" fill="#212529">Check</text>
<path d="M 227 286 A 175 175 0 0 1 349 143" fill="none" stroke="#0d6efd" data-ig-stroke="quaternary" stroke-width="46"/>
<polygon data-ig-fill="quaternary" fill="#0d6efd" points="376,137 354,177 332,112"/>
<text data-ig-text="item4" data-ig-font="primary" x="221" y="138" text-anchor="end" font-size="21" font-weight="bold" fill="#212529">Act</text>
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
<g transform="translate(-157.42 -52.86) scale(1.6572)">
<path d="M 424 137 A 175 175 0 0 1 543 210" fill="none" stroke="#0d6efd" data-ig-stroke="primary" stroke-width="46"/>
<polygon data-ig-fill="primary" fill="#0d6efd" points="557,233 513,225 567,184"/>
<text data-ig-text="item1" data-ig-font="primary" x="549" y="112" text-anchor="start" font-size="21" font-weight="bold" fill="#212529">Plan</text>
<path d="M 572 280 A 175 175 0 0 1 540 415" fill="none" stroke="#0d6efd" data-ig-stroke="secondary" stroke-width="46"/>
<polygon data-ig-fill="secondary" fill="#0d6efd" points="522,436 516,391 571,430"/>
<text data-ig-text="item2" data-ig-font="primary" x="641" y="395" text-anchor="start" font-size="21" font-weight="bold" fill="#212529">Do</text>
<path d="M 482 465 A 175 175 0 0 1 343 475" fill="none" stroke="#0d6efd" data-ig-stroke="tertiary" stroke-width="46"/>
<polygon data-ig-fill="tertiary" fill="#0d6efd" points="318,465 359,445 339,510"/>
<text data-ig-text="item3" data-ig-font="primary" x="400" y="570" text-anchor="middle" font-size="21" font-weight="bold" fill="#212529">Check</text>
<path d="M 278 436 A 175 175 0 0 1 225 307" fill="none" stroke="#0d6efd" data-ig-stroke="quaternary" stroke-width="46"/>
<polygon data-ig-fill="quaternary" fill="#0d6efd" points="228,280 259,312 191,314"/>
<text data-ig-text="item4" data-ig-font="primary" x="159" y="395" text-anchor="end" font-size="21" font-weight="bold" fill="#212529">Act</text>
<path d="M 243 233 A 175 175 0 0 1 349 143" fill="none" stroke="#0d6efd" data-ig-stroke="accent" stroke-width="46"/>
<polygon data-ig-fill="accent" fill="#0d6efd" points="376,137 354,177 332,112"/>
<text data-ig-text="item5" data-ig-font="primary" x="251" y="112" text-anchor="end" font-size="21" font-weight="bold" fill="#212529">Adjust</text>
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
<polygon data-ig-fill="quaternary" points="125,404 475,404 530,486 70,486"/>
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
<polygon data-ig-fill="quaternary" points="159,352 441,352 481,413 119,413"/>
<polygon data-ig-fill="accent" points="113,421 487,421 530,486 70,486"/>
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
<polygon data-ig-fill="quaternary" points="288,429 512,429 460,510 340,510"/>
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
<polygon data-ig-fill="quaternary" points="255,378 545,378 507,438 293,438"/>
<text data-ig-contrast="primary" data-ig-text="item4" data-ig-font="primary" x="400" y="414" text-anchor="middle" font-size="18" fill="#ffffff">Decision</text>
<polygon data-ig-fill="accent" points="299,446 501,446 460,510 340,510"/>
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
<circle data-ig-fill="quaternary" cx="650" cy="330" r="18"/>
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
<circle data-ig-fill="quaternary" cx="525" cy="330" r="16"/>
<circle data-ig-fill="accent" cx="650" cy="330" r="16"/>
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
<circle data-ig-fill="quaternary" cx="670" cy="320" r="69"/>
<circle data-ig-fill="quaternary" cx="611" cy="256" r="21"/>
<text data-ig-contrast="quaternary" data-ig-font="primary" x="611" y="265" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="quaternary" data-ig-text="item4" data-ig-font="primary" x="670" y="326" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Step four</text>
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
<circle data-ig-fill="quaternary" cx="550" cy="320" r="55"/>
<circle data-ig-fill="quaternary" cx="502" cy="269" r="17"/>
<text data-ig-contrast="quaternary" data-ig-font="primary" x="502" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="quaternary" data-ig-text="item4" data-ig-font="primary" x="550" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step four</text>
<circle cx="700" cy="320" r="66" fill="#ffffff" stroke="#d8dee2" stroke-width="3"/>
<circle data-ig-fill="accent" cx="700" cy="320" r="55"/>
<circle data-ig-fill="accent" cx="652" cy="269" r="17"/>
<text data-ig-contrast="accent" data-ig-font="primary" x="652" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">5</text>
<text data-ig-contrast="accent" data-ig-text="item5" data-ig-font="primary" x="700" y="325" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Step five</text>
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
<rect data-ig-fill="tertiary" x="140" y="386" width="520" height="84" rx="12"/>
<circle data-ig-fill="accent" cx="185" cy="212" r="26"/>
<circle data-ig-fill="accent" cx="185" cy="320" r="26"/>
<circle data-ig-fill="accent" cx="185" cy="428" r="26"/>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="221" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="329" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="437" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">3</text>
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
<rect data-ig-fill="tertiary" x="140" y="334" width="520" height="72" rx="12"/>
<rect data-ig-fill="quaternary" x="140" y="426" width="520" height="72" rx="12"/>
<circle data-ig-fill="accent" cx="185" cy="186" r="24"/>
<circle data-ig-fill="accent" cx="185" cy="278" r="24"/>
<circle data-ig-fill="accent" cx="185" cy="370" r="24"/>
<circle data-ig-fill="accent" cx="185" cy="462" r="24"/>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="194" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="286" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="378" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="185" y="470" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">4</text>
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
<rect data-ig-fill="tertiary" x="140" y="302" width="520" height="60" rx="10"/>
<rect data-ig-fill="quaternary" x="140" y="378" width="520" height="60" rx="10"/>
<rect data-ig-fill="accent" x="140" y="454" width="520" height="60" rx="10"/>
<circle data-ig-fill="accent" cx="180" cy="180" r="20"/>
<circle data-ig-fill="accent" cx="180" cy="256" r="20"/>
<circle data-ig-fill="accent" cx="180" cy="332" r="20"/>
<circle data-ig-fill="accent" cx="180" cy="408" r="20"/>
<circle data-ig-fill="accent" cx="180" cy="484" r="20"/>
<text data-ig-contrast="accent" data-ig-font="primary" x="180" y="187" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">1</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="180" y="263" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">2</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="180" y="339" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">3</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="180" y="415" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-contrast="accent" data-ig-font="primary" x="180" y="491" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">5</text>
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
<rect data-ig-fill="quaternary" x="425" y="345" width="245" height="185" rx="8"/>
<text data-ig-contrast="primary" data-ig-text="item1" data-ig-font="primary" x="292" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Quick Wins</text>
<text data-ig-contrast="secondary" data-ig-text="item2" data-ig-font="primary" x="547" y="250" text-anchor="middle" font-size="22" fill="#ffffff">Big Bets</text>
<text data-ig-contrast="tertiary" data-ig-text="item3" data-ig-font="primary" x="292" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Fill-Ins</text>
<text data-ig-contrast="quaternary" data-ig-text="item4" data-ig-font="primary" x="547" y="445" text-anchor="middle" font-size="22" fill="#ffffff">Money Pits</text>
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
<rect data-ig-fill="quaternary" x="108" y="396" width="176" height="64" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="196" y="434" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Marketing</text>
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
<rect data-ig-fill="quaternary" x="312" y="513" width="176" height="64" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="400" y="552" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Marketing</text>
<rect data-ig-fill="primary" x="77" y="278" width="176" height="64" rx="10"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="165" y="317" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Partners</text>
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
<rect data-ig-fill="quaternary" x="450" y="468" width="176" height="64" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="538" y="507" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Marketing</text>
<rect data-ig-fill="primary" x="174" y="468" width="176" height="64" rx="10"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="262" y="507" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Partners</text>
<rect data-ig-fill="accent" x="89" y="205" width="176" height="64" rx="10"/>
<text data-ig-text="item5" data-ig-contrast="accent" data-ig-font="primary" x="177" y="244" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Community</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="318" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffffff">Core Product</text>
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
<text x="172" y="315" font-family="Arial" data-ig-font="primary" font-size="88" font-weight="bold" fill="#ffffff" fill-opacity="0.28">S</text>
<text data-ig-contrast="primary" data-ig-font="secondary" x="295" y="188" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">STRENGTHS</text>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="295" y="255" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Strong brand</text>
<rect data-ig-fill="secondary" x="460" y="150" width="290" height="180" rx="10"/>
<text x="680" y="315" font-family="Arial" data-ig-font="primary" font-size="88" font-weight="bold" fill="#ffffff" fill-opacity="0.28">W</text>
<text data-ig-contrast="secondary" data-ig-font="secondary" x="605" y="188" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">WEAKNESSES</text>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="605" y="255" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Limited reach</text>
<rect data-ig-fill="tertiary" x="150" y="350" width="290" height="180" rx="10"/>
<text x="172" y="515" font-family="Arial" data-ig-font="primary" font-size="88" font-weight="bold" fill="#ffffff" fill-opacity="0.28">O</text>
<text data-ig-contrast="tertiary" data-ig-font="secondary" x="295" y="388" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">OPPORTUNITIES</text>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="295" y="455" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">New markets</text>
<rect data-ig-fill="quaternary" x="460" y="350" width="290" height="180" rx="10"/>
<text x="680" y="515" font-family="Arial" data-ig-font="primary" font-size="88" font-weight="bold" fill="#ffffff" fill-opacity="0.28">T</text>
<text data-ig-contrast="quaternary" data-ig-font="secondary" x="605" y="388" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">THREATS</text>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="605" y="455" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Competition</text>
<circle cx="450" cy="340" r="58" fill="#ffffff"/>
<circle cx="450" cy="340" r="58" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<text data-ig-font="primary" x="450" y="350" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">SWOT</text>
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
<g transform="translate(-120.69 20.52) scale(1.5517)">
<rect data-ig-fill="primary" x="110" y="140" width="270" height="64" rx="12"/>
<rect data-ig-fill="quaternary" x="420" y="140" width="270" height="64" rx="12"/>
<text data-ig-contrast="primary" data-ig-font="secondary" x="245" y="181" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">PROS</text>
<text data-ig-contrast="quaternary" data-ig-font="secondary" x="555" y="181" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">CONS</text>
<rect data-ig-fill="primary" x="110" y="228" width="270" height="70" rx="12" fill-opacity="0.13"/>
<rect data-ig-fill="quaternary" x="420" y="228" width="270" height="70" rx="12" fill-opacity="0.13"/>
<circle data-ig-fill="primary" cx="142" cy="263" r="14"/>
<path d="M 134 263 L 140 269 L 151 257" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<circle data-ig-fill="quaternary" cx="452" cy="263" r="14"/>
<line x1="446" y1="257" x2="458" y2="269" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
<line x1="458" y1="257" x2="446" y2="269" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
<text data-ig-text="item1" data-ig-font="primary" x="168" y="270" text-anchor="start" font-size="18" fill="#212529">Lower cost</text>
<text data-ig-text="other1" data-ig-font="primary" x="478" y="270" text-anchor="start" font-size="18" fill="#212529">Learning curve</text>
<rect data-ig-fill="primary" x="110" y="318" width="270" height="70" rx="12" fill-opacity="0.13"/>
<rect data-ig-fill="quaternary" x="420" y="318" width="270" height="70" rx="12" fill-opacity="0.13"/>
<circle data-ig-fill="primary" cx="142" cy="353" r="14"/>
<path d="M 134 353 L 140 359 L 151 347" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<circle data-ig-fill="quaternary" cx="452" cy="353" r="14"/>
<line x1="446" y1="347" x2="458" y2="359" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
<line x1="458" y1="347" x2="446" y2="359" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
<text data-ig-text="item2" data-ig-font="primary" x="168" y="360" text-anchor="start" font-size="18" fill="#212529">Faster setup</text>
<text data-ig-text="other2" data-ig-font="primary" x="478" y="360" text-anchor="start" font-size="18" fill="#212529">Migration effort</text>
<rect data-ig-fill="primary" x="110" y="408" width="270" height="70" rx="12" fill-opacity="0.13"/>
<rect data-ig-fill="quaternary" x="420" y="408" width="270" height="70" rx="12" fill-opacity="0.13"/>
<circle data-ig-fill="primary" cx="142" cy="443" r="14"/>
<path d="M 134 443 L 140 449 L 151 437" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<circle data-ig-fill="quaternary" cx="452" cy="443" r="14"/>
<line x1="446" y1="437" x2="458" y2="449" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
<line x1="458" y1="437" x2="446" y2="449" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
<text data-ig-text="item3" data-ig-font="primary" x="168" y="450" text-anchor="start" font-size="18" fill="#212529">Less risk</text>
<text data-ig-text="other3" data-ig-font="primary" x="478" y="450" text-anchor="start" font-size="18" fill="#212529">New vendor</text>
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
<circle data-ig-fill="quaternary" cx="655" cy="218" r="24"/>
<text data-ig-contrast="quaternary" data-ig-font="primary" x="655" y="225" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">4</text>
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
<circle data-ig-fill="quaternary" cx="534" cy="348" r="24"/>
<text data-ig-contrast="quaternary" data-ig-font="primary" x="534" y="355" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">4</text>
<text data-ig-text="item4" data-ig-font="primary" x="564" y="396" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Launch</text>
<circle data-ig-fill="accent" cx="655" cy="218" r="24"/>
<text data-ig-contrast="accent" data-ig-font="primary" x="655" y="225" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">5</text>
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

<rect data-ig-fill="quaternary" x="90" y="400" width="210" height="76" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="195" y="445" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Manual work</text>

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
<g transform="translate(-45.45 63.64) scale(1.3636)">
<rect data-ig-fill="secondary" x="70" y="255" width="175" height="130" rx="12"/>
<rect data-ig-fill="primary" x="290" y="205" width="220" height="230" rx="14"/>
<rect data-ig-fill="tertiary" x="555" y="255" width="175" height="130" rx="12"/>
<text data-ig-contrast="secondary" data-ig-font="secondary" x="157" y="287" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">INPUT</text>
<text data-ig-contrast="primary" data-ig-font="secondary" x="400" y="245" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">PROCESS</text>
<text data-ig-contrast="tertiary" data-ig-font="secondary" x="642" y="287" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">OUTPUT</text>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="157" y="335" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Raw data</text>
<text data-ig-text="item2" data-ig-contrast="primary" data-ig-font="primary" x="400" y="335" text-anchor="middle" font-size="26" font-weight="bold" fill="#ffffff">Analysis</text>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="642" y="335" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Insights</text>
<line x1="248" y1="320" x2="270" y2="320" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/>
<polygon data-ig-fill="accent" fill="#495057" points="288,320 268,309 268,331"/>
<line x1="513" y1="320" x2="535" y2="320" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/>
<polygon data-ig-fill="accent" fill="#495057" points="553,320 533,309 533,331"/>
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
<polygon data-ig-fill="quaternary" points="180,476 620,476 660,454 220,454"/>
<polygon points="180,476 620,476 660,454 220,454" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="quaternary" x="180" y="476" width="440" height="60"/>
<polygon data-ig-fill="quaternary" points="620,476 660,454 660,514 620,536"/>
<polygon points="620,476 660,454 660,514 620,536" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="400" y="513" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Data</text>
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
<polygon data-ig-fill="accent" points="180,520 620,520 660,498 220,498"/>
<polygon points="180,520 620,520 660,498 220,498" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="accent" x="180" y="520" width="440" height="60"/>
<polygon data-ig-fill="accent" points="620,520 660,498 660,558 620,580"/>
<polygon points="620,520 660,498 660,558 620,580" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item5" data-ig-contrast="accent" data-ig-font="primary" x="400" y="557" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Infrastructure</text>
<polygon data-ig-fill="quaternary" points="180,432 620,432 660,410 220,410"/>
<polygon points="180,432 620,432 660,410 220,410" fill="#000000" fill-opacity="0.18"/>
<rect data-ig-fill="quaternary" x="180" y="432" width="440" height="60"/>
<polygon data-ig-fill="quaternary" points="620,432 660,410 660,470 620,492"/>
<polygon points="620,432 660,410 660,470 620,492" fill="#000000" fill-opacity="0.30"/>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="400" y="469" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffffff">Data</text>
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
<circle data-ig-fill="accent" cx="400" cy="310" r="84"/>
<text data-ig-text="other1" data-ig-contrast="accent" data-ig-font="primary" x="400" y="317" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Ecosystem</text>
<circle data-ig-fill="secondary" cx="400" cy="95" r="62"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="101" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Apps</text>
<circle data-ig-fill="tertiary" cx="586" cy="418" r="62"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="586" y="424" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">APIs</text>
<circle data-ig-fill="quaternary" cx="214" cy="418" r="62"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="214" y="424" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Partners</text>
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
<circle data-ig-fill="accent" cx="400" cy="310" r="84"/>
<text data-ig-text="other1" data-ig-contrast="accent" data-ig-font="primary" x="400" y="317" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Ecosystem</text>
<circle data-ig-fill="secondary" cx="400" cy="95" r="58"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="101" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Apps</text>
<circle data-ig-fill="tertiary" cx="615" cy="310" r="58"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="615" y="316" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">APIs</text>
<circle data-ig-fill="quaternary" cx="400" cy="525" r="58"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="400" y="531" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Partners</text>
<circle data-ig-fill="primary" cx="185" cy="310" r="58"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="185" y="316" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Devices</text>
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
<circle data-ig-fill="accent" cx="400" cy="310" r="84"/>
<text data-ig-text="other1" data-ig-contrast="accent" data-ig-font="primary" x="400" y="317" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffffff">Ecosystem</text>
<circle data-ig-fill="secondary" cx="400" cy="95" r="52"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="101" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Apps</text>
<circle data-ig-fill="tertiary" cx="604" cy="244" r="52"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="604" y="250" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">APIs</text>
<circle data-ig-fill="quaternary" cx="526" cy="484" r="52"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="526" y="490" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Partners</text>
<circle data-ig-fill="primary" cx="274" cy="484" r="52"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="274" y="490" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Devices</text>
<circle data-ig-fill="accent" cx="196" cy="244" r="52"/>
<text data-ig-text="item5" data-ig-contrast="accent" data-ig-font="primary" x="196" y="250" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Data</text>
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
<g transform="translate(-81.92 7.34) scale(1.4658)">
<rect data-ig-fill="primary" x="90" y="407" width="201" height="113" fill-opacity="0.40"/>
<text data-ig-font="primary" x="190" y="393" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">1</text>
<text data-ig-text="item1" data-ig-font="primary" x="190" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Learn</text>
<rect data-ig-fill="primary" x="297" y="293" width="201" height="227" fill-opacity="0.70"/>
<text data-ig-font="primary" x="397" y="279" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">2</text>
<text data-ig-text="item2" data-ig-font="primary" x="397" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Practice</text>
<rect data-ig-fill="primary" x="503" y="180" width="201" height="340" fill-opacity="1.00"/>
<text data-ig-font="primary" x="604" y="166" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">3</text>
<text data-ig-text="item3" data-ig-font="primary" x="604" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Master</text>
<line x1="604" y1="122" x2="604" y2="164" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="604,122 644,134 604,146"/>
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
<g transform="translate(-81.92 7.34) scale(1.4658)">
<rect data-ig-fill="primary" x="90" y="435" width="149" height="85" fill-opacity="0.40"/>
<text data-ig-font="primary" x="164" y="421" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">1</text>
<text data-ig-text="item1" data-ig-font="primary" x="164" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Learn</text>
<rect data-ig-fill="primary" x="245" y="350" width="149" height="170" fill-opacity="0.60"/>
<text data-ig-font="primary" x="320" y="336" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">2</text>
<text data-ig-text="item2" data-ig-font="primary" x="320" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Practice</text>
<rect data-ig-fill="primary" x="400" y="265" width="149" height="255" fill-opacity="0.80"/>
<text data-ig-font="primary" x="474" y="251" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">3</text>
<text data-ig-text="item3" data-ig-font="primary" x="474" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Master</text>
<rect data-ig-fill="primary" x="555" y="180" width="149" height="340" fill-opacity="1.00"/>
<text data-ig-font="primary" x="630" y="166" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">4</text>
<text data-ig-text="item4" data-ig-font="primary" x="630" y="552" text-anchor="middle" font-size="18" font-weight="bold" fill="#212529">Teach</text>
<line x1="630" y1="122" x2="630" y2="164" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="630,122 670,134 630,146"/>
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
<g transform="translate(-81.92 7.35) scale(1.4658)">
<rect data-ig-fill="primary" x="90" y="452" width="118" height="68" fill-opacity="0.40"/>
<text data-ig-font="primary" x="149" y="438" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">1</text>
<text data-ig-text="item1" data-ig-font="primary" x="149" y="552" text-anchor="middle" font-size="16" font-weight="bold" fill="#212529">Learn</text>
<rect data-ig-fill="primary" x="214" y="384" width="118" height="136" fill-opacity="0.55"/>
<text data-ig-font="primary" x="273" y="370" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">2</text>
<text data-ig-text="item2" data-ig-font="primary" x="273" y="552" text-anchor="middle" font-size="16" font-weight="bold" fill="#212529">Practice</text>
<rect data-ig-fill="primary" x="338" y="316" width="118" height="204" fill-opacity="0.70"/>
<text data-ig-font="primary" x="397" y="302" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">3</text>
<text data-ig-text="item3" data-ig-font="primary" x="397" y="552" text-anchor="middle" font-size="16" font-weight="bold" fill="#212529">Master</text>
<rect data-ig-fill="primary" x="462" y="248" width="118" height="272" fill-opacity="0.85"/>
<text data-ig-font="primary" x="521" y="234" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">4</text>
<text data-ig-text="item4" data-ig-font="primary" x="521" y="552" text-anchor="middle" font-size="16" font-weight="bold" fill="#212529">Teach</text>
<rect data-ig-fill="primary" x="586" y="180" width="118" height="340" fill-opacity="1.00"/>
<text data-ig-font="primary" x="645" y="166" text-anchor="middle" font-size="26" font-weight="bold" fill="#212529">5</text>
<text data-ig-text="item5" data-ig-font="primary" x="645" y="552" text-anchor="middle" font-size="16" font-weight="bold" fill="#212529">Lead</text>
<line x1="645" y1="122" x2="645" y2="164" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<polygon data-ig-fill="accent" fill="#495057" points="645,122 685,134 645,146"/>
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
      other1: "deck step 1",
      other2: "deck step 2",
      other3: "deck step 3",
    },
    labels: {
      item1: "Left Side",
      item2: "Right Side",
      other1: "Deck Step 1",
      other2: "Deck Step 2",
      other3: "Deck Step 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-62.50 -17.50) scale(1.4063)">
<rect data-ig-fill="accent" fill="#495057" x="80" y="320" width="190" height="200" rx="8"/>
<rect data-ig-fill="accent" fill="#495057" x="530" y="320" width="190" height="200" rx="8"/>
<path d="M 280 316 Q 400 210 520 316" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="10" stroke-linecap="round"/>
<line x1="330" y1="254" x2="330" y2="316" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="400" y1="218" x2="400" y2="316" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="470" y1="254" x2="470" y2="316" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<rect data-ig-fill="secondary" x="272" y="318" width="80" height="42" rx="6"/>
<text data-ig-text="other1" data-ig-contrast="secondary" data-ig-font="primary" x="312" y="345" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">Plan</text>
<rect data-ig-fill="tertiary" x="356" y="318" width="80" height="42" rx="6"/>
<text data-ig-text="other2" data-ig-contrast="tertiary" data-ig-font="primary" x="396" y="345" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">Build</text>
<rect data-ig-fill="quaternary" x="440" y="318" width="80" height="42" rx="6"/>
<text data-ig-text="other3" data-ig-contrast="quaternary" data-ig-font="primary" x="480" y="345" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff">Adopt</text>
<text data-ig-text="item1" data-ig-contrast="accent" data-ig-font="primary" x="175" y="428" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Today</text>
<text data-ig-text="item2" data-ig-contrast="accent" data-ig-font="primary" x="625" y="428" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Vision</text>
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
<circle data-ig-fill="quaternary" cx="320" cy="330" r="55"/>
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
<circle data-ig-fill="quaternary" cx="320" cy="330" r="90"/>
<circle data-ig-fill="accent" cx="320" cy="330" r="45"/>
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
  {
    id: "fishbone-1",
    family: "fishbone",
    title: "Fishbone",
    category: "Analysis",
    items: 4,
    description: "Cause bones on a spine pointing at the effect.",
    about: "The fishbone (Ishikawa) diagram is the standard root-cause tool: contributing causes branch off a spine that points at the effect. Name the causes on the bones and the problem at the head.",
    usage: {
      item1: "top bone 1",
      item2: "top bone 2",
      item3: "bottom bone 1",
      item4: "bottom bone 2",
      other1: "fish head",
    },
    labels: {
      item1: "Cause 1",
      item2: "Cause 2",
      item3: "Cause 3",
      item4: "Cause 4",
      other1: "Effect",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-48.58 74.96) scale(1.2802)">
<line x1="80" y1="330" x2="600" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="6"/>
<polygon data-ig-fill="accent" fill="#495057" points="622,330 598,318 598,342"/>
<line x1="230" y1="330" x2="316" y2="200" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<rect data-ig-fill="secondary" x="254" y="162" width="124" height="38" rx="19"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="316" y="187" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">People</text>
<line x1="410" y1="330" x2="496" y2="200" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<rect data-ig-fill="tertiary" x="434" y="162" width="124" height="38" rx="19"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="496" y="187" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Process</text>
<line x1="230" y1="330" x2="316" y2="460" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<rect data-ig-fill="quaternary" x="254" y="464" width="124" height="38" rx="19"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="316" y="489" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Tools</text>
<line x1="410" y1="330" x2="496" y2="460" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<rect data-ig-fill="primary" x="434" y="464" width="124" height="38" rx="19"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="496" y="489" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffffff">Environment</text>
<rect data-ig-fill="primary" x="630" y="288" width="150" height="84" rx="10"/>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="705" y="336" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Defects</text>
</g>
</svg>`,
  },
  {
    id: "iceberg-1",
    family: "iceberg",
    title: "Iceberg",
    category: "Analysis",
    items: 2,
    description: "Visible tip above the waterline, hidden mass below.",
    about: "The iceberg says the visible part is the small part. Label the tip with what everyone sees and the mass below the waterline with what actually drives it - culture, costs, effort, causes.",
    usage: {
      item1: "tip",
      item2: "underwater mass",
      other1: "right of tip",
      other2: "right of mass",
    },
    labels: {
      item1: "Tip",
      item2: "Below Surface",
      other1: "Tip Caption",
      other2: "Mass Caption",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-27.09 32.21) scale(1.3177)">
<defs><linearGradient id="ib-depth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2447" stop-opacity="0"/><stop offset="1" stop-color="#0b2447" stop-opacity="0.38"/></linearGradient></defs>
<rect data-ig-fill="primary" x="60" y="300" width="680" height="260" fill-opacity="0.15"/>
<rect x="60" y="300" width="680" height="260" fill="url(#ib-depth)"/>
<line x1="60" y1="300" x2="740" y2="300" stroke="#495057" data-ig-stroke="accent" stroke-width="3" stroke-dasharray="10 8"/>
<polygon data-ig-fill="tertiary" points="400,150 480,300 320,300"/>
<polygon points="400,150 400,300 320,300" fill="#ffffff" fill-opacity="0.22"/>
<polygon points="400,150 480,300 400,300" fill="#000000" fill-opacity="0.10"/>
<g opacity="0.88">
<polygon data-ig-fill="primary" points="320,300 480,300 545,415 400,550 255,415"/>
<polygon points="320,300 400,300 400,550 255,415" fill="#ffffff" fill-opacity="0.14"/>
<polygon points="400,300 480,300 545,415 400,550" fill="#000000" fill-opacity="0.14"/>
</g>
<text data-ig-text="item1" data-ig-contrast="tertiary" data-ig-font="primary" x="400" y="268" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Results</text>
<text data-ig-text="item2" data-ig-contrast="primary" data-ig-font="primary" x="400" y="420" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Effort &amp; Habits</text>
<text data-ig-text="other1" data-ig-font="secondary" x="580" y="240" text-anchor="start" font-size="17" fill="#212529">What people see</text>
<text data-ig-text="other2" data-ig-font="secondary" x="580" y="420" text-anchor="start" font-size="17" fill="#212529">What it takes</text>
</g>
</svg>`,
  },
  {
    id: "gauge-1",
    family: "gauge",
    title: "Gauge",
    category: "Analysis",
    items: 3,
    description: "Dial with three zones and a needle.",
    about: "A gauge places a needle on a low-to-high dial. Label the three zones and the reading - perfect for maturity levels, risk ratings, and health scores.",
    usage: {
      item1: "left zone",
      item2: "middle zone",
      item3: "right zone",
      other1: "reading",
    },
    labels: {
      item1: "Low Zone",
      item2: "Mid Zone",
      item3: "High Zone",
      other1: "Reading",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-81.04 54.55) scale(1.4636)">

<path d="M 180 422 A 220 220 0 0 1 277 248" fill="none" stroke="#0d6efd" data-ig-stroke="primary" stroke-width="46" stroke-linecap="butt"/>
<text data-ig-text="item1" data-ig-font="primary" x="134" y="282" text-anchor="middle" font-size="24" font-weight="bold" fill="#212529">Starting</text>
<path d="M 297 236 A 220 220 0 0 1 496 232" fill="none" stroke="#0d6efd" data-ig-stroke="secondary" stroke-width="46" stroke-linecap="butt"/>
<text data-ig-text="item2" data-ig-font="primary" x="394" y="126" text-anchor="middle" font-size="24" font-weight="bold" fill="#212529">Developing</text>
<path d="M 517 243 A 220 220 0 0 1 619 415" fill="none" stroke="#0d6efd" data-ig-stroke="tertiary" stroke-width="46" stroke-linecap="butt"/>
<text data-ig-text="item3" data-ig-font="primary" x="660" y="274" text-anchor="middle" font-size="24" font-weight="bold" fill="#212529">Leading</text>
<polygon data-ig-fill="accent" fill="#495057" points="528,330 390,422 408,440"/>
<circle data-ig-fill="accent" fill="#495057" cx="400" cy="430" r="20"/>
<text data-ig-text="other1" data-ig-font="primary" x="400" y="494" text-anchor="middle" font-size="28" font-weight="bold" fill="#212529">Maturity: Developing</text>
</g>
</svg>`,
  },
  {
    id: "flywheel-3",
    family: "flywheel",
    title: "Flywheel (3 segments)",
    category: "Cycle",
    items: 3,
    description: "Self-reinforcing loop of 3 driving segments.",
    about: "The flywheel is a cycle with momentum: thick segments that drive each other around. Popularized by Amazon's growth loop, it fits any self-reinforcing system.",
    usage: {
      item1: "segment 1",
      item2: "segment 2",
      item3: "segment 3",
      other1: "center",
    },
    labels: {
      item1: "Segment 1",
      item2: "Segment 2",
      item3: "Segment 3",
      other1: "Center",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-109.73 -68.29) scale(1.5781)">
<path d="M 424 162 A 170 170 0 0 1 566 365" fill="none" stroke="#0d6efd" data-ig-stroke="primary" stroke-width="54"/>
<polygon data-ig-fill="primary" fill="#0d6efd" points="558,394 530,353 605,366"/>
<text data-ig-text="item1" data-ig-font="primary" x="615" y="213" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Traffic</text>
<path d="M 534 435 A 170 170 0 0 1 286 456" fill="none" stroke="#0d6efd" data-ig-stroke="secondary" stroke-width="54"/>
<polygon data-ig-fill="secondary" fill="#0d6efd" points="266,435 315,431 266,489"/>
<text data-ig-text="item2" data-ig-font="primary" x="400" y="585" text-anchor="middle" font-size="19" font-weight="bold" fill="#212529">Sellers</text>
<path d="M 242 394 A 170 170 0 0 1 347 168" fill="none" stroke="#0d6efd" data-ig-stroke="tertiary" stroke-width="54"/>
<polygon data-ig-fill="tertiary" fill="#0d6efd" points="376,162 355,206 329,135"/>
<text data-ig-text="item3" data-ig-font="primary" x="185" y="213" text-anchor="end" font-size="19" font-weight="bold" fill="#212529">Selection</text>
<text data-ig-text="other1" data-ig-font="primary" x="400" y="340" text-anchor="middle" font-size="34" font-weight="bold" fill="#212529">Growth</text>
</g>
</svg>`,
  },
  {
    id: "flywheel-4",
    family: "flywheel",
    title: "Flywheel (4 segments)",
    category: "Cycle",
    items: 4,
    description: "Self-reinforcing loop of 4 driving segments.",
    about: "The flywheel is a cycle with momentum: thick segments that drive each other around. Popularized by Amazon's growth loop, it fits any self-reinforcing system.",
    usage: {
      item1: "segment 1",
      item2: "segment 2",
      item3: "segment 3",
      item4: "segment 4",
      other1: "center",
    },
    labels: {
      item1: "Segment 1",
      item2: "Segment 2",
      item3: "Segment 3",
      item4: "Segment 4",
      other1: "Center",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-169.96 -80.74) scale(1.7598)">
<path d="M 424 162 A 170 170 0 0 1 562 277" fill="none" stroke="#0d6efd" data-ig-stroke="primary" stroke-width="54"/>
<polygon data-ig-fill="primary" fill="#0d6efd" points="568,306 524,285 595,259"/>
<text data-ig-text="item1" data-ig-font="primary" x="575" y="162" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Traffic</text>
<path d="M 568 354 A 170 170 0 0 1 453 492" fill="none" stroke="#0d6efd" data-ig-stroke="secondary" stroke-width="54"/>
<polygon data-ig-fill="secondary" fill="#0d6efd" points="424,498 445,454 471,525"/>
<text data-ig-text="item2" data-ig-font="primary" x="575" y="512" text-anchor="start" font-size="19" font-weight="bold" fill="#212529">Sellers</text>
<path d="M 376 498 A 170 170 0 0 1 238 383" fill="none" stroke="#0d6efd" data-ig-stroke="tertiary" stroke-width="54"/>
<polygon data-ig-fill="tertiary" fill="#0d6efd" points="232,354 276,375 205,401"/>
<text data-ig-text="item3" data-ig-font="primary" x="225" y="512" text-anchor="end" font-size="19" font-weight="bold" fill="#212529">Selection</text>
<path d="M 232 306 A 170 170 0 0 1 347 168" fill="none" stroke="#0d6efd" data-ig-stroke="quaternary" stroke-width="54"/>
<polygon data-ig-fill="quaternary" fill="#0d6efd" points="376,162 355,206 329,135"/>
<text data-ig-text="item4" data-ig-font="primary" x="225" y="162" text-anchor="end" font-size="19" font-weight="bold" fill="#212529">Experience</text>
<text data-ig-text="other1" data-ig-font="primary" x="400" y="340" text-anchor="middle" font-size="34" font-weight="bold" fill="#212529">Growth</text>
</g>
</svg>`,
  },
  {
    id: "puzzle-1",
    family: "puzzle",
    title: "Puzzle Pieces",
    category: "Relationship",
    items: 4,
    description: "Four interlocking pieces forming one whole.",
    about: "Four interlocking puzzle pieces say the parts only work together. Use it for teams, capabilities, or strategy components that complete each other.",
    usage: {
      item1: "top-left piece",
      item2: "top-right piece",
      item3: "bottom-right piece",
      item4: "bottom-left piece",
    },
    labels: {
      item1: "Piece 1",
      item2: "Piece 2",
      item3: "Piece 3",
      item4: "Piece 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-500.00 -325.00) scale(2.5000)">
<path data-ig-fill="primary" d="M 220 150 H 400 V 213 A 27 27 0 0 1 400 267 V 330 H 337 A 27 27 0 0 1 283 330 H 220 Z"/>
<path data-ig-fill="secondary" d="M 400 150 H 580 V 330 H 517 A 27 27 0 0 0 463 330 H 400 V 267 A 27 27 0 0 0 400 213 Z"/>
<path data-ig-fill="tertiary" d="M 400 330 H 463 A 27 27 0 0 1 517 330 H 580 V 510 H 400 V 447 A 27 27 0 0 1 400 393 Z"/>
<path data-ig-fill="quaternary" d="M 220 330 H 283 A 27 27 0 0 0 337 330 H 400 V 393 A 27 27 0 0 0 400 447 V 510 H 220 Z"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="300" y="245" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Product</text>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="500" y="245" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Marketing</text>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="500" y="425" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Sales</text>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="300" y="425" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Support</text>
</g>
</svg>`,
  },
  {
    id: "vtimeline-3",
    family: "vtimeline",
    title: "Vertical Timeline (3)",
    category: "Timeline",
    items: 3,
    description: "3 milestones alternating down a vertical line.",
    about: "A vertical timeline with alternating cards reads like a story: down the page, milestone by milestone. The classic company-history and project-recap layout.",
    usage: {
      item1: "left card 1",
      item2: "right card 2",
      item3: "left card 3",
    },
    labels: {
      item1: "Milestone 1",
      item2: "Milestone 2",
      item3: "Milestone 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-192.31 -71.15) scale(1.7308)">
<line x1="400" y1="140" x2="400" y2="520" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="370" y1="180" x2="400" y2="180" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="primary" cx="400" cy="180" r="13"/>
<rect data-ig-fill="primary" x="140" y="149" width="230" height="62" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="255" y="187" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Founded</text>
<line x1="400" y1="330" x2="430" y2="330" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="400" cy="330" r="13"/>
<rect data-ig-fill="secondary" x="430" y="299" width="230" height="62" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="545" y="337" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">First product</text>
<line x1="370" y1="480" x2="400" y2="480" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="400" cy="480" r="13"/>
<rect data-ig-fill="tertiary" x="140" y="449" width="230" height="62" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="255" y="487" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Series A</text>
</g>
</svg>`,
  },
  {
    id: "vtimeline-4",
    family: "vtimeline",
    title: "Vertical Timeline (4)",
    category: "Timeline",
    items: 4,
    description: "4 milestones alternating down a vertical line.",
    about: "A vertical timeline with alternating cards reads like a story: down the page, milestone by milestone. The classic company-history and project-recap layout.",
    usage: {
      item1: "left card 1",
      item2: "right card 2",
      item3: "left card 3",
      item4: "right card 4",
    },
    labels: {
      item1: "Milestone 1",
      item2: "Milestone 2",
      item3: "Milestone 3",
      item4: "Milestone 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-192.31 -88.46) scale(1.7308)">
<line x1="400" y1="120" x2="400" y2="560" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="370" y1="160" x2="400" y2="160" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="primary" cx="400" cy="160" r="13"/>
<rect data-ig-fill="primary" x="140" y="129" width="230" height="62" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="255" y="167" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Founded</text>
<line x1="400" y1="280" x2="430" y2="280" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="400" cy="280" r="13"/>
<rect data-ig-fill="secondary" x="430" y="249" width="230" height="62" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="545" y="287" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">First product</text>
<line x1="370" y1="400" x2="400" y2="400" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="400" cy="400" r="13"/>
<rect data-ig-fill="tertiary" x="140" y="369" width="230" height="62" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="255" y="407" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Series A</text>
<line x1="400" y1="520" x2="430" y2="520" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="quaternary" cx="400" cy="520" r="13"/>
<rect data-ig-fill="quaternary" x="430" y="489" width="230" height="62" rx="10"/>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="545" y="527" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Global launch</text>
</g>
</svg>`,
  },
  {
    id: "vtimeline-5",
    family: "vtimeline",
    title: "Vertical Timeline (5)",
    category: "Timeline",
    items: 5,
    description: "5 milestones alternating down a vertical line.",
    about: "A vertical timeline with alternating cards reads like a story: down the page, milestone by milestone. The classic company-history and project-recap layout.",
    usage: {
      item1: "left card 1",
      item2: "right card 2",
      item3: "left card 3",
      item4: "right card 4",
      item5: "left card 5",
    },
    labels: {
      item1: "Milestone 1",
      item2: "Milestone 2",
      item3: "Milestone 3",
      item4: "Milestone 4",
      item5: "Milestone 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-192.31 -78.08) scale(1.7308)">
<line x1="400" y1="110" x2="400" y2="558" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<line x1="370" y1="150" x2="400" y2="150" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="primary" cx="400" cy="150" r="13"/>
<rect data-ig-fill="primary" x="140" y="119" width="230" height="62" rx="10"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="255" y="157" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Founded</text>
<line x1="400" y1="242" x2="430" y2="242" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="secondary" cx="400" cy="242" r="13"/>
<rect data-ig-fill="secondary" x="430" y="211" width="230" height="62" rx="10"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="545" y="249" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">First product</text>
<line x1="370" y1="334" x2="400" y2="334" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="tertiary" cx="400" cy="334" r="13"/>
<rect data-ig-fill="tertiary" x="140" y="303" width="230" height="62" rx="10"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="255" y="341" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Series A</text>
<line x1="400" y1="426" x2="430" y2="426" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="quaternary" cx="400" cy="426" r="13"/>
<rect data-ig-fill="quaternary" x="430" y="395" width="230" height="62" rx="10"/>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="545" y="433" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">Global launch</text>
<line x1="370" y1="518" x2="400" y2="518" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<circle data-ig-fill="accent" cx="400" cy="518" r="13"/>
<rect data-ig-fill="accent" x="140" y="487" width="230" height="62" rx="10"/>
<text data-ig-text="item5" data-ig-contrast="accent" data-ig-font="primary" x="255" y="525" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">IPO</text>
</g>
</svg>`,
  },
  {
    id: "mountain-1",
    family: "mountain",
    title: "Mountain",
    category: "Process",
    items: 3,
    description: "A summit route with labeled camps and a flag on top.",
    about: "The mountain frames an ambitious goal: labeled camps mark the route, the flag marks the summit. Use it for long programs, transformations, and growth journeys.",
    usage: {
      item1: "first camp",
      item2: "second camp",
      item3: "third camp",
      other1: "beside the flag",
    },
    labels: {
      item1: "Camp 1",
      item2: "Camp 2",
      item3: "Camp 3",
      other1: "Summit",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-142.86 19.87) scale(1.6071)">

<polygon data-ig-fill="secondary" points="400,130 680,530 120,530"/>
<polygon data-ig-fill="tertiary" points="400,130 452,205 348,205"/>
<line x1="400" y1="128" x2="400" y2="70" stroke="#495057" data-ig-stroke="accent" stroke-width="5"/>
<polygon data-ig-fill="primary" points="400,70 456,88 400,106"/>
<path d="M 400 525 C 330 470 470 415 400 350 C 350 305 435 255 400 205" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4" stroke-dasharray="10 8"/>
<circle data-ig-fill="primary" cx="388" cy="480" r="13"/>
<text data-ig-text="item1" data-ig-font="primary" x="412" y="486" text-anchor="start" font-size="18" font-weight="bold" fill="#212529">Foundations</text>
<circle data-ig-fill="primary" cx="420" cy="390" r="13"/>
<text data-ig-text="item2" data-ig-font="primary" x="444" y="396" text-anchor="start" font-size="18" font-weight="bold" fill="#212529">Momentum</text>
<circle data-ig-fill="primary" cx="392" cy="300" r="13"/>
<text data-ig-text="item3" data-ig-font="primary" x="416" y="306" text-anchor="start" font-size="18" font-weight="bold" fill="#212529">Final push</text>
<text data-ig-text="other1" data-ig-font="primary" x="470" y="92" text-anchor="start" font-size="20" font-weight="bold" fill="#212529">Market leader</text>
</g>
</svg>`,
  },
  {
    id: "gears-1",
    family: "gears",
    title: "Gears",
    category: "Process",
    items: 3,
    description: "Three interlocking gears driving each other.",
    about: "Interlocking gears show how functions drive each other: turn one and the others move. Label each gear with a team, system, or force.",
    usage: {
      item1: "large gear",
      item2: "right gear",
      item3: "bottom gear",
    },
    labels: {
      item1: "Gear 1",
      item2: "Gear 2",
      item3: "Gear 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-305.04 -251.36) scale(2.3389)">

<polygon data-ig-fill="primary" points="356.0,250.0 368.2,258.2 365.4,275.7 351.3,279.7 337.7,306.4 342.7,320.2 330.2,332.7 316.4,327.7 289.7,341.3 285.7,355.4 268.2,358.2 260.0,346.0 230.3,341.3 218.8,350.4 203.0,342.3 203.6,327.7 182.3,306.4 167.7,307.0 159.6,291.2 168.7,279.7 164.0,250.0 151.8,241.8 154.6,224.3 168.7,220.3 182.3,193.6 177.3,179.8 189.8,167.3 203.6,172.3 230.3,158.7 234.3,144.6 251.8,141.8 260.0,154.0 289.7,158.7 301.2,149.6 317.0,157.7 316.4,172.3 337.7,193.6 352.3,193.0 360.4,208.8 351.3,220.3"/>
<circle cx="260" cy="250" r="14" fill="#ffffff"/>
<polygon data-ig-fill="secondary" points="527.0,316.0 536.6,323.2 533.9,338.5 522.4,342.0 509.2,364.9 511.9,376.5 500.0,386.5 489.0,381.8 464.2,390.8 458.8,401.5 443.2,401.5 437.8,390.8 413.0,381.8 402.0,386.5 390.1,376.5 392.8,364.9 379.6,342.0 368.1,338.5 365.4,323.2 375.0,316.0 379.6,290.0 373.0,280.0 380.8,266.5 392.8,267.1 413.0,250.2 414.4,238.3 429.1,233.0 437.8,241.2 464.2,241.2 472.9,233.0 487.6,238.3 489.0,250.2 509.2,267.1 521.2,266.5 529.0,280.0 522.4,290.0"/>
<circle cx="451" cy="316" r="14" fill="#ffffff"/>
<polygon data-ig-fill="tertiary" points="368.0,431.0 375.7,437.6 373.0,451.6 363.3,454.7 349.8,474.8 350.7,485.0 338.8,492.9 329.7,488.3 306.0,493.0 299.4,500.7 285.4,498.0 282.3,488.3 262.2,474.8 252.0,475.7 244.1,463.8 248.7,454.7 244.0,431.0 236.3,424.4 239.0,410.4 248.7,407.3 262.2,387.2 261.3,377.0 273.2,369.1 282.3,373.7 306.0,369.0 312.6,361.3 326.6,364.0 329.7,373.7 349.8,387.2 360.0,386.3 367.9,398.2 363.3,407.3"/>
<circle cx="306" cy="431" r="14" fill="#ffffff"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="260" y="292" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Strategy</text>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="451" y="358" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Execution</text>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="306" y="473" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Feedback</text>
</g>
</svg>`,
  },
  {
    id: "honeycomb-1",
    family: "honeycomb",
    title: "Honeycomb",
    category: "Relationship",
    items: 5,
    description: "Five packed cells of one whole.",
    about: "A honeycomb cluster presents five capabilities as tightly-packed cells of one whole - organic, equal, and connected.",
    usage: {
      item1: "cell 1",
      item2: "cell 2",
      item3: "cell 3",
      item4: "cell 4",
      item5: "cell 5",
    },
    labels: {
      item1: "Cell 1",
      item2: "Cell 2",
      item3: "Cell 3",
      item4: "Cell 4",
      item5: "Cell 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-400.00 -170.50) scale(2.2500)">
<polygon data-ig-fill="primary" points="332,278 266,316 200,278 200,202 266,164 332,202"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="266" y="247" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Design</text>
<polygon data-ig-fill="secondary" points="466,278 400,316 334,278 334,202 400,164 466,202"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="247" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Build</text>
<polygon data-ig-fill="tertiary" points="600,278 534,316 468,278 468,202 534,164 600,202"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="534" y="247" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Test</text>
<polygon data-ig-fill="quaternary" points="399,394 333,432 267,394 267,318 333,280 399,318"/>
<text data-ig-text="item4" data-ig-contrast="quaternary" data-ig-font="primary" x="333" y="363" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Ship</text>
<polygon data-ig-fill="accent" points="533,394 467,432 401,394 401,318 467,280 533,318"/>
<text data-ig-text="item5" data-ig-contrast="accent" data-ig-font="primary" x="467" y="363" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Learn</text>
</g>
</svg>`,
  },
  {
    id: "tree-1",
    family: "tree",
    title: "Org Tree",
    category: "Hierarchy",
    items: 5,
    description: "A root, two branches, four leaves.",
    about: "The org-tree shows two levels of structure under a single root: teams under leaders, products under a portfolio, topics under a theme.",
    usage: {
      item1: "root",
      item2: "left branch",
      item3: "right branch",
      item4: "leaf 1",
      item5: "leaf 2",
      other1: "leaf 3",
      other2: "leaf 4",
    },
    labels: {
      item1: "Root",
      item2: "Branch 1",
      item3: "Branch 2",
      item4: "Leaf 1",
      item5: "Leaf 2",
      other1: "Leaf 3",
      other2: "Leaf 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-96.03 52.98) scale(1.4901)">
<line x1="400" y1="206" x2="400" y2="240" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="230" y1="240" x2="570" y2="240" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="230" y1="240" x2="230" y2="278" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="570" y1="240" x2="570" y2="278" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="230" y1="334" x2="230" y2="368" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="160" y1="368" x2="300" y2="368" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="160" y1="368" x2="160" y2="400" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="300" y1="368" x2="300" y2="400" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="570" y1="334" x2="570" y2="368" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="500" y1="368" x2="640" y2="368" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="500" y1="368" x2="500" y2="400" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<line x1="640" y1="368" x2="640" y2="400" stroke="#495057" data-ig-stroke="accent" stroke-width="3"/>
<rect data-ig-fill="primary" x="325" y="150" width="150" height="56" rx="9"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="184" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffffff">CEO</text>
<rect data-ig-fill="secondary" x="155" y="278" width="150" height="56" rx="9"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="230" y="312" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Product</text>
<rect data-ig-fill="secondary" x="495" y="278" width="150" height="56" rx="9"/>
<text data-ig-text="item3" data-ig-contrast="secondary" data-ig-font="primary" x="570" y="312" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffffff">Operations</text>
<rect data-ig-fill="tertiary" x="98" y="400" width="124" height="50" rx="8"/>
<text data-ig-text="item4" data-ig-contrast="tertiary" data-ig-font="primary" x="160" y="430" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">Design</text>
<rect data-ig-fill="tertiary" x="238" y="400" width="124" height="50" rx="8"/>
<text data-ig-text="item5" data-ig-contrast="tertiary" data-ig-font="primary" x="300" y="430" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">Engineering</text>
<rect data-ig-fill="tertiary" x="438" y="400" width="124" height="50" rx="8"/>
<text data-ig-text="other1" data-ig-contrast="tertiary" data-ig-font="primary" x="500" y="430" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">Finance</text>
<rect data-ig-fill="tertiary" x="578" y="400" width="124" height="50" rx="8"/>
<text data-ig-text="other2" data-ig-contrast="tertiary" data-ig-font="primary" x="640" y="430" text-anchor="middle" font-size="15" font-weight="bold" fill="#ffffff">People</text>
</g>
</svg>`,
  },
  {
    id: "mindmap-1",
    family: "mindmap",
    title: "Mind Map",
    category: "Relationship",
    items: 4,
    description: "A central idea with four radiating branches.",
    about: "A mind map radiates ideas from a central concept into labeled branches. Less formal than hub-and-spoke - built for brainstorms and topic overviews.",
    usage: {
      item1: "top-left branch",
      item2: "top-right branch",
      item3: "bottom-left branch",
      item4: "bottom-right branch",
      other1: "central idea",
    },
    labels: {
      item1: "Branch 1",
      item2: "Branch 2",
      item3: "Branch 3",
      item4: "Branch 4",
      other1: "Central Idea",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-37.31 56.72) scale(1.3433)">
<path d="M 340 330 Q 245 180 235 180" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<path d="M 460 330 Q 555 180 565 180" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<path d="M 340 330 Q 245 480 235 480" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<path d="M 460 330 Q 555 480 565 480" fill="none" stroke="#495057" data-ig-stroke="accent" stroke-width="4"/>
<ellipse data-ig-fill="primary" cx="400" cy="330" rx="115" ry="60"/>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="primary" x="400" y="338" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">Campaign</text>
<rect data-ig-fill="secondary" x="65" y="152" width="170" height="56" rx="28"/>
<text data-ig-text="item1" data-ig-contrast="secondary" data-ig-font="primary" x="150" y="187" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Audience</text>
<rect data-ig-fill="tertiary" x="565" y="152" width="170" height="56" rx="28"/>
<text data-ig-text="item2" data-ig-contrast="tertiary" data-ig-font="primary" x="650" y="187" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Channels</text>
<rect data-ig-fill="quaternary" x="65" y="452" width="170" height="56" rx="28"/>
<text data-ig-text="item3" data-ig-contrast="quaternary" data-ig-font="primary" x="150" y="487" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Budget</text>
<rect data-ig-fill="primary" x="565" y="452" width="170" height="56" rx="28"/>
<text data-ig-text="item4" data-ig-contrast="primary" data-ig-font="primary" x="650" y="487" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffffff">Timing</text>
</g>
</svg>`,
  },
  {
    id: "stats-1",
    family: "stats",
    title: "Stat Tiles",
    category: "List",
    items: 3,
    description: "Three headline numbers with labels.",
    about: "Big-number stat tiles are the most shareable slide there is: three headline metrics with labels. Numbers are text, so write them any way you like.",
    usage: {
      item1: "big number 1",
      item2: "big number 2",
      item3: "big number 3",
      other1: "label 1",
      other2: "label 2",
      other3: "label 3",
    },
    labels: {
      item1: "Number 1",
      item2: "Number 2",
      item3: "Number 3",
      other1: "Label 1",
      other2: "Label 2",
      other3: "Label 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-80.65 64.52) scale(1.4516)">
<rect data-ig-fill="primary" x="90" y="220" width="190" height="160" rx="14"/>
<text data-ig-text="item1" data-ig-contrast="primary" data-ig-font="primary" x="185" y="296" text-anchor="middle" font-size="42" font-weight="bold" fill="#ffffff">87%</text>
<text data-ig-text="other1" data-ig-contrast="primary" data-ig-font="secondary" x="185" y="344" text-anchor="middle" font-size="15" fill="#ffffff">Satisfaction</text>
<rect data-ig-fill="secondary" x="305" y="220" width="190" height="160" rx="14"/>
<text data-ig-text="item2" data-ig-contrast="secondary" data-ig-font="primary" x="400" y="296" text-anchor="middle" font-size="42" font-weight="bold" fill="#ffffff">2.4x</text>
<text data-ig-text="other2" data-ig-contrast="secondary" data-ig-font="secondary" x="400" y="344" text-anchor="middle" font-size="15" fill="#ffffff">Faster delivery</text>
<rect data-ig-fill="tertiary" x="520" y="220" width="190" height="160" rx="14"/>
<text data-ig-text="item3" data-ig-contrast="tertiary" data-ig-font="primary" x="615" y="296" text-anchor="middle" font-size="42" font-weight="bold" fill="#ffffff">150+</text>
<text data-ig-text="other3" data-ig-contrast="tertiary" data-ig-font="secondary" x="615" y="344" text-anchor="middle" font-size="15" fill="#ffffff">Countries</text>
</g>
</svg>`,
  },
  {
    id: "checklist-3",
    family: "checklist",
    title: "Checklist (3)",
    category: "List",
    items: 3,
    description: "3 checked-off points.",
    about: "A checklist with bold checkmarks communicates completion and confidence: what is covered, included, or done.",
    usage: {
      item1: "row 1",
      item2: "row 2",
      item3: "row 3",
    },
    labels: {
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-553.76 -777.19) scale(3.8703)">
<circle data-ig-fill="primary" cx="180" cy="240" r="24"/>
<path d="M 168 240 L 177 249 L 193 231" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item1" data-ig-font="primary" x="228" y="248" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Free updates</text>
<circle data-ig-fill="secondary" cx="180" cy="330" r="24"/>
<path d="M 168 330 L 177 339 L 193 321" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item2" data-ig-font="primary" x="228" y="338" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">No lock-in</text>
<circle data-ig-fill="tertiary" cx="180" cy="420" r="24"/>
<path d="M 168 420 L 177 429 L 193 411" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item3" data-ig-font="primary" x="228" y="428" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Cancel anytime</text>
</g>
</svg>`,
  },
  {
    id: "checklist-4",
    family: "checklist",
    title: "Checklist (4)",
    category: "List",
    items: 4,
    description: "4 checked-off points.",
    about: "A checklist with bold checkmarks communicates completion and confidence: what is covered, included, or done.",
    usage: {
      item1: "row 1",
      item2: "row 2",
      item3: "row 3",
      item4: "row 4",
    },
    labels: {
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
      item4: "Item 4",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-302.53 -433.96) scale(2.8302)">
<circle data-ig-fill="primary" cx="180" cy="195" r="24"/>
<path d="M 168 195 L 177 204 L 193 186" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item1" data-ig-font="primary" x="228" y="203" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Free updates</text>
<circle data-ig-fill="secondary" cx="180" cy="285" r="24"/>
<path d="M 168 285 L 177 294 L 193 276" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item2" data-ig-font="primary" x="228" y="293" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">No lock-in</text>
<circle data-ig-fill="tertiary" cx="180" cy="375" r="24"/>
<path d="M 168 375 L 177 384 L 193 366" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item3" data-ig-font="primary" x="228" y="383" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Cancel anytime</text>
<circle data-ig-fill="quaternary" cx="180" cy="465" r="24"/>
<path d="M 168 465 L 177 474 L 193 456" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item4" data-ig-font="primary" x="228" y="473" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Secure by default</text>
</g>
</svg>`,
  },
  {
    id: "checklist-5",
    family: "checklist",
    title: "Checklist (5)",
    category: "List",
    items: 5,
    description: "5 checked-off points.",
    about: "A checklist with bold checkmarks communicates completion and confidence: what is covered, included, or done.",
    usage: {
      item1: "row 1",
      item2: "row 2",
      item3: "row 3",
      item4: "row 4",
      item5: "row 5",
    },
    labels: {
      item1: "Item 1",
      item2: "Item 2",
      item3: "Item 3",
      item4: "Item 4",
      item5: "Item 5",
    },
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">
<g transform="translate(-125.50 -227.94) scale(2.2059)">
<circle data-ig-fill="primary" cx="180" cy="150" r="24"/>
<path d="M 168 150 L 177 159 L 193 141" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item1" data-ig-font="primary" x="228" y="158" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Free updates</text>
<circle data-ig-fill="secondary" cx="180" cy="240" r="24"/>
<path d="M 168 240 L 177 249 L 193 231" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item2" data-ig-font="primary" x="228" y="248" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">No lock-in</text>
<circle data-ig-fill="tertiary" cx="180" cy="330" r="24"/>
<path d="M 168 330 L 177 339 L 193 321" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item3" data-ig-font="primary" x="228" y="338" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Cancel anytime</text>
<circle data-ig-fill="quaternary" cx="180" cy="420" r="24"/>
<path d="M 168 420 L 177 429 L 193 411" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item4" data-ig-font="primary" x="228" y="428" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">Secure by default</text>
<circle data-ig-fill="accent" cx="180" cy="510" r="24"/>
<path d="M 168 510 L 177 519 L 193 501" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<text data-ig-text="item5" data-ig-font="primary" x="228" y="518" text-anchor="start" font-size="22" font-weight="bold" fill="#212529">24/7 support</text>
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
  flywheel: "Self-reinforcing loop of multiple driving segments (user-defined).",
  vtimeline: "Milestones (user-defined) alternating down a vertical line.",
  checklist: "Multiple checked-off points (user-defined).",
};
