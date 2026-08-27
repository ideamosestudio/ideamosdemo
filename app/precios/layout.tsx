import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Precios de sitios web y tiendas online | Ideamos",
  description: "Conocé los planes y precios de Ideamos para landing pages, sitios web profesionales y tiendas online. Elegí una base clara para empezar.",
  path: "/precios/",
  image: "/og-precios.png",
});

export default function PricesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
