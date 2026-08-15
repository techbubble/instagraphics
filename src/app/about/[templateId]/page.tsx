import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEMPLATES, getTemplate, itemCount, toMeta } from "@/lib/templates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string }>;
}): Promise<Metadata> {
  const { templateId } = await params;
  const template = getTemplate(templateId);
  if (!template) return {};
  const meta = toMeta(template);
  return {
    title: template.title,
    description: template.description,
    openGraph: {
      title: template.title,
      description: template.description,
      images: [{ url: `/api/preview/${template.id}?w=480&plain=1&v=${meta.rev}` }],
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
  const related = TEMPLATES.filter(
    (t) => t.category === template.category && t.id !== template.id
  );

  return (
    <div className="row justify-content-center g-5">
      <div className="col-md-6">
        <div className="border rounded p-3 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- dynamic PNG endpoint */}
          <img
            src={`/api/preview/${template.id}?w=480&plain=1&v=${meta.rev}`}
            alt={template.title}
            style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "contain", display: "block" }}
            draggable={false}
          />
        </div>
      </div>
      <div className="col-md-5">
        <h1 className="h2">{template.title}</h1>
        <p className="text-secondary">{template.description}</p>
        <ul className="list-unstyled text-secondary small mb-4">
          <li>
            <strong className="text-dark">Category:</strong> {template.category}
          </li>
          <li>
            <strong className="text-dark">Items:</strong> {itemCount(meta)}
          </li>
          <li>
            <strong className="text-dark">Formats:</strong> SVG and PNG, cropped
            to content on a transparent background
          </li>
        </ul>
        <p>{template.about}</p>
        <p className="text-secondary small">
          Apply your brand colors and fonts, type your content with a live
          preview, and download a production-ready graphic. Your colors, fonts,
          and text follow you across every layout.
        </p>
        <Link href={`/publish/${template.id}`} className="btn btn-primary btn-lg px-4">
          Customize this graphic
        </Link>
        {related.length > 0 && (
          <div className="mt-4">
            <div className="small fw-bold mb-1">More in {template.category}</div>
            {related.map((t) => (
              <Link key={t.id} href={`/about/${t.id}`} className="d-block small">
                {t.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
