"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { DarkGridBackground, HeroChrome, HomeAdvisorySection, HomeClosingSections } from "./SharedHomeSections";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";
import { WHATSAPP_URL as whatsapp } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function Action({ children }: { children: React.ReactNode }) {
  return <a className="orange-cta md-action" href={whatsapp}>{children}</a>;
}

function DeviceMedia({
  src,
  alt,
  video = false,
  contain = false,
  className = "",
}: {
  src: string;
  alt: string;
  video?: boolean;
  contain?: boolean;
  className?: string;
}) {
  return <div className={`md-device ${contain ? "is-contained" : ""} ${className}`}>
    {video
      ? <ManagedBackgroundVideo src={asset(src)} />
      : <img src={asset(src)} alt={alt} loading="lazy" decoding="async" />}
  </div>;
}

const method = [
  ["Diagnóstico profundo", "Entendemos tu empresa, su rentabilidad y su embudo de ventas para detectar las oportunidades reales."],
  ["Estrategia", "Elegimos los canales más rentables, priorizamos resultados rápidos y construimos bases sólidas para crecer."],
  ["Ejecución precisa", "Creamos campañas y contenidos alineados a tu negocio y los optimizamos desde el primer día."],
  ["Optimización", "Medimos lo que importa, corregimos y escalamos lo que funciona con reportes claros."],
];

const problems = [
  ["“Necesito delegar el marketing en una empresa confiable”", "Nos ocupamos de estrategia, diseño, campañas y seguimiento. Vos te enfocás en hacer crecer el negocio."],
  ["“Pierdo oportunidades por no tener una estrategia digital clara”", "Ordenamos tu presencia digital, mejoramos tu web y activamos campañas para convertir más oportunidades en clientes."],
  ["“Quiero generar más consultas y ventas”", "Creamos campañas, contenidos y activos digitales pensados para atraer, convertir y escalar."],
  ["“Quiero aparecer primero en Google”", "Simplificamos SEO y Google Ads en un plan realista para ganar visibilidad y resultados."],
];

