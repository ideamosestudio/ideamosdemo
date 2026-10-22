import MarketingDigitalPage from "../../components/MarketingDigitalPage";
import PageStructuredData from "../../components/PageStructuredData";
import { createPageMetadata } from "../../lib/seo";
import "./marketing.css";

export const metadata = createPageMetadata({
  title: "Marketing digital para empresas en Argentina | Ideamos",
  description: "Estrategias de marketing digital para empresas: contenido, campañas y medición de consultas. Conocé cómo trabajamos y pedí una asesoría con Ideamos.",
  path: "/marketing-digital/",
});

export default function Page() {
  return <>
    <PageStructuredData
      name="Marketing digital para generar ventas"
      description="Estrategias de marketing digital, contenidos y campañas para atraer leads calificados, optimizar resultados y hacer crecer tus ventas."
      path="/marketing-digital/"
      serviceType="Marketing digital"
    />
    <MarketingDigitalPage />
  </>;
}
