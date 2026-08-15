import {
  FAMILY_DESCRIPTIONS,
  TEMPLATES,
  familyDefault,
  familyTitle,
  toMeta,
} from "@/lib/templates";
import HomeGallery from "@/components/HomeGallery";
import { sql } from "@/lib/db";

export default async function HomePage() {
  // Popularity: total saves per family drives the default ordering.
  let savesByTemplate: Record<string, number> = {};
  try {
    const rows = (await sql()`
      SELECT template_id, COUNT(*)::int AS c FROM graphics GROUP BY template_id
    `) as { template_id: string; c: number }[];
    savesByTemplate = Object.fromEntries(rows.map((r) => [r.template_id, r.c]));
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
    const saves = variants.reduce(
      (sum, v) => sum + (savesByTemplate[v.id] ?? 0),
      0
    );
    return {
      saves,
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
