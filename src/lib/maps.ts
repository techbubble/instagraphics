// Map templates: world and continent maps with highlighted countries, and
// single-country outlines. Geometry is Natural Earth (public domain) via
// world-atlas; country names, aliases and regions come from world-countries.
// Everything is projected at render time with d3-geo, so any region or
// country can be drawn from the same data.

import { feature } from "topojson-client";
import { presimplify, simplify, quantile } from "topojson-simplify";
import {
  geoAzimuthalEqualArea,
  geoCentroid,
  geoEqualEarth,
  geoPath,
  type GeoProjection,
} from "d3-geo";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry, MultiPolygon, Polygon } from "geojson";
import worldCountries from "world-countries";
import topo from "world-atlas/countries-50m.json";

type Props = { name: string };
type CountryFeature = Feature<Geometry, Props> & { id?: string | number };

export type Country = {
  id: string; // ccn3, or the atlas name for territories without one
  name: string;
  region: string; // Africa | Americas | Asia | Europe | Oceania | Antarctic
  subregion: string;
  parts: string[]; // geometry keys (a country can span several atlas units)
  feature: CountryFeature; // full-detail geometry, all parts merged
};

// ---- data ----------------------------------------------------------------

type Tier = "detail" | "medium" | "coarse";
let cache: {
  countries: Country[];
  byKey: Map<string, Country>;
  world: Country[];
  tiers: Record<Tier, Map<string, CountryFeature>>;
} | null = null;

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Extra names people actually type.
const ALIASES: Record<string, string[]> = {
  "840": ["usa", "us", "america", "united states of america", "u s a", "u s"],
  "826": ["uk", "britain", "great britain", "england", "scotland", "wales"],
  "643": ["russian federation"],
  "410": ["south korea", "korea"],
  "408": ["north korea"],
  "384": ["ivory coast"],
  "203": ["czechia", "czech republic"],
  "528": ["holland"],
  "784": ["uae", "emirates"],
  "158": ["taiwan"],
  "180": ["drc", "congo kinshasa", "dr congo"],
  "178": ["congo brazzaville"],
  "748": ["swaziland"],
  "104": ["burma"],
  "616": ["poland"],
  "792": ["turkiye", "turkey"],
};

const NAME_REGION: Record<string, [string, string]> = {
  Kosovo: ["Europe", "Southeast Europe"],
  Somaliland: ["Africa", "Eastern Africa"],
  "N. Cyprus": ["Asia", "Western Asia"],
};

function polygonsOf(g: Geometry): Polygon["coordinates"][] {
  if (g.type === "Polygon") return [g.coordinates];
  if (g.type === "MultiPolygon") return g.coordinates;
  return [];
}

function mergeFeatures(a: CountryFeature, b: CountryFeature): CountryFeature {
  return {
    ...a,
    geometry: { type: "MultiPolygon", coordinates: [...polygonsOf(a.geometry), ...polygonsOf(b.geometry)] },
  };
}

function load() {
  if (cache) return cache;
  const topology = topo as unknown as Topology<{ countries: GeometryCollection<Props> }>;
  const idOf = (f: CountryFeature) => (f.id === undefined ? f.properties.name : String(f.id));
  // Some territories share their country's code (Ashmore and Cartier
  // Islands are "036" like Australia), so geometry is keyed by id + name.
  const keyOf = (f: CountryFeature) => `${idOf(f)}|${f.properties.name}`;
  const features = (t: Topology) =>
    (feature(t, t.objects.countries as GeometryCollection<Props>) as FeatureCollection<Geometry, Props>)
      .features as CountryFeature[];
  // Single countries use full 50m detail; continents and the world are
  // simplified since that detail is far beyond what 1000px shows.
  const pre = presimplify(topology);
  const tiers: Record<Tier, Map<string, CountryFeature>> = {
    detail: new Map(features(topology).map((f) => [keyOf(f), f])),
    medium: new Map(features(simplify(pre, quantile(pre, 0.25))).map((f) => [keyOf(f), f])),
    coarse: new Map(features(simplify(pre, quantile(pre, 0.08))).map((f) => [keyOf(f), f])),
  };
  const meta = new Map(worldCountries.map((c) => [c.ccn3, c]));
  const countries: Country[] = [];
  const byId = new Map<string, Country>();
  const byKey = new Map<string, Country>();
  for (const f of tiers.detail.values()) {
    const id = idOf(f);
    const existing = byId.get(id);
    if (existing) {
      existing.parts.push(keyOf(f));
      existing.feature = mergeFeatures(existing.feature, f);
      continue;
    }
    const m = meta.get(id);
    const fallback = NAME_REGION[f.properties.name];
    const c: Country = {
      id,
      name: m?.name.common ?? f.properties.name,
      region: m?.region ?? fallback?.[0] ?? "",
      subregion: m?.subregion ?? fallback?.[1] ?? "",
      parts: [keyOf(f)],
      feature: f,
    };
    countries.push(c);
    byId.set(id, c);
    const keys = new Set<string>([c.name, f.properties.name]);
    if (m) {
      keys.add(m.name.official);
      keys.add(m.cca2);
      keys.add(m.cca3);
      for (const a of m.altSpellings) keys.add(a);
      for (const t of Object.values(m.translations)) keys.add(t.common);
    }
    for (const a of ALIASES[id] ?? []) keys.add(a);
    for (const k of keys) {
      const fk = fold(k);
      if (fk && (!byKey.has(fk) || byKey.get(fk) === c)) byKey.set(fk, c);
    }
  }
  const world = countries.filter((c) => c.region !== "Antarctic" && c.name !== "Antarctica");
  cache = { countries, byKey, world, tiers };
  return cache;
}

