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
        <p className="availability"><i/> Más estrategia, más resultados</p>
        <h1>
          <span className="hero-title-desktop">Expertos en crear webs</span>
          <em className="hero-title-desktop">que atraen clientes y ventas</em>
          <span className="hero-title-mobile" aria-label="Expertos en crear webs que atraen clientes y ventas">
            <span>Expertos en</span>
            <span>crear webs</span>
            <span>que atraen</span>
            <span>clientes y ventas</span>
          </span>
        </h1>
        <p className="hero-copy"><b>Sitios web, tiendas online y marketing digital</b> para que tu empresa venda más y más fácil.</p>
        <div className="hero-actions">
          <a className="cta-glow primary" href={WHATSAPP_URL}><span className="desktop-only">Quiero una asesoría sin cargo</span><span className="mobile-only">Contactanos</span></a>
          <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Quiero contactar un experto</span></a>
        </div>
        <div className="hero-clients"><HeroLogoTrack /></div>
      </div>
    </section>

    <LightGridFrame className="home-services-grid">
    <section className="statement white-section shared-section-bg" id="web">
      <div className="statement-copyblock" data-reveal>
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
        <h2><span>Webs de alto impacto</span><em>ideadas para generar<br className="statement-title-desktop-break"/><b>confianza y resultados</b></em></h2>
        <h3><b>Más confianza. Más consultas. Más ventas.</b></h3>
        <p className="statement-copy">
          <span className="statement-copy-line"><b>Creamos sitios web diseñados para transmitir autoridad, generar</b></span>
          <span className="statement-copy-line"><b>confianza y convertir visitas en consultas reales.</b> Cada decisión,</span>
          <span className="statement-copy-line">desde el diseño hasta el contenido, está orientada a potenciar tu</span>
          <span className="statement-copy-line">negocio. <b>Charlemos:</b> te asesoramos sin cargo, conocemos tus objetivos</span>
          <span className="statement-copy-line">y te proponemos mejoras concretas para generar mejores resultados.</span>
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

    <section className="google-scene white-section shared-section-bg" id="google">
      <div className="google-content" data-reveal>
        <p>POSICIONAMIENTO EN GOOGLE</p>
        <h2>Convertimos tu web en una máquina de generar tráfico, leads y ventas</h2>
        <h3><b>Liderá Google</b> con estrategias de <b>SEO y Google Ads</b></h3>
        <p className="body-copy"><b>Traemos a tu web personas que ya buscan lo que ofrecés</b> y las convertimos en consultas. Con Google Ads te mostramos primero cuando te buscan y las llevamos a contactarte. Con posicionamiento en Google hacemos que te encuentren sin pagar cada clic. Medimos llamadas y mensajes para invertir donde rinde más.</p>
        <a className="orange-cta" href={WHATSAPP_URL}><span className="desktop-only">QUIERO ESTAR PRIMERO EN GOOGLE</span><span className="mobile-only">Contactanos</span></a>
      </div>
      <GoogleScreenRotator />
    </section>
    </LightGridFrame>

    <section className="service-guide service-directory" aria-labelledby="explorar-servicios">
      <div className="service-directory__inner">
        <div className="service-directory__intro">
          <p className="service-directory__eyebrow">SOLUCIONES DIGITALES</p>
          <h2 id="explorar-servicios">Diseño web y marketing digital para <span>tu empresa.</span></h2>
          <p className="service-directory__description">Desde Buenos Aires, acompañamos a empresas de Argentina con diseño, estrategia y tecnología. Encontrá la solución para el próximo paso de tu negocio.</p>
          <a className="service-directory__cases" href={asset("/casos-de-exito/")}>Conocé nuestros casos de éxito <span aria-hidden="true">↗</span></a>
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
              <span className="service-directory__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </section>

    <PortfolioDriftWall />

    <LightGridFrame className="home-closing-light-grid">
      <HomeTestimonials />
      <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
