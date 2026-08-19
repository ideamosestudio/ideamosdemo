"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections } from "./SharedHomeSections";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const whatsapp = "https://wa.link/wgb5pk";

const adsBenefits = [
  ["Llegá a tu público objetivo", "Google Ads te permite segmentar tus anuncios de forma precisa y mostrar tus productos o servicios a las personas adecuadas en el momento oportuno."],
  ["Resultados rápidos", "A diferencia del SEO, con Google Ads podés aparecer de inmediato en los primeros resultados y ganar visibilidad frente a potenciales clientes."],
  ["Control total sobre tu presupuesto", "Establecé un presupuesto diario y pagá solo por los clics que recibas, con control claro sobre tus gastos publicitarios."],
  ["Medición y optimización precisa", "Rastreamos el rendimiento y ajustamos las campañas en tiempo real para mejorar el retorno de inversión con datos concretos."],
  ["Complementá tu estrategia de SEO", "Google Ads y SEO trabajando juntos permiten ocupar más espacio en los resultados de búsqueda y aumentar el rendimiento comercial."],
];

const seoBenefits = [
  ["Aumentá tu visibilidad en línea... ¡y tus ventas!", "Tu sitio se mostrará en los primeros resultados de búsqueda y ganará visibilidad ante potenciales clientes."],
  ["Generá tráfico orgánico", "Atraé visitas de calidad de forma natural, sin pagar por anuncios, y construí una fuente constante de oportunidades."],
  ["Mejorá la credibilidad y confianza", "Una buena posición transmite autoridad en tu sector e influye positivamente en la decisión de compra."],
  ["Optimizá la experiencia del usuario", "Mejoramos la navegación y la experiencia del sitio para aumentar las posibilidades de conversión."],
  ["Costo efectivo a largo plazo", "El SEO construye resultados duraderos que se mantienen en el tiempo y generan un retorno de inversión sostenido."],
];

const mapsServices = [
  ["Configuración y optimización de la página de tu negocio", "Completamos y optimizamos nombre, dirección, teléfono, horarios, sitio web y categorías para mejorar tu presencia local."],
  ["Análisis y seguimiento", "Seguimos visualizaciones, clics y acciones de los usuarios para tomar decisiones informadas y mejorar tus resultados."],
  ["Optimización de la ficha de Google Maps", "Hacemos que tu negocio aparezca en búsquedas relevantes con información precisa, atractiva y fácil de encontrar."],
];

function Action({ children }: { children: React.ReactNode }) {
  return <a className="orange-cta pw-action" href={whatsapp}>{children}</a>;
}

