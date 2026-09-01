"use client";

import { useEffect, useState } from "react";
import { pauseManagedBackgroundVideos } from "../app/components/ManagedBackgroundVideo";
import { testimonials } from "../lib/testimonials";
import TestimonialCard from "./TestimonialCard";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

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
    <TestimonialCard
      key={testimonial.name}
      testimonial={testimonial}
      headingId="home-testimonials-title"
      onPlay={() => setOpenVideo(active)}
      announce
      controls={<div className="home-testimonials__controls" aria-label="Cambiar testimonio">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Testimonio anterior">←</button>
          <div>{testimonials.map((item, index) => <button key={item.name} className={active === index ? "is-active" : ""} type="button" onClick={() => setActive(index)} aria-label={`Ver testimonio de ${item.name}`} />)}</div>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Siguiente testimonio">→</button>
        </div>}
    />

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
