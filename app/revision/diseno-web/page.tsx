import type { Metadata } from "next";
import SiteHeader from "../../../components/SiteHeader";
import { HomeClosingSections } from "../../../components/SharedHomeSections";
import ArrowIcon from "../../../components/ArrowIcon";
import { testimonials } from "../../../lib/testimonials";
import s from "./propuesta.module.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
export const metadata: Metadata = {
  title: "Propuesta de diseño web para empresas | Ideamos",
  description: "Diseño y desarrollo web para empresas: identidad, contenido, experiencia móvil y un camino claro hacia la consulta. Propuesta en revisión.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  alternates: { canonical: "/diseno-web-autoadministrable/" },
  openGraph: { title: "Ideamos · Diseño web / Propuesta en revisión", description: "Una nueva propuesta para revisar juntos. No reemplaza la página actual.", images: ["/portfolio/assets/cover-almat.webp"] },
};

const scope = [
  ["01", "Estrategia y estructura", "Ordenamos servicios, diferenciales y recorridos para que cada visitante encuentre lo que necesita y sepa cómo avanzar."],
  ["02", "Diseño con identidad", "Una dirección visual alineada con tu marca. Tipografía, imágenes y composición al servicio de una presentación profesional."],
  ["03", "Experiencia en celulares", "Adaptamos el contenido, los menús y los formularios para que navegar y consultar resulte claro en cada pantalla."],
  ["04", "Contenido que explica", "Organizamos la información de tu empresa y definimos qué textos, fotografías y materiales hacen falta para contar bien tu propuesta."],
  ["05", "Base técnica para SEO", "Estructura de encabezados, títulos, descripciones, enlaces y páginas accesibles a buscadores. El posicionamiento continuo se trabaja por separado."],
  ["06", "Un camino al contacto", "Formularios, WhatsApp y llamados a la acción donde tienen sentido. Definimos qué consultas querés recibir y cómo facilitar ese paso."],
];
const projects = [
  { name: "ALMAT Cerramientos", sector: "Arquitectura & cerramientos", image: "almat", copy: "Soluciones, trabajos realizados y una vía directa para pedir presupuesto.", url: "https://almatcerramientos.com.ar/" },
  { name: "Calltruck", sector: "Transporte & logística", image: "calltruck-web", copy: "Servicios, flota y almacenamiento organizados para orientar cada consulta.", url: "https://ideamosestudio.github.io/calltruck-web/" },
  { name: "Sphere Design", sector: "Diseño & arquitectura", image: "sphere-design", copy: "Un portfolio visual que pone el trabajo y la identidad del estudio en primer plano.", url: "https://studiospheredesign.com/" },
];
const faqs = [
  ["¿Qué incluye un proyecto de diseño web?", "Definimos una propuesta con las páginas, el diseño, la adaptación a celulares, los formularios y las funcionalidades acordadas. También detallamos quién aporta los textos, las imágenes y las traducciones. Así sabés qué se entrega y qué requiere un presupuesto adicional antes de empezar."],
  ["¿Voy a poder actualizar mi sitio web?", "Sí, si la administración de contenido forma parte del alcance. Evaluamos qué necesitás editar y con qué frecuencia: servicios, imágenes, artículos o productos. A partir de eso definimos un panel adecuado y cómo será la entrega. No todos los proyectos necesitan el mismo sistema."],
  ["¿Cuánto cuesta y cuánto tarda una página web?", "Depende de la cantidad de páginas, el contenido disponible, las funcionalidades y las integraciones. Después de conocer tu proyecto, te enviamos un presupuesto y un cronograma con etapas y revisiones. No fijamos un precio ni una fecha sin entender primero qué necesitás."],
  ["¿La web incluye posicionamiento en Google?", "Trabajamos una base técnica que facilite la comprensión y el rastreo del sitio. Eso no equivale a una campaña SEO ni garantiza posiciones. Para competir por búsquedas específicas hacen falta contenido relevante, autoridad, seguimiento y mejoras continuas. Si lo necesitás, definimos ese trabajo como un servicio adicional."],
  ["¿Pueden renovar mi web sin perder lo que ya tengo?", "Antes de rediseñar revisamos las URLs, los contenidos y los recursos existentes. Definimos qué conservar, qué mejorar y qué redirigir si cambian las direcciones. El objetivo es preservar el contenido útil y evitar enlaces rotos; ningún cambio de sitio permite garantizar que el tráfico no fluctúe."],
  ["¿Incluye dominio, hosting y mantenimiento?", "Lo dejamos especificado en la propuesta. Revisamos dónde está registrado el dominio, dónde se aloja la web y cómo funcionan las casillas de correo antes de publicar. El mantenimiento, las actualizaciones y el soporte posterior se acuerdan según la tecnología y las necesidades del proyecto."],
  ["¿Trabajan con empresas fuera de Buenos Aires?", "Sí. Trabajamos desde Buenos Aires con empresas de Argentina y podemos coordinar las etapas, los materiales y las revisiones de forma remota."],
];

