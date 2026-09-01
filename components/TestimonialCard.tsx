import type { ReactNode } from "react";
import { WHATSAPP_URL } from "../lib/whatsapp";
import { testimonials } from "../lib/testimonials";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

type Testimonial = (typeof testimonials)[number];

export default function TestimonialCard({
  testimonial,
  headingId,
  onPlay,
  controls,
  announce = false,
}: {
  testimonial: Testimonial;
  headingId: string;
  onPlay: () => void;
  controls?: ReactNode;
  announce?: boolean;
}) {
  return <div className="home-testimonials__slide" aria-live={announce ? "polite" : undefined}>
    <div className="home-testimonials__copy">
      <p>TESTIMONIOS</p>
      <h2 id={headingId} aria-label={`“${testimonial.quote}”`}>
        <span className="home-testimonials__title-desktop" aria-hidden="true">
          {testimonial.desktopLines.map((line, index) => <span key={line}>{index === 0 ? "“" : ""}{line}{index === testimonial.desktopLines.length - 1 ? "”" : ""}</span>)}
        </span>
        <span className="home-testimonials__title-mobile" aria-hidden="true">“{testimonial.quote}”</span>
      </h2>
      <div className="home-testimonials__rating" aria-label="5 de 5 estrellas">★★★★★ <small>(5.0)</small></div>
      <div className="home-testimonials__person">
        <img src={asset(testimonial.avatar)} alt="" loading="lazy" decoding="async" />
        <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
      </div>
      <div className="home-testimonials__actions">
        <a className="orange-cta" href={WHATSAPP_URL}><span className="desktop-only">CHATEÁ CON UN EXPERTO</span><span className="mobile-only">Contactanos</span></a>
        {testimonial.site && <a className="orange-cta home-testimonials__site" href={testimonial.site} target="_blank" rel="noreferrer">VER SITIO WEB</a>}
      </div>
    </div>

    <div className="home-testimonials__visual">
      <button className="home-testimonials__media" type="button" onClick={onPlay} aria-label={`Ver video testimonial de ${testimonial.name}`}>
        <img src={asset(testimonial.image)} alt={testimonial.alt} loading="lazy" decoding="async" />
        <span className="home-testimonials__play" aria-hidden="true">▶</span>
      </button>
      {controls}
    </div>
  </div>;
}