export function findCountry(input: string): Country | null {
  const k = fold(input);
  if (!k) return null;
  const { byKey, countries } = load();
  const hit = byKey.get(k);
  if (hit) return hit;
  // Prefix match on common names as a courtesy ("Dominican" -> Dominican Republic).
  const pre = countries.filter((c) => fold(c.name).startsWith(k));
  return pre.length === 1 ? pre[0] : null;
}

export function allCountryNames(): string[] {
  return load()
    .world.map((c) => c.name)
    .sort();
}

// ---- regions ---------------------------------------------------------------

export type RegionId = "world" | "africa" | "asia" | "europe" | "north-america" | "south-america" | "oceania";

type Region = {
  title: string;
  members: (c: Country) => boolean; // drawn
  frame?: [number, number, number, number]; // lon/lat box the view is fitted to
  fit?: (c: Country) => boolean; // features to frame when no box is given
};

const REGIONS: Record<RegionId, Region> = {
  world: { title: "World", members: () => true },
  africa: { title: "Africa", members: (c) => c.region === "Africa" },
  asia: {
    title: "Asia",
    members: (c) => c.region === "Asia" || c.id === "643",
    frame: [26, -11, 150, 56],
  },
  europe: {
    title: "Europe",
    members: (c) => c.region === "Europe" || ["792", "196", "051", "268", "031"].includes(c.id),
    frame: [-24, 34, 42, 71],
  },
  "north-america": {
    title: "North America",
    members: (c) => c.region === "Americas" && c.subregion !== "South America",
    frame: [-168, 7, -52, 74],
  },
  "south-america": { title: "South America", members: (c) => c.subregion === "South America" },
  oceania: {
    title: "Oceania",
    members: (c) => c.region === "Oceania",
    fit: (c) => c.subregion === "Australia and New Zealand" || c.subregion === "Melanesia",
  },
};

export const REGION_IDS = Object.keys(REGIONS) as RegionId[];
export const regionTitle = (r: RegionId) => REGIONS[r].title;

// ---- drawing helpers ---------------------------------------------------------

const SLOTS = ["primary", "secondary", "tertiary", "quaternary", "accent"];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ITEM_KEYS = ["item1", "item2", "item3", "item4", "item5"];

function parsePair(v: string | undefined): { a: string; b: string } | null {
  if (!v || !v.trim()) return null;
  const i = v.indexOf(",");
  if (i < 0) return { a: v.trim(), b: "" };
  return { a: v.slice(0, i).trim(), b: v.slice(i + 1).trim() };
}

function fitProjection(
  proj: GeoProjection,
  fc: FeatureCollection,
  box: [number, number, number, number]
): GeoProjection {
  const [x0, y0, x1, y1] = box;
  return proj.fitExtent(
    [
      [x0, y0],
      [x1, y1],
    ],
    fc
  );
}

function collection(features: CountryFeature[]): FeatureCollection<Geometry, Props> {
  return { type: "FeatureCollection", features };
}

