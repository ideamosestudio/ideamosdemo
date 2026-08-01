"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { HeroLogoTrack, HomeClosingSections } from "./SharedHomeSections";
import SiteHeader from "./SiteHeader";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const advantagesLeft = [
  ["Cobrás online sin vueltas", "Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro. Activamos Mercado Pago y métodos locales para que cobres desde el día uno."],
  ["Envíos más fácil", "Mostrá tarifas y tiempos en vivo con Correo Argentino, Andreani y OCA. Seguimiento para el cliente y retiro en punto o a domicilio, sin complicaciones."],
  ["No nos pagas comisiones", "Tu tienda es 100% tuya: dominio, hosting y acceso administrador desde el día uno. Ideamos no te cobra por venta ni alquiler mensual. Es un activo de tu marca, no una cuenta prestada."],
  ["Transmití confianza", "Una web profesional con dominio propio, pagos seguros y envíos integrados transmite seriedad. Le da a tu marca el respaldo que un perfil de redes no puede ofrecer."],
];

const advantagesRight = [
  ["Gestión de catálogo y stock", "Cargá productos, variantes y precios en minutos, sin planillas eternas. Sincronizá inventario y alertas para no vender lo que no hay."],
  ["Diseño estratégico a medida", "Cada elemento cumple una función: guiar al usuario, simplificar la compra y aumentar la conversión. Nada está puesto al azar. Lo estético sigue a lo estratégico."],
  ["Tomá decisiones informadas", "Mirá ventas, conversión y ticket promedio en un tablero claro. Detectá qué canales rinden y dónde conviene invertir más."],
  ["Mejor atención en menos tiempo", "El cliente puede ver precios, stock, tiempos y medios de pago sin preguntarte nada. Respondés menos mensajes y vendés más igual."],
];

const problems = [
  ["“Quiero vender online sin depender de un marketplace”", "En Ideamos creamos tu propia tienda, sin comisiones por venta y con dominio a tu nombre. Así construís un canal directo con tus clientes y tu marca es la que se lleva el protagonismo."],
  ["“No sé cómo arrancar con e-commerce”", "Te guiamos paso a paso: elegimos la plataforma, armamos el diseño y dejamos todo listo para que empieces a vender. No necesitás experiencia previa, solo tus productos y tus ganas."],
  ["“Necesito una tienda que funcione sola”", "Desarrollamos e-commerce que automatizan pagos, facturación, envíos y stock. Vos te dedicás a vender, mientras la tienda hace el trabajo pesado en segundo plano."],
  ["“Ya tengo una tienda, pero no convierte”", "Optimizamos tu tienda actual para que venda más: rediseñamos la experiencia de compra, mejoramos usabilidad y aplicamos estrategias de marketing digital que convierten visitas en clientes."],
];

function Actions() {
  return <div className="hero-actions internal-actions">
    <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span></a>
    <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span></a>
  </div>;
}

function Feature({ title, copy }: { title: string; copy: string }) {
  return <article className="shops-feature">
    <i aria-hidden="true" />
    <h3>{title}</h3>
    <p>{copy}</p>
  </article>;
}

export default function ShopPage() {
  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty("--scroll", String(window.scrollY));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <main className="internal-page shops-page">
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero shop-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
      <div className="tech-frame frame-right"><i/><span>DIGITAL SYSTEMS</span><b>2026</b></div>
      <div className="data-line line-a"><span>STRATEGY</span><i/></div>
      <div className="data-line line-b"><span>RESULTS</span><i/></div>
      <div className="hero-center">
        <p className="availability"><i/> ECOMMERCE PROFESIONAL</p>
        <h1><span>Vendé con tu tienda online.</span><span>Fácil, profesional y sin comisiones</span></h1>
        <p className="hero-copy">Creamos tiendas online pensadas para vender más: fáciles de usar, rápidas y listas para crecer con tu negocio.</p>
        <Actions />
        <div className="hero-clients"><HeroLogoTrack /></div>
      </div>
      <div className="hero-caption">DISEÑO WEB &amp; MARKETING DIGITAL</div>
      <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
    </section>

    <section className="shops-intro shops-grid-bg">
      <header className="shops-heading">
        <p>ECOMMERCE PROFESIONAL</p>
        <h2>Tiendas con todo lo que necesitas para<br/>escalar tu negocio</h2>
        <span>Nuestras tiendas online están llenas de funcionalidades que te ayudarán mucho en tu día a día.<br/>Hacemos uso de las últimas tecnologías disponibles para facilitarte el trabajo.</span>
      </header>
      <div className="shops-intro-layout">
        <div className="shops-intro-copy">
          <div className="shops-happy"><img src={asset("/media/happy-clients.png")} alt="Más de 2000 clientes felices"/></div>
          <h3>Vendé las 24 horas del día, los<br/>7 días de la semana</h3>
          <h4><b>Diseño Web y Marketing Digital</b> de alto impacto</h4>
          <p>Tener una tienda online ofrece numerosas ventajas que pueden transformar su negocio. Permite llegar a una audiencia global, superando las limitaciones geográficas de un local físico, y le permite vender sus productos o servicios las 24 horas del día, los 7 días de la semana.</p>
          <a className="shops-red-cta" href="https://wa.link/wgb5pk">QUIERO AGENDAR UNA ASESORÍA <span>›</span></a>
        </div>
        <div className="shops-laptop-video">
          <video autoPlay muted loop playsInline preload="metadata"><source src={asset("/media/sunglasses-003.webm")} type="video/webm" /></video>
        </div>
      </div>
    </section>

    <section className="shops-advantages shops-grid-bg">
      <header className="shops-heading">
        <p>ESCALÁ TU NEGOCIO CON IDEAMOS</p>
        <h2>¿Qué ventajas tiene hacer tu tienda con<br/>Ideamos?</h2>
        <span>Cobrás, despachás y gestionás todo desde un solo lugar. Sin vueltas, sin fricción y con más<br/>tiempo para hacer crecer tu marca.</span>
      </header>
      <div className="shops-advantages-layout">
        <div className="shops-feature-column">{advantagesLeft.map(([title, copy]) => <Feature key={title} title={title} copy={copy} />)}</div>
        <div className="shops-phone"><video autoPlay muted loop playsInline preload="metadata"><source src={asset("/media/wilde.webm")} type="video/webm" /></video></div>
        <div className="shops-feature-column">{advantagesRight.map(([title, copy]) => <Feature key={title} title={title} copy={copy} />)}</div>
      </div>
      <a className="shops-red-cta shops-center-cta" href="https://wa.link/wgb5pk">QUIERO UNA ASESORÍA SIN CARGO <span>›</span></a>
    </section>

    <section className="shops-problems shops-grid-bg">
      <header className="shops-heading">
        <p>SOLUCIONES A TU MEDIDA</p>
        <h2>¿Qué problemas resolvemos con tu tienda<br/>online?</h2>
        <span>Cada negocio es distinto, pero los desafíos se repiten: <b>vender más, simplificar procesos y dejar de perder tiempo.</b><br/>En Ideamos escuchamos tus necesidades y las transformamos en soluciones prácticas: <b>tiendas que funcionan solas, que<br/>atraen clientes y convierten visitas en ventas reales.</b></span>
      </header>
      <div className="shops-problems-grid">
        {problems.map(([title, copy]) => <Feature key={title} title={title} copy={copy} />)}
      </div>
      <Actions />
    </section>

    <HomeClosingSections />
  </main>;
}
