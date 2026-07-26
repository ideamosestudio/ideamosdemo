import InternalPage, { ServicePage } from "../../components/InternalPage";

const page: ServicePage = {
  eyebrow: "POSICIONAMIENTO EN GOOGLE",
  title: "Escalá en Google y potenciá tus ventas hoy",
  intro: "Hacemos que tu empresa aparezca cuando tus clientes buscan lo que ofrecés.",
  sections: [
    { eyebrow: "ELEGÍ LA ESTRATEGIA ADECUADA", title: "Google Ads, SEO o ambas", lead: "Descubrí las diferencias y elegí el camino ideal para tu negocio.", paragraphs: ["Google Ads permite generar visibilidad inmediata. El posicionamiento SEO construye presencia orgánica y sostenida. Analizamos tu mercado, tus objetivos y tu presupuesto para definir la combinación más conveniente."] },
    { eyebrow: "PUBLICIDAD EN GOOGLE", title: "Aparecé primero con Google Ads", dark: true, paragraphs: ["Mostramos tus anuncios a personas que ya están buscando tus productos o servicios. Vos pagás únicamente cuando alguien hace clic y llega a tu web."], items: [
      { title: "Resultados rápidos", copy: "Empezá a recibir tráfico y consultas desde los primeros días de campaña." },
      { title: "Segmentación precisa", copy: "Llegá por ubicación, dispositivo, horario e intención de búsqueda." },
      { title: "Presupuesto controlado", copy: "Definí cuánto invertir y ajustá la estrategia según resultados." },
      { title: "Medición completa", copy: "Registramos llamadas, formularios y conversiones para saber qué genera negocio." },
      { title: "Optimización continua", copy: "Mejoramos anuncios, palabras clave y páginas de destino para aumentar el rendimiento." },
    ]},
    { eyebrow: "ENVIANOS UN MENSAJE", title: "Contactanos y reservá una asesoría online sin cargo", paragraphs: ["Analizamos cómo te buscan tus clientes, revisamos tu presencia actual y te proponemos una estrategia concreta para ganar visibilidad y generar oportunidades."], contact: true },
    { eyebrow: "POSICIONAMIENTO ORGÁNICO", title: "Construí visibilidad duradera con SEO", paragraphs: ["Trabajamos la estructura, los contenidos y la autoridad de tu sitio para mejorar posiciones en Google sin pagar por cada clic."], items: [
      { title: "Tráfico de calidad", copy: "Atraé personas interesadas en lo que ofrecés y con intención real de avanzar." },
      { title: "Resultados sostenibles", copy: "Construí una fuente de visitas que gana valor con el tiempo." },
      { title: "Mayor autoridad", copy: "Fortalecé la confianza de Google y de tus potenciales clientes." },
      { title: "Contenido estratégico", copy: "Respondé las búsquedas de tu audiencia con páginas útiles y relevantes." },
      { title: "Mejora técnica", copy: "Optimizamos velocidad, estructura y experiencia para facilitar el rastreo y la conversión." },
    ]},
    { eyebrow: "BÚSQUEDAS LOCALES", title: "Destacate en Google Maps", dark: true, paragraphs: ["Optimizamos tu perfil de Google Mi Negocio para que las personas cercanas encuentren tu empresa, conozcan tus servicios y se contacten con facilidad."], items: [
      { title: "Más presencia local", copy: "Aparecé en búsquedas cercanas y en el mapa cuando alguien necesita lo que ofrecés." },
      { title: "Información confiable", copy: "Mantené horarios, teléfono, ubicación, fotos y servicios siempre actualizados." },
      { title: "Más contactos", copy: "Facilitá llamadas, mensajes, indicaciones y visitas desde el resultado de búsqueda." },
    ]},
    { eyebrow: "SEO VS. GOOGLE ADS", title: "Dos estrategias, un mismo objetivo: crecer", paragraphs: ["Google Ads aporta velocidad, control y demanda inmediata. SEO construye autoridad, posicionamiento y tráfico sostenido. En muchos casos, la mejor estrategia es combinarlos para ocupar más espacio en Google y reducir la dependencia de un único canal."] },
  ],
};
export default function Page(){return <InternalPage page={page}/>;}
