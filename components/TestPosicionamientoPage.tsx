"use client";

import { useEffect, useState } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections, HeroLogoTrack } from "./SharedHomeSections";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";
import GlowCard from "./GlowCard";
import { WHATSAPP_URL as whatsapp } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const stats: [string, string][] = [
  ["72%", "de los clics se los llevan los primeros 3 resultados de Google"],
  ["48 hs", "para tener tu estrategia de Ads + SEO lista y a medida"],
  ["+10 años", "posicionando negocios reales en Buenos Aires y el resto del país"],
];

const adsPoints = [
  "Aparecés arriba desde el primer día, sin esperar meses.",
  "Pagás solo cuando alguien hace clic, con presupuesto bajo tu control.",
  "Segmentamos por ubicación, intereses e intención de búsqueda.",
];

const seoPoints = [
  "Construís un activo que sigue trayendo visitas aunque dejes de invertir.",
  "Ganás autoridad y confianza: el usuario elige lo que Google recomienda primero.",
  "El costo por visita baja con el tiempo, al revés que en la pauta.",
];

const processSteps: [string, string, string][] = [
  ["01", "Diagnóstico", "Auditamos tu presencia actual en Google, tu competencia directa y las oportunidades que estás dejando sobre la mesa."],
  ["02", "Estrategia", "Definimos el mix de Ads y SEO que tiene sentido para tu negocio, tu rubro y tu presupuesto real."],
  ["03", "Ejecución", "Implementamos campañas, optimizamos tu ficha de Google y estructuramos contenido pensado para convertir."],
  ["04", "Medición", "Reportamos tráfico, posiciones y conversiones en criollo. Ajustamos la estrategia con datos, no con corazonadas."],
];

type IconName = "target" | "search" | "layers" | "gauge" | "pin" | "chart" | "shield" | "chat" | "spark" | "check-badge";

const includes: [IconName, string, string][] = [
  ["search", "Auditoría técnica completa", "Revisamos velocidad, estructura, indexación y todo lo que hoy te está frenando en Google."],
  ["target", "Investigación de palabras clave", "Detectamos qué busca realmente tu cliente y con qué términos tiene sentido competir."],
  ["layers", "Optimización on-page", "Título, contenido, estructura interna: todo escrito para Google y para las personas."],
  ["gauge", "Gestión de campañas Ads", "Armamos, monitoreamos y ajustamos tus campañas para bajar el costo por resultado."],
  ["pin", "Ficha de Google Business", "Configurada y optimizada para que aparezcas primero en las búsquedas cerca tuyo."],
  ["chart", "Reportes mensuales en criollo", "Tráfico, posiciones y conversiones, explicados sin jerga y con próximos pasos claros."],
];

const differentiators: [IconName, string, string][] = [
  ["shield", "Sin letra chica", "Presupuestos claros desde el día uno, sin contratos atados ni sorpresas en la factura."],
  ["chart", "Reportes reales", "Vas a entender exactamente en qué se usa cada peso y qué resultado trajo."],
  ["chat", "Un equipo, no un ticket", "Hablás directo con quienes ejecutan tu estrategia, no con una mesa de ayuda."],
  ["spark", "Objetivos medibles", "Definimos metas concretas antes de arrancar, y las revisamos juntos cada mes."],
];

