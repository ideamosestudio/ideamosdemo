"use client";

import { useEffect } from "react";
import ShopScope from "./ShopScope";
import ShopQuestions from "./ShopQuestions";
import ManagedBackgroundVideo from "../../components/ManagedBackgroundVideo";
import { DarkGridBackground, HeroChrome, HomeAdvisorySection, HomeClosingSections } from "../../../components/SharedHomeSections";
import HomeTestimonials from "../../../components/HomeTestimonials";
import LightGridFrame from "../../../components/LightGridFrame";
import SiteHeader from "../../../components/SiteHeader";
import PortfolioLink from "../../../components/PortfolioLink";
import { WHATSAPP_URL } from "../../../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const ecommerceBenefits = [
  ["Cobrás online sin vueltas", "Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro."],
  ["Envíos más fáciles", "Definimos zonas, retiro y opciones de entrega según los operadores que use tu negocio."],
  ["Sin comisiones de Ideamos", "No cobramos una comisión por cada venta. Las tarifas de plataformas y medios de pago se revisan por separado."],
  ["Transmití confianza", "Pagos seguros y envíos integrados le dan a tu marca el respaldo que necesita."],
  ["Gestión de catálogo y stock", "Organizá productos, variantes y precios. Si necesitás sincronizar inventario, evaluamos la integración y su alcance."],
  ["Diseño estratégico a medida", "Organizamos la navegación y la información del producto para facilitar la decisión de compra."],
  ["Tomá decisiones informadas", "Mirá ventas, conversión y ticket promedio para invertir donde más rinde."],
  ["Mejor información para comprar", "Mostrá precios, disponibilidad, entregas y medios de pago con un camino claro para resolver consultas."],
];

const problems = [
  ["“Quiero vender online sin depender de un marketplace”", "Diseñamos una tienda con tu identidad y un canal directo con tus clientes. Ideamos no cobra comisiones por venta; verificamos por separado los costos de la plataforma, los pagos y las integraciones."],
  ["“No sé cómo arrancar con e-commerce”", "Te guiamos paso a paso: elegimos la plataforma, armamos el diseño y dejamos todo listo para que empieces a vender. No necesitás experiencia previa, solo tus productos y tus ganas."],
  ["“Necesito simplificar la gestión de pedidos”", "Evaluamos qué pagos, envíos, stock o facturación conviene integrar. Definimos qué puede automatizarse y quién atiende errores, consultas y pedidos: una tienda sigue necesitando gestión."],
  ["“Ya tengo una tienda, pero no convierte”", "Revisamos el recorrido de compra, la información de productos y las dificultades para pagar o recibir pedidos. Priorizamos mejoras con los datos disponibles; ningún rediseño garantiza ventas por sí solo."],
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
        <h1><span>Diseño de tiendas online.</span><span>Tu negocio, listo para crecer.</span></h1>
        <p className="hero-copy shop-hero-copy">Desarrollamos tiendas online para empresas de Argentina.<br/>Diseño, catálogo, pagos y envíos según tu operación. Sin comisiones de Ideamos por venta.</p>
        <Actions />
      </div>
    </section>

    <LightGridFrame className="shops-light-grid">
    <section className="shops-intro shops-grid-bg">
      <header className="shops-heading">
        <p>ECOMMERCE PROFESIONAL</p>
        <h2>Una tienda online pensada para <br/>tu forma de vender</h2>
        <span>Definimos las funciones que necesita tu negocio y quién va a administrarlas.<br/>Una experiencia clara para tus clientes y una operación que puedas sostener.</span>
      </header>
      <div className="shops-intro-layout">
        <div className="shops-intro-copy">
          <div className="shops-happy" aria-label="Diseño y estrategia para tu negocio">
            <span className="shops-happy-avatars" aria-hidden="true">
              {["003", "002", "001"].map((name) => <img key={name} src={asset(`/media/client-${name}.webp`)} alt="" width="326" height="322" loading="lazy" decoding="async" />)}
            </span>
            <span className="shops-happy-label">DISEÑO Y ESTRATEGIA PARA TU NEGOCIO</span>
          </div>
          <h3><span>Vendé las 24 horas del día,</span><span>los 7 días de la semana</span></h3>
          <h4><b>Diseño Web y Marketing Digital</b> de alto impacto</h4>
          <p>Tu catálogo puede recibir pedidos fuera del horario del local. Organizamos productos, variantes y condiciones de compra para que tus clientes encuentren lo que necesitan. Vos definís dónde vendés, cómo entregás y cómo atendés cada pedido.</p>
          <a className="orange-cta shops-red-cta" href={WHATSAPP_URL}>QUIERO AGENDAR UNA ASESORÍA</a>
          <PortfolioLink>Ver proyectos de tiendas online</PortfolioLink>
        </div>
        <div className="shops-laptop-visual">
          <img src={asset("/media/sunglasses.webp")} alt="Presentación visual de una tienda online de anteojos" width="1200" height="920" loading="lazy" decoding="async" />
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
      <div className="shops-benefits-lead">Cada negocio tiene su catálogo, sus clientes y sus procesos. Diseñamos la tienda a partir de esas necesidades: mostrar mejor los productos, facilitar pedidos y conectar las herramientas que usás.</div>
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

    <ShopScope />

    <HomeAdvisorySection />
    </LightGridFrame>

    <ShopQuestions />
    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
