import { TEMPLATES, itemCount, toMeta } from "@/lib/templates";
import HomeGallery from "@/components/HomeGallery";

export default function HomePage() {
  const tiles = TEMPLATES.map(toMeta).map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category,
    description: t.description,
    itemCount: itemCount(t),
    rev: t.rev,
  }));
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
