"use client";

import { useEffect, useState } from "react";
import { pauseManagedBackgroundVideos } from "../app/components/ManagedBackgroundVideo";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const testimonials = [
  {
    quote: "Notamos un cambio real: Más consultas, más movimiento y sobretodo, más ventas",
    desktopLines: ["Notamos un cambio real:", "Más consultas, más movimiento", "y sobretodo, más ventas"],
    name: "Pablo Avila",
    role: "Coordinador de CYL S.A.",
    image: "/media/testimonials/cylsa-image.png",
    avatar: "/media/testimonials/cylsa-avatar.png",
    video: "/media/testimonials/cylsa.mp4",
    site: "https://www.cylneumaticos.com.ar/",
    alt: "Pablo Avila en las oficinas de CYL S.A.",
  },
  {
    quote: "En Estudio Ideamos desde el primer momento entendieron que estaba buscando",
    desktopLines: ["En Estudio Ideamos desde el", "primer momento entendieron", "que estaba buscando"],
    name: "Rodolfo Merino",
    role: "Gerente de MR Ingeniería",
    image: "/media/testimonials/mr-image.jpg",
    avatar: "/media/testimonials/mr-avatar.png",
    video: "/media/testimonials/mr.mp4",
    site: "https://estudioideamos.github.io/mr-ingenieria-estructural/",
    alt: "Rodolfo Merino de MR Ingeniería",
  },
  {
    quote: "Nos acompañaron e hicieron un trabajo muy profesional. Les recomiendo a Ideamos",
    desktopLines: [
      "Nos acompañaron e hicieron",
      "un trabajo muy profesional.",
      "Les recomiendo a Ideamos",
    ],
    name: "Berenice Cura",
    role: "Presidente Comunidad Sorda e Hipoacúsica Tandilense",
    image: "/media/testimonials/berenice-cura-image.jpg",
    avatar: "/media/testimonials/berenice-cura-avatar.png",
    video: "/media/testimonials/berenice-cura.mp4",
    site: "https://estudioideamos.github.io/berenice-cura/",
    alt: "Berenice Cura, Presidente de la Comunidad Sorda e Hipoacúsica Tandilense",
  },
];

export default function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const [openVideo, setOpenVideo] = useState<number | null>(null);
  const testimonial = testimonials[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 3000);
    return () => window.clearInterval(timer);
  }, []);

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

  const changeSlide = (direction: number) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return <section className="home-testimonials" aria-labelledby="home-testimonials-title">
    <div className="home-testimonials__slide" key={testimonial.name} aria-live="polite">
      <div className="home-testimonials__copy">
        <p>TESTIMONIOS</p>
        <h2 id="home-testimonials-title" aria-label={`“${testimonial.quote}”`}>
          <span className="home-testimonials__title-desktop" aria-hidden="true">
            {testimonial.desktopLines.map((line, index) => <span key={line}>{index === 0 ? "“" : ""}{line}{index === testimonial.desktopLines.length - 1 ? "”" : ""}</span>)}
          </span>
          <span className="home-testimonials__title-mobile" aria-hidden="true">“{testimonial.quote}”</span>
        </h2>
        <div className="home-testimonials__rating" aria-label="5 de 5 estrellas">★★★★★ <small>(5.0)</small></div>
        <div className="home-testimonials__person">
          <img src={asset(testimonial.avatar)} alt="" />
          <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
        </div>
        <div className="home-testimonials__actions">
          <a className="orange-cta" href={WHATSAPP_URL}><span className="desktop-only">CHATEÁ CON UN EXPERTO</span><span className="mobile-only">Contactanos</span></a>
          {testimonial.site && <a className="orange-cta home-testimonials__site" href={testimonial.site} target="_blank" rel="noreferrer">VER SITIO WEB</a>}
        </div>
      </div>

      <div className="home-testimonials__visual">
        <button className="home-testimonials__media" type="button" onClick={() => setOpenVideo(active)} aria-label={`Ver video testimonial de ${testimonial.name}`}>
          <img src={asset(testimonial.image)} alt={testimonial.alt} />
          <span className="home-testimonials__play" aria-hidden="true">▶</span>
        </button>
        <div className="home-testimonials__controls" aria-label="Cambiar testimonio">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Testimonio anterior">←</button>
          <div>{testimonials.map((item, index) => <button key={item.name} className={active === index ? "is-active" : ""} type="button" onClick={() => setActive(index)} aria-label={`Ver testimonio de ${item.name}`} />)}</div>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Siguiente testimonio">→</button>
        </div>
      </div>
    </div>

    {openVideo !== null && <div className="home-testimonials__modal" role="dialog" aria-modal="true" aria-label={`Video testimonial de ${testimonials[openVideo].name}`} onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpenVideo(null);
    }}>
      <div className="home-testimonials__modal-card">
        <button className="home-testimonials__close" type="button" onClick={() => setOpenVideo(null)} aria-label="Cerrar video">×</button>
        <video autoPlay controls playsInline poster={asset(testimonials[openVideo].image)}>
          <source src={asset(testimonials[openVideo].video)} type="video/mp4" />
        </video>
      </div>
    </div>}
  </section>;
}
