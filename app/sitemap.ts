import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";

export const dynamic = "force-static";

// Dates describe substantive page edits, not each deployment or build.
// Unknown dates are omitted rather than assigning every URL the same date.
const lastModified: Record<string, string> = {
  "/": "2026-10-22",
  "/diseno-web-autoadministrable/": "2026-10-22",
  "/tiendas-online/": "2026-10-22",
  "/marketing-digital/": "2026-10-22",
  "/posicionamiento-web/": "2026-10-22",
};
const pages: Array<{ path: string; priority: number; changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/diseno-web-autoadministrable/", priority: 0.95, changeFrequency: "monthly" },
  { path: "/tiendas-online/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/marketing-digital/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/posicionamiento-web/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/casos-de-exito/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/testimonios/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contacto/", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    ...(lastModified[path] ? { lastModified: lastModified[path] } : {}),
    changeFrequency,
    priority,
  }));
}
