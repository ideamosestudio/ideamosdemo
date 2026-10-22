import PosicionamientoWebPage from "../../components/PosicionamientoWebPage";
import PageStructuredData from "../../components/PageStructuredData";
import { createPageMetadata } from "../../lib/seo";
import "./posicionamiento.css";

export const metadata = createPageMetadata({
  title: "Posicionamiento web SEO y Google Ads | Ideamos",
  description: "Posicionamiento web para empresas con SEO, Google Ads y Google Maps. Conocé las diferencias, cómo medimos resultados y consultá por tu estrategia.",
  path: "/posicionamiento-web/",
});

export default function Page() {
  return <>
    <PageStructuredData
      name="Posicionamiento en Google"
      description="Mejorá la visibilidad de tu empresa en Google con SEO, Google Ads y posicionamiento local orientado a consultas, leads y ventas."
      path="/posicionamiento-web/"
      serviceType="SEO, Google Ads y posicionamiento local"
    />
    <PosicionamientoWebPage />
  </>;
}
