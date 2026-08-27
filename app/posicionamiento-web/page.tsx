import PosicionamientoWebPage from "../../components/PosicionamientoWebPage";
import { createPageMetadata } from "../../lib/seo";
import "./posicionamiento.css";

export const metadata = createPageMetadata({
  title: "Posicionamiento en Google: SEO y Ads | Ideamos",
  description: "Mejorá la visibilidad de tu empresa en Google con SEO, Google Ads y posicionamiento local orientado a consultas, leads y ventas.",
  path: "/posicionamiento-web/",
});

export default function Page() {
  return <PosicionamientoWebPage />;
}