// Chip row(s) for highlighted countries: colored swatch + "Country  value".
function legend(entries: { label: string; value: string; slot: string | null }[], top: number): string {
  if (!entries.length) return "";
  const perRow = entries.length <= 3 ? entries.length : Math.ceil(entries.length / 2);
  const rows = Math.ceil(entries.length / perRow);
  const cw = Math.min(300, Math.floor((900 - (perRow - 1) * 16) / perRow));
  const ch = 54;
  let out = "";
  entries.forEach((e, i) => {
    const r = Math.floor(i / perRow);
    const inRow = r === rows - 1 ? entries.length - r * perRow : perRow;
    const rowW = inRow * cw + (inRow - 1) * 16;
    const x = 500 - rowW / 2 + (i % perRow) * (cw + 16);
    const y = top + r * (ch + 14);
    const fill = e.slot ? `data-ig-fill="${e.slot}"` : 'fill="#adb5bd"';
    const text = e.value ? `${esc(e.label)} \u00b7 ${esc(e.value)}` : esc(e.label);
    const size = text.length > 26 ? 18 : 22;
    out +=
      `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="12" fill="#f1f3f5"/>` +
      `<rect x="${x + 10}" y="${y + 12}" width="30" height="30" rx="8" ${fill}/>` +
      `<text x="${x + 52}" y="${y + ch / 2 + size * 0.36}" font-size="${size}" font-weight="bold" fill="#212529" data-ig-font="primary">${text}</text>`;
  });
  return out;
}

function title(key: string, text: string | undefined, y: number, size = 40): string {
  const t = text?.trim();
  if (!t) return "";
  return `<text x="500" y="${y}" text-anchor="middle" font-size="${size}" font-weight="bold" fill="#212529" data-ig-font="primary" data-ig-text="${key}">${esc(t)}</text>`;
}

// ---- region map ----------------------------------------------------------------

export const MAP_DEFAULTS: Record<RegionId, Record<string, string>> = {
  world: { other1: "Offices worldwide", item1: "United States, HQ", item2: "Germany, 2019", item3: "India, 2021", item4: "Brazil, 2023", item5: "Japan, 2025" },
  africa: { other1: "Launch markets", item1: "Nigeria, 2024", item2: "Kenya, 2024", item3: "South Africa, 2025", item4: "Egypt, 2026" },
  asia: { other1: "Regional revenue", item1: "Japan, 38%", item2: "India, 24%", item3: "Singapore, 17%", item4: "South Korea, 12%", item5: "Vietnam, 9%" },
  europe: { other1: "Market share 2026", item1: "Germany, 42%", item2: "France, 31%", item3: "Spain, 18%", item4: "Poland, 9%" },
  "north-america": { other1: "Distribution centers", item1: "United States, 12", item2: "Canada, 3", item3: "Mexico, 2" },
  "south-america": { other1: "Growth markets", item1: "Brazil, +32%", item2: "Argentina, +21%", item3: "Colombia, +18%", item4: "Chile, +11%" },
  oceania: { other1: "Partner coverage", item1: "Australia, 14 partners", item2: "New Zealand, 5 partners", item3: "Fiji, 1 partner" },
};

// Corner and edge-midpoint sample of a lon/lat box, for fitExtent.
function frameGeometry([w, s, e, n]: [number, number, number, number]): FeatureCollection {
  const mx = (w + e) / 2;
  const my = (s + n) / 2;
  const pts = [[w, s], [mx, s], [e, s], [e, my], [e, n], [mx, n], [w, n], [w, my]];
  return { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: { type: "MultiPoint", coordinates: pts } }] };
}

export function buildRegionMapSvg(region: RegionId, values: Record<string, string>): string {
  const { world, tiers } = load();
  const def = REGIONS[region];
  const members = world.filter(def.members);
  const geom = tiers[region === "world" ? "coarse" : "medium"];

  const hasTitle = !!values.other1?.trim();
  const entries: { label: string; value: string; slot: string | null; country: Country | null }[] = [];
  for (const k of ITEM_KEYS) {
    const p = parsePair(values[k]);
    if (!p) continue;
    const c = findCountry(p.a);
    entries.push({ label: c?.name ?? p.a, value: p.b, slot: c ? SLOTS[entries.length % SLOTS.length] : null, country: c });
  }
  const highlighted = new Map<string, string>();
  for (const e of entries) if (e.country && e.slot) highlighted.set(e.country.id, e.slot);

  const rows = entries.length === 0 ? 0 : entries.length <= 3 ? 1 : 2;
  const top = hasTitle ? 110 : 50;
  const bottom = rows === 0 ? 950 : rows === 1 ? 850 : 790;
  const box: [number, number, number, number] = [50, top, 950, bottom];

  const partsOf = (c: Country) => c.parts.map((k) => geom.get(k)).filter((f): f is CountryFeature => !!f);
  let proj: GeoProjection;
  if (region === "world") {
    proj = fitProjection(geoEqualEarth(), collection(members.flatMap(partsOf)), box);
  } else {
    const fitFc = def.frame
      ? frameGeometry(def.frame)
      : collection(world.filter(def.fit ?? def.members).flatMap(partsOf));
    const [lon, lat] = def.frame
      ? [(def.frame[0] + def.frame[2]) / 2, (def.frame[1] + def.frame[3]) / 2]
      : geoCentroid(fitFc);
    proj = fitProjection(geoAzimuthalEqualArea().rotate([-lon, -lat]), fitFc, box);
  }
  const path = geoPath(proj).digits(1);

  let base = "";
  let marks = "";
  for (const c of members) {
    const d = partsOf(c)
      .map((f) => path(f))
      .filter(Boolean)
      .join(" ");
    if (!d) continue;
    const slot = highlighted.get(c.id);
    if (slot) {
      marks += `<path d="${d}" data-ig-fill="${slot}" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>`;
    } else {
      base += `<path d="${d}" fill="#dee2e6" stroke="#ffffff" stroke-width="1" stroke-linejoin="round"/>`;
    }
  }
  const clipId = `map-${region}`;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">` +
    `<defs><clipPath id="${clipId}"><rect x="${box[0] - 10}" y="${box[1] - 10}" width="${box[2] - box[0] + 20}" height="${box[3] - box[1] + 20}"/></clipPath></defs>` +
    title("other1", values.other1, 72) +
    `<g clip-path="url(#${clipId})">${base}</g>` +
    `<g clip-path="url(#${clipId})">${marks}</g>` +
    legend(entries, bottom + 40) +
    `</svg>`;
  return svg;
}

