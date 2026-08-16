import type { MetadataRoute } from "next";
import { TEMPLATES } from "@/lib/templates";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.instagraphic.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...TEMPLATES.map((t) => ({
      url: `${BASE}/about/${t.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
