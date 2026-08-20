import type { Metadata } from "next";
import InternalPage, { ServicePage } from "../../components/InternalPage";

export const metadata: Metadata = {
  title: "Contacto — Hablemos de tu proyecto | Ideamos",
  description: "Contanos qué necesitás. Te respondemos con ideas concretas y próximos pasos.",
};

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
