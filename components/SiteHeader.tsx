"use client";

import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const navigation = [
  ["Diseño Web", "/diseno-web-autoadministrable/"],
  ["Tiendas Online", "/tiendas-online/"],
  ["Marketing Digital", "/marketing-digital/"],
  ["Aparecé primero en Google", "/posicionamiento-web/"],
  ["Precios", "/precios/"],
] as const;

export default function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={`nav ${solid || scrolled ? "nav-black" : ""}`}>
    <a href={asset("/")} className="brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos" /></a>
    <nav className="nav-links desktop-navigation" aria-label="Navegación principal">
      {navigation.map(([label, href]) => <a key={href} href={asset(href)}>{label}</a>)}
    </nav>
    <a className="nav-contact" href={WHATSAPP_URL}>Quiero que me asesoren</a>
    <MobileMenu
      logoSrc={asset("/logos/ideamos-light.webp")}
      items={navigation.map(([label, href]) => ({ label, href: asset(href) }))}
    />
  </header>;
}