const faqs: [string, string][] = [
  ["¿Cuánto tarda en verse resultados?", "Con Google Ads, en días: tu anuncio puede estar arriba esta misma semana. Con SEO, los primeros movimientos se ven entre 6 y 12 semanas, y los resultados fuertes se consolidan en 4 a 6 meses de trabajo sostenido."],
  ["¿Necesito hacer Ads y SEO al mismo tiempo?", "No es obligatorio, pero se potencian: Ads te da resultados inmediatos mientras el SEO madura, y el SEO baja tu dependencia de la pauta a largo plazo. Te recomendamos el mix según tu presupuesto y urgencia."],
  ["¿Qué pasa si mi rubro es muy de nicho?", "Mejor todavía: a menor competencia, más rápido se consiguen buenas posiciones. Trabajamos con comercios locales, servicios profesionales, e-commerce y empresas B2B por igual."],
  ["¿Cómo sé que la estrategia está funcionando?", "Con reportes mensuales que muestran tráfico, posiciones de las palabras clave que importan y conversiones reales (consultas, llamadas, ventas). Nada de métricas de vanidad."],
  ["¿Puedo cancelar cuando quiera?", "Sí. No usamos contratos de permanencia forzada. Si el servicio no te está sirviendo, lo hablamos y lo resolvemos."],
];

function Icon({ name }: { name: IconName }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "target":
      return <svg {...common}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>;
    case "search":
      return <svg {...common}><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M19.5 19.5L15.2 15.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case "layers":
      return <svg {...common}><path d="M12 3L21 8L12 13L3 8L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M3 12.5L12 17.5L21 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16.5L12 21.5L21 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "gauge":
      return <svg {...common}><path d="M4 15A8 8 0 1 1 20 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 15L16 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="15" r="1.3" fill="currentColor"/></svg>;
    case "pin":
      return <svg {...common}><path d="M12 21S5 14.4 5 9.8A7 7 0 0 1 19 9.8C19 14.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="12" cy="9.6" r="2.4" stroke="currentColor" strokeWidth="1.5"/></svg>;
    case "chart":
      return <svg {...common}><path d="M4 20V10M12 20V4M20 20V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 20H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3L19.5 6V11C19.5 16 16.5 19.5 12 21C7.5 19.5 4.5 16 4.5 11V6L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 12L11.2 14.2L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case "chat":
      return <svg {...common}><path d="M4 5H20V16H10L5.5 19.5V16H4V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 9.5H16M8 12.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    case "spark":
      return <svg {...common}><path d="M12 3L13.6 9.4L20 11L13.6 12.6L12 19L10.4 12.6L4 11L10.4 9.4L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>;
    case "check-badge":
    default:
      return <svg {...common}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8.3 12.2L10.8 14.7L15.7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  }
}

function Check() {
  return <svg className="tpw-check" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 8L6 11.5L12.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return <div className={`tpw-faq-item${open ? " is-open" : ""}`}>
    <button type="button" className="tpw-faq-q" onClick={onToggle} aria-expanded={open}>
      <span>{q}</span>
      <i className="tpw-faq-toggle" aria-hidden="true" />
    </button>
    <div className="tpw-faq-a"><p>{a}</p></div>
  </div>;
}

