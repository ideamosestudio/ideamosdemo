"use client";

import { useEffect, useState } from "react";
import ManagedBackgroundVideo from "./components/ManagedBackgroundVideo";
import { DarkGridBackground, HeroLogoTrack, HomeAdvisorySection, HomeClosingSections } from "../components/SharedHomeSections";
import SiteHeader from "../components/SiteHeader";
import PortfolioSection from "../components/PortfolioSection";
import LightGridFrame from "../components/LightGridFrame";
import HomeTestimonials from "../components/HomeTestimonials";
import "./casos-de-exito/casos.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const ecommerceLeft = [
  ["Cobrás online sin vueltas", "Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro. Activamos Mercado Pago y métodos locales para que cobres desde el día uno."],
  ["Envíos más fácil", "Mostrá tarifas y tiempos en vivo con Correo Argentino, Andreani y OCA. Seguimiento para el cliente y retiro en punto o a domicilio, sin complicaciones."],
  ["No nos pagás comisiones", "Tu tienda es 100% tuya: dominio, hosting y acceso administrador desde el día uno. Ideamos no te cobra por venta ni alquiler mensual."],
  ["Transmití confianza", "Una web profesional con dominio propio, pagos seguros y envíos integrados le da a tu marca el respaldo que un perfil de redes no puede ofrecer."],
];
const ecommerceRight = [
  ["Gestión de catálogo y stock", "Cargá productos, variantes y precios en minutos, sin planillas eternas. Sincronizá inventario y alertas para no vender lo que no hay."],
  ["Diseño estratégico a medida", "Cada elemento cumple una función: guiar al usuario, simplificar la compra y aumentar la conversión. Nada está puesto al azar."],
  ["Tomá decisiones informadas", "Mirá ventas, conversión y ticket promedio en un tablero claro. Detectá qué canales rinden y dónde conviene invertir más."],
  ["Mejor atención en menos tiempo", "El cliente puede ver precios, stock, tiempos y medios de pago sin preguntarte nada. Respondés menos mensajes y vendés más."],
];

