import type { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function EditorialFooter({ socials }: { socials: ReactNode }) {
  return <footer className="editorial-footer">
    <div className="ef-inner">
      <div className="ef-intro">
        <div><p className="ef-eyebrow"><span /> SIGAMOS CONECTADOS</p>
          <h2>Hagamos algo<br/><em>que se destaque.</em></h2></div>
        <a className="ef-cta" href={WHATSAPP_URL}>Contanos tu idea <ArrowIcon direction="right" /></a>
      </div>
      <div className="ef-grid">
        <div className="ef-brand"><img src={asset("/logos/ideamos-light.webp")} width="870" height="213" alt="Ideamos" loading="lazy" decoding="async" /><p>Diseño y estrategia digital<br/>con propósito.</p></div>
        <nav aria-label="Servicios en el pie de página"><h3>Servicios</h3><a href={asset("/diseno-web-autoadministrable/")}>Diseño Web</a><a href={asset("/tiendas-online/")}>Tiendas Online</a><a href={asset("/marketing-digital/")}>Marketing Digital</a><a href={asset("/posicionamiento-web/")}>Posicionamiento Web</a></nav>
        <nav aria-label="Explorar Ideamos"><h3>Explorá</h3><a href={asset("/portfolio/")}>Portfolio</a><a href={asset("/casos-de-exito/")}>Casos de éxito</a><a href={asset("/contacto/")}>Contacto</a><a className="footer-blog-link" href={asset("/blog/")}>Blog</a></nav>
        <div className="ef-contact"><h3>Contacto</h3><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar</a><a href="tel:+5491168758285">+54 9 11 6875-8285</a><p>Buenos Aires, Argentina</p><div className="ef-socials">{socials}</div></div>
      </div>
    </div>
    {/* Outline is derived from the ORIGINAL logo alpha; no substitute font. */}
    <div className="ef-signature" aria-hidden="true">
      <svg viewBox="180 30 690 165" focusable="false">
        <defs><filter id="ideamos-footer-outline" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceAlpha" operator="dilate" radius=".6" result="outer" />
          <feMorphology in="SourceAlpha" operator="erode" radius=".6" result="inner" />
          <feComposite in="outer" in2="inner" operator="out" result="edge" />
          <feFlood floodColor="#7b7b7b" /><feComposite in2="edge" operator="in" />
        </filter></defs>
        <image href={asset("/logos/ideamos-light.webp")} width="870" height="213" filter="url(#ideamos-footer-outline)" />
      </svg>
    </div>
    <div className="ef-bottom"><span>© 2026 ESTUDIO IDEAMOS</span><a href="#inicio">Volver arriba <ArrowIcon direction="up" /></a></div>
  </footer>;
}
