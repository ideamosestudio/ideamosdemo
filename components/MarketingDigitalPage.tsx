"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { HomeClosingSections } from "./SharedHomeSections";
import SiteHeader from "./SiteHeader";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const whatsapp = "https://wa.link/wgb5pk";

function Action({ children }: { children: React.ReactNode }) {
  return <a className="md-action" href={whatsapp}>{children}<span aria-hidden="true">›</span></a>;
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
    {video ? <video autoPlay muted loop playsInline preload="metadata" aria-label={alt}>
      <source src={asset(src)} type="video/webm" />
    </video> : <img src={asset(src)} alt={alt} />}
  </div>;
}

const ecommerceBenefits = [
  ["Cobrás online sin vueltas", "Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro."],
  ["Envíos más fácil", "Mostrá tarifas y tiempos en vivo. Seguimiento para el cliente, sin complicaciones."],
  ["No nos pagás comisiones", "Tu tienda es 100% tuya: dominio, hosting y acceso administrador desde el día uno."],
  ["Transmití confianza", "Pagos seguros y envíos integrados le dan a tu marca el respaldo que necesita."],
  ["Gestión de catálogo y stock", "Cargá productos, variantes y precios en minutos. Sincronizá inventario y alertas."],
  ["Diseño estratégico a medida", "Cada elemento guía al usuario, simplifica la compra y aumenta la conversión."],
  ["Tomá decisiones informadas", "Mirá ventas, conversión y ticket promedio para invertir donde más rinde."],
  ["Mejor atención en menos tiempo", "Tus clientes ven precios, stock, tiempos y medios de pago sin preguntarte nada."],
];

const method = [
  ["Diagnóstico profundo", "Entendemos tu empresa, su rentabilidad y su embudo de ventas para detectar las oportunidades reales."],
  ["Estrategia", "Elegimos los canales más rentables, priorizamos resultados rápidos y construimos bases sólidas para crecer."],
  ["Ejecución precisa", "Creamos campañas y contenidos alineados a tu negocio y los optimizamos desde el primer día."],
  ["Optimización", "Medimos lo que importa, corregimos y escalamos lo que funciona con reportes claros."],
];

