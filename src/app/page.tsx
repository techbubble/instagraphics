import {
  FAMILY_DESCRIPTIONS,
  TEMPLATES,
  familyDefault,
  familyTitle,
  toMeta,
} from "@/lib/templates";
import HomeGallery from "@/components/HomeGallery";
import { sql } from "@/lib/db";

// Tile counters must be live, not frozen at build time.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Popularity: paid downloads (unlocks) per family drive the ordering —
  // saves are free, so only purchases count.
  let unlocksByTemplate: Record<string, number> = {};
  let publishesByTemplate: Record<string, number> = {};
  let viewsByTemplate: Record<string, number> = {};
  try {
    const [unlocks, publishes, views] = await Promise.all([
      sql()`
        SELECT template_id, COUNT(*)::int AS c FROM graphics
        WHERE paid_at IS NOT NULL GROUP BY template_id
      `,
      sql()`
        SELECT template_id, COUNT(*)::int AS c FROM graphics GROUP BY template_id
      `,
      sql()`SELECT template_id, views::int AS c FROM template_views`,
    ]) as { template_id: string; c: number }[][];
    unlocksByTemplate = Object.fromEntries(unlocks.map((r) => [r.template_id, r.c]));
    publishesByTemplate = Object.fromEntries(publishes.map((r) => [r.template_id, r.c]));
    viewsByTemplate = Object.fromEntries(views.map((r) => [r.template_id, r.c]));
  } catch {
    // no DB (e.g. build-time) — fall back to alphabetical
  }
  const byFamily = new Map<string, ReturnType<typeof toMeta>[]>();
  for (const t of TEMPLATES.map(toMeta)) {
    const list = byFamily.get(t.family) ?? [];
    list.push(t);
    byFamily.set(t.family, list);
  }
  const tiles = [...byFamily.values()].map((variants) => {
    const def = familyDefault(variants);
    const sum = (m: Record<string, number>) =>
      variants.reduce((n, v) => n + (m[v.id] ?? 0), 0);
    return {
      downloads: sum(unlocksByTemplate),
      publishes: sum(publishesByTemplate),
      views: sum(viewsByTemplate),
      family: def.family,
      title: familyTitle(def),
      category: def.category,
      description:
        variants.length > 1
          ? FAMILY_DESCRIPTIONS[def.family] ?? def.description
          : def.description,
      keywords: def.about,
      defaultId: def.id,
      rev: def.rev,
      itemCount: def.items,
      variants: [...variants]
        .sort((a, b) => a.items - b.items)
        .map((v) => ({ id: v.id, items: v.items })),
    };
  });
  return (
    <>
      <div className="text-center pb-3">
        <h1 className="h3 fw-bold">Turn your text into a professional graphic in seconds.</h1>
        <p className="text-secondary">
          Pick a layout, apply your colors and fonts, type your content, and download.
        </p>
      </div>
      <HomeGallery tiles={tiles} />
    </>
  );
}
