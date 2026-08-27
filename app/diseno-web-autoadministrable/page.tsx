import InternalPage, { ServicePage } from "../../components/InternalPage";
import { createPageMetadata } from "../../lib/seo";

export const metadata = createPageMetadata({
  title: "Diseño web profesional que convierte | Ideamos",
  description: "Diseñamos sitios web profesionales, administrables y orientados a resultados para atraer clientes, generar confianza y aumentar ventas.",
  path: "/diseno-web-autoadministrable/",
});

const page: ServicePage = {
  matchHomeHero: true,
  hideSectionIndexes: true,
  sharedSectionBackground: true,
  homeTestimonials: true,
  eyebrow: "MÁS ESTRATEGIA, MÁS RESULTADOS",
  title: "Diseño web de alto impacto\nenfocado en resultados",
  intro: "Diseñamos sitios que impactan y convierten, ayudándote a atraer más clientes y aumentar tus ventas. Contactanos y charlemos de tu proyecto.",
  sections: [
    { eyebrow: "DISEÑO WEB PROFESIONAL", title: "Creamos sitios webs profesionales que atraen clientes y ventas", lead: "Posicioná tu marca con un desarrollo web efectivo.", paragraphs: ["Creamos sitios web pensados para transmitir autoridad, confianza y generar contactos reales. Desde el diseño a medida hasta el contenido, todo está enfocado en convertir visitas en potenciales clientes. Contactanos y coordinamos una asesoría online sin cargo para conocer tu negocio y sus desafíos, identificar oportunidades y proponerte ideas concretas para que puedas crecer con menos esfuerzo y mejores resultados."], visual: "xtreme", actions: true, afterVideo: "/media/tablet-animated-final.webm" },
    { eyebrow: "DISEÑO WEB A TU MEDIDA", title: "¿Qué problemas resuelve\nun sitio web para tu empresa?", lead: "Conocé cómo un sitio web profesional ayuda a resolver los desafíos de tu negocio. Más visibilidad, más confianza y más oportunidades de crecer.", visual: "wilde", actions: true, hideItemNumbers: true, items: [
      { title: "“Pierdo oportunidades por no tener una web seria”", copy: "Tu empresa necesita una buena presencia online, pero no querés algo improvisado. Diseñamos sitios que transmiten confianza, explican claro lo que hacés y te ayudan a captar más clientes desde el primer día." },
      { title: "“Quiero ser primero en Google pero no sé por dónde empezar”", copy: "SEO, campañas, blog, Google Ads, posicionamiento… Suena complejo. Nosotros lo simplificamos y armamos un plan realista para que empieces a tener visibilidad y resultados." },
      { title: "“Necesitamos una web compleja, con funcionalidades específicas”", copy: "Contamos con un equipo completo: programadores, diseñadores, maquetadores y estrategas. Abordamos proyectos grandes, complejos y personalizados para empresas que necesitan soluciones en el siguiente nivel." },
      { title: "“No sé por cómo arrancar, pero sé que necesito hacer algo”", copy: "Muchos clientes llegan con un mix de dudas, urgencias y ganas de mejorar. Tengamos una charla sin compromiso y te ayudamos a ordenar prioridades y entender qué conviene hacer paso a paso." },
    ]},
    { eyebrow: "DISEÑO WEB A MEDIDA", title: "Con nuestras páginas web vas a tener:", variant: "benefits", actions: true, hideItemNumbers: true, items: [
      { title: "Tu marca proyectando confianza", copy: "Un sitio bien presentado transmite seriedad y profesionalismo, y complementa toda tu comunicación digital." },
      { title: "Nuevo canal de ventas", copy: "Con una web activa, tus clientes tienen un lugar siempre abierto para comprarte, consultarte o conocer mejor tu empresa." },
      { title: "Más visibilidad", copy: "Cuando alguien busque en Google lo que ofrecés, vas a tener más posibilidades de aparecer y ser elegido." },
      { title: "Consultas las 24 horas", copy: "Mientras vos descansás, tu sitio sigue trabajando: recibe mensajes, pedidos y nuevas oportunidades." },
    ]},
  ],
};
export default function Page(){ return <InternalPage page={page}/>; }
