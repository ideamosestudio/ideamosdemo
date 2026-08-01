"use client";

import { useEffect } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { HeroLogoTrack, HomeClosingSections } from "./SharedHomeSections";
import SiteHeader from "./SiteHeader";

type Item = { title: string; copy: string };
type ContentSection = {
  eyebrow: string;
  title: string;
  lead?: string;
  paragraphs?: string[];
  items?: Item[];
  dark?: boolean;
  contact?: boolean;
  visual?: "xtreme" | "wilde" | "human";
  actions?: boolean;
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
  matchHomeHero?: boolean;
  homeClosing?: boolean;
};

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function Actions() {
  return <div className="hero-actions internal-actions">
    <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span></a>
    <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span></a>
  </div>;
}

export default function InternalPage({ page }: { page: ServicePage }) {
  const sections = page.sections ?? [
    { eyebrow: "ESTRATEGIA + DISEÑO + TECNOLOGÍA", title: page.sectionTitle ?? "", paragraphs: [page.sectionCopy ?? ""], items: page.items?.map(([title, copy]) => ({ title, copy })) },
    { eyebrow: "SOLUCIONES A TU MEDIDA", title: page.darkTitle ?? "", paragraphs: [page.darkCopy ?? ""], dark: true, contact: true },
  ];
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty("--scroll", String(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="internal-page">
    <SiteHeader />

    <section className={`hero internal-home-hero ${page.matchHomeHero ? "matches-home-hero" : ""}`} id="inicio">
      <ManagedBackgroundVideo
        eager
        className="hero-video"
        src={asset("/media/hero.mp4")}
        poster={asset("/media/hero-poster.webp")}
      />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
      <div className="tech-frame frame-right"><i/><span>DIGITAL SYSTEMS</span><b>2026</b></div>
      <div className="data-line line-a"><span>STRATEGY</span><i/></div>
      <div className="data-line line-b"><span>RESULTS</span><i/></div>
      <div className="hero-center">
        <p className="availability"><i/> {page.eyebrow}</p>
        <h1><span>{page.title}</span></h1>
        <p className="hero-copy">{page.intro}</p>
        <Actions />
        {page.matchHomeHero && <div className="hero-clients"><HeroLogoTrack /></div>}
      </div>
      <div className="hero-caption">DISEÑO WEB &amp; MARKETING DIGITAL</div>
      <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
    </section>

    {sections.map((section, sectionIndex) => {
      if (section.visual === "human") {
        return <section key={`${section.title}-${sectionIndex}`} className="human-cta internal-human-cta">
          <div className="human-copy">
            <p>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((copy, index) => <span key={index}>{copy}</span>)}
            <a className="orange-cta" href="https://wa.link/wgb5pk">QUIERO AGENDAR UNA ASESORÍA</a>
          </div>
          <video autoPlay muted loop playsInline>
            <source src={asset("/media/human.mp4")} type="video/mp4" />
          </video>
        </section>;
      }

      if (section.visual === "xtreme") {
        return <section key={`${section.title}-${sectionIndex}`} className="service-section service-visual service-xtreme">
          <div className="service-index">0{sectionIndex + 2} — IDEAMOS <i /></div>
          <header className="service-heading">
            <p>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.lead && <h3>{section.lead}</h3>}
            {section.paragraphs?.map((copy, index) => <div className="service-copy" key={index}>{copy}</div>)}
          </header>
          <div className="service-visual-media">
            <img src={asset("/media/xtreme-service.png")} alt="Sitio web Xtreme desarrollado por Ideamos" />
          </div>
        </section>;
      }

      if (section.visual === "wilde") {
        return <section key={`${section.title}-${sectionIndex}`} className="service-section design-problems">
          <div className="service-index">0{sectionIndex + 2} — IDEAMOS <i /></div>
          <header className="service-heading">
            <p>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.lead && <h3>{section.lead}</h3>}
          </header>
          <div className="design-problems-layout">
            {section.items && <div className="design-problems-list">
              {section.items.map((item, index) => <article key={item.title}>
                <i />
                <div>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>)}
            </div>}
            <div className="design-phone-video">
              <video autoPlay muted loop playsInline>
                <source src={asset("/media/wilde-phone.webm")} type="video/webm" />
              </video>
            </div>
          </div>
          {section.actions && <Actions />}
        </section>;
      }

      return <section key={`${section.title}-${sectionIndex}`} className={`service-section ${section.dark ? "dark" : ""} ${section.contact ? "service-contact" : ""}`}>
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
        </section>;
    })}
    {page.homeClosing && <HomeClosingSections />}
  </main>;
}

export type { ServicePage };
