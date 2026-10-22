import { createPageMetadata } from "../../lib/seo";
import "./shops.css";

export const metadata = createPageMetadata({
  title: "Diseño y desarrollo de tiendas online | Ideamos",
  description: "Tiendas online para empresas con catálogo, pagos y envíos según tu proyecto. Sin comisiones de Ideamos por venta. Consultá el desarrollo de tu ecommerce.",
  path: "/tiendas-online/",
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
