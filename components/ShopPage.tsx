"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { DarkGridBackground, HeroChrome, HomeAdvisorySection, HomeClosingSections } from "./SharedHomeSections";
import HomeTestimonials from "./HomeTestimonials";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

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

const problems = [
  ["“Quiero vender online sin depender de un marketplace”", "En Ideamos creamos tu propia tienda, sin comisiones por venta y con dominio a tu nombre. Así construís un canal directo con tus clientes y tu marca es la que se lleva el protagonismo."],
  ["“No sé cómo arrancar con e-commerce”", "Te guiamos paso a paso: elegimos la plataforma, armamos el diseño y dejamos todo listo para que empieces a vender. No necesitás experiencia previa, solo tus productos y tus ganas."],
  ["“Necesito una tienda que funcione sola”", "Desarrollamos e-commerce que automatizan pagos, facturación, envíos y stock. Vos te dedicás a vender, mientras la tienda hace el trabajo pesado en segundo plano."],
  ["“Ya tengo una tienda, pero no convierte”", "Optimizamos tu tienda actual para que venda más: rediseñamos la experiencia de compra, mejoramos usabilidad y aplicamos estrategias de marketing digital que convierten visitas en clientes."],
];

function Actions() {
  return <div className="hero-actions internal-actions">
    <a className="cta-glow primary" href={WHATSAPP_URL}><span>Quiero una asesoría sin cargo</span></a>
    <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Quiero contactar un experto</span></a>
  </div>;
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
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> ECOMMERCE PROFESIONAL</p>
        <h1><span>Vendé con tu tienda online.</span><span>Fácil, profesional y sin comisiones</span></h1>
        <p className="hero-copy shop-hero-copy">Creamos tiendas online pensadas para vender más:<br/>fáciles de usar, rápidas y listas para crecer con tu negocio.</p>
        <Actions />
      </div>
    </section>

    <LightGridFrame className="shops-light-grid">
    <section className="shops-intro shops-grid-bg">
      <header className="shops-heading">
        <p>ECOMMERCE PROFESIONAL</p>
        <h2>Tiendas con todo lo que necesitas para<br/>escalar tu negocio</h2>
        <span>Nuestras tiendas online están llenas de funcionalidades que te ayudarán mucho en tu día a día.<br/>Hacemos uso de las últimas tecnologías disponibles para facilitarte el trabajo.</span>
      </header>
      <div className="shops-intro-layout">
        <div className="shops-intro-copy">
          <div className="shops-happy" aria-label="Más de 2000 clientes felices">
            <span className="shops-happy-avatars" aria-hidden="true">
              {["003", "002", "001"].map((name) => <img key={name} src={asset(`/media/client-${name}.png`)} alt="" width="326" height="322" loading="lazy" decoding="async" />)}
            </span>
            <span className="shops-happy-label">MÁS DE 2000 CLIENTES FELICES</span>
          </div>
          <h3><span>Vendé las 24 horas del día,</span><span>los 7 días de la semana</span></h3>
          <h4><b>Diseño Web y Marketing Digital</b> de alto impacto</h4>
          <p>Tener una tienda online ofrece numerosas ventajas que pueden transformar su negocio. Permite llegar a una audiencia global, superando las limitaciones geográficas de un local físico, y le permite vender sus productos o servicios las 24 horas del día, los 7 días de la semana.</p>
          <a className="orange-cta shops-red-cta" href={WHATSAPP_URL}>QUIERO AGENDAR UNA ASESORÍA</a>
        </div>
        <div className="shops-laptop-visual">
          <img src={asset("/media/sunglasses.png")} alt="Tienda online de anteojos desarrollada por Ideamos" />
        </div>
      </div>
    </section>

    <section className="shops-ecommerce shops-grid-bg">
      <header className="shops-heading shops-ecommerce-heading">
        <p>ECOMMERCE ESTRATÉGICO</p>
        <h2>¿Necesitás una tienda online para<br/>automatizar tus ventas?</h2>
        <span><b>Automatizá tus ventas</b> con una tienda diseñada para convertir:<br/>estrategia, procesos simples y tecnología que trabaja por vos.</span>
      </header>
      <div className="shops-ecommerce-layout">
        <div>{ecommerceBenefits.slice(0, 4).map(([title, copy]) => <article key={title}><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="shops-ecommerce-visual"><ManagedBackgroundVideo src={asset("/media/marketing-wilde.webm")} /></div>
        <div>{ecommerceBenefits.slice(4).map(([title, copy]) => <article key={title}><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
      <div className="shops-ecommerce-actions">
        <a className="orange-cta" href={WHATSAPP_URL}>QUIERO UNA TIENDA ONLINE</a>
        <a className="orange-cta" href={WHATSAPP_URL}>QUIERO HABLAR CON UN EXPERTO</a>
      </div>
    </section>

    <section className="service-section service-benefits shops-problems">
      <DarkGridBackground />
      <header className="service-heading">
        <p>SOLUCIONES A TU MEDIDA</p>
        <h2>¿Qué problemas resolvemos con tu tienda<br/>online?</h2>
        <div className="shops-benefits-lead">Cada negocio es distinto, pero los desafíos se repiten: vender más, simplificar procesos y dejar de perder tiempo. Transformamos esas necesidades en tiendas que funcionan solas, atraen clientes y convierten visitas en ventas reales.</div>
      </header>
      <div className="service-items service-benefits-grid">
        {problems.map(([title, copy], index) => <article key={title}>
          <span className={`benefit-motion benefit-motion-${index + 1}`} aria-hidden="true"><i/><i/><i/><i/></span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </article>)}
      </div>
      <Actions />
    </section>

    <HomeTestimonials />

    <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