function Cta({ children = "Quiero una asesoría sin cargo" }: { children?: React.ReactNode }) {
  return <a className={s.primary} href="#contacto">{children}<ArrowIcon direction="right" /></a>;
}

export default function DesignWebProposal() {
  const quote = testimonials[1];
  return <div className={s.page} id="inicio">
    <SiteHeader solid />
    <main>
      <div className={s.review}><span><i /> PROPUESTA EN REVISIÓN · V1</span><a href={asset("/diseno-web-autoadministrable/")}>Ver página actual <ArrowIcon /></a></div>
      <section className={s.hero} aria-labelledby="web-title">
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>DISEÑO WEB PARA EMPRESAS</p>
            <h1 id="web-title">Diseño web<br />a la altura<br /><em>de tu empresa.</em></h1>
            <p className={s.lead}>Diseño y desarrollo web profesional para presentar mejor tu empresa, generar confianza y convertir el interés en consultas.</p>
            <Cta />
            <p className={s.micro}>Desde Buenos Aires, para empresas de toda Argentina.</p>
          </div>
          <div className={s.heroVisual}>
            <div className={s.visualLabel}><span>DISEÑO + ESTRATEGIA + DESARROLLO</span><span>IDEAMOS®</span></div>
            <div className={s.browser}><div className={s.browserBar}><i /><i /><i /><span>Una marca. Su propio universo.</span></div><img src={asset("/portfolio/assets/thumbLarge-almat.webp")} width="1200" height="833" alt="Diseño del sitio de ALMAT Cerramientos, proyecto de Ideamos" fetchPriority="high" /></div>
            <div className={s.visualFoot}><span>Identidad que se reconoce.<br /><b>Experiencias que conectan.</b></span><a href="#proyectos" aria-label="Ver proyectos de diseño web"><ArrowIcon direction="down" /></a></div>
          </div>
        </div>
        <div className={s.heroBottom}><span>01 / PENSADA PARA TU NEGOCIO</span><p>Diseño con identidad <i /> Contenido claro <i /> Una experiencia simple</p></div>
      </section>

      <section className={`${s.section} ${s.light}`} id="alcance" aria-labelledby="scope-title">
        <div className={s.wrap}>
          <div className={s.sectionHead}><div><p className={s.eyebrow}>MUCHO MÁS QUE UNA BUENA PRIMERA IMPRESIÓN</p><h2 id="scope-title">Diseño que atrae.<br /><em>Estructura que ayuda.</em></h2></div><p>Una web profesional tiene que explicar qué hacés, por qué elegirte y cuál es el próximo paso. Diseñamos esas tres cosas juntas.</p></div>
          <div className={s.scopeGrid}>{scope.map(([n, title, copy]) => <article className={s.scopeCard} key={n}><span className={s.number}>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
          <p className={s.scopeNote}>El alcance, los materiales y las funcionalidades se acuerdan en la propuesta de cada proyecto. Sin promesas genéricas ni sorpresas al final.</p>
        </div>
      </section>

      <section className={`${s.section} ${s.dark}`} aria-labelledby="fit-title"><div className={`${s.wrap} ${s.split}`}>
        <div className={s.sticky}><p className={s.eyebrow}>UNA WEB A TU MEDIDA</p><h2 id="fit-title">No todas las empresas<br />necesitan <em>lo mismo.</em></h2><p className={s.intro}>Empezamos por cómo funciona tu negocio, no por una lista de efectos. Elegimos la estructura y la tecnología según lo que necesitás resolver.</p><a className={s.textLink} href="#contacto">Conversemos sobre tu proyecto <ArrowIcon /></a></div>
        <div className={s.fitList}>
          <article><span>01 / PRESENCIA CORPORATIVA</span><h3>Que entiendan tu valor.</h3><p>Para empresas de servicios, industrias y estudios que necesitan presentar su actividad, mostrar proyectos y recibir consultas relevantes.</p></article>
          <article><span>02 / CONTENIDO ADMINISTRABLE</span><h3>Que puedas hacerla crecer.</h3><p>Si publicás novedades o actualizás servicios, definimos qué partes vas a editar y qué herramientas necesita quien gestione la web.</p></article>
          <article><span>03 / REDISEÑO WEB</span><h3>Que tu web esté a la altura de hoy.</h3><p>Revisamos lo que ya funciona, reorganizamos la información y mejoramos la experiencia sin descartar contenido útil por empezar de cero.</p></article>
          <div className={s.storeNote}><p>¿Tu prioridad es vender productos online?</p><a href={asset("/tiendas-online/")}>Conocé el servicio de tiendas online <ArrowIcon /></a></div>
        </div>
      </div></section>

      <section className={`${s.section} ${s.light}`} id="proyectos" aria-labelledby="projects-title"><div className={s.wrap}>
        <div className={s.sectionHead}><div><p className={s.eyebrow}>PROYECTOS REALES · NECESIDADES DISTINTAS</p><h2 id="projects-title">Cada empresa,<br /><em>su propia expresión.</em></h2></div><a className={s.textLink} href={asset("/portfolio/")}>Ver portfolio completo <ArrowIcon /></a></div>
        <div className={s.projects}>{projects.map(p => <article className={s.project} key={p.name}><a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar el sitio de ${p.name} (abre en otra pestaña)`}><img src={asset(`/portfolio/assets/cover-${p.image}.webp`)} width="1600" height="1111" alt={`Proyecto web de ${p.name} desarrollado por Ideamos`} loading="lazy" decoding="async" /><span className={s.projectArrow}><ArrowIcon /></span></a><div><p className={s.projectSector}>{p.sector}</p><h3>{p.name}</h3><p>{p.copy}</p></div></article>)}</div>
        <div className={s.testimonial}><div><p className={s.eyebrow}>LA EXPERIENCIA, EN PRIMERA PERSONA</p><blockquote>“{quote.quote}”</blockquote><div className={s.author}><img src={asset(quote.avatar)} alt="" width="56" height="56" loading="lazy" /><p><b>{quote.name}</b><span>{quote.role}</span></p></div></div><video controls playsInline preload="none" poster={asset(quote.image)} width="640" height="480" aria-label={`Testimonio de ${quote.name}`}><source src={asset(quote.video)} type="video/mp4" /></video></div>
      </div></section>

      <section className={`${s.section} ${s.process}`} aria-labelledby="process-title"><div className={s.wrap}>
        <div className={s.sectionHead}><div><p className={s.eyebrow}>UN PROCESO CLARO, DE PRINCIPIO A FIN</p><h2 id="process-title">De tu idea<br /><em>a una web real.</em></h2></div><p>Avanzamos por etapas. Definimos qué hay que resolver, validamos el diseño y revisamos la experiencia antes de publicar.</p></div>
        <ol className={s.steps}>{[
          ["Escuchamos", "Tu negocio, tus objetivos, tu público y lo que necesitás que haga la web."],
          ["Definimos", "Páginas, funcionalidades, materiales, presupuesto y un cronograma de trabajo."],
          ["Diseñamos y desarrollamos", "Damos forma a la experiencia y revisamos la propuesta con vos."],
          ["Probamos y publicamos", "Validamos navegación, formularios y adaptación móvil. Acordamos la entrega y el soporte."],
        ].map(([title,copy],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        <div className={s.prepare}><div><h3>No necesitás tener todo resuelto.</h3><p>Para la primera charla alcanza con contarnos qué hace tu empresa, compartir tu web actual si tenés una y explicar qué querés mejorar.</p></div><Cta>Hablemos de tu web</Cta></div>
      </div></section>

      <section className={`${s.section} ${s.light}`} aria-labelledby="care-title"><div className={`${s.wrap} ${s.care}`}>
        <div><p className={s.eyebrow}>LO QUE NO SE VE TAMBIÉN IMPORTA</p><h2 id="care-title">Una buena web<br />no termina <em>en el diseño.</em></h2></div>
        <div><article><h3>Rendimiento y accesibilidad</h3><p>Priorizamos imágenes adecuadas, contenido legible y recorridos simples. Revisamos la experiencia en escritorio y celulares, sin sumar recursos pesados porque sí.</p></article><article><h3>SEO y medición, con un objetivo</h3><p>Definimos cómo medir consultas y qué tareas de posicionamiento necesita el proyecto. Una web preparada es el punto de partida, no una garantía de primeras posiciones.</p></article><article><h3>Continuidad después de publicar</h3><p>Dejamos claro qué se puede administrar, quién se ocupa del alojamiento y qué mantenimiento o soporte se contrata. Si ya tenés dominio y correo, revisamos su configuración antes de hacer cambios.</p></article></div>
      </div></section>

      <section className={`${s.section} ${s.faq}`} aria-labelledby="faq-title"><div className={`${s.wrap} ${s.split}`}>
        <div className={s.sticky}><p className={s.eyebrow}>PREGUNTAS FRECUENTES</p><h2 id="faq-title">Antes de crear<br /><em>tu próxima web.</em></h2><p className={s.intro}>Alcance, administración, costos y próximos pasos. Las respuestas que te ayudan a decidir con claridad.</p><a className={s.textLink} href="#contacto">¿Tenés otra pregunta? Hablemos <ArrowIcon /></a></div>
        <div className={s.questions}>{faqs.map(([q,a])=><details key={q} name="proposal-faq"><summary>{q}<span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14"/><path className={s.plus} d="M12 5v14"/></svg></span></summary><p>{a}</p></details>)}</div>
      </div><div className={s.wrap}><details className={s.resources}><summary>Seguí explorando <ArrowIcon direction="down" /></summary><div><a href={asset("/blog/diseno-web-profesional/diseno-web-profesional/")}>Qué incluye un diseño web profesional <ArrowIcon /></a><a href={asset("/blog/seo/renovacion-de-sitio-web-2026-seo-conversiones/")}>Cómo preparar la renovación de tu sitio <ArrowIcon /></a><a href={asset("/casos-de-exito/")}>Conocé más experiencias de clientes <ArrowIcon /></a></div></details></div></section>
    </main>
    <HomeClosingSections showAdvisory={false} darkGrid />
  </div>;
}
