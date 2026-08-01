import type { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "ideamos.com.ar";
  const protocol = host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const image = `${protocol}://${host}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/og-precios.png`;

  return {
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
}

export default function PricesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
