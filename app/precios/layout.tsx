import type { Metadata } from "next";

const image = "https://ideamosestudio.github.io/ideamosdemo/og-precios.png";

export const metadata: Metadata = {
  title: "Precios — Sitios web y tiendas online | Ideamos",
  description: "Conocé los cuatro planes de sitios web y tiendas online de Ideamos.",
  openGraph: {
    title: "Planes Ideamos",
    description: "Una web profesional. Un plan claro.",
    type: "website",
    images: [{ url: image, width: 1536, height: 1024, alt: "Planes Ideamos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planes Ideamos",
    description: "Una web profesional. Un plan claro.",
    images: [image],
  },
};

export default function PricesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