const problems = [
  ["“Necesito delegar el marketing en una empresa confiable”", "Nos ocupamos de estrategia, diseño, campañas y seguimiento. Vos te enfocás en hacer crecer el negocio."],
  ["“Pierdo oportunidades por no tener una web profesional”", "Diseñamos sitios que transmiten confianza, explican claro lo que ofrecés y captan clientes desde el primer día."],
  ["“Quiero una tienda online para vender más y automatizar”", "Creamos tiendas profesionales, fáciles de usar y listas para vender, medir y escalar."],
  ["“Quiero ser primero en Google pero no sé por dónde empezar”", "Simplificamos SEO y Google Ads en un plan realista para empezar a ganar visibilidad y resultados."],
  ["“No sé por cómo arrancar, pero sé que necesito hacer algo”", "Ordenamos prioridades y te mostramos qué conviene hacer paso a paso, sin compromiso."],
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

    <section className="hero internal-home-hero md-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
      <div className="tech-frame frame-right"><i/><span>DIGITAL SYSTEMS</span><b>2026</b></div>
      <div className="hero-center">
        <p className="availability"><i/> HOLA, SOMOS IDEAMOS</p>
        <h1><span>Estrategias digitales</span><span>que potencian leads y ventas</span></h1>
        <p className="hero-copy">Sitios web, tiendas online y marketing digital para que tu empresa venda más y más fácil.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href={whatsapp}><span>Quiero una asesoría sin cargo</span></a>
          <a className="cta-glow secondary" href={whatsapp}><span>Quiero contactar un experto</span></a>
        </div>
      </div>
      <div className="hero-caption">DISEÑO WEB &amp; MARKETING DIGITAL</div>
      <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
    </section>

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

    <section className="md-section md-web-design">
      <div className="md-split">
        <div className="md-copy" data-reveal>
          <p>DISEÑO WEB</p>
          <h3>Webs de alto impacto ideadas para generar confianza y resultados</h3>
          <h4><b>Posicioná tu marca</b> con un sitio web profesional y efectivo</h4>
          <div><b>Creamos sitios web pensados para transmitir autoridad, confianza y generar contactos reales.</b> Desde el diseño a medida hasta el contenido, todo está enfocado en convertir visitas en potenciales clientes. Coordinamos una asesoría online sin cargo para conocer tu negocio y proponerte ideas concretas.</div>
          <Action>Charlemos de tu proyecto</Action>
        </div>
        <DeviceMedia src="/media/marketing-img-001.webp" alt="Proyecto Maqmax desarrollado por Ideamos" contain />
      </div>
    </section>

    <section className="md-section md-ecommerce md-centered-intro">
      <header data-reveal>
        <p>ECOMMERCE ESTRATÉGICO</p>
        <h2>¿Necesitás una tienda online para<br/>automatizar tus ventas?</h2>
        <span><b>Automatizá tus ventas</b> con una tienda diseñada para convertir: estrategia, procesos simples y tecnología que trabaja por vos.</span>
      </header>
      <div className="md-ecommerce-layout">
        <div>{ecommerceBenefits.slice(0, 4).map(([title, copy]) => <article key={title}><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="md-ecommerce-visual"><video autoPlay muted loop playsInline preload="metadata" aria-label="Proyecto Wilde desarrollado por Ideamos"><source src={asset("/media/marketing-wilde.webm")} type="video/webm" /></video></div>
        <div>{ecommerceBenefits.slice(4).map(([title, copy]) => <article key={title}><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="desktop-video-wall" aria-label="Presentación audiovisual de Ideamos">
      <video autoPlay muted loop playsInline preload="metadata">
        <source src={asset("/media/video-wall-background-2026.webm")} type="video/webm" />
      </video>
    </section>

    <section className="md-section md-centered-intro">
      <header data-reveal>
        <p>MARKETING DIGITAL, SEO Y GOOGLE ADS</p>
        <h2>Te posicionamos en Google y manejamos tus<br/>redes, campañas y contenidos</h2>
        <span><b>Posicionamos tu marca en buscadores, gestionamos redes, producimos contenido y ejecutamos campañas pagas.</b></span>
      </header>
      <div className="md-split">
        <div className="md-copy" data-reveal>
          <p>POSICIONAMIENTO</p>
          <h3>Llegá a los primeros puestos de Google con estrategias de SEO y Google Ads</h3>
          <h4><b>Con Ideamos</b> generás más tráfico, leads y ventas.</h4>
          <div><b>Traemos a tu web personas que ya buscan lo que ofrecés</b> y las convertimos en consultas. Con Google Ads te mostramos primero cuando te buscan y con SEO hacemos que te encuentren sin pagar cada clic. Medimos llamadas y mensajes para invertir donde rinde más.</div>
          <Action>Quiero estar primero en Google</Action>
        </div>
        <DeviceMedia src="/media/marketing-google-000.jpg" alt="Panel de resultados de SEO y Google Ads" contain />
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
      <DeviceMedia src="/media/marketing-google-001.jpg" alt="Panel de resultados de redes sociales y campañas digitales" contain />
    </section>

    <section className="md-section md-centered-intro md-method">
      <header data-reveal>
        <p>PLAN ESTRATÉGICO</p>
        <h2>Conocé el método Ideamos:<br/>estrategia clara, ejecución precisa, ventas reales</h2>
        <span>Un método simple y enfocado en resultados: entendemos tu negocio, diseñamos la estrategia justa y la ejecutamos con precisión.</span>
      </header>
      <div className="md-method-layout">
        <DeviceMedia src="/media/marketing-modulo.png" alt="Sitio institucional de Grupo Módulo" contain />
        <div className="md-method-list">{method.map(([title, copy], index) => <article key={title}><small>0{index + 1}</small><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </div>
      <div className="md-double-actions"><Action>Quiero una asesoría sin cargo</Action><Action>Quiero contactar un experto</Action></div>
    </section>

    <section className="md-section md-centered-intro md-problems">
      <header data-reveal>
        <p>SOLUCIONES A TU MEDIDA</p>
        <h2>¿Qué problemas resolvemos para vos y tu empresa?</h2>
        <span>Descubrí cómo <b>nuestras soluciones digitales ayudan a aumentar ventas</b>, atraer clientes y posicionar negocios como líderes.</span>
      </header>
      <div className="md-problems-layout">
        <div>{problems.map(([title, copy]) => <article key={title}><i/><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        <div className="md-red-phone"><img src={asset("/media/marketing-tienda-roja.png")} alt="Tienda online de indumentaria en dispositivo móvil" /></div>
      </div>
      <div className="md-double-actions"><Action>Quiero una asesoría sin cargo</Action><Action>Quiero contactar un experto</Action></div>
    </section>

    <HomeClosingSections />
  </main>;
}
