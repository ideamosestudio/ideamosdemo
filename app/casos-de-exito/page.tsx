import type { Metadata } from "next";
import ManagedBackgroundVideo from "../components/ManagedBackgroundVideo";
import { HomeClosingSections } from "../../components/SharedHomeSections";
import SiteHeader from "../../components/SiteHeader";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

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

    <HomeClosingSections showAdvisory={false} />
  </main>;
}
