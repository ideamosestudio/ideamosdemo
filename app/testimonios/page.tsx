import TestimonialsPage from "../../components/TestimonialsPage";
import { createPageMetadata } from "../../lib/seo";
import "./testimonios.css";

export const metadata = createPageMetadata({
  title: "Testimonios de clientes y casos reales | Ideamos",
  description: "Conocé testimonios reales de clientes que trabajaron con Ideamos en diseño web, tiendas online y estrategias digitales orientadas a resultados.",
  path: "/testimonios/",
});

export default function Page() {
  return <TestimonialsPage />;
}
