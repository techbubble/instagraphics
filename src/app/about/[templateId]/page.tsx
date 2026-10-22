import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TEMPLATES,
  familyDefault,
  familyTitle,
  getTemplate,
  itemCount,
  toMeta,
} from "@/lib/templates";
import { familySeo } from "@/lib/seo";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.instagraphic.app";

// Variants of a family (3, 4, 5 items) share one landing page in search:
// each variant canonicalizes to the family's default variant.
function canonicalFor(templateId: string) {
  const t = getTemplate(templateId);
  if (!t) return null;
  const variants = TEMPLATES.filter((v) => v.family === t.family);
  return familyDefault(variants);
}

function variantSuffix(t: { title: string }) {
  const m = t.title.match(/\((.*)\)$/);
  return m ? ` (${m[1]})` : "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string }>;
}): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) return {};
  const meta = toMeta(template);
  const seo = familySeo(template.family);
  const canonical = canonicalFor(template.id) ?? template;
  const title = `${familyTitle(meta)} Infographic Template${variantSuffix(template)}`;
  const image = `/api/preview/${template.id}?w=480&plain=1&v=${meta.rev}`;
  return {
    title,
    description: seo.summary,
    keywords: seo.keywords,
    alternates: { canonical: `${BASE}/about/${canonical.id}` },
    openGraph: {
      title,
      description: seo.summary,
      type: "website",
      url: `${BASE}/about/${template.id}`,
      images: [{ url: image, width: 480, height: 480, alt: `${familyTitle(meta)} infographic example` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.summary,
      images: [image],
    },
  };
}

export default async function TemplateLandingPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) notFound();
  const meta = toMeta(template);
  const seo = familySeo(template.family);
  const name = familyTitle(meta);
  const variants = TEMPLATES.filter((t) => t.family === template.family).sort(
    (a, b) => a.items - b.items
  );
  const related = TEMPLATES.filter(
    (t) => t.category === template.category && t.family !== template.family
  );
  // One link per related family (its default variant).
  const relatedFamilies = [...new Set(related.map((t) => t.family))]
    .map((f) => familyDefault(related.filter((t) => t.family === f)))
    .slice(0, 12);
  const image = `/api/preview/${template.id}?w=480&plain=1&v=${meta.rev}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${BASE}/about/${template.id}`,
        name: `${name} Infographic Template`,
        description: seo.summary,
        isPartOf: { "@type": "WebSite", name: "Instagraphic", url: BASE },
        primaryImageOfPage: { "@type": "ImageObject", contentUrl: `${BASE}${image}` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Instagraphic", item: BASE },
            { "@type": "ListItem", position: 2, name: template.category, item: `${BASE}/?cats=${encodeURIComponent(template.category)}` },
            { "@type": "ListItem", position: 3, name: name, item: `${BASE}/about/${template.id}` },
          ],
        },
      },
      {
        "@type": "ImageObject",
        contentUrl: `${BASE}${image}`,
        name: `${name} infographic`,
        description: template.description,
        creditText: "Instagraphic",
        acquireLicensePage: `${BASE}/publish/${template.id}`,
      },
      {
        "@type": "HowTo",
        name: `How to make a ${name.toLowerCase()} infographic`,
        step: [
          { "@type": "HowToStep", name: "Type your content", text: `Enter the text for each of the ${itemCount(meta)} items.` },
          { "@type": "HowToStep", name: "Apply your brand", text: "Pick your colors and fonts; the preview updates live." },
          { "@type": "HowToStep", name: "Download", text: "Export as animated SVG, PNG or animated GIF." },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="small text-secondary mb-3">
        <Link href="/" className="text-secondary">Instagraphic</Link>
        {" / "}
        <Link href={`/?cats=${encodeURIComponent(template.category)}`} className="text-secondary">
          {template.category}
        </Link>
        {" / "}
        <span>{name}</span>
      </nav>
      <div className="row justify-content-center g-5">
        <div className="col-md-6">
          <div className="border rounded p-3 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG endpoint */}
            <img
              src={image}
              alt={`${name} infographic template example with ${itemCount(meta)} items`}
              style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain", display: "block" }}
              draggable={false}
            />
          </div>
        </div>
        <div className="col-md-5">
          <h1 className="h2">{name} Infographic Template</h1>
          <p className="lead fs-6 text-secondary">{template.description}</p>
          <ul className="list-unstyled text-secondary small mb-4">
            <li>
              <strong className="text-dark">Category:</strong> {template.category}
            </li>
            <li>
              <strong className="text-dark">Items:</strong>{" "}
              {variants.length > 1
                ? variants.map((v, i) => (
                    <span key={v.id}>
                      {i > 0 && ", "}
                      {v.id === template.id ? (
                        <strong className="text-dark">{v.items}</strong>
                      ) : (
                        <Link href={`/about/${v.id}`}>{v.items}</Link>
                      )}
                    </span>
                  ))
                : itemCount(meta)}
            </li>
            <li>
              <strong className="text-dark">Formats:</strong> animated SVG, PNG and animated GIF,
              cropped to content on a transparent background
            </li>
          </ul>
          <h2 className="h5">About this layout</h2>
          <p>{template.about}</p>
          <h2 className="h5">Best for</h2>
          <ul>
            {seo.uses.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <h2 className="h5">How it works</h2>
          <p className="text-secondary small">
            Type your text for each item, pick your brand colors and fonts with a live
            preview, and download a production-ready graphic. Every download plays a subtle
            reveal animation: the SVG animates in any browser and the GIF animates anywhere.
            Your colors, fonts, and text follow you across every layout.
          </p>
          <Link href={`/publish/${template.id}`} className="btn btn-primary btn-lg px-4">
            Customize this graphic
          </Link>
          <div className="mt-3 d-flex flex-wrap gap-1">
            {seo.keywords.map((k) => (
              <span key={k} className="badge rounded-pill text-bg-light border text-secondary fw-normal">
                {k}
              </span>
            ))}
          </div>
          {relatedFamilies.length > 0 && (
            <div className="mt-4">
              <h2 className="h6">More {template.category.toLowerCase()} infographics</h2>
              {relatedFamilies.map((t) => (
                <Link key={t.id} href={`/about/${t.id}`} className="d-block small">
                  {familyTitle(toMeta(t))}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
