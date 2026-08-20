"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections, HeroLogoTrack } from "./SharedHomeSections";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const whatsapp = "https://wa.link/wgb5pk";

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

function Check() {
  return <svg className="tpw-check" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path d="M2.5 8L6 11.5L12.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

export default function TestPosicionamientoPage() {
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
        <p className="hero-copy"><b>Te ponemos en el lugar exacto donde tu cliente ya te está buscando.</b><br/>Combinamos Google Ads y SEO en una sola estrategia de visibilidad, pensada para negocios que quieren resultados, no promesas.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href={whatsapp}><span>Quiero una auditoría sin cargo</span></a>
          <a className="cta-glow secondary" href="#estrategia"><span>Ver cómo trabajamos</span></a>
        </div>
      </div>
    </section>

    <LightGridFrame className="tpw-light">
      <section className="tpw-stats" data-reveal>
        {stats.map(([number, copy]) => <div className="tpw-stat" key={number}><b>{number}</b><p>{copy}</p></div>)}
      </section>

      <section className="tpw-vs" id="estrategia">
        <header className="tpw-vs-intro" data-reveal>
          <p>POSICIONAMIENTO EN GOOGLE</p>
          <h2>Rápido o duradero.<br/><em>¿Por qué elegir?</em></h2>
          <span>Google Ads y SEO no compiten entre sí: se complementan. Uno te llena la agenda esta semana, el otro construye el negocio de los próximos años.</span>
        </header>
        <div className="tpw-vs-grid">
          <article className="tpw-vs-card is-ads" data-reveal>
            <p className="tpw-vs-tag">GOOGLE ADS</p>
            <h3>Resultados en días</h3>
            <ul>{adsPoints.map((point) => <li key={point}><Check />{point}</li>)}</ul>
            <a className="tpw-vs-cta" href={whatsapp}>Quiero aparecer ya <span>→</span></a>
          </article>
          <article className="tpw-vs-card is-seo" data-reveal>
            <p className="tpw-vs-tag">SEO</p>
            <h3>Resultados que se acumulan</h3>
            <ul>{seoPoints.map((point) => <li key={point}><Check />{point}</li>)}</ul>
            <a className="tpw-vs-cta" href={whatsapp}>Quiero crecer orgánico <span>→</span></a>
          </article>
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

      <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
