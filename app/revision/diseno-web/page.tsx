import type { Metadata } from "next";
import InternalPage, { type ServicePage } from "./ReviewInternalPage";
import s from "./propuesta.module.css";
import ProposalAdditions from "./ProposalAdditions";
import ProjectEvidence from "./ProjectEvidence";
import ReviewServiceGuide from "./ReviewServiceGuide";

export const metadata: Metadata = {
  title: "Diseño web profesional para empresas | Ideamos",
  description: "Diseño web a medida para empresas de Argentina. Sitios adaptados a celulares, contenido claro y opciones autoadministrables. Pedí una asesoría sin cargo.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  alternates: { canonical: "/diseno-web-autoadministrable/" },
};

// Misma composición, componentes y recursos de la página vigente.
// Solo se revisa el contenido de esta copia; no modificar componentes compartidos.
const page: ServicePage = {
  guide: "web",
  matchHomeHero: true,
  hideSectionIndexes: true,
  sharedSectionBackground: true,
  eyebrow: "MÁS ESTRATEGIA, MÁS RESULTADOS",
  title: "Diseño web para empresas\nenfocado en resultados",
  intro: "Diseño y desarrollo web profesional para empresas de Argentina. Creamos sitios a medida que presentan tu negocio, generan confianza y facilitan las consultas. Charlemos de tu proyecto.",
  sections: [
    {
      eyebrow: "DISEÑO WEB PROFESIONAL",
      title: "Creamos webs que generan\nconfianza y oportunidades",
      lead: "Diseño con identidad. Un camino al contacto.",
      paragraphs: [
        "Tu web tiene que mostrar qué hacés, por qué elegirte y cómo dar el próximo paso. Diseñamos sitios a medida para presentar tus servicios, destacar tus proyectos y facilitar las consultas desde computadoras y celulares.",
        "Antes de empezar, definimos las páginas, los contenidos, los formularios y las integraciones que necesita tu empresa. Si vas a actualizar información, acordamos qué partes serán autoadministrables. Coordinemos una asesoría sin cargo para ordenar prioridades y preparar una propuesta a tu medida.",
      ],
      visual: "xtreme", actions: true, afterVideo: "/media/tablet-animated-final.webm",
    },
    {
      eyebrow: "DISEÑO WEB A TU MEDIDA",
      title: "¿Qué problemas resuelve\nun sitio web para tu empresa?",
      lead: "Una presencia profesional para mostrar tu valor, resolver dudas y abrir nuevas oportunidades.\nEmpezamos por lo que necesita tu negocio.",
      visual: "wilde", actions: true, hideItemNumbers: true,
      items: [
        { title: "“Mi web ya no representa a mi empresa”", copy: "Renovamos el diseño y organizamos tus servicios, proyectos y diferenciales. Si ya tenés una web, revisamos qué contenido conservar y qué URLs redirigir para evitar perder información útil o dejar enlaces rotos." },
        { title: "“Quiero que encuentren mi empresa en Google”", copy: "Definimos una base de SEO con títulos, encabezados, contenido y enlaces claros. Para competir por búsquedas específicas, evaluamos un trabajo continuo de posicionamiento: publicar una web no garantiza el primer puesto." },
        { title: "“Necesitamos funcionalidades específicas”", copy: "Evaluamos formularios, áreas administrables e integraciones según tu operación. Acordamos qué incluye el desarrollo, cómo se va a gestionar y qué necesita mantenimiento antes de elegir la tecnología." },
        { title: "“No sé cómo arrancar con mi nueva web”", copy: "Contanos qué hace tu empresa, a quién querés llegar y qué necesitás mejorar. Definimos estructura y materiales, revisamos el diseño con vos y probamos navegación, versión móvil y contacto antes de publicar." },
      ],
    },
    {
      eyebrow: "DISEÑO WEB A MEDIDA",
      title: "Con nuestras páginas web vas a tener:",
      variant: "benefits", actions: true, hideItemNumbers: true,
      items: [
        { title: "Tu marca proyectando confianza", copy: "Una identidad visual consistente y contenido que explica tu propuesta. Tus servicios, proyectos y testimonios, organizados para que conozcan mejor tu empresa." },
        { title: "Un nuevo canal comercial", copy: "Un lugar propio para mostrar lo que ofrecés y recibir consultas por formulario o WhatsApp, con llamados a la acción claros y fáciles de encontrar." },
        { title: "Una base para crecer", copy: "Estructura y contenido preparados para trabajar el posicionamiento. Definimos qué podés administrar y cómo ampliar el sitio según las necesidades de tu negocio." },
        { title: "Contacto desde cualquier pantalla", copy: "Una experiencia adaptada a celulares y computadoras, para que tus visitantes puedan recorrer los servicios y enviarte una consulta en cualquier momento." },
      ],
    },
  ],
};

export default function DesignWebProposal() {
  return <>
    <aside className={s.review} aria-label="Estado de la propuesta">PROPUESTA EN REVISIÓN · V11</aside>
    <InternalPage page={page} additions={<ProposalAdditions />} evidence={<ProjectEvidence />} guideContent={<ReviewServiceGuide service="web" />} />
  </>;
}
