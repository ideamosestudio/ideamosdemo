import type { Metadata } from "next";

export const SITE_NAME = "Ideamos";
export const SITE_URL = "https://ideamos.com.ar";
export const DEFAULT_SOCIAL_IMAGE = "/og-precios.png";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: string;
};

export function createPageMetadata({ title, description, path, image = DEFAULT_SOCIAL_IMAGE }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "es_AR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: `${SITE_NAME} — Diseño web y marketing digital` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
