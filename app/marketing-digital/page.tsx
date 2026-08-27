import MarketingDigitalPage from "../../components/MarketingDigitalPage";
import { createPageMetadata } from "../../lib/seo";
import "./marketing.css";

export const metadata = createPageMetadata({
  title: "Marketing digital para generar ventas | Ideamos",
  description: "Estrategias de marketing digital, contenidos y campañas para atraer leads calificados, optimizar resultados y hacer crecer tus ventas.",
  path: "/marketing-digital/",
});

export default function Page() {
  return <MarketingDigitalPage />;
}
