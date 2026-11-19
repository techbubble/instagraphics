import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { TEMPLATES, getTemplate, toMeta } from "@/lib/templates";
import { currentUser } from "@/lib/auth";
import { sql } from "@/lib/db";
import { BrandKit, ColorSlot, DEFAULT_BRAND, FONT_CHOICES, FontSlot } from "@/lib/svg-engine";
import Builder from "@/components/Builder";
import { inputsFromSvg } from "@/lib/server-render";

const FONT_SLOTS: FontSlot[] = ["primary", "secondary"];
const COLOR_SLOTS: ColorSlot[] = ["primary", "secondary", "tertiary", "quaternary", "accent"];

function mergeBrand(saved: unknown): BrandKit {
  const brand: BrandKit = {
    colors: { ...DEFAULT_BRAND.colors },
    fonts: { ...DEFAULT_BRAND.fonts },
  };
  if (saved && typeof saved === "object") {
    const s = saved as Partial<BrandKit>;
    for (const slot of COLOR_SLOTS) {
      const c = s.colors?.[slot];
      if (typeof c === "string" && /^#[0-9a-fA-F]{6}$/.test(c)) {
        brand.colors[slot] = c;
      }
    }
    for (const slot of FONT_SLOTS) {
      const f = s.fonts?.[slot];
      if (typeof f === "string" && FONT_CHOICES.includes(f)) {
        brand.fonts[slot] = f;
      }
    }
  }
  return brand;
}

export default async function BuildPage({
  params,
  searchParams,
}: {
  params: Promise<{ templateId: string }>;
  searchParams: Promise<{ cats?: string; copy?: string }>;
}) {
  const { templateId } = await params;
  const { cats, copy } = await searchParams;
  const template = getTemplate(templateId);
  if (!template) notFound();
  const ua = (await headers()).get("user-agent") ?? "";
  if (!/bot|crawl|spider|slurp|headless/i.test(ua)) {
    try {
      await sql()`
        INSERT INTO template_views (template_id, views) VALUES (${template.id}, 1)
        ON CONFLICT (template_id) DO UPDATE SET views = template_views.views + 1
      `;
    } catch {
      // stats are best-effort
    }
  }
  const user = await currentUser();
  const rows = user
    ? ((await sql()`
        SELECT brand, field_values FROM preferences WHERE user_id = ${user.id}
      `) as { brand: unknown; field_values: Record<string, string> }[])
    : [];
  let brand = mergeBrand(rows[0]?.brand);
  let savedValues = rows[0]?.field_values ?? {};

  // ?copy=<graphicId>: start a new graphic from the inputs of one of the
  // user's saved graphics. Older graphics predate stored inputs, so those
  // are read back from the SVG.
  let copyOf: string | undefined;
  const copyId = Number(copy);
  if (user && Number.isInteger(copyId) && copyId > 0) {
    const g = (await sql()`
      SELECT title, svg, brand, field_values FROM graphics
      WHERE id = ${copyId} AND user_id = ${user.id} AND template_id = ${template.id}
    `) as { title: string; svg: string; brand: unknown; field_values: Record<string, string> | null }[];
    if (g[0]) {
      const recovered = g[0].brand && g[0].field_values ? null : inputsFromSvg(g[0].svg);
      brand = mergeBrand(g[0].brand ?? recovered?.brand);
      savedValues = g[0].field_values ?? recovered?.values ?? {};
      copyOf = g[0].title;
    }
  }

  const selected = (cats || "").split(",").filter(Boolean);
  let rail = selected.length
    ? TEMPLATES.filter((t) => selected.includes(t.category))
    : TEMPLATES;
  if (!rail.some((t) => t.id === template.id)) rail = [template, ...rail];

  return (
    <Builder
      templates={rail.map(toMeta)}
      currentId={template.id}
      initialBrand={brand}
      savedValues={savedValues}
      authed={!!user}
      copyOf={copyOf}
    />
  );
}