export default function MarketingDigitalPage() {
  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .1 });
    document.querySelectorAll("[data-reveal]").forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  return <main className="internal-page marketing-page">
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero md-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> HOLA, SOMOS IDEAMOS</p>
        <h1><span>Estrategias digitales</span><span>que potencian leads y ventas</span></h1>
        <p className="hero-copy">Sitios web, tiendas online y marketing digital para que tu empresa venda más y más fácil.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href={whatsapp}><span>Quiero una asesoría sin cargo</span></a>
          <a className="cta-glow secondary" href={whatsapp}><span>Quiero contactar un experto</span></a>
        </div>
      </div>
    </section>

    <LightGridFrame className="marketing-light-grid">
    <section className="md-section md-growth md-centered-intro">
      <header data-reveal>
        <p>MÁS DE 2000 CLIENTES FELICES</p>
        <h2>Growth para Pymes:<br/>atraé, convertí y escalá</h2>
        <span>Un solo equipo para atraer y convertir: <b>Ads, SEO, contenido, analítica y landings específicas.</b><br/>Creamos demanda inmediata y posicionamiento que genera resultados reales.</span>
      </header>
      <div className="md-split md-split-wide">
        <div className="md-copy" data-reveal>
          <p>¿QUÉ HACEMOS POR TU EMPRESA?</p>
          <h3>Te posicionamos frente a tus clientes ideales con acciones que convierten</h3>
          <h4><b>Posicioná tu marca</b> con una comunicación digital efectiva</h4>
          <div>En Ideamos <b>ayudamos a PYMES y empresas a crecer con campañas publicitarias que venden</b>, SEO y Google Ads para aparecer primero en Google, redes sociales que generan leads calificados y sitios web pensados para convertir. <b>Analizamos tu negocio, definimos los canales más rentables y diseñamos un plan a medida.</b></div>
          <Action>Charlemos de tu proyecto</Action>
        </div>
        <DeviceMedia src="/media/marketing-img-002.webp" alt="Proyecto Xtreme D10 desarrollado por Ideamos" contain />
      </div>
    </section>

    </LightGridFrame>

    <section className="desktop-video-wall" aria-label="Presentación audiovisual de Ideamos">
      <ManagedBackgroundVideo src={asset("/media/video-wall-background-2026.webm")} />
    </section>

    <LightGridFrame className="marketing-light-grid">
    <section className="md-section md-centered-intro md-positioning">
      <header data-reveal>
        <p>MARKETING DIGITAL, SEO Y GOOGLE ADS</p>
        <h2>Te posicionamos en Google,<br/>manejamos tus redes, campañas y contenidos</h2>
        <span>Posicionamos tu marca en buscadores, gestionamos redes, producimos contenido y ejecutamos campañas pagas.</span>
      </header>
      <div className="md-split">
        <div className="md-copy" data-reveal>
          <p>POSICIONAMIENTO</p>
          <h3>Llegá a los primeros puestos de Google con estrategias de SEO y Google Ads</h3>
          <h4><b>Con Ideamos</b> generás más tráfico, leads y ventas.</h4>
          <div><b>Traemos a tu web personas que ya buscan lo que ofrecés</b> y las convertimos en consultas. Con Google Ads te mostramos primero cuando te buscan y con SEO hacemos que te encuentren sin pagar cada clic. Medimos llamadas y mensajes para invertir donde rinde más.</div>
          <Action>Quiero estar primero en Google</Action>
        </div>
        <DeviceMedia src="/media/marketing-google-000.jpg" alt="Panel de resultados de SEO y Google Ads" contain className="md-dashboard-visual" />
      </div>
    </section>

    <section className="md-section md-split md-social">
      <div className="md-copy" data-reveal>
        <p>MARKETING DIGITAL</p>
        <h3>Hacemos crecer tu marca en redes con contenido y Meta Ads</h3>
        <h4><b>Gestión de redes</b> que trabaja para tus objetivos.</h4>
        <div><b>Creamos contenido alineado a tu marca, gestionamos tus redes sociales con criterio y activamos campañas en Meta para alcanzar a nuevos públicos.</b> Medimos impacto, afinamos la pauta y enfocamos el mensaje para atraer consultas reales, no solo likes.</div>
        <Action>Quiero hacer crecer mis redes</Action>
      </div>
      <DeviceMedia src="/media/marketing-google-001.jpg" alt="Panel de resultados de redes sociales y campañas digitales" contain className="md-dashboard-visual" />
    </section>

    <section className="md-section md-centered-intro md-method">
      <header data-reveal>
        <p>PLAN ESTRATÉGICO</p>
        <h2>Conocé el método Ideamos:<br/>estrategia clara, ejecución precisa, ventas reales</h2>
        <span>Un método simple y enfocado en resultados: entendemos tu negocio, diseñamos la estrategia justa y la ejecutamos con precisión.</span>
      </header>
      <div className="md-method-layout">
        <DeviceMedia src="/media/marketing-modulo.webp" alt="Sitio institucional de Grupo Módulo" contain />
        <div className="md-method-list">{method.map(([title, copy], index) => <article key={title}><small>0{index + 1}</small><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </div>
      <div className="md-double-actions"><Action>Quiero una asesoría sin cargo</Action><Action>Quiero contactar un experto</Action></div>
    </section>

    <section className="service-section service-benefits md-problems">
      <DarkGridBackground />
      <header className="service-heading" data-reveal>
        <p>SOLUCIONES A TU MEDIDA</p>
        <h2>¿Qué problemas resolvemos para vos y tu empresa?</h2>
        <div className="md-problems-lead">Descubrí cómo nuestras soluciones digitales ayudan a aumentar ventas, atraer clientes y posicionar negocios como líderes.</div>
      </header>
      <div className="service-items service-benefits-grid">
        {problems.map(([title, copy], index) => <article key={title}>
          <span className={`benefit-motion benefit-motion-${index + 1}`} aria-hidden="true"><i/><i/><i/><i/></span>
          <h3>{title}</h3><p>{copy}</p>
        </article>)}
      </div>
      <div className="md-double-actions"><Action>Quiero una asesoría sin cargo</Action><Action>Quiero contactar un experto</Action></div>
    </section>

    <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
