import { TEMPLATES, defaultValues } from "@/lib/templates";
import { DEFAULT_BRAND, renderTemplate } from "@/lib/svg-engine";
import HomeGallery from "@/components/HomeGallery";

export default function HomePage() {
  const tiles = TEMPLATES.map((t) => ({
    id: t.id,
    title: t.title,
    category: t.category,
    description: t.description,
    preview: renderTemplate(t.svg, DEFAULT_BRAND, defaultValues(t)),
  }));
  return (
    <>
      <div className="text-center py-4">
        <h1 className="fw-bold">Build branded infographics in seconds</h1>
        <p className="text-secondary">
          Pick a layout, apply your colors, fonts, and logo, type your content, and download.
        </p>
      </div>
      <HomeGallery tiles={tiles} />
    </>
  );
}