function Intro({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return <header className="pw-intro" data-reveal>
    <p>{eyebrow}</p>
    <h2>{title}</h2>
    <span>{children}</span>
  </header>;
}

export default function PosicionamientoWebPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: 0.08 });
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="internal-page posicionamiento-page">
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero pw-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> POSICIONAMIENTO EN GOOGLE</p>
        <h1><span>Escalá en Google</span><span>y potenciá tus ventas hoy</span></h1>
        <p className="hero-copy"><b>Sé la primera opción cuando tus clientes buscan las soluciones que ofrecés.</b><br/>Ponemos a tu empresa en los primeros puestos y hacemos crecer tus ventas.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href={whatsapp}><span>Quiero una asesoría sin cargo</span></a>
          <a className="cta-glow secondary" href={whatsapp}><span>Quiero aparecer primero en Google</span></a>
        </div>
      </div>
    </section>

    <LightGridFrame className="positioning-light-grid">
    <section className="pw-section pw-strategy">
      <Intro eyebrow="POSICIONAMIENTO EN GOOGLE" title={<>Elegí la estrategia adecuada:<br/>¿Google Ads, SEO o ambas?</>}>
        En Ideamos somos expertos en las dos estrategias clave para posicionar tu web en Google y obtener los mayores resultados.
      </Intro>
      <div className="pw-split">
        <div className="pw-copy" data-reveal>
          <p>POSICIONAMIENTO</p>
          <h3>Descubrí las diferencias entre Google Ads y SEO y elegí la estrategia que se ajuste mejor a tu plan de crecimiento</h3>
          <div>El posicionamiento web puede lograrse de dos formas principales: Google Ads y SEO. Ambas estrategias aumentan la visibilidad de tu sitio en los motores de búsqueda, pero utilizan enfoques diferentes.</div>
          <Action>Quiero agendar una asesoría</Action>
        </div>
        <div className="pw-media pw-landscape"><video autoPlay muted loop playsInline preload="metadata"><source src={asset("/media/posicionamiento-video-ads.mp4")} type="video/mp4" /></video></div>
      </div>
    </section>

    <section className="pw-section pw-google">
      <Intro eyebrow="POSICIONAMIENTO EN GOOGLE" title={<>Google Ads: la forma más rápida de<br/>obtener resultados</>}>
        Llegá a quienes ya están buscando lo que ofrecés y convertí esa intención en consultas, clientes y ventas.
      </Intro>
      <div className="pw-split">
        <div className="pw-copy" data-reveal>
          <p>GOOGLE ADS</p>
          <h3>Tu web se mostrará en los primeros resultados de búsqueda de Google, haciendo volar tus ventas</h3>
          <div>Google Ads es una forma rápida de mostrar tu web en las primeras búsquedas. Segmentamos por ubicación, intereses e intención para llegar a tu público objetivo de manera precisa. Solo pagás cuando alguien hace clic.</div>
          <Action>Quiero agendar una asesoría</Action>
        </div>
        <div className="pw-media pw-landscape"><video autoPlay muted loop playsInline preload="metadata"><source src={asset("/media/posicionamiento-google.webm")} type="video/webm" /></video></div>
      </div>
    </section>

    <section className="pw-section pw-ads-benefits">
      <div className="pw-benefits-copy" data-reveal>
        <p>POSICIONAMIENTO</p>
        <h2>Ventajas de Google Ads</h2>
        <div className="pw-benefit-list">{adsBenefits.map(([title, copy]) => <article key={title}><i/><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
        <Action>Chateá con un experto</Action>
      </div>
      <div className="pw-phone" data-reveal><img src={asset("/media/posicionamiento-phone.png")} alt="Panel de rendimiento de campañas de Google Ads en un teléfono" /></div>
    </section>

    </LightGridFrame>

    <section className="pw-wide-video" aria-label="Estrategia de posicionamiento SEO">
      <video autoPlay muted loop playsInline preload="metadata"><source src={asset("/media/posicionamiento-seo.mp4")} type="video/mp4" /></video>
    </section>

    <LightGridFrame className="positioning-light-grid">
    <section className="pw-section pw-seo">
      <Intro eyebrow="POSICIONAMIENTO EN GOOGLE" title={<>Posicionamiento SEO:<br/>dominá los resultados de búsqueda</>}>
        Construí visibilidad duradera, atraé tráfico de calidad y convertí tu sitio en un activo que trabaja todos los días.
      </Intro>
      <div className="pw-seo-lead">
        <div className="pw-copy" data-reveal>
          <p>POSICIONAMIENTO ORGÁNICO</p>
          <h3>Descubrí las ventajas de utilizar SEO para posicionar tu sitio web en Google</h3>
          <div>Optimizamos tu sitio para los motores de búsqueda y para las personas: palabras clave relevantes, contenido de calidad, estructura técnica y autoridad. Los resultados requieren trabajo sostenido, pero sus beneficios son duraderos y no pagás por cada clic.</div>
          <Action>Chateá con un experto</Action>
        </div>
        <div className="pw-tablet"><img src={asset("/media/posicionamiento-tablet.png")} alt="Tablet con panel de posicionamiento SEO en Google" /></div>
      </div>
      <div className="pw-seo-benefits">
        <div className="pw-seo-summary" data-reveal><h2>Ventajas del<br/>posicionamiento SEO:</h2><p>Dominá los resultados de búsqueda, aumentá la visibilidad de tu negocio y generá más oportunidades sin depender de pagar por cada visita.</p></div>
        <div className="pw-benefit-list">{seoBenefits.map(([title, copy]) => <article key={title}><i/><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </div>
    </section>

    <section className="pw-section pw-maps">
      <div className="pw-maps-lead">
        <div className="pw-copy" data-reveal><p>BÚSQUEDAS LOCALES</p><h2>Google «Mi Negocio»:<br/><span>Aparecé en los mapas de Google y vendé más</span></h2><div>Google Mi Negocio te permite administrar y mejorar tu presencia en Google Maps y en las búsquedas locales. Te ayudamos a aprovechar la plataforma y destacarte frente a tu competencia.</div></div>
        <div className="pw-maps-image"><img src={asset("/media/posicionamiento-maps.png")} alt="Teléfono con mapa de Google y marcador de ubicación" /></div>
      </div>
      <div className="pw-maps-grid">{mapsServices.map(([title, copy]) => <article key={title}><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      <div className="pw-center-action"><Action>Chateá con un experto</Action></div>
    </section>

    <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} darkGrid />
  </main>;
}
