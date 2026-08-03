import type { Metadata } from "next";
import ManagedBackgroundVideo from "../components/ManagedBackgroundVideo";
import { HomeClosingSections } from "../../components/SharedHomeSections";
import SiteHeader from "../../components/SiteHeader";
import "./casos.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Work = { src: string; alt: string; format: "wide" | "phone" };

const firstRow: Work[] = [
  { src: "/media/casos-exito/desk-001.jpg", alt: "Sitio web Águilas de Oro", format: "wide" },
  { src: "/media/casos-exito/desk-002.jpg", alt: "Sitio web Garware Argentina", format: "wide" },
  { src: "/media/casos-exito/phone-001.jpg", alt: "Experiencia mobile para ONER VFX", format: "phone" },
  { src: "/media/casos-exito/desk-003.jpg", alt: "Sitio web Maqmax", format: "wide" },
  { src: "/media/casos-exito/desk-004.jpg", alt: "Sitio web Xtreme D10", format: "wide" },
  { src: "/media/casos-exito/phone-002.jpg", alt: "Experiencia mobile para ecommerce de moda", format: "phone" },
  { src: "/media/casos-exito/desk-005.jpg", alt: "Sitio institucional Empire Funds", format: "wide" },
  { src: "/media/casos-exito/desk-006.jpg", alt: "Sitio web ONER VFX", format: "wide" },
];

const secondRow: Work[] = [
  { src: "/media/casos-exito/phone-003.jpg", alt: "Experiencia mobile Empire Funds", format: "phone" },
  { src: "/media/casos-exito/desk-007.jpg", alt: "Tienda online Trébol Café", format: "wide" },
  { src: "/media/casos-exito/desk-008.jpg", alt: "Portfolio de trabajos ONER VFX", format: "wide" },
  { src: "/media/casos-exito/desk-009.jpg", alt: "Sitio web Equinox Training", format: "wide" },
  { src: "/media/casos-exito/phone-004.jpg", alt: "Experiencia mobile Mixxerport", format: "phone" },
  { src: "/media/casos-exito/desk-010.jpg", alt: "Concepto digital AirPods Pro", format: "wide" },
  { src: "/media/casos-exito/desk-011.jpg", alt: "Presentación de proyecto ONER VFX en tablet", format: "wide" },
];

function WorkGroup({ works, duplicate = false }: { works: Work[]; duplicate?: boolean }) {
  return <div className="cases-marquee-group" aria-hidden={duplicate || undefined}>
    {works.map((work) => <article className={`case-card is-${work.format}`} key={work.src}>
      <img src={asset(work.src)} alt={work.alt} loading="lazy" />
    </article>)}
  </div>;
}

function WorkRow({ works, reverse = false }: { works: Work[]; reverse?: boolean }) {
  return <div className={`cases-marquee ${reverse ? "is-reverse" : ""}`}>
    <div className="cases-marquee-track">
      <WorkGroup works={works} />
      <WorkGroup works={works} duplicate />
    </div>
  </div>;
}

export const metadata: Metadata = {
  title: "Casos de éxito — Ideamos",
  description: "Conocé proyectos, estrategias y resultados reales logrados junto a nuestros clientes.",
};

export default function Page() {
  return <main className="internal-page cases-page">
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero" id="inicio">
      <ManagedBackgroundVideo
        eager
        className="hero-video"
        src={asset("/media/hero.mp4")}
        poster={asset("/media/hero-poster.webp")}
      />
      <div className="hero-overlay" />
      <div className="hero-aurora" />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
      <div className="tech-frame frame-right"><i/><span>CASOS REALES</span><b>2026</b></div>
      <div className="data-line line-a"><span>ESTRATEGIA</span><i/></div>
      <div className="data-line line-b"><span>RESULTADOS</span><i/></div>

      <div className="hero-center">
        <p className="availability"><i/> CASOS DE ÉXITO</p>
        <h1>
          <span className="hero-title-line">Historias reales.</span>
          <span className="hero-title-line">Resultados que hablan.</span>
        </h1>
        <p className="hero-copy">Conocé cómo transformamos desafíos de negocio en experiencias digitales que generan confianza, crecimiento y resultados.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href="#contacto"><span>Quiero lograr resultados</span></a>
          <a className="cta-glow secondary" href="#contacto"><span>Contanos tu proyecto</span></a>
        </div>
      </div>

      <div className="hero-caption">ESTRATEGIA, DISEÑO &amp; RESULTADOS</div>
      <div className="scroll-line"><span>CONVERSEMOS</span><i/></div>
    </section>

    <section className="cases-intro" aria-labelledby="cases-intro-title">
      <div className="cases-intro-copy">
        <p className="cases-kicker"><i/> MÁS DE 2000 CLIENTES FELICES</p>
        <h2 id="cases-intro-title">Diseñamos experiencias que generan confianza y resultados.</h2>
        <h3><b>Potenciamos tu marca</b> con una comunicación digital efectiva.</h3>
        <p>Creamos sitios web pensados para transmitir autoridad, diferenciarte y generar contactos reales. Cada proyecto combina estrategia, diseño y tecnología para convertir una idea en una experiencia que impulsa tu negocio.</p>
        <a className="cases-action" href="#contacto">Charlemos de tu proyecto <span aria-hidden="true">↗</span></a>
      </div>
      <div className="cases-featured-work" aria-label="Proyecto destacado Trébol Café">
        <i className="cases-featured-shape" aria-hidden="true" />
        <div className="cases-featured-device">
          <img src={asset("/media/casos-exito/desk-007.jpg")} alt="Tienda online de Trébol Café desarrollada por Ideamos" loading="lazy" />
        </div>
        <p><span>PROYECTO DESTACADO</span><b>Trébol Café</b></p>
      </div>
    </section>

    <section className="cases-work" aria-labelledby="selected-work-title">
      <header className="cases-work-heading">
        <p>TRABAJOS REALIZADOS</p>
        <h2 id="selected-work-title">Proyectos que<br/>hablan por nosotros.</h2>
        <span>Una selección de experiencias digitales creadas para marcas de distintas industrias.</span>
      </header>
      <div className="cases-marquee-stage">
        <WorkRow works={firstRow} />
        <WorkRow works={secondRow} reverse />
      </div>
    </section>

    <HomeClosingSections showAdvisory={false} />
  </main>;
}
