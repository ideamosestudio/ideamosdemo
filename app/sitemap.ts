import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";

export const dynamic = "force-static";

const updated = "2026-08-31";
const pages: Array<{ path: string; priority: number; changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> }> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/diseno-web-autoadministrable/", priority: 0.95, changeFrequency: "monthly" },
  { path: "/tiendas-online/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/marketing-digital/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/posicionamiento-web/", priority: 0.9, changeFrequency: "monthly" },
  { path: "/casos-de-exito/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/testimonios/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/precios/", priority: 0.75, changeFrequency: "monthly" },
  { path: "/contacto/", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency,
    priority,
  }));
}
