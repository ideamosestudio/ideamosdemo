import { createPageMetadata } from "../../../lib/seo";
import ReviewShopPage from "./ReviewShopPage";
import "../../tiendas-online/shops.css";
import s from "./review.module.css";

export const metadata = {
  ...createPageMetadata({
    title: "Diseño de tiendas online para empresas | Ideamos",
    description: "Diseño y desarrollo de tiendas online en Argentina. Catálogo, pagos, envíos e integraciones según tu negocio. Sin comisiones de Ideamos por venta.",
    path: "/tiendas-online/",
  }),
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default function ShopReview() {
  return <>
    <aside className={s.notice} aria-label="Estado de la propuesta">PROPUESTA EN REVISIÓN · TIENDAS ONLINE · V1</aside>
    <ReviewShopPage />
  </>;
}
