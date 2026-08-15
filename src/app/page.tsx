import { TEMPLATES, familyDefault, familyTitle, toMeta } from "@/lib/templates";
import HomeGallery from "@/components/HomeGallery";

export default function HomePage() {
  const byFamily = new Map<string, ReturnType<typeof toMeta>[]>();
  for (const t of TEMPLATES.map(toMeta)) {
    const list = byFamily.get(t.family) ?? [];
    list.push(t);
    byFamily.set(t.family, list);
  }
  const tiles = [...byFamily.values()].map((variants) => {
    const def = familyDefault(variants);
    return {
      family: def.family,
      title: familyTitle(def),
      category: def.category,
      description: def.description,
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
