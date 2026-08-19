"use client";

import { Fragment, useEffect, useState } from "react";
import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import { DarkGridBackground, HeroChrome, HomeClosingSections } from "./SharedHomeSections";
import SiteHeader from "./SiteHeader";
import LightGridFrame from "./LightGridFrame";
import HomeTestimonials from "./HomeTestimonials";

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
  hideItemNumbers?: boolean;
  afterVideo?: string;
  variant?: "benefits";
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
  hideSectionIndexes?: boolean;
  sharedSectionBackground?: boolean;
  homeTestimonials?: boolean;
};

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const wildeFrames = [
  "/media/wilde-cell-002.png",
  "/media/wilde-cell-003.png",
  "/media/wilde-cell-001.png",
];

function Actions() {
  return <div className="hero-actions internal-actions">
    <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span></a>
    <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span></a>
  </div>;
}

export default function InternalPage({ page }: { page: ServicePage }) {
  const [wildeFrame, setWildeFrame] = useState(0);
  const sections = page.sections ?? [
    { eyebrow: "ESTRATEGIA + DISEÑO + TECNOLOGÍA", title: page.sectionTitle ?? "", paragraphs: [page.sectionCopy ?? ""], items: page.items?.map(([title, copy]) => ({ title, copy })) },
    { eyebrow: "SOLUCIONES A TU MEDIDA", title: page.darkTitle ?? "", paragraphs: [page.darkCopy ?? ""], dark: true, contact: true },
  ];
  const hasWildeSequence = sections.some((section) => section.visual === "wilde");

  useEffect(() => {
    if (!hasWildeSequence) return;
    const timer = window.setInterval(() => {
      setWildeFrame((current) => (current + 1) % wildeFrames.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [hasWildeSequence]);
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

    <section className="hero internal-home-hero matches-home-hero" id="inicio">
      <ManagedBackgroundVideo
        eager
        className="hero-video"
        src={asset("/media/hero.mp4")}
        poster={asset("/media/hero-poster.webp")}
      />
      <div className="hero-overlay" /><div className="hero-aurora" />
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> {page.eyebrow}</p>
        <h1>{page.title.split("\n").map((line, index) => <span className="hero-title-line" key={`${line}-${index}`}>{line}</span>)}</h1>
        <p className="hero-copy">{page.intro}</p>
        <Actions />
      </div>
    </section>

    <LightGridFrame className="internal-light-grid">
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
        return <Fragment key={`${section.title}-${sectionIndex}`}>
        <section className={`service-section service-visual service-xtreme ${page.hideSectionIndexes ? "without-service-index" : ""} ${page.sharedSectionBackground ? "shared-section-bg" : ""}`}>
          {!page.hideSectionIndexes && <div className="service-index">0{sectionIndex + 2} — IDEAMOS <i /></div>}
          <header className="service-heading">
            <p>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.lead && <h3>{section.lead}</h3>}
            {section.paragraphs?.map((copy, index) => <div className="service-copy" key={index}>{copy}</div>)}
            {section.actions && <Actions />}
          </header>
          <div className="service-visual-media">
            <img src={asset("/media/xtreme-service.png")} alt="Sitio web Xtreme desarrollado por Ideamos" />
          </div>
        </section>
        {section.afterVideo && <section className="service-showcase-video" aria-label="Proyecto web desarrollado por Ideamos">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src={asset(section.afterVideo)} type={section.afterVideo.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        </section>}
        </Fragment>;
      }

      if (section.visual === "wilde") {
        return <Fragment key={`${section.title}-${sectionIndex}`}>
        <section className={`service-section design-problems ${page.sharedSectionBackground ? "shared-section-bg" : ""}`}>
          {!page.hideSectionIndexes && <div className="service-index">0{sectionIndex + 2} — IDEAMOS <i /></div>}
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
                  {!section.hideItemNumbers && <small>{String(index + 1).padStart(2, "0")}</small>}
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>)}
            </div>}
            <div className="design-phone-video design-phone-sequence">
              <img src={asset(wildeFrames[wildeFrame])} alt="Tienda online Wilde visualizada en un teléfono" />
            </div>
          </div>
          {section.actions && <Actions />}
        </section>
        </Fragment>;
      }

      return <section key={`${section.title}-${sectionIndex}`} className={`service-section ${section.dark ? "dark" : ""} ${section.contact ? "service-contact" : ""} ${section.variant === "benefits" ? "service-benefits" : ""} ${page.sharedSectionBackground ? "shared-section-bg" : ""}`}>
          {section.variant === "benefits" && <DarkGridBackground />}
          {!page.hideSectionIndexes && <div className="service-index">0{sectionIndex + 2} — {section.dark ? "STRATEGY" : "IDEAMOS"} <i /></div>}
          <header className="service-heading">
            <p>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.lead && <h3>{section.lead}</h3>}
            {section.paragraphs?.map((copy, index) => <div className="service-copy" key={index}>{copy}</div>)}
          </header>
          {section.items && <div className={`service-items ${section.variant === "benefits" ? "service-benefits-grid" : ""}`}>
            {section.items.map((item, index) => <article key={item.title}>
              {!section.hideItemNumbers && <small>{String(index + 1).padStart(2, "0")}</small>}
              {section.variant === "benefits"
                ? <span className={`benefit-motion benefit-motion-${index + 1}`} aria-hidden="true"><i/><i/><i/><i/></span>
                : <i />}
              <h3>{item.title}</h3><p>{item.copy}</p>
            </article>)}
          </div>}
          {(section.contact || section.actions) && <Actions />}
        </section>;
    })}
    {page.homeTestimonials && <HomeTestimonials />}
    </LightGridFrame>
    <HomeClosingSections darkGrid />
  </main>;
}

export type { ServicePage };
