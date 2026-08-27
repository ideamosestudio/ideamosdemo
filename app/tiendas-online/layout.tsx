import { createPageMetadata } from "../../lib/seo";
import "./shops.css";

export const metadata = createPageMetadata({
  title: "Tiendas online profesionales sin comisiones | Ideamos",
  description: "Creamos tiendas online profesionales, administrables, con pagos y envíos integrados, sin comisiones de Ideamos por cada venta.",
  path: "/tiendas-online/",
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