// ---- country outline -----------------------------------------------------------

export const COUNTRY_DEFAULTS: Record<string, string> = {
  other1: "Germany",
  other2: "Population",
  other3: "83.5 million",
  item1: "Capital, Berlin",
  item2: "GDP, $4.5 trillion",
  item3: "Area, 357,600 km2",
};

// Overseas territories bundled into a country's geometry that would shrink
// the mainland to a sliver: keep only polygons whose centroid passes.
const MAINLAND: Record<string, (lon: number, lat: number) => boolean> = {
  "250": (lon) => lon > -20 && lon < 20, // France: drop Guiana, Caribbean, Indian Ocean
  "528": (lon) => lon > -20, // Netherlands: drop Caribbean islands
  "840": (lon, lat) => lat > 15, // United States: keep mainland + Alaska, drop far Pacific
};

function mainland(c: Country): CountryFeature {
  const rule = MAINLAND[c.id];
  const g = c.feature.geometry;
  if (!rule || g.type !== "MultiPolygon") return c.feature;
  const polys = (g as MultiPolygon).coordinates.filter((p) => {
    const [lon, lat] = geoCentroid({ type: "Polygon", coordinates: p } as Polygon);
    return rule(lon, lat);
  });
  if (!polys.length) return c.feature;
  return { ...c.feature, geometry: { type: "MultiPolygon", coordinates: polys } };
}

export function buildCountryMapSvg(values: Record<string, string>): string {
  const query = values.other1?.trim() || COUNTRY_DEFAULTS.other1;
  const c = findCountry(query);
  const label = c?.name ?? query;
  const field = values.other2?.trim() ?? "";
  const value = values.other3?.trim() ?? "";

  const stats: { label: string; value: string; slot: string | null }[] = [];
  for (const k of ["item1", "item2", "item3", "item4"]) {
    const p = parsePair(values[k]);
    if (p) stats.push({ label: p.a, value: p.b, slot: SLOTS[(stats.length + 1) % SLOTS.length] });
  }

  const hasStat = !!(field || value);
  const mapBottom = stats.length ? (hasStat ? 700 : 790) : hasStat ? 780 : 860;
  const box: [number, number, number, number] = [120, 130, 880, mapBottom];

  let shape = "";
  if (c) {
    const f = mainland(c);
    const fc = collection([f]);
    const [lon, lat] = geoCentroid(fc);
    const proj = fitProjection(geoAzimuthalEqualArea().rotate([-lon, -lat]), fc, box);
    const d = geoPath(proj).digits(1)(f);
    shape = `<path d="${d}" data-ig-fill="primary" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>`;
  } else {
    shape = `<text x="500" y="${(box[1] + box[3]) / 2}" text-anchor="middle" font-size="28" fill="#adb5bd" data-ig-font="secondary">Country not found: ${esc(query)}</text>`;
  }

  let stat = "";
  if (hasStat) {
    const y = mapBottom + 70;
    stat =
      (field
        ? `<text x="500" y="${y}" text-anchor="middle" font-size="24" fill="#6c757d" data-ig-font="secondary" data-ig-text="other2">${esc(field)}</text>`
        : "") +
      (value
        ? `<text x="500" y="${y + 54}" text-anchor="middle" font-size="52" font-weight="bold" data-ig-fill="primary" data-ig-font="primary" data-ig-text="other3">${esc(value)}</text>`
        : "");
  }
  const legendTop = hasStat ? mapBottom + 150 : mapBottom + 40;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" font-family="Arial">` +
    `<text x="500" y="90" text-anchor="middle" font-size="56" font-weight="bold" fill="#212529" data-ig-font="primary">${esc(label)}</text>` +
    shape +
    stat +
    legend(stats, legendTop) +
    `</svg>`
  );
}

