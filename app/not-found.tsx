"use client";

import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import "./not-found.css";

const OLD_URL_REDIRECTS: Record<string, string> = {
  "/tienda-online/": "/tiendas-online/",
  "/tienda-online": "/tiendas-online/",
  "/home/": "/",
  "/home": "/",
  "/aviso-legal/": "/",
  "/aviso-legal": "/",
  "/politica-de-privacidad/": "/",
  "/politica-de-privacidad": "/",
  "/la-empresa-estudio-ideamos/": "/",
  "/la-empresa-estudio-ideamos": "/",
  "/promos/": "/",
  "/promos": "/",
};

const MAIN_LINKS: Array<[string, string]> = [
  ["Inicio", "/"],
  ["Tiendas online", "/tiendas-online/"],
  ["Marketing digital", "/marketing-digital/"],
  ["Posicionamiento web", "/posicionamiento-web/"],
  ["Diseño web autoadministrable", "/diseno-web-autoadministrable/"],
  ["Casos de éxito", "/casos-de-exito/"],
  ["Precios", "/precios/"],
  ["Contacto", "/contacto/"],
];

export default function NotFound() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    const target = OLD_URL_REDIRECTS[path] ?? (path.startsWith("/blog") ? "/" : null);
    if (target) {
      window.location.replace(target);
      return;
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <main className="not-found-page">
      <SiteHeader solid />
      <section className="not-found-content">
        <p className="not-found-eyebrow">ERROR 404</p>
        <h1>No encontramos esta página</h1>
        <p className="not-found-copy">Puede que se haya movido o que ya no exista. Te dejamos los accesos más buscados:</p>
        <nav className="not-found-links" aria-label="Páginas principales">
          {MAIN_LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
      </section>
    </main>
  );
}
