"use client";

import { useState, type PointerEvent } from "react";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
type FooterNav = "services" | "studio";

export default function PremiumFooter() {
  const [openNav, setOpenNav] = useState<FooterNav | null>("services");

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--footer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--footer-y", `${event.clientY - bounds.top}px`);
  };

  const resetGlow = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--footer-x", "72%");
    event.currentTarget.style.setProperty("--footer-y", "16%");
  };

  const toggleNav = (nav: FooterNav) => setOpenNav((current) => current === nav ? null : nav);

  return (
    <footer className="ideamos-footer" onPointerMove={moveGlow} onPointerLeave={resetGlow}>
      <div className="ideamos-footer__grid" aria-hidden="true" />
      <div className="ideamos-footer__glow" aria-hidden="true" />

      <section className="ideamos-footer__cta">
        <div className="ideamos-footer__cta-copy">
          <p className="ideamos-footer__eyebrow"><span /> Estudio digital · Buenos Aires</p>
          <h2>Las mejores ideas empiezan con <em>una conversación.</em></h2>
        </div>
        <a className="ideamos-footer__orbit" href={WHATSAPP_URL} aria-label="Hablemos de tu próximo proyecto">
          <svg viewBox="0 0 180 180" aria-hidden="true">
            <defs><path id="ideamos-footer-orbit-path" d="M90,90 m-67,0 a67,67 0 1,1 134,0 a67,67 0 1,1 -134,0" /></defs>
            <text><textPath href="#ideamos-footer-orbit-path" textLength="420" lengthAdjust="spacing">HABLEMOS · ESTRATEGIA · DISEÑO · TECNOLOGÍA ·</textPath></text>
          </svg>
          <span className="ideamos-footer__orbit-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        </a>
      </section>

      <div className="ideamos-footer__main">
        <div className="ideamos-footer__brand">
          <img src={asset("/logos/ideamos-light.webp")} alt="Ideamos" />
          <p>Diseñamos experiencias digitales con estrategia, identidad y tecnología para hacer crecer marcas y negocios.</p>
          <div className="ideamos-footer__social" aria-label="Redes y contacto">
            <a href="https://www.instagram.com/ideamosargentina/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 19.8l1.2-4A8 8 0 1 1 20 11.6Z"/><path d="M8.3 7.7c.2-.4.4-.4.7-.4h.4c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.5 1 1.3 1.8 2.3 2.3.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.8.9c.3.1.4.3.4.5 0 .4-.2 1.2-.6 1.6-.5.5-1.3.8-2.1.7-1-.1-2.2-.6-3.6-1.5-2.1-1.4-3.5-3.5-3.9-4.7-.4-1.2 0-2.1.4-2.6Z"/></svg>
            </a>
          </div>
        </div>

        <nav className={`ideamos-footer__nav ${openNav === "services" ? "is-open" : ""}`} aria-label="Servicios">
          <button type="button" onClick={() => toggleNav("services")} aria-expanded={openNav === "services"} aria-controls="footer-services"><span>Servicios</span><i aria-hidden="true" /></button>
          <ul id="footer-services">
            <li><a href={asset("/diseno-web-autoadministrable/")}>Diseño web</a></li>
            <li><a href={asset("/tiendas-online/")}>Tiendas online</a></li>
            <li><a href={asset("/marketing-digital/")}>Marketing digital</a></li>
            <li><a href={asset("/posicionamiento-web/")}>Posicionamiento web</a></li>
          </ul>
        </nav>

        <nav className={`ideamos-footer__nav ${openNav === "studio" ? "is-open" : ""}`} aria-label="Estudio">
          <button type="button" onClick={() => toggleNav("studio")} aria-expanded={openNav === "studio"} aria-controls="footer-studio"><span>Explorá</span><i aria-hidden="true" /></button>
          <ul id="footer-studio">
            <li><a href={asset("/")}>Inicio</a></li>
            <li><a href={asset("/precios/")}>Precios</a></li>
            <li><a href={asset("/contacto/")}>Contacto</a></li>
            <li><a href="#inicio">Volver arriba</a></li>
          </ul>
        </nav>

        <div className="ideamos-footer__contact">
          <p className="ideamos-footer__contact-label">Asesoría estratégica</p>
          <h3>¿Pensamos tu próximo paso digital?</h3>
          <a className="ideamos-footer__whatsapp" href={WHATSAPP_URL}><span>Hablar por WhatsApp</span></a>
          <p><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar</a></p>
          <p><a href="tel:+5491168758285">+54 9 11 6875-8285</a></p>
          <p>Buenos Aires · Argentina</p>
        </div>
      </div>

      <div className="ideamos-footer__bottom">
        <span>© 2026 Estudio Ideamos</span>
        <div className="ideamos-footer__signature" aria-label="Ideamos: estrategia, diseño y tecnología">
          <i className="ideamos-footer__signature-mark" aria-hidden="true"><b /><b /><b /><b /></i>
          <small>Estrategia · Diseño · Tecnología</small>
        </div>
        <span>Ideas que mueven negocios.</span>
      </div>
    </footer>
  );
}