export default function TestPosicionamientoPage() {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="internal-page tpw-page">
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> POSICIONAMIENTO EN GOOGLE</p>
        <h1><span>Si no aparecés,</span><span>no existís.</span></h1>
        <p className="hero-copy"><span><b>Te ponemos en el lugar exacto donde tu cliente ya te está buscando.</b><br/>Combinamos Google Ads y SEO en una sola estrategia de visibilidad, pensada para negocios que quieren resultados, no promesas.</span></p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href={whatsapp}><span>Quiero una auditoría sin cargo</span></a>
          <a className="cta-glow secondary" href="#estrategia"><span>Ver cómo trabajamos</span></a>
        </div>
      </div>
    </section>

    <LightGridFrame className="tpw-light">
      <section className="tpw-stats" data-reveal>
        {stats.map(([number, copy]) => <GlowCard className="tpw-stat" key={number} backgroundColor="var(--paper)" borderRadius={20}><b>{number}</b><p>{copy}</p></GlowCard>)}
      </section>

      <section className="tpw-vs" id="estrategia">
        <header className="tpw-vs-intro" data-reveal>
          <p>POSICIONAMIENTO EN GOOGLE</p>
          <h2>Rápido o duradero.<br/><em>¿Por qué elegir?</em></h2>
          <span>Google Ads y SEO no compiten entre sí: se complementan. Uno te llena la agenda esta semana, el otro construye el negocio de los próximos años.</span>
        </header>
        <div className="tpw-vs-grid">
          <GlowCard className="tpw-vs-card is-ads" reveal backgroundColor="#0a0a0c" borderRadius={26}>
            <p className="tpw-vs-tag">GOOGLE ADS</p>
            <h3>Resultados en días</h3>
            <ul>{adsPoints.map((point) => <li key={point}><Check />{point}</li>)}</ul>
            <a className="tpw-vs-cta" href={whatsapp}>Quiero aparecer ya <span>→</span></a>
          </GlowCard>
          <GlowCard className="tpw-vs-card is-seo" reveal backgroundColor="#f0f1f4" borderRadius={26}>
            <p className="tpw-vs-tag">SEO</p>
            <h3>Resultados que se acumulan</h3>
            <ul>{seoPoints.map((point) => <li key={point}><Check />{point}</li>)}</ul>
            <a className="tpw-vs-cta" href={whatsapp}>Quiero crecer orgánico <span>→</span></a>
          </GlowCard>
        </div>
      </section>

      <section className="tpw-includes" data-reveal>
        <header className="tpw-includes-intro">
          <p>QUÉ INCLUYE TU ESTRATEGIA</p>
          <h2>Todo lo que hace falta, nada de relleno</h2>
        </header>
        <div className="tpw-includes-grid">
          {includes.map(([icon, title, copy]) => <GlowCard key={title} className="tpw-includes-card" backgroundColor="#fff" borderRadius={20}>
            <span className="tpw-icon-badge"><Icon name={icon} /></span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </GlowCard>)}
        </div>
      </section>

      <section className="tpw-process" data-reveal>
        <header className="tpw-process-intro">
          <p>CÓMO TRABAJAMOS</p>
          <h2>De la auditoría al primer resultado medible</h2>
        </header>
        <ol className="tpw-process-list">
          {processSteps.map(([number, title, copy]) => <li key={number}>
            <b>{number}</b>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </li>)}
        </ol>
      </section>

      <section className="tpw-diff" data-reveal>
        <header className="tpw-diff-intro">
          <p>POR QUÉ IDEAMOS</p>
          <h2>Boutique, no fábrica de clientes</h2>
        </header>
        <div className="tpw-diff-grid">
          {differentiators.map(([icon, title, copy]) => <article key={title} className="tpw-diff-card">
            <Icon name={icon} />
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>)}
        </div>
      </section>

      <section className="tpw-proof" data-reveal>
        <p className="tpw-proof-label">MARCAS QUE YA CONFIARON EN NOSOTROS</p>
        <div className="tpw-proof-logos"><HeroLogoTrack /></div>
      </section>

      <section className="tpw-local" data-reveal>
        <div className="tpw-local-copy">
          <p>BÚSQUEDAS LOCALES</p>
          <h2>Google Mi Negocio: aparecé en el mapa y vendé más</h2>
          <span>Configuramos y optimizamos tu ficha, seguimos las visualizaciones y clics, y hacemos que tu negocio sea la opción obvia cuando alguien busca cerca tuyo.</span>
          <a className="orange-cta" href={whatsapp}>Quiero optimizar mi ficha</a>
        </div>
        <div className="tpw-local-image"><img src={asset("/media/posicionamiento-maps.png")} alt="Teléfono con mapa de Google y marcador de ubicación" /></div>
      </section>

      <section className="tpw-faq" data-reveal>
        <header className="tpw-faq-intro">
          <p>PREGUNTAS FRECUENTES</p>
          <h2>Lo que todos preguntan antes de arrancar</h2>
        </header>
        <div className="tpw-faq-list">
          {faqs.map(([q, a], index) => <FaqItem key={q} q={q} a={a} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />)}
        </div>
      </section>

      <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
