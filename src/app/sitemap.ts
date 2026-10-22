import type { MetadataRoute } from "next";
import { TEMPLATES, familyDefault } from "@/lib/templates";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.instagraphic.app";

// One URL per template family: variants (3, 4, 5 items) canonicalize to the
// family default, so only canonical pages are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const families = [...new Set(TEMPLATES.map((t) => t.family))];
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...families.map((f) => {
      const t = familyDefault(TEMPLATES.filter((v) => v.family === f));
      return {
        url: `${BASE}/about/${t.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }),
  ];
}
