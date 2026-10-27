"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "../../../lib/testimonials";
import { WHATSAPP_URL } from "../../../lib/whatsapp";
import { pauseManagedBackgroundVideos } from "../../components/ManagedBackgroundVideo";
import ArrowIcon from "../../../components/ArrowIcon";
import PlayIcon from "../../../components/PlayIcon";
import s from "./additions.module.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const poster = (video: string) => asset(video.replace("/media/testimonials/", "/revision/diseno-web-assets/").replace(".mp4", "-clean.webp"));

export default function ReviewTestimonials() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const testimonial = testimonials[active];
  useEffect(() => {
    if (open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => { if (!document.hidden) setActive(current => (current + 1) % testimonials.length); }, 3000);
    return () => window.clearInterval(timer);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const returnFocus = trigger.current;
    const previous = document.body.style.overflow;
    modal?.showModal();
    document.body.style.overflow = "hidden";
    pauseManagedBackgroundVideos();
    return () => { modal?.close(); document.body.style.overflow = previous; returnFocus?.focus(); };
  }, [open]);
  const close = () => { video.current?.pause(); setOpen(false); };
  return <section className={`home-testimonials ${s.reviewTestimonials}`} aria-labelledby="review-testimonial-title">
    <div className="home-testimonials__slide" aria-live="polite">
      <div className="home-testimonials__copy">
        <p>TESTIMONIOS</p>
        <h2 id="review-testimonial-title" aria-label={`“${testimonial.quote}”`}>
          <span className="home-testimonials__title-desktop" aria-hidden="true">{testimonial.desktopLines.map((line, i) => <span key={line}>{i === 0 ? "“" : ""}{line}{i === testimonial.desktopLines.length - 1 ? "”" : ""}</span>)}</span>
          <span className="home-testimonials__title-mobile" aria-hidden="true">“{testimonial.quote}”</span>
        </h2>
        <div className="home-testimonials__rating" aria-label="5 de 5 estrellas">★★★★★ <small>(5.0)</small></div>
        <div className="home-testimonials__person"><img src={asset(testimonial.avatar)} alt="" width="300" height="300" loading="lazy" decoding="async" /><div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div></div>
        <div className={`home-testimonials__actions ${s.testimonialActions}`}>
          <a className="orange-cta" href={WHATSAPP_URL}><span className="desktop-only">CHATEÁ CON UN EXPERTO</span><span className="mobile-only">Contactanos</span></a>
          <a className={s.testimonialSite} href={testimonial.site} target="_blank" rel="noopener noreferrer">Ver sitio web <ArrowIcon /></a>
        </div>
      </div>
      <div className="home-testimonials__visual">
        <button ref={trigger} className="home-testimonials__media" type="button" onClick={() => setOpen(true)} aria-label={`Ver video testimonial de ${testimonial.name}`}>
          <img src={poster(testimonial.video)} alt={testimonial.alt} width="960" height="720" loading="lazy" decoding="async" />
          <span className="home-testimonials__play" aria-hidden="true"><PlayIcon /></span>
        </button>
        <div className="home-testimonials__controls" aria-label="Cambiar testimonio">
          <button type="button" onClick={() => setActive((active + testimonials.length - 1) % testimonials.length)} aria-label="Testimonio anterior"><ArrowIcon direction="left" /></button>
          <div>{testimonials.map((item, i) => <button key={item.name} type="button" className={active === i ? "is-active" : ""} aria-label={`Ver testimonio de ${item.name}`} aria-pressed={active === i} onClick={() => setActive(i)} />)}</div>
          <button type="button" onClick={() => setActive((active + 1) % testimonials.length)} aria-label="Siguiente testimonio"><ArrowIcon direction="right" /></button>
        </div>
      </div>
    </div>
    {open && <dialog ref={dialog} className={s.testimonialDialog} aria-label={`Video testimonial de ${testimonial.name}`} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <button type="button" className={s.dialogClose} onClick={close} aria-label="Cerrar video"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
      <video ref={video} controls autoPlay playsInline poster={poster(testimonial.video)} src={asset(testimonial.video)} />
    </dialog>}
  </section>;
}
