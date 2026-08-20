"use client";

import { useState } from "react";
import { pauseManagedBackgroundVideos } from "../app/components/ManagedBackgroundVideo";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function TestimonialSection() {
  const [playing, setPlaying] = useState(false);

  return <section className="testimonial shared-section-bg">
    <div className="testimonial-copy">
      <p>TESTIMONIOS</p>
      <h2>&quot;Notamos un cambio real: Más consultas, más movimiento y sobretodo, más ventas&quot;</h2>
      <div className="stars">★★★★★ <small>(5.0)</small></div>
      <div className="testimonial-person">
        <img src={asset("/media/pablo-avila.png")} alt="Pablo Avila"/>
        <div><b>Pablo Avila</b><small>Coordinador de CYL S.A.</small></div>
      </div>
      <a className="orange-cta" href={WHATSAPP_URL}>CHATEÁ CON UN EXPERTO</a>
    </div>
    <div className="testimonial-media">
      {playing
        ? <video autoPlay controls playsInline onPlay={() => pauseManagedBackgroundVideos()}><source src={asset("/media/testimonial.mp4")} type="video/mp4"/></video>
        : <button className="video-cover" onClick={() => setPlaying(true)} aria-label="Reproducir testimonio"><img src={asset("/media/testimonial-cover.webp")} alt="Testimonio de Pablo Avila, CYL S.A."/><i>▶</i></button>}
    </div>
  </section>;
}