// ---- templates -----------------------------------------------------------------

export type MapTemplateDef = {
  id: string;
  family: string;
  title: string;
  category: string;
  items: number;
  description: string;
  about: string;
  usage: Partial<Record<string, string>>;
  labels: Partial<Record<string, string>>;
  fieldMax?: Partial<Record<string, number>>;
  fieldOrder?: string[];
  fieldDefaults?: Partial<Record<string, string>>;
  svg: string;
};

const placeholder = (tag: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><!-- generative map ${tag} v1 --></svg>`;

const REGION_ABOUT: Record<RegionId, string> = {
  world:
    "A clean world map with up to five countries colored in and a legend reading each country's value. Use it for office locations, launch markets, regional revenue or anywhere a global footprint tells the story.",
  africa:
    "The African continent with up to five countries highlighted and labeled. Use it for market entries, coverage, programs or any pan-African footprint.",
  asia:
    "Asia with up to five countries colored in and a value legend. Suits regional revenue splits, expansion plans and partner coverage across the continent.",
  europe:
    "Europe with up to five countries highlighted and a legend of values. Built for market share, rollouts, offices and compliance footprints across the EU and beyond.",
  "north-america":
    "North and Central America plus the Caribbean, with up to five countries colored in. Use it for distribution networks, coverage and cross-border operations.",
  "south-america":
    "South America with up to five countries highlighted and labeled. Use it for growth markets, launch sequencing and regional presence.",
  oceania:
    "Australia, New Zealand and the Pacific islands with up to five countries colored in. Use it for regional coverage, partners and expansion across Oceania.",
};

export const MAP_TEMPLATES: MapTemplateDef[] = [
  ...REGION_IDS.map((r) => ({
    id: `${r}-map-1`,
    family: `${r}-map`,
    title: `${regionTitle(r)} Map`,
    category: "Map",
    items: 5,
    description: `${regionTitle(r)} map with up to five countries colored in, each with a labeled value.`,
    about: REGION_ABOUT[r],
    usage: {
      other1: "title",
      item1: "country, value",
      item2: "country, value",
      item3: "country, value",
      item4: "country, value",
      item5: "country, value",
    },
    labels: {
      other1: "Title",
      item1: "Country 1",
      item2: "Country 2",
      item3: "Country 3",
      item4: "Country 4",
      item5: "Country 5",
    },
    fieldMax: { item1: 40, item2: 40, item3: 40, item4: 40, item5: 40 },
    fieldOrder: ["other1", "item1", "item2", "item3", "item4", "item5"],
    fieldDefaults: MAP_DEFAULTS[r],
    svg: placeholder(r),
  })),
  {
    id: "country-map-1",
    family: "country-map",
    title: "Country Outline",
    category: "Map",
    items: 4,
    description: "Any country's outline with a headline figure and up to four labeled facts.",
    about:
      "Type a country and its outline is drawn from Natural Earth data: every country in the world is available. Add a field name and value for the headline figure, then up to four more facts as chips. Use it for market profiles, country reports and expansion one-pagers.",
    usage: {
      other1: "country name",
      other2: "field name",
      other3: "value",
      item1: "label, value",
      item2: "label, value",
      item3: "label, value",
      item4: "label, value",
    },
    labels: {
      other1: "Country",
      other2: "Field",
      other3: "Value",
      item1: "Fact 1",
      item2: "Fact 2",
      item3: "Fact 3",
      item4: "Fact 4",
    },
    fieldMax: { item1: 40, item2: 40, item3: 40, item4: 40 },
    fieldOrder: ["other1", "other2", "other3", "item1", "item2", "item3", "item4"],
    fieldDefaults: COUNTRY_DEFAULTS,
    svg: placeholder("country"),
  },
];

export const MAP_FAMILIES = new Set(MAP_TEMPLATES.map((t) => t.family));

export function buildMapSvg(family: string, values: Record<string, string>): string {
  if (family === "country-map") return buildCountryMapSvg(values);
  const region = family.replace(/-map$/, "") as RegionId;
  return buildRegionMapSvg(region, values);
}
