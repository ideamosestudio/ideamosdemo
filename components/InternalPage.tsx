"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { title: string; copy: string };
type ContentSection = {
  eyebrow: string;
  title: string;
  lead?: string;
  paragraphs?: string[];
  items?: Item[];
  dark?: boolean;
  contact?: boolean;
};
type ServicePage = {
  eyebrow: string;
  title: string;
  intro: string;
  sections?: ContentSection[];
  sectionTitle?: string;
  sectionCopy?: string;
  items?: Array<[string, string]>;
  darkTitle?: string;
  darkCopy?: string;
};

const nav = [
  ["Diseño Web", "diseno-web-autoadministrable"],
  ["Tiendas Online", "tiendas-online"],
  ["Marketing Digital", "marketing-digital"],
  ["Aparecé primero en Google", "posicionamiento-web"],
  ["Casos de Éxito", "casos-de-exito"],
];

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function Actions() {
  return <div className="hero-actions internal-actions">
    <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span><b>→</b></a>
    <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span><b>→</b></a>
  </div>;
}

export default function InternalPage({ page }: { page: ServicePage }) {
  const [menu, setMenu] = useState(false);
  const sections = page.sections ?? [
    { eyebrow: "ESTRATEGIA + DISEÑO + TECNOLOGÍA", title: page.sectionTitle ?? "", paragraphs: [page.sectionCopy ?? ""], items: page.items?.map(([title, copy]) => ({ title, copy })) },
    { eyebrow: "SOLUCIONES A TU MEDIDA", title: page.darkTitle ?? "", paragraphs: [page.darkCopy ?? ""], dark: true, contact: true },
  ];
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  return <main className="internal-page">
    <header className="nav nav-black internal-nav">
      <Link href="../" className="brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos" /></Link>
      <nav className={menu ? "nav-links open" : "nav-links"}>
        {nav.map(([label, href]) => <Link onClick={() => setMenu(false)} key={href} href={`../${href}/`}>{label}</Link>)}
        <Link onClick={() => setMenu(false)} className="mobile-contact" href="../#contacto">Contacto</Link>
      </nav>
      <Link className="nav-contact" href="../#contacto">Contacto <b>→</b></Link>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label={menu ? "Cerrar menú" : "Abrir menú"}>{menu ? "×" : "≡"}</button>
    </header>

    <section className="internal-hero">
      <video autoPlay muted loop playsInline><source src={asset("/media/hero.mp4")} type="video/mp4" /></video>
      <div className="internal-shade" />
      <div className="internal-tech">01 — IDEAMOS <i /></div>
      <div className="internal-orbit" />
      <div className="internal-hero-copy">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.intro}</span>
        <Actions />
      </div>
    </section>

    {sections.map((section, sectionIndex) =>
      <section key={`${section.title}-${sectionIndex}`} className={`service-section ${section.dark ? "dark" : ""} ${section.contact ? "service-contact" : ""}`}>
        <div className="service-index">0{sectionIndex + 2} — {section.dark ? "STRATEGY" : "IDEAMOS"} <i /></div>
        <header className="service-heading">
          <p>{section.eyebrow}</p>
          <h2>{section.title}</h2>
          {section.lead && <h3>{section.lead}</h3>}
          {section.paragraphs?.map((copy, index) => <div className="service-copy" key={index}>{copy}</div>)}
        </header>
        {section.items && <div className="service-items">
          {section.items.map((item, index) => <article key={item.title}>
            <small>{String(index + 1).padStart(2, "0")}</small><i />
            <h3>{item.title}</h3><p>{item.copy}</p>
          </article>)}
        </div>}
        {section.contact && <Actions />}
      </section>
    )}
  </main>;
}

export type { ServicePage };
