// Search copy for every template family: a meta description (kept under
// ~160 characters), the use cases the landing page lists, and the search
// phrases it should rank for. Variants of a family share this copy; their
// item count is added to the title.

export type FamilySeo = {
  summary: string;
  uses: string[];
  keywords: string[];
};

const S: Record<string, FamilySeo> = {
  "process-arrow": {
    summary:
      "Chevron process arrow infographic: show a left-to-right workflow in 3 to 5 labeled stages. Edit the text, brand it, download SVG, PNG or animated GIF.",
    uses: ["Sales and onboarding pipelines", "Manufacturing or delivery workflows", "Step-by-step how-it-works slides"],
    keywords: ["process arrow infographic", "chevron process diagram", "workflow arrow template"],
  },
  cycle: {
    summary:
      "Circular cycle diagram with 3 to 5 connected stages in a continuous loop. Perfect for recurring processes, PDCA and lifecycle slides. Editable SVG, PNG, GIF.",
    uses: ["Plan-Do-Check-Act and continuous improvement", "Product or customer lifecycles", "Recurring review cadences"],
    keywords: ["cycle diagram template", "circular process infographic", "lifecycle diagram"],
  },
  pyramid: {
    summary:
      "Pyramid infographic with 3 to 5 stacked levels from broad base to narrow peak. Ideal for hierarchies of needs, priorities and maturity models. Fully editable.",
    uses: ["Hierarchy of needs and priority stacks", "Maturity and capability models", "Market segmentation by tier"],
    keywords: ["pyramid infographic", "pyramid diagram template", "hierarchy pyramid chart"],
  },
  venn: {
    summary:
      "Venn diagram template with 2 or 3 overlapping circles and a labeled sweet spot. Show shared ground between teams, skills or markets. Editable SVG, PNG and GIF.",
    uses: ["Overlap between roles, skills or audiences", "Product-market fit sweet spots", "Partnership and ecosystem overlaps"],
    keywords: ["venn diagram template", "3 circle venn diagram", "overlap diagram infographic"],
  },
  funnel: {
    summary:
      "Sales funnel infographic with 3 to 5 narrowing stages from awareness to action. Type your stage names, apply brand colors, export SVG, PNG or animated GIF.",
    uses: ["Marketing and sales funnels", "Recruiting and hiring pipelines", "Conversion and drop-off stories"],
    keywords: ["funnel infographic", "sales funnel template", "marketing funnel diagram"],
  },
  timeline: {
    summary:
      "Horizontal timeline infographic with 3 to 5 labeled milestones on a single line. Clean, branded and animated. Download as editable SVG, PNG or GIF in seconds.",
    uses: ["Project and launch timelines", "Company history slides", "Quarterly roadmaps"],
    keywords: ["timeline infographic", "horizontal timeline template", "milestone timeline"],
  },
  steps: {
    summary:
      "Numbered step circles infographic for 3 to 5 sequential steps with short labels. A clean how-it-works graphic for websites and decks. Editable SVG, PNG, GIF.",
    uses: ["How-it-works sections", "Setup and onboarding instructions", "Simple process overviews"],
    keywords: ["numbered steps infographic", "step by step graphic", "process steps template"],
  },
  list: {
    summary:
      "Numbered list infographic with 3 to 5 stacked, color-coded bars. Turn bullet points into a branded visual list. Editable text, SVG, PNG and animated GIF export.",
    uses: ["Top-5 lists and key takeaways", "Agenda and meeting outlines", "Feature or benefit summaries"],
    keywords: ["numbered list infographic", "list graphic template", "top 5 list design"],
  },
  matrix: {
    summary:
      "2x2 matrix template with four labeled quadrants and axis titles. Prioritize, segment or compare on two dimensions. Brandable, editable SVG, PNG and GIF.",
    uses: ["Eisenhower urgent/important grids", "Effort vs impact prioritization", "Market and competitor positioning"],
    keywords: ["2x2 matrix template", "four quadrant diagram", "prioritization matrix infographic"],
  },
  "hub-spoke": {
    summary:
      "Hub and spoke diagram with a central concept linked to 3 to 5 surrounding spokes. Show a core product, team or idea and its connections. Editable SVG, PNG, GIF.",
    uses: ["Core product and its integrations", "Central team with partner functions", "One idea, many applications"],
    keywords: ["hub and spoke diagram", "hub spoke infographic", "central concept diagram"],
  },
  pillars: {
    summary:
      "Pillars infographic: 3 to 5 labeled columns holding up a shared roof. Present strategic pillars, values or focus areas. Editable SVG, PNG and GIF.",
    uses: ["Strategic pillars and focus areas", "Company values", "Program workstreams"],
    keywords: ["pillars infographic", "strategic pillars template", "pillar diagram"],
  },
  swot: {
    summary:
      "SWOT analysis template: strengths, weaknesses, opportunities and threats in a clean four-quadrant grid. Fill in your points and download SVG, PNG or animated GIF.",
    uses: ["Business and product SWOT reviews", "Strategy offsites", "Competitive assessments"],
    keywords: ["swot analysis template", "swot infographic", "swot diagram"],
  },
  "pros-cons": {
    summary:
      "Pros and cons infographic with two balanced columns of three points each. Weigh a decision visually for a proposal, memo or slide. Editable SVG, PNG and GIF.",
    uses: ["Decision memos and proposals", "Vendor or option comparisons", "Debate and discussion slides"],
    keywords: ["pros and cons template", "pros cons infographic", "decision comparison graphic"],
  },
  roadmap: {
    summary:
      "Winding road roadmap infographic with 3 to 5 numbered stops. Tell a journey from today to the destination. Brand colors, editable text, SVG, PNG and GIF export.",
    uses: ["Product and strategy roadmaps", "Customer journeys", "Transformation programs"],
    keywords: ["roadmap infographic", "road timeline template", "journey roadmap graphic"],
  },
  "cause-effect": {
    summary:
      "Cause and effect diagram with three causes converging on one effect. Explain what drives an outcome in a single clean graphic. Editable SVG, PNG and GIF.",
    uses: ["Root-cause summaries", "Why-it-happened explanations", "Driver analysis slides"],
    keywords: ["cause and effect diagram", "cause effect infographic", "driver diagram template"],
  },
  ipo: {
    summary:
      "Input, process, output diagram: the classic three-stage IPO flow for systems, services and data pipelines. Editable SVG, PNG and GIF.",
    uses: ["Systems and data pipeline overviews", "Service delivery models", "Operating model summaries"],
    keywords: ["input process output diagram", "IPO diagram template", "process flow infographic"],
  },
  layers: {
    summary:
      "Stacked layers infographic with 3 to 5 slabs, each resting on the one below. Show tech stacks, foundations and tiers. Editable text and colors, SVG, PNG, GIF.",
    uses: ["Technology and architecture stacks", "Foundation-to-outcome models", "Tiered service levels"],
    keywords: ["stacked layers infographic", "layer diagram template", "tech stack graphic"],
  },
  radial: {
    summary:
      "Ecosystem diagram with a central circle connected to 3 to 5 nodes. Map partners, channels or stakeholders around a core. Branded, editable SVG, PNG and GIF.",
    uses: ["Partner and stakeholder ecosystems", "Platform and channel maps", "Team structure around a mission"],
    keywords: ["ecosystem diagram", "radial diagram template", "stakeholder map infographic"],
  },
  staircase: {
    summary:
      "Staircase infographic with 3 to 5 rising steps toward a goal. Show growth paths, maturity levels or career ladders. Editable SVG, PNG and GIF.",
    uses: ["Growth and maturity paths", "Career progression", "Phased goals"],
    keywords: ["staircase infographic", "steps to success graphic", "growth steps template"],
  },
  bridge: {
    summary:
      "Bridge diagram infographic: two sides joined by a labeled bridge. Show the gap between current and future state and what closes it. Editable SVG, PNG and GIF.",
    uses: ["Current state to future state", "Gap analysis", "Change management stories"],
    keywords: ["bridge diagram", "gap bridge infographic", "current future state graphic"],
  },
  target: {
    summary:
      "Target diagram with 3 to 5 concentric rings narrowing to a bullseye. Show focus, priorities or market segments from broad to core. Editable SVG, PNG and GIF.",
    uses: ["Target market and segment rings", "Priority and focus models", "Goal and scope definitions"],
    keywords: ["target diagram template", "concentric circles infographic", "bullseye diagram"],
  },
  fishbone: {
    summary:
      "Fishbone (Ishikawa) diagram template with cause bones on a spine pointing to the effect. Run a root-cause analysis in minutes. Editable SVG, PNG and GIF.",
    uses: ["Root-cause analysis", "Quality and incident reviews", "Problem-solving workshops"],
    keywords: ["fishbone diagram template", "ishikawa diagram", "root cause analysis infographic"],
  },
  iceberg: {
    summary:
      "Iceberg infographic: the visible tip above the waterline and the hidden mass below. Reveal what sits beneath the surface. Editable text, colors, SVG, PNG and GIF.",
    uses: ["Visible vs hidden costs or causes", "Culture and behavior models", "Effort behind results"],
    keywords: ["iceberg infographic", "iceberg diagram template", "hidden below the surface graphic"],
  },
  gauge: {
    summary:
      "Gauge chart infographic with three colored zones and a needle. Show maturity, risk or performance level at a glance. Editable labels, brand colors, SVG, PNG, GIF.",
    uses: ["Maturity and readiness scores", "Risk and health indicators", "Performance dashboards"],
    keywords: ["gauge chart infographic", "speedometer diagram", "maturity gauge template"],
  },
  flywheel: {
    summary:
      "Flywheel diagram with 3 to 5 self-reinforcing segments in a loop. Show the momentum behind growth and retention. Editable SVG, PNG and GIF.",
    uses: ["Growth and retention flywheels", "Virtuous cycles", "Momentum strategy slides"],
    keywords: ["flywheel diagram", "growth flywheel template", "momentum loop infographic"],
  },
  puzzle: {
    summary:
      "Puzzle pieces infographic: four interlocking pieces forming one whole. Show how parts fit together into a complete solution. Editable SVG, PNG and GIF.",
    uses: ["Solution components", "Team or partner fit", "Integrated offerings"],
    keywords: ["puzzle pieces infographic", "jigsaw diagram template", "fitting together graphic"],
  },
  vtimeline: {
    summary:
      "Vertical timeline infographic with 3 to 5 milestones alternating down a central line. Great for histories and project phases. Editable SVG, PNG and GIF.",
    uses: ["Company and product histories", "Project phases", "Event schedules"],
    keywords: ["vertical timeline template", "vertical timeline infographic", "alternating timeline"],
  },
  mountain: {
    summary:
      "Mountain summit infographic with labeled camps up the route and a flag on top. Show the climb to a goal in stages. Editable SVG, PNG and GIF.",
    uses: ["Journey to a goal", "Phased achievement stories", "Challenge and milestone narratives"],
    keywords: ["mountain infographic", "summit journey graphic", "climb to goal template"],
  },
  gears: {
    summary:
      "Interlocking gears infographic: three cogs driving each other. Show how functions, teams or systems mesh and depend on one another. Editable SVG, PNG and GIF.",
    uses: ["Interdependent functions", "Operating mechanisms", "Systems that work together"],
    keywords: ["gears infographic", "cogs diagram template", "interlocking gears graphic"],
  },
  honeycomb: {
    summary:
      "Honeycomb infographic with five packed hexagon cells forming one whole. Present connected capabilities or values in a tight, modern layout. Editable SVG, PNG, GIF.",
    uses: ["Capability and competency maps", "Core values", "Connected service areas"],
    keywords: ["honeycomb infographic", "hexagon diagram template", "hex cell graphic"],
  },
  tree: {
    summary:
      "Org tree diagram: a root, two branches and four leaves. Present reporting lines, taxonomies or decision breakdowns in a clean hierarchy. Editable SVG, PNG and GIF.",
    uses: ["Org charts and reporting lines", "Category taxonomies", "Work breakdown structures"],
    keywords: ["org chart template", "tree diagram infographic", "hierarchy tree graphic"],
  },
  mindmap: {
    summary:
      "Mind map infographic with a central idea and four radiating branches. Capture a concept and its main themes on one slide. Editable SVG, PNG and GIF.",
    uses: ["Brainstorm summaries", "Topic overviews", "Concept and theme maps"],
    keywords: ["mind map template", "mind map infographic", "central idea diagram"],
  },
  stats: {
    summary:
      "Stat tiles infographic with three big headline numbers and labels. Make key metrics pop in a report, deck or social post. Editable SVG, PNG and GIF.",
    uses: ["Key metrics and KPIs", "Impact and results summaries", "Annual report highlights"],
    keywords: ["statistics infographic", "big number tiles", "KPI stat graphic"],
  },
  checklist: {
    summary:
      "Checklist infographic with 3 to 5 checked-off points. Turn requirements, launch criteria or completed work into a satisfying visual. Editable SVG, PNG and GIF.",
    uses: ["Launch and readiness checklists", "Completed milestones", "Requirements summaries"],
    keywords: ["checklist infographic", "checklist graphic template", "checkmarks list design"],
  },
  "subway-map": {
    summary:
      "Subway map infographic: a transit-style diagram with 1 to 3 colored lines of named stations and interchanges. Map journeys, roadmaps or systems. SVG, PNG and GIF.",
    uses: ["Customer and employee journeys", "Multi-track roadmaps", "Program and system maps"],
    keywords: ["subway map infographic", "metro map template", "transit style diagram"],
  },
  balloon: {
    summary:
      "Hot air balloon infographic with lift forces on one side and drag on the other. Visualize what pushes you up and what holds you back. Editable SVG, PNG and GIF.",
    uses: ["Retrospectives and force-field analysis", "Enablers vs blockers", "Change management reviews"],
    keywords: ["hot air balloon infographic", "force field analysis template", "lift and drag diagram"],
  },
  "tree-roots": {
    summary:
      "Roots and branches infographic: visible outcomes above ground, hidden causes below. Connect results to their foundations. Editable SVG, PNG and GIF.",
    uses: ["Outcomes and their root causes", "Culture and values foundations", "Symptoms vs sources"],
    keywords: ["tree roots infographic", "roots and branches diagram", "causes and outcomes graphic"],
  },
  orbits: {
    summary:
      "Orbits infographic: priorities circling a central mission, closer meaning more important. A fresh way to rank focus areas. Editable SVG, PNG and GIF.",
    uses: ["Mission and priority rings", "Stakeholder proximity", "Focus area ranking"],
    keywords: ["orbit diagram infographic", "planets orbit template", "priority orbit graphic"],
  },
  honeycomb2: {
    summary:
      "Honeycomb core infographic: six hexagon cells locked around a central core. Show a hub capability and its six supporting areas. Editable SVG, PNG and GIF.",
    uses: ["Core plus supporting capabilities", "Platform and modules", "Value and behavior frameworks"],
    keywords: ["honeycomb diagram", "hexagon core infographic", "six cell hex template"],
  },
  dominoes: {
    summary:
      "Domino effect infographic: falling dominoes compounding into one big outcome. Show chain reactions and knock-on effects. Editable SVG, PNG and GIF.",
    uses: ["Chain reactions and knock-on effects", "Small changes, big results", "Risk cascades"],
    keywords: ["domino effect infographic", "chain reaction diagram", "cascading effect graphic"],
  },
  stool: {
    summary:
      "Three-legged stool infographic: three interdependent supports under one seat. Explain why every leg matters. Editable SVG, PNG and GIF.",
    uses: ["Three essential pillars", "Interdependent success factors", "Balanced strategy models"],
    keywords: ["three legged stool infographic", "three supports diagram", "stool metaphor graphic"],
  },
  "mindmap-radial": {
    summary:
      "Radial mind map with a central idea and six branches radiating outward. Organize a topic and its themes at a glance. Editable SVG, PNG and GIF.",
    uses: ["Topic and theme overviews", "Workshop outputs", "Six-area frameworks"],
    keywords: ["radial mind map", "six branch mind map template", "radial concept diagram"],
  },
  "mindmap-split": {
    summary:
      "Split mind map with a central idea and four branches on each side. Compare two groups of themes around one concept. Editable SVG, PNG and GIF.",
    uses: ["Two-sided theme maps", "Internal vs external factors", "Balanced brainstorm summaries"],
    keywords: ["split mind map", "two sided mind map template", "left right concept map"],
  },
  "team-ring": {
    summary:
      "Team ring infographic: five people gathered around a shared goal. Show collaboration, roles and a common purpose. Editable labels, brand colors, SVG, PNG and GIF.",
    uses: ["Team roles around a goal", "Cross-functional collaboration", "Community and membership"],
    keywords: ["team ring infographic", "people around goal diagram", "collaboration circle graphic"],
  },
  "light-bulb": {
    summary:
      "Light bulb infographic: one big idea with six supporting sparks. Present an innovation and what powers it. Editable SVG, PNG and GIF.",
    uses: ["Innovation and idea pitches", "Idea plus supporting points", "Creative strategy slides"],
    keywords: ["light bulb infographic", "big idea diagram", "idea sparks template"],
  },
  serpentine: {
    summary:
      "Serpentine path infographic: numbered steps on a snaking path that turns back at the end of each row. Fit 5 to 8 steps in one tidy graphic. Editable SVG, PNG, GIF.",
    uses: ["Longer processes with 5+ steps", "Program phases", "Learning paths"],
    keywords: ["serpentine process infographic", "snake path timeline", "winding steps diagram"],
  },
  zigzag: {
    summary:
      "Zigzag timeline infographic with milestones on a sharp line and labels alternating above and below. A dynamic alternative to flat timelines. Editable SVG, PNG, GIF.",
    uses: ["Milestone timelines", "Event sequences", "Release histories"],
    keywords: ["zigzag timeline template", "zigzag infographic", "angled timeline graphic"],
  },
  arch: {
    summary:
      "Arch timeline infographic: milestones along a rainbow arch with a theme beneath it. Elegant for journeys, histories and programs. Editable SVG, PNG and GIF.",
    uses: ["Program journeys", "Anniversaries and histories", "Themed roadmaps"],
    keywords: ["arch timeline infographic", "rainbow arc timeline", "curved milestone diagram"],
  },
  wave: {
    summary:
      "Wave timeline infographic with milestones on the crests and troughs of a smooth wave. Show ups and downs over time. Editable SVG, PNG and GIF.",
    uses: ["Highs and lows over time", "Seasonal cycles", "Flowing roadmaps"],
    keywords: ["wave timeline template", "wave infographic", "curved timeline graphic"],
  },
  spiral: {
    summary:
      "Spiral path infographic with stages spiraling outward from a central core. Show expansion, iteration and growth from the inside out. Editable SVG, PNG and GIF.",
    uses: ["Iterative and agile growth", "Expansion from a core", "Learning spirals"],
    keywords: ["spiral infographic", "spiral process diagram", "outward growth template"],
  },
  horseshoe: {
    summary:
      "Horseshoe path infographic: steps running down one leg, around a U-bend and up the other. Show a round trip or before-and-after journey. Editable SVG, PNG, GIF.",
    uses: ["Round-trip processes", "Before and after journeys", "U-shaped service flows"],
    keywords: ["horseshoe diagram", "U shaped process infographic", "u turn path template"],
  },
  infinity: {
    summary:
      "Infinity loop infographic: stages on a continuous figure-eight with two colored lobes. Ideal for DevOps and build-measure-learn cycles. Editable SVG, PNG and GIF.",
    uses: ["DevOps and CI/CD loops", "Build-measure-learn cycles", "Two-sided continuous processes"],
    keywords: ["infinity loop infographic", "devops infinity diagram", "figure eight process template"],
  },
  racetrack: {
    summary:
      "Racetrack infographic with checkpoints around an oval track and a title in the center. Show laps, sprints or recurring checkpoints. Editable SVG, PNG and GIF.",
    uses: ["Sprint and lap cycles", "Checkpoint reviews", "Competitive race narratives"],
    keywords: ["racetrack infographic", "oval track diagram", "lap checkpoints template"],
  },
  "stepping-stones": {
    summary:
      "Stepping stones infographic: stones crossing diagonally from bottom-left to top-right. Show the path across a challenge, step by step. Editable SVG, PNG and GIF.",
    uses: ["Paths through a challenge", "Incremental milestones", "Crossing from today to target"],
    keywords: ["stepping stones infographic", "stepping stone diagram", "path across template"],
  },
  ladder: {
    summary:
      "Ladder infographic with labeled rungs climbing toward a goal at the top. Show levels, progression and what it takes to reach the summit. Editable SVG, PNG and GIF.",
    uses: ["Career and skill ladders", "Maturity levels", "Steps to a goal"],
    keywords: ["ladder infographic", "ladder of success diagram", "career ladder template"],
  },
  "strategy-house": {
    summary:
      "Strategy house infographic: a vision roof over 3 to 5 pillars standing on a shared foundation. The classic strategy-on-a-page graphic. Editable SVG, PNG and GIF.",
    uses: ["Strategy on a page", "Vision, pillars and foundations", "Operating model summaries"],
    keywords: ["strategy house template", "strategy house infographic", "vision pillars foundation diagram"],
  },
  umbrella: {
    summary:
      "Umbrella infographic: one canopy sheltering a group of items beneath it. Show an overarching program, brand or policy and what it covers. Editable SVG, PNG and GIF.",
    uses: ["Umbrella brands and programs", "Policies and what they cover", "Protection and coverage models"],
    keywords: ["umbrella infographic", "umbrella diagram template", "overarching coverage graphic"],
  },
  prism: {
    summary:
      "Prism infographic: one input beam entering a prism and splitting into labeled outputs. Show one source becoming many outcomes. Editable SVG, PNG and GIF.",
    uses: ["One input, many outputs", "Data to insights", "Diversified outcomes"],
    keywords: ["prism infographic", "prism diagram template", "one to many split graphic"],
  },
  nested: {
    summary:
      "Nested layers infographic: rounded frames from the outermost context to the innermost core. Show scope, environments or containment. Editable SVG, PNG and GIF.",
    uses: ["Context to core scoping", "Environment and system boundaries", "Nested responsibilities"],
    keywords: ["nested diagram template", "nested layers infographic", "concentric boxes graphic"],
  },
  treemap: {
    summary:
      "Treemap infographic: blocks of decreasing size tiling one square. Show share, weight or proportion without a spreadsheet. Editable SVG, PNG and GIF.",
    uses: ["Share of budget or revenue", "Portfolio weighting", "Proportional priorities"],
    keywords: ["treemap infographic", "treemap diagram template", "proportional blocks graphic"],
  },
  "tile-grid": {
    summary:
      "Numbered tile grid infographic: an even grid of tiles with a big index and a label each. Present 4 to 8 points as a bold, scannable grid. Editable SVG, PNG and GIF.",
    uses: ["Feature and benefit grids", "Principles and rules lists", "Service menus"],
    keywords: ["tile grid infographic", "numbered grid template", "feature grid graphic"],
  },
  cube: {
    summary:
      "Cube infographic with three visible labeled faces of one block. Show three dimensions of a single idea or product. Editable SVG, PNG and GIF.",
    uses: ["Three dimensions of one concept", "Product facets", "3D framework summaries"],
    keywords: ["cube infographic", "3d cube diagram", "three faces template"],
  },
  cylinders: {
    summary:
      "Stacked cylinders infographic: labeled tiers stacked into one column. Show data layers, storage tiers or accumulated levels. Editable SVG, PNG and GIF.",
    uses: ["Data and storage tiers", "Accumulating layers", "Stacked value tiers"],
    keywords: ["stacked cylinders infographic", "cylinder diagram template", "database tiers graphic"],
  },
  bookshelf: {
    summary:
      "Bookshelf infographic: labeled book spines standing side by side on a shelf. Present a curated set of topics, resources or chapters. Editable SVG, PNG and GIF.",
    uses: ["Curriculum and chapters", "Resource libraries", "Knowledge areas"],
    keywords: ["bookshelf infographic", "book spines diagram", "library shelf template"],
  },
  "brick-wall": {
    summary:
      "Brick wall infographic: bricks laid in staggered courses, each resting on the ones below. Show foundations built up over time. Editable SVG, PNG and GIF.",
    uses: ["Building blocks of a strategy", "Foundations and layers", "Cumulative achievements"],
    keywords: ["brick wall infographic", "building blocks diagram", "bricks template"],
  },
  podium: {
    summary:
      "Podium infographic: a winner's podium with ranked places, tallest in the middle. Celebrate top performers or rank options. Editable SVG, PNG and GIF.",
    uses: ["Rankings and awards", "Top performers", "Option scoring"],
    keywords: ["podium infographic", "winners podium template", "ranking podium graphic"],
  },
  "signal-bars": {
    summary:
      "Signal bars infographic: ascending bars like a signal-strength meter, each a stronger level. Show maturity, intensity or progression. Editable SVG, PNG and GIF.",
    uses: ["Maturity levels", "Signal strength and intensity", "Escalating tiers"],
    keywords: ["signal bars infographic", "ascending bars diagram", "level meter template"],
  },
  battery: {
    summary:
      "Battery infographic: a battery filling up through labeled cells from empty to full. Show progress, energy or capacity. Editable SVG, PNG and GIF.",
    uses: ["Progress toward completion", "Capacity and energy levels", "Charging up a plan"],
    keywords: ["battery infographic", "battery charge diagram", "progress battery template"],
  },
  hourglass: {
    summary:
      "Hourglass infographic: inputs narrowing through a neck into an equal set of outputs. Show how many things become one and expand again. Editable SVG, PNG and GIF.",
    uses: ["Converge-then-diverge processes", "Inputs, bottleneck, outputs", "Design thinking funnels"],
    keywords: ["hourglass infographic", "hourglass diagram template", "converge diverge graphic"],
  },
  bowtie: {
    summary:
      "Bowtie diagram: causes converging on a central event with consequences fanning out the other side. The standard risk analysis graphic. Editable SVG, PNG and GIF.",
    uses: ["Risk and safety analysis", "Threats, event, consequences", "Control and barrier reviews"],
    keywords: ["bowtie diagram template", "bow tie risk analysis", "bowtie infographic"],
  },
  calendar: {
    summary:
      "Calendar month infographic: a real month grid with highlighted dates and a label for each. Enter any month and your key dates. Editable SVG, PNG and GIF.",
    uses: ["Launch and campaign calendars", "Event and deadline schedules", "Monthly plans"],
    keywords: ["calendar infographic", "monthly calendar template", "key dates graphic"],
  },
  kanban: {
    summary:
      "Kanban board infographic with three columns and cards moving from to-do to done. Explain agile flow or show work in progress. Editable SVG, PNG and GIF.",
    uses: ["Agile and workflow explainers", "Work in progress snapshots", "Team process overviews"],
    keywords: ["kanban board template", "kanban infographic", "to do doing done graphic"],
  },
  bracket: {
    summary:
      "Tournament bracket infographic: four contenders, two semifinal winners, one champion. Rank options or run a playful decision. Editable SVG, PNG and GIF.",
    uses: ["Option showdowns", "Tournaments and contests", "Idea elimination rounds"],
    keywords: ["bracket infographic", "tournament bracket template", "playoff bracket graphic"],
  },
  "decision-tree": {
    summary:
      "Decision tree infographic: a question branching into two choices and four outcomes. Lay out a decision path clearly. Editable SVG, PNG and GIF.",
    uses: ["Decision guides", "If-then scenario planning", "Troubleshooting flows"],
    keywords: ["decision tree template", "decision tree infographic", "yes no decision diagram"],
  },
  flowchart: {
    summary:
      "Flowchart infographic with start, step, decision diamond, two outcomes and an end. A clean process flow for docs and slides. Editable SVG, PNG and GIF.",
    uses: ["Process documentation", "Approval and escalation flows", "Simple logic diagrams"],
    keywords: ["flowchart template", "flowchart infographic", "process flow diagram"],
  },
  circuit: {
    summary:
      "Circuit board infographic: nodes wired to a central chip by right-angled traces. A techy way to show a core system and its connections. Editable SVG, PNG and GIF.",
    uses: ["Core system and connected services", "Tech architecture overviews", "Platform integrations"],
    keywords: ["circuit board infographic", "circuit diagram template", "tech connections graphic"],
  },
  chain: {
    summary:
      "Chain links infographic: interlocking links in a row, each depending on the next. Show dependencies, supply chains and value chains. Editable SVG, PNG and GIF.",
    uses: ["Supply and value chains", "Dependencies and handoffs", "Linked process stages"],
    keywords: ["chain links infographic", "chain diagram template", "value chain graphic"],
  },
  zipper: {
    summary:
      "Zipper infographic: two sides of interlocking teeth joined down the middle. Show two groups coming together, step by step. Editable SVG, PNG and GIF.",
    uses: ["Two teams or systems integrating", "Mergers and partnerships", "Point-by-point alignment"],
    keywords: ["zipper infographic", "zipper diagram template", "two sides joining graphic"],
  },
  petals: {
    summary:
      "Petals infographic: petals around a center, each a labeled aspect of the core. A friendly way to show facets of one idea. Editable SVG, PNG and GIF.",
    uses: ["Facets of a core concept", "Value and principle wheels", "Service areas around a brand"],
    keywords: ["petal diagram", "flower infographic template", "petals around center graphic"],
  },
  pinwheel: {
    summary:
      "Pinwheel infographic: four blades spinning around a center hub. Show four forces or functions driving one center. Editable SVG, PNG and GIF.",
    uses: ["Four drivers of one outcome", "Rotating responsibilities", "Balanced quadrant models"],
    keywords: ["pinwheel infographic", "pinwheel diagram template", "four blades graphic"],
  },
  compass: {
    summary:
      "Compass infographic: a compass rose with four labeled directions and a center. Set direction, values or strategic bearings. Editable SVG, PNG and GIF.",
    uses: ["Strategic direction setting", "Four guiding values", "North-star frameworks"],
    keywords: ["compass infographic", "compass rose diagram", "strategic direction template"],
  },
  fan: {
    summary:
      "Fan segments infographic: segments spreading from a base pivot like a hand of cards. Show options, scenarios or offerings fanning out. Editable SVG, PNG and GIF.",
    uses: ["Options and scenarios", "Product portfolios", "Service offerings"],
    keywords: ["fan diagram infographic", "fan segments template", "hand of cards graphic"],
  },
  radar: {
    summary:
      "Radar chart infographic: labeled axes on a web with a shaded profile shape. Show skills, scores or maturity across dimensions. Editable SVG, PNG and GIF.",
    uses: ["Skills and competency profiles", "Maturity assessments", "Multi-criteria scoring"],
    keywords: ["radar chart template", "spider chart infographic", "skills radar graphic"],
  },
  network: {
    summary:
      "Network infographic: nodes on a ring with every node linked to every other. Show fully connected teams, systems or partners. Editable SVG, PNG and GIF.",
    uses: ["Interconnected teams or systems", "Peer networks", "Mesh architectures"],
    keywords: ["network diagram infographic", "connected nodes template", "mesh network graphic"],
  },
  rings: {
    summary:
      "Linked rings infographic: interlocking rings in a row, each overlapping its neighbors. Show connected stages or partners. Editable SVG, PNG and GIF.",
    uses: ["Overlapping stages", "Connected partners", "Linked disciplines"],
    keywords: ["linked rings infographic", "interlocking circles template", "olympic rings style diagram"],
  },
  cross: {
    summary:
      "Cross infographic: four arms meeting at a center, each a labeled theme. Show four pillars radiating from one core. Editable SVG, PNG and GIF.",
    uses: ["Four themes around a core", "Plus-shaped frameworks", "Directional priorities"],
    keywords: ["cross diagram infographic", "plus shape template", "four arms graphic"],
  },
  bunting: {
    summary:
      "Bunting infographic: pennant flags hanging from a draped string. A festive way to list wins, events or values. Editable SVG, PNG and GIF.",
    uses: ["Celebrations and wins", "Event lists", "Team values"],
    keywords: ["bunting infographic", "pennant flags template", "celebration banner graphic"],
  },
  cascade: {
    summary:
      "Cascade infographic: steps cascading diagonally, each hanging off the one before. Show waterfall sequences and knock-on stages. Editable SVG, PNG and GIF.",
    uses: ["Waterfall processes", "Sequential dependencies", "Stepped rollouts"],
    keywords: ["cascade infographic", "waterfall steps diagram", "cascading stages template"],
  },
  "block-pyramid": {
    summary:
      "Block pyramid infographic: six individual blocks stacked in rows of one, two and three. Show a hierarchy built from distinct parts. Editable SVG, PNG and GIF.",
    uses: ["Hierarchies with distinct parts", "Building toward a peak", "Tiered team structures"],
    keywords: ["block pyramid infographic", "stacked blocks diagram", "pyramid of blocks template"],
  },
  helix: {
    summary:
      "Double helix infographic: stages along two intertwined strands joined by rungs. Show two tracks that evolve together. Editable SVG, PNG and GIF.",
    uses: ["Two parallel evolving tracks", "Science and biotech stories", "Intertwined strategies"],
    keywords: ["double helix infographic", "DNA diagram template", "helix timeline graphic"],
  },
  signpost: {
    summary:
      "Signpost infographic: directional signs pointing left and right from a single post. Lay out choices, paths or destinations. Editable SVG, PNG and GIF.",
    uses: ["Choices and directions", "Destination options", "Decision crossroads"],
    keywords: ["signpost infographic", "direction signs template", "crossroads diagram"],
  },
  dialogue: {
    summary:
      "Dialogue infographic: speech bubbles alternating between two sides of a conversation. Show Q&A, objections and answers, or two viewpoints. Editable SVG, PNG and GIF.",
    uses: ["Q&A and FAQs", "Objection handling", "Two perspectives"],
    keywords: ["dialogue infographic", "speech bubbles template", "conversation graphic"],
  },
  bubbles: {
    summary:
      "Bubble rank infographic: bubbles ordered from biggest to smallest. Show ranked priorities or relative size at a glance. Editable SVG, PNG and GIF.",
    uses: ["Ranked priorities", "Relative size or importance", "Top factors"],
    keywords: ["bubble chart infographic", "ranked bubbles template", "size comparison bubbles"],
  },
  tabs: {
    summary:
      "Folder tabs infographic: stacked tabs with the first one open to a summary. Organize topics like a filing cabinet. Editable SVG, PNG and GIF.",
    uses: ["Topic and section overviews", "Documentation structure", "Categorized content"],
    keywords: ["folder tabs infographic", "tabbed sections template", "file folder graphic"],
  },
  shields: {
    summary:
      "Shields infographic: a row of shields, each standing for a protected principle. Present security layers, guarantees or values. Editable SVG, PNG and GIF.",
    uses: ["Security and protection layers", "Guarantees and commitments", "Core principles"],
    keywords: ["shields infographic", "shield icons template", "protection principles graphic"],
  },
  tickets: {
    summary:
      "Ticket stubs infographic: perforated tickets with a numbered stub and a label each. A playful list for events, steps or perks. Editable SVG, PNG and GIF.",
    uses: ["Event agendas", "Numbered perks or steps", "Admission and access tiers"],
    keywords: ["ticket infographic", "ticket stubs template", "numbered tickets graphic"],
  },
  "diamond-grid": {
    summary:
      "Diamond grid infographic: four diamonds around a center diamond. A sharp layout for a core concept and four facets. Editable SVG, PNG and GIF.",
    uses: ["Core plus four facets", "Geometric frameworks", "Balanced quadrant models"],
    keywords: ["diamond grid infographic", "diamond diagram template", "five diamonds graphic"],
  },
  "wave-layers": {
    summary:
      "Wave layers infographic: stacked waves from the surface down to the depths. Show levels, depth and what lies beneath. Editable SVG, PNG and GIF.",
    uses: ["Depth and layer models", "Surface to deep insights", "Tiered audiences"],
    keywords: ["wave layers infographic", "ocean depth diagram", "layered waves template"],
  },
  flags: {
    summary:
      "Milestone flags infographic: flags planted along a baseline, each marking a milestone. A clear, celebratory timeline. Editable SVG, PNG and GIF.",
    uses: ["Milestone timelines", "Achievements and launches", "Goal markers"],
    keywords: ["milestone flags infographic", "flag timeline template", "planted flags graphic"],
  },
  gantt: {
    summary:
      "Gantt bars infographic: overlapping workstreams as bars on a quarter grid. Show a plan's timing without a project tool. Editable SVG, PNG and GIF.",
    uses: ["Quarterly plans", "Workstream schedules", "Program overviews"],
    keywords: ["gantt chart infographic", "gantt bars template", "quarterly plan graphic"],
  },
  "harvey-balls": {
    summary:
      "Harvey balls infographic: stages shown as progressively filled circles. Show completion, coverage or maturity in quarters. Editable SVG, PNG and GIF.",
    uses: ["Completion and coverage status", "Maturity ratings", "Comparison scorecards"],
    keywords: ["harvey balls template", "harvey ball infographic", "quarter filled circles graphic"],
  },
  sunburst: {
    summary:
      "Sunburst infographic: a center, three inner segments, each with a sub-segment outside. Show a hierarchy radiating from the core. Editable SVG, PNG and GIF.",
    uses: ["Two-level hierarchies", "Themes and sub-themes", "Radial breakdowns"],
    keywords: ["sunburst diagram template", "sunburst infographic", "radial hierarchy chart"],
  },
};

const FALLBACK: FamilySeo = {
  summary:
    "Editable infographic template: type your text, apply your brand colors and fonts, and download as animated SVG, PNG or GIF in seconds.",
  uses: ["Presentations and reports", "Websites and documentation", "Social media posts"],
  keywords: ["infographic template", "editable diagram", "presentation graphic"],
};

export function familySeo(family: string): FamilySeo {
  return S[family] ?? FALLBACK;
}

export function hasFamilySeo(family: string): boolean {
  return family in S;
}
