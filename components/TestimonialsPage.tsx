"use client";

import { useEffect, useState } from "react";
import ManagedBackgroundVideo, { pauseManagedBackgroundVideos } from "../app/components/ManagedBackgroundVideo";
import { testimonials } from "../lib/testimonials";
import { WHATSAPP_URL } from "../lib/whatsapp";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections } from "./SharedHomeSections";
import LightGridFrame from "./LightGridFrame";
import SiteHeader from "./SiteHeader";

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

    <LightGridFrame className="testimonials-light-grid">
      <section className="testimonials-list" id="testimonios" aria-labelledby="testimonials-title">
        <header className="testimonials-list__intro">
          <p>EXPERIENCIAS REALES</p>
          <h2 id="testimonials-title">Lo que dicen quienes<br/>trabajaron con nosotros</h2>
          <span>Cuatro empresas, cuatro desafíos distintos y una misma forma de trabajar: escuchar, entender y convertir objetivos en resultados concretos.</span>
        </header>

        <div className="testimonials-stack">
          {testimonials.map((testimonial, index) => <article className="testimonials-story" key={testimonial.name}>
            <div className="testimonials-story__copy">
              <small>0{index + 1} — TESTIMONIO</small>
              <blockquote>“{testimonial.quote}”</blockquote>
              <div className="testimonials-story__rating" aria-label="5 de 5 estrellas">★★★★★ <span>(5.0)</span></div>
              <div className="testimonials-story__person">
                <img src={asset(testimonial.avatar)} alt="" loading="lazy" decoding="async" />
                <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
              </div>
              <div className="testimonials-story__actions">
                <a className="orange-cta" href={WHATSAPP_URL}>CHATEÁ CON UN EXPERTO</a>
                <a className="testimonials-story__site" href={testimonial.site} target="_blank" rel="noreferrer">VER SITIO WEB ↗</a>
              </div>
            </div>

            <button className="testimonials-story__media" type="button" onClick={() => setOpenVideo(index)} aria-label={`Ver video testimonial de ${testimonial.name}`}>
              <img src={asset(testimonial.image)} alt={testimonial.alt} loading="lazy" decoding="async" />
              <span aria-hidden="true">▶</span>
            </button>
          </article>)}
        </div>
      </section>

      <HomeAdvisorySection showMarquee={false} />
    </LightGridFrame>

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
