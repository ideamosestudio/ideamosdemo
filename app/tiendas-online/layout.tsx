import { createPageMetadata } from "../../lib/seo";
import "./shops.css";

export const metadata = createPageMetadata({
  title: "Diseño y desarrollo de tiendas online | Ideamos",
  description: "Creamos tiendas online con catálogo, pagos y envíos según tu negocio. Sin comisiones de Ideamos por venta. Consultá por tu proyecto de ecommerce.",
  path: "/tiendas-online/",
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
