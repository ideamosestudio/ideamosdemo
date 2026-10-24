import { createPageMetadata } from "../../lib/seo";
import PageStructuredData from "../../components/PageStructuredData";

export const metadata = { ...createPageMetadata({
  title: "Precios de sitios web y tiendas online | Ideamos",
  description: "Conocé los planes y precios de Ideamos para landing pages, sitios web profesionales y tiendas online. Elegí una base clara para empezar.",
  path: "/precios/",
  image: "/og-ideamos.jpg",
}), robots: { index: false, follow: true, googleBot: { index: false, follow: true } } };

export default function PricesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <PageStructuredData
      name="Precios de sitios web y tiendas online"
      description="Conocé los planes y precios de Ideamos para landing pages, sitios web profesionales y tiendas online. Elegí una base clara para empezar."
      path="/precios/"
      pageType="CollectionPage"
    />
    {children}
  </>;
}
