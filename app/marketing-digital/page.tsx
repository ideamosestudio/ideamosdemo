import InternalPage, { ServicePage } from "../../components/InternalPage";

const page: ServicePage = {
  eyebrow: "HOLA, SOMOS IDEAMOS",
  title: "Estrategias digitales que potencian leads y ventas",
  intro: "Diseñamos estrategias de marketing digital enfocadas en atraer, convertir y hacer crecer tu negocio.",
  sections: [
    { eyebrow: "CRECIMIENTO SOSTENIBLE", title: "Growth para Pymes: atraé, convertí y escalá", paragraphs: ["Analizamos tu negocio, definimos objetivos y armamos un plan de acción para generar más oportunidades comerciales.", "Combinamos estrategia, creatividad, tecnología y análisis para que cada acción tenga un propósito concreto: atraer clientes, mejorar conversiones y aumentar ventas."] },
    { eyebrow: "UN EQUIPO PARA TU EMPRESA", title: "¿Qué hacemos por tu empresa?", lead: "Te posicionamos, generamos demanda y convertimos visitas en oportunidades.", paragraphs: ["Nos ocupamos de pensar y ejecutar una estrategia integral. Elegimos los canales adecuados, producimos las piezas, gestionamos campañas y medimos resultados.", "Trabajamos como una extensión de tu equipo, con objetivos claros, seguimiento permanente y decisiones basadas en datos."], dark: true },
    { eyebrow: "TIENDAS ONLINE Y SITIOS INSTITUCIONALES", title: "Diseño web pensado para comunicar y convertir", paragraphs: ["Creamos sitios institucionales y landing pages que explican con claridad lo que hacés, transmiten confianza y convierten visitas en consultas.", "También desarrollamos tiendas online profesionales, preparadas para vender, medir y escalar."], items: [
      { title: "Estrategia y arquitectura", copy: "Ordenamos el contenido y definimos el recorrido ideal para que cada persona encuentre rápido lo que necesita." },
      { title: "Diseño a medida", copy: "Creamos una identidad visual coherente con tu marca, clara y orientada a resultados." },
      { title: "Contenido que convierte", copy: "Trabajamos mensajes, llamados a la acción y argumentos para transformar interés en contacto." },
      { title: "Medición y mejora", copy: "Configuramos analítica para entender qué funciona y dónde hay oportunidades." },
    ]},
    { eyebrow: "MARKETING DIGITAL, SEO Y GOOGLE ADS", title: "Más visibilidad, más tráfico y mejores oportunidades", lead: "Llegá a las personas correctas en el momento indicado.", paragraphs: ["Combinamos posicionamiento orgánico, campañas pagas, contenidos y redes sociales para construir una presencia digital sólida y generar demanda."], dark: true, items: [
      { title: "Google Ads", copy: "Creamos y optimizamos campañas para captar búsquedas con intención de compra y generar consultas medibles." },
      { title: "Posicionamiento SEO", copy: "Mejoramos contenidos, estructura y autoridad para ganar visibilidad en Google de forma sostenida." },
      { title: "Redes sociales", copy: "Planificamos contenidos y campañas que fortalecen tu marca, generan comunidad y acompañan la venta." },
      { title: "Analítica", copy: "Medimos tráfico, consultas y conversiones para invertir mejor y escalar lo que funciona." },
    ]},
    { eyebrow: "ENVIANOS UN MENSAJE", title: "Contactanos y reservá una asesoría online sin cargo", paragraphs: ["Contanos sobre tu empresa, tus objetivos y los desafíos que querés resolver. Te proponemos un plan concreto, con prioridades claras y acciones pensadas para tu negocio."], contact: true },
    { eyebrow: "NUESTRO MÉTODO", title: "Estrategia, ejecución y optimización continua", items: [
      { title: "Diagnóstico profundo", copy: "Entendemos tu empresa, rentabilidad, embudo de ventas y oportunidades antes de proponer acciones." },
      { title: "Estrategia", copy: "Elegimos los canales más rentables y priorizamos oportunidades reales, sin venderte cosas que no necesitás." },
      { title: "Ejecución precisa", copy: "Creamos campañas, contenidos y activos digitales alineados con tu negocio." },
      { title: "Optimización", copy: "Medimos lo que importa, corregimos y escalamos lo que funciona con reportes claros." },
    ]},
    { eyebrow: "SOLUCIONES A TU MEDIDA", title: "Problemas que resolvemos con marketing digital", dark: true, items: [
      { title: "“Necesito más consultas y ventas”", copy: "Diseñamos un sistema para atraer demanda, capturar contactos y acompañar la conversión." },
      { title: "“Invierto en publicidad, pero no sé si funciona”", copy: "Ordenamos la medición y optimizamos las campañas según resultados comerciales reales." },
      { title: "“Mi marca no tiene una comunicación consistente”", copy: "Definimos mensajes, identidad y contenidos para construir una presencia clara y reconocible." },
      { title: "“No tengo tiempo para ocuparme del marketing”", copy: "Nos convertimos en tu equipo externo y gestionamos estrategia, producción, campañas y seguimiento." },
      { title: "“Quiero crecer, pero no sé por dónde empezar”", copy: "Priorizamos oportunidades y armamos un roadmap realista según tus recursos y objetivos." },
    ]},
  ],
};
export default function Page(){return <InternalPage page={page}/>;}
