import InternalPage, { ServicePage } from "../../components/InternalPage";
const page: ServicePage = {
  eyebrow:"POR QUÉ ELEGIRNOS", title:"Casos de éxito: marcas que ya dieron el salto",
  intro:"Diseños que no solo se ven bien: funcionan, posicionan y generan contactos calificados.",
  sectionTitle:"Resultados reales para empresas reales",
  sectionCopy:"Cada proyecto combina estrategia, diseño y tecnología con un objetivo comercial concreto.",
  items:[
    ["CYL Neumáticos","Presencia digital profesional para una empresa que necesitaba ordenar su oferta y generar más consultas."],
    ["Empire","Una experiencia premium orientada a transmitir confianza y respaldar una propuesta internacional."],
    ["Garware Argentina","Diseño de alto impacto para una marca automotriz que necesitaba diferenciarse."],
    ["ONER VFX","Un sitio cinematográfico para un estudio reconocido internacionalmente por su trabajo audiovisual."],
  ],
  darkTitle:"Tu empresa puede ser el próximo caso",
  darkCopy:"Contanos qué querés transformar y diseñamos una solución digital alineada a tus objetivos.",
};
export default function Page(){return <InternalPage page={page}/>;}
