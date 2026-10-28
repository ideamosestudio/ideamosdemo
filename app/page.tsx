import type { CSSProperties } from "react";
import ManagedBackgroundVideo from "./components/ManagedBackgroundVideo";
import { HeroChrome, HeroLogoTrack, HomeAdvisorySection, HomeClosingSections } from "../components/SharedHomeSections";
import SiteHeader from "../components/SiteHeader";
import PortfolioDriftWall from "../components/PortfolioDriftWall";
import LightGridFrame from "../components/LightGridFrame";
import HomeTestimonials from "../components/HomeTestimonials";
import {
  GoogleScreenRotator,
  HomeEnhancements,
  ShopScreenRotator,
  WebScreenRotator,
} from "../components/HomeClientEnhancements";
import { WHATSAPP_URL } from "../lib/whatsapp";
import ArrowIcon from "../components/ArrowIcon";

const moduleBaseStyles = `
#site-root .home-page .hero h1>.hero-title-desktop{padding:.05em .1em .11em;margin:-.05em -.1em -.11em;overflow:visible}
#site-root#site-root .home-page .service-directory__contact{display:inline-flex!important;align-items:center;justify-content:center;min-height:58px;padding:0 35px!important;border:2px solid #e64a00!important;border-radius:999px!important;background:transparent!important;color:#f7f7f7!important;font:700 13px/1.2 "Poppins",Arial,sans-serif!important;letter-spacing:1px!important;text-align:center!important;text-transform:uppercase;box-shadow:none!important}
#site-root#site-root .home-page .service-directory__contact:after{display:none!important}
#site-root#site-root .home-page .service-directory__contact>span{text-align:center!important}
#site-root#site-root .home-page .service-directory__contact:is(:hover,:focus-visible){border-color:#ff5a00!important;background:linear-gradient(105deg,#ff6200,#c82400)!important;color:#fff!important;letter-spacing:2px!important;box-shadow:0 0 18px rgba(255,78,0,.35),0 0 38px rgba(255,78,0,.18)!important;transform:none!important}
@media(max-width:600px){#site-root#site-root .home-page .service-directory__contact{width:100%;max-width:360px;padding-inline:24px!important}}
#site-root .home-page [data-module-base] .module-base-copy{margin:0!important;color:#000!important;font:300 15px/1.65 "Roboto Light","Roboto",Arial,sans-serif!important;letter-spacing:normal!important;overflow-wrap:normal;word-break:normal;hyphens:none}
#site-root .home-page [data-module-base] :is(.module-base-copy__group,.module-base-copy__line){display:block}
#site-root .home-page [data-module-base] .module-base-copy__group+.module-base-copy__group{margin-top:1.65em}
#site-root .home-page [data-module-base] .module-base-copy b{color:#000!important;font:900 15px/1.65 "Roboto Light","Roboto",Arial,sans-serif!important;-webkit-text-stroke:.18px currentColor}
#site-root .home-page [data-module-base] .module-base-copy+.orange-cta{min-height:58px!important;margin-top:40px!important;padding-inline:35px!important}
@media(min-width:981px){#site-root .home-page [data-module-base] .module-base h2{margin:0 0 30px!important;font-size:clamp(46px,2.8vw,53px)!important;line-height:1!important}#site-root .home-page [data-module-base] .module-base h3{margin:0 0 26px!important;font-size:clamp(22px,1.3vw,24px)!important;line-height:1.35!important;letter-spacing:normal!important}}
@media(min-width:1101px){#site-root .home-page [data-module-base]{padding-block:118px!important}#site-root .home-page :is([data-module-base].statement .happy-clients,[data-module-base].google-scene .google-content>p:first-child){margin-bottom:26px!important}}
@media(min-width:1401px){#site-root .home-page [data-module-base] .module-base-copy__line{white-space:nowrap}}
`;

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
  return <main className="home-page">
    <style data-module-base-rules>{moduleBaseStyles}</style>
    <HomeEnhancements />
    <SiteHeader />

    <section className="hero" id="inicio">
      <ManagedBackgroundVideo
        eager
        className="hero-video"
        src={asset("/media/hero.mp4")}
        poster={asset("/media/hero-poster.webp")}
      />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <HeroChrome />
      <div className="hero-center">
        <p className="availability" style={{ color: "#dedee2" }}>
          <i/>
          <span className="desktop-only">DISEÑO WEB Y MARKETING DIGITAL</span>
          <span className="mobile-only">DISEÑO WEB Y MKT DIGITAL</span>
        </p>
        <h1>
          <span className="hero-title-desktop">Experiencias digitales</span>
          <em className="hero-title-desktop">que atraen clientes y ventas</em>
          <span className="hero-title-mobile">
            <span>Diseño web y</span>
            <span>tiendas online</span>
            <span>para <span className="hero-title-accent">hacer crecer</span></span>
            <span className="hero-title-accent">tu negocio.</span>
          </span>
        </h1>
        <p className="hero-copy"><span className="desktop-only"><b>Sitios web, tiendas online y marketing digital</b> para que tu empresa venda más y más fácil.</span><span className="mobile-only">Combinamos diseño y estrategia para convertir visitas en consultas y ventas.</span></p>
        <div className="hero-actions">
          <a className="cta-glow primary" href={WHATSAPP_URL}><span className="desktop-only">Quiero una asesoría sin cargo</span><span className="mobile-only">Quiero una asesoría</span></a>
          <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Quiero contactar un experto</span></a>
        </div>
        <p className="hero-assurance mobile-only">Sin cargo</p>
        <div className="hero-work-mobile">
          <a className="hero-work-scene" href={asset("/portfolio/")} aria-label="Ver nuestro portfolio de diseño web y tiendas online">
            <div className="hero-work-laptop">
              <div className="hero-work-screen">
                <img src={asset("/media/hero-concept-architecture.webp")} width="1000" height="667" alt="Concepto visual de un sitio de arquitectura premium" loading="lazy" decoding="async" />
              </div>
            </div>
            <div className="hero-work-phone">
              <img src={asset("/media/hero-concept-fashion.webp")} width="420" height="887" alt="Concepto visual de tienda de moda ÉLAN" loading="lazy" decoding="async" />
            </div>
          </a>
        </div>
        <div className="hero-clients"><HeroLogoTrack /></div>
      </div>
    </section>

    <section className="service-guide service-directory" aria-labelledby="explorar-servicios">
      <div className="service-directory__inner">
        <div className="service-directory__intro">
          <p className="service-directory__eyebrow">SOLUCIONES DIGITALES</p>
          <h2 id="explorar-servicios">Diseño web y marketing digital para <span>tu empresa.</span></h2>
          <p className="service-directory__description">Desde Buenos Aires, acompañamos a empresas de Argentina con diseño, estrategia y tecnología. Encontrá la solución para el próximo paso de tu negocio.</p>
          <a className="service-directory__contact cta-glow secondary" href={WHATSAPP_URL}>
            <span className="desktop-only">QUIERO ASESORAMIENTO PARA MI PROYECTO</span>
            <span className="mobile-only">QUIERO CONTACTARME</span>
          </a>
        </div>
        <nav className="service-directory__services" aria-label="Explorar servicios de Ideamos">
          {[
            { path: "/diseno-web-autoadministrable/", title: "Diseño web", description: "Sitios profesionales que presentan tu empresa y facilitan las consultas." },
            { path: "/tiendas-online/", title: "Tiendas online", description: "Diseño y desarrollo de ecommerce para llevar tu negocio más lejos." },
            { path: "/posicionamiento-web/", title: "SEO y Google Ads", description: "Posicionamiento web para conectar con quienes buscan lo que ofrecés." },
            { path: "/marketing-digital/", title: "Marketing digital", description: "Estrategia, contenido y campañas con objetivos claros." },
          ].map((service, index) => (
            <a className="service-directory__item" href={asset(service.path)} key={service.path}>
              <span className="service-directory__number" aria-hidden="true">0{index + 1}</span>
              <span className="service-directory__copy">
                <span className="service-directory__title">{service.title}</span>
                <span className="service-directory__detail">{service.description}</span>
              </span>
              <span className="service-directory__arrow" aria-hidden="true"><ArrowIcon /></span>
            </a>
          ))}
        </nav>
      </div>
    </section>

    <LightGridFrame className="home-services-grid">
    <section className="statement white-section shared-section-bg" id="web" data-module-base>
      <div className="statement-copyblock module-base" data-reveal>
        <div className="happy-clients" aria-label="Más de 2000 clientes felices">
          <span className="happy-clients-avatars" aria-hidden="true">
            {["003", "002", "001"].map((name, index) => (
              <img
                key={name}
                src={asset(`/media/client-${name}.webp`)}
                alt=""
                width="326"
                height="322"
                loading="lazy"
                decoding="async"
                style={{ "--avatar-index": index } as CSSProperties}
              />
            ))}
          </span>
          <span className="happy-clients-label">MÁS DE 2000 CLIENTES FELICES</span>
        </div>
        <h2><span>Webs de alto impacto</span><em>ideadas para generar{" "}<br className="statement-title-desktop-break"/><b>confianza y resultados</b></em></h2>
        <h3><b>Más confianza. Más consultas. Más ventas.</b></h3>
        <p className="statement-copy module-base-copy">
          <span className="module-base-copy__group">
            <span className="module-base-copy__line">Creamos webs que <b>transmiten autoridad</b> y convierten visitas en consultas.</span>
            <span className="module-base-copy__line"><b>Diseño y contenido</b> trabajan juntos para potenciar tu negocio.</span>
          </span>
          <span className="module-base-copy__group">
            <span className="module-base-copy__line">Analizamos tus objetivos y proponemos <b>mejoras concretas</b>.</span>
            <span className="module-base-copy__line"><b>Charlemos de tu proyecto</b> y encontremos la mejor solución.</span>
          </span>
        </p>
        <a className="orange-cta" href={WHATSAPP_URL}><span className="desktop-only">CHARLEMOS DE TU PROYECTO</span><span className="mobile-only">Contactanos</span></a>
      </div>
      <WebScreenRotator />
    </section>

    <section className="ecommerce white-section shared-section-bg" id="tiendas">
      <div className="section-heading" data-reveal><p>ECOMMERCE ESTRATÉGICO</p><h2>¿Necesitás una tienda online para automatizar tus ventas?</h2><span><b>Automatizá tus ventas</b> con una <b>tienda diseñada para convertir</b>: estrategia, procesos simples y <b>tecnología que trabaja por vos.</b> Es escalable, segura y pensada para crecer con tu negocio.</span></div>
      <div className="shop-layout">
        <div className="shop-column">{ecommerceLeft.map(([title, copy]) => <article key={title} data-reveal><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <ShopScreenRotator />
        <div className="shop-column">{ecommerceRight.map(([title, copy]) => <article key={title} data-reveal><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
      <div className="ecommerce-actions"><a className="cta-glow primary" href={WHATSAPP_URL}><span className="desktop-only">Quiero una tienda online</span><span className="mobile-only">Contactanos</span></a><a className="cta-glow secondary" href={WHATSAPP_URL}><span className="desktop-only">Quiero hablar con un experto</span><span className="mobile-only">Contacta un experto</span></a></div>
    </section>

    <section className="google-scene white-section shared-section-bg" id="google" data-module-base>
      <div className="google-content module-base" data-reveal>
        <p>POSICIONAMIENTO EN GOOGLE</p>
        <h2>Convertimos tu web en una máquina de generar tráfico, leads y ventas</h2>
        <h3><b>Liderá Google</b> con estrategias de <b>SEO y Google Ads</b></h3>
        <p className="body-copy module-base-copy">
          <span className="module-base-copy__group">
            <span className="module-base-copy__line">Atraemos personas que ya buscan <b>lo que ofrecés</b> y generamos consultas.</span>
            <span className="module-base-copy__line">Combinamos <b>SEO y Google Ads</b> para darte visibilidad y mejores resultados.</span>
          </span>
          <span className="module-base-copy__group">
            <span className="module-base-copy__line">Medimos llamadas y mensajes para invertir <b>donde realmente rinde</b>.</span>
            <span className="module-base-copy__line"><b>Hablemos de tu negocio</b> y armemos una estrategia para crecer.</span>
          </span>
        </p>
        <a className="orange-cta" href={WHATSAPP_URL}><span className="desktop-only">QUIERO ESTAR PRIMERO EN GOOGLE</span><span className="mobile-only">Contactanos</span></a>
      </div>
      <GoogleScreenRotator />
    </section>
    </LightGridFrame>

    <PortfolioDriftWall />

    <LightGridFrame className="home-closing-light-grid">
      <HomeTestimonials />
      <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
