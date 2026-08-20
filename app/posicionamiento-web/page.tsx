import type { Metadata } from "next";
import PosicionamientoWebPage from "../../components/PosicionamientoWebPage";
import "./posicionamiento.css";

export const metadata: Metadata = {
  title: "Posicionamiento en Google — SEO y Google Ads | Ideamos",
  description: "Ponemos a tu empresa en los primeros puestos de Google y hacemos crecer tus ventas con SEO y Google Ads.",
};

export default function Page() {
  return <PosicionamientoWebPage />;
}
