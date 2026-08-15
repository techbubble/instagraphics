import { TEMPLATES, itemCount } from "@/lib/templates";
import { DEFAULT_BRAND, renderTemplate } from "@/lib/svg-engine";
import HomeGallery from "@/components/HomeGallery";

export default function HomePage() {
  const tiles = TEMPLATES.map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category,
    description: t.description,
    itemCount: itemCount(t),
    preview: renderTemplate(t.svg, DEFAULT_BRAND, {}),
  }));
  return (
    <>
      <div className="text-center pb-3">
        <h1 className="h3 fw-bold">Build branded infographics in seconds</h1>
        <p className="text-secondary">
          Pick a layout, apply your colors and fonts, type your content, and download.
        </p>
      </div>
      <HomeGallery tiles={tiles} />
    </>
  );
}
