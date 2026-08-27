import InternalPage, { ServicePage } from "../../components/InternalPage";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Contacto — Hablemos de tu proyecto | Ideamos",
  description: "Contanos qué necesita tu negocio. Coordiná una asesoría online sin cargo con Ideamos y recibí ideas concretas y próximos pasos.",
  path: "/contacto/",
});

const page: ServicePage = {
  eyebrow:"CONTACTO", title:"Hablemos de tu proyecto",
  intro:"Contanos qué necesitás. Te respondemos con ideas concretas y próximos pasos.",
  sectionTitle:"Contactanos y reservá una asesoría online sin cargo",
  sectionCopy:"Coordinamos una charla para entender tu negocio, sus desafíos y objetivos. Después te proponemos acciones concretas y una solución a medida.",
  items:[
    ["WhatsApp","+54 9 11 6875-8285"],
    ["Email","hola@ideamos.com.ar"],
    ["Instagram","@ideamosargentina"],
    ["Dónde trabajamos","Argentina, Uruguay, España, Estados Unidos y México."],
  ],
  darkTitle:"Movemos lo que importa",
  darkCopy:"Escribinos hoy y empecemos a ordenar prioridades, detectar oportunidades y definir el próximo paso.",
};
export default function Page(){return <InternalPage page={page}/>;}
