"use client";

import { useEffect, useState } from "react";
import ManagedBackgroundVideo, { pauseManagedBackgroundVideos } from "../app/components/ManagedBackgroundVideo";
import { testimonials } from "../lib/testimonials";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections } from "./SharedHomeSections";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";
import TestimonialCard from "./TestimonialCard";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function TestimonialsPage() {
  const [openVideo, setOpenVideo] = useState<number | null>(null);

  useEffect(() => {
    if (openVideo === null) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenVideo(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    pauseManagedBackgroundVideos();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openVideo]);

  return <main className="internal-page testimonials-page">
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero testimonials-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay" />
      <div className="hero-aurora" />
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> TESTIMONIOS DE CLIENTES</p>
        <h1><span>Historias reales.</span><span>Resultados que se sienten.</span></h1>
        <p className="hero-copy">Conocé la experiencia de quienes confiaron en Ideamos para transformar su presencia digital y hacer crecer sus negocios.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href="#testimonios"><span>Ver testimonios</span></a>
          <a className="cta-glow secondary" href="#contacto"><span>Quiero una asesoría</span></a>
        </div>
      </div>
    </section>

    <LightGridFrame className="home-closing-light-grid testimonials-page-stack">
      {testimonials.map((testimonial, index) => <section id={index === 0 ? "testimonios" : undefined} className="home-testimonials testimonials-page-testimonial" aria-labelledby={`testimonials-page-title-${index}`} key={testimonial.name}>
        <TestimonialCard testimonial={testimonial} headingId={`testimonials-page-title-${index}`} onPlay={() => setOpenVideo(index)} />
      </section>)}
    </LightGridFrame>

    <HomeAdvisorySection showMarquee={false} />

    <HomeClosingSections showAdvisory={false} darkGrid />

    {openVideo !== null && <div className="testimonials-modal" role="dialog" aria-modal="true" aria-label={`Video testimonial de ${testimonials[openVideo].name}`} onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpenVideo(null);
    }}>
      <div className="testimonials-modal__card">
        <button type="button" onClick={() => setOpenVideo(null)} aria-label="Cerrar video">×</button>
        <video autoPlay controls playsInline poster={asset(testimonials[openVideo].image)}>
          <source src={asset(testimonials[openVideo].video)} type="video/mp4" />
        </video>
      </div>
    </div>}
  </main>;
}
