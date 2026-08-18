import type { Metadata } from "next";
import ManagedBackgroundVideo from "../components/ManagedBackgroundVideo";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections } from "../../components/SharedHomeSections";
import LightGridFrame from "../../components/LightGridFrame";
import SiteHeader from "../../components/SiteHeader";
import PortfolioSection from "../../components/PortfolioSection";
import TestimonialSection from "../../components/TestimonialSection";
import "./casos.css";

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
      <HeroChrome />

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
    </section>

    <LightGridFrame className="cases-light-grid">
    <section className="cases-intro" aria-labelledby="cases-intro-title">
      <div className="cases-intro-copy">
        <p className="cases-kicker"><i/> MÁS DE 2000 CLIENTES FELICES</p>
        <h2 id="cases-intro-title">Diseñamos experiencias que generan confianza y resultados.</h2>
        <h3><b>Potenciamos tu marca</b> con una comunicación digital efectiva.</h3>
        <p>Creamos sitios web pensados para transmitir autoridad, diferenciarte y generar contactos reales. Cada proyecto combina estrategia, diseño y tecnología para convertir una idea en una experiencia que impulsa tu negocio.</p>
        <a className="cases-action" href="#contacto">Charlemos de tu proyecto</a>
      </div>
      <div className="cases-featured-work" aria-label="Proyecto destacado Trébol Café">
        <i className="cases-featured-shape" aria-hidden="true" />
        <div className="cases-featured-device">
          <img src={asset("/media/casos-exito/desk-007.jpg")} alt="Tienda online de Trébol Café desarrollada por Ideamos" loading="lazy" />
        </div>
        <p><span>PROYECTO DESTACADO</span><b>Trébol Café</b></p>
      </div>
    </section>
    </LightGridFrame>

    <PortfolioSection />

    <LightGridFrame className="cases-light-grid">
      <TestimonialSection />
      <HomeAdvisorySection />
    </LightGridFrame>

    <HomeClosingSections showAdvisory={false} />
  </main>;
}
