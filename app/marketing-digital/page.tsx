import type { Metadata } from "next";
import MarketingDigitalPage from "../../components/MarketingDigitalPage";
import "./marketing.css";

export const metadata: Metadata = {
  title: "Marketing Digital — Estrategias que potencian ventas | Ideamos",
  description: "Sitios web, tiendas online y marketing digital para que tu empresa venda más y más fácil.",
};

export default function Page() {
  return <MarketingDigitalPage />;
}