export default function Home() {
  const [webScreen, setWebScreen] = useState(0);
  const [shopScreen, setShopScreen] = useState(0);
  const [googleScreen, setGoogleScreen] = useState(0);

  useEffect(() => {
    const onScroll = () => document.documentElement.style.setProperty("--scroll", String(window.scrollY));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWebScreen((value) => (value + 1) % 3);
      setShopScreen((value) => (value + 1) % 3);
      setGoogleScreen((value) => (value + 1) % 3);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <main className="home-page">
    <SiteHeader />

    <section className="hero" id="inicio">
      <ManagedBackgroundVideo
        eager
        className="hero-video"
        src={asset("/media/hero.mp4")}
        poster={asset("/media/hero-poster.webp")}
      />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <DarkGridBackground />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
      <div className="tech-frame frame-right"><i/><span>DIGITAL SYSTEMS</span><b>2026</b></div>
      <div className="data-line line-a"><span>STRATEGY</span><i/></div><div className="data-line line-b"><span>RESULTS</span><i/></div>
      <div className="hero-center">
        <p className="availability"><i/> Más estrategia, más resultados</p>
        <h1>
          <span className="hero-title-desktop">Expertos en crear webs</span>
          <em className="hero-title-desktop">que atraen clientes y ventas</em>
          <span className="hero-title-mobile" aria-label="Expertos en crear webs que atraer clientes y ventas">
            <span>Expertos en</span>
            <span>Crear webs</span>
            <span>Que atraer</span>
            <span>Clientes y ventas</span>
          </span>
        </h1>
        <p className="hero-copy"><b>Sitios web, tiendas online y marketing digital</b> para que tu empresa venda más y más fácil.</p>
        <div className="hero-actions">
          <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span className="desktop-only">Quiero una asesoría sin cargo</span><span className="mobile-only">Quiero contactarme</span></a>
          <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span></a>
        </div>
        <div className="hero-clients"><HeroLogoTrack /></div>
      </div>
      <div className="hero-caption">DISEÑO WEB & MARKETING DIGITAL</div>
      <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
    </section>

    <LightGridFrame className="home-services-grid">
    <section className="statement white-section shared-section-bg" id="web">
      <div className="statement-copyblock" data-reveal>
        <img className="happy-clients" src={asset("/media/happy-clients.png")} alt="Más de 2000 clientes felices" />
        <h2><span>Webs de alto impacto</span><em>ideadas para generar <b>confianza y resultados</b></em></h2>
        <h3><b>Posicioná tu marca</b> con una <b>comunicación digital efectiva</b></h3>
        <p className="statement-copy">Creamos <b>sitios web pensados para transmitir autoridad, confianza y generar contactos reales.</b> Desde el diseño a medida hasta el contenido, todo está enfocado en convertir visitas en potenciales clientes. Contactanos y coordinamos una asesoría online sin cargo para conocer tu negocio y sus desafíos, identificar oportunidades y proponerte ideas concretas para crecer con mejores resultados.</p>
        <a className="orange-cta" href="https://wa.link/wgb5pk">CHARLEMOS DE TU PROYECTO</a>
      </div>
      <div className="screen-swap" data-reveal>
        {[1,2,3].map((n, index) => <div key={n} className={`screen-frame ${webScreen === index ? "active" : ""}`}><img src={asset(`/media/screen-${n}.png`)} alt={`Proyecto web ${n}`} /></div>)}
        <div className="screen-dots">{[0,1,2].map((n) => <button key={n} className={webScreen === n ? "active" : ""} onClick={() => setWebScreen(n)} aria-label={`Ver pantalla ${n + 1} de diseño web`} />)}</div>
      </div>
    </section>

    <section className="ecommerce white-section shared-section-bg" id="tiendas">
      <div className="section-heading" data-reveal><p>ECOMMERCE ESTRATÉGICO</p><h2>¿Necesitás una tienda online para automatizar tus ventas?</h2><span><b>Automatizá tus ventas</b> con una <b>tienda diseñada para convertir</b>: estrategia, procesos simples y <b>tecnología que trabaja por vos.</b> Es escalable, segura y pensada para crecer con tu negocio.</span></div>
      <div className="shop-layout">
        <div className="shop-column">{ecommerceLeft.map(([title, copy]) => <article key={title} data-reveal><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="phone-stage phone-swap">
          {[1,2,3].map((number, index) => <img key={number} className={shopScreen === index ? "active" : ""} src={asset(`/media/shop-screen-${number}.png`)} alt={`Pantalla ${number} de tienda online desarrollada por Ideamos`}/>)}
          <div className="screen-dots">{[0,1,2].map((n) => <button key={n} className={shopScreen === n ? "active" : ""} onClick={() => setShopScreen(n)} aria-label={`Ver pantalla ${n + 1} de tienda online`} />)}</div>
        </div>
        <div className="shop-column">{ecommerceRight.map(([title, copy]) => <article key={title} data-reveal><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
      <div className="ecommerce-actions"><a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una tienda online</span></a><a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span className="desktop-only">Quiero hablar con un experto</span><span className="mobile-only">Contacta un experto</span></a></div>
    </section>

    <section className="google-scene white-section shared-section-bg" id="google">
      <div className="google-content" data-reveal>
        <p>POSICIONAMIENTO EN GOOGLE</p>
        <h2>Convertimos tu web en una máquina de generar tráfico, leads y ventas</h2>
        <h3><b>Liderá Google</b> con estrategias de <b>SEO y Google Ads</b></h3>
        <p className="body-copy"><b>Traemos a tu web personas que ya buscan lo que ofrecés</b> y las convertimos en consultas. Con Google Ads te mostramos primero cuando te buscan y las llevamos a contactarte. Con posicionamiento en Google hacemos que te encuentren sin pagar cada clic. Medimos llamadas y mensajes para invertir donde rinde más.</p>
        <a className="orange-cta" href="https://wa.link/wgb5pk"><span className="desktop-only">QUIERO ESTAR PRIMERO EN GOOGLE</span><span className="mobile-only">CONTACTANOS HOY</span></a>
      </div>
          <div className="google-visual google-swap" aria-label="Proyecto web FroSZ">
            {[1, 2, 3].map((item, index) => (
              <img
                key={item}
                className={googleScreen === index ? "active" : ""}
                src={asset(`/media/frosz-screen-${item}.png`)}
                alt={index === 0 ? "Proyecto web FroSZ desarrollado por Ideamos" : ""}
                aria-hidden={index !== 0}
              />
            ))}
            <div className="screen-dots">{[0,1,2].map((n) => <button key={n} className={googleScreen === n ? "active" : ""} onClick={() => setGoogleScreen(n)} aria-label={`Ver pantalla ${n + 1} de posicionamiento`} />)}</div>
          </div>
    </section>
    </LightGridFrame>

    <PortfolioSection darkGrid />

    <LightGridFrame className="home-closing-light-grid">
      <HomeTestimonials />
      <div className="home-logo-marquee" aria-hidden="true">
        <DarkGridBackground />
        <HeroLogoTrack />
      </div>
      <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
