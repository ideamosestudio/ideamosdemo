"use client";
import s from "./additions.module.css";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import ManagedBackgroundVideo from "../../../app/components/ManagedBackgroundVideo";
import { DarkGridBackground, HeroChrome, HomeClosingSections } from "../../../components/SharedHomeSections";
import SiteHeader from "../../../components/SiteHeader";
import LightGridFrame from "../../../components/LightGridFrame";
import { WHATSAPP_URL } from "../../../lib/whatsapp";
import PortfolioLink from "../../../components/PortfolioLink";
import type { ServiceGuideKey } from "../../../lib/service-guides";

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
  guide?: ServiceGuideKey;
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
};

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const wildeFrames = [
  "/media/wilde-cell-002.png",
  "/media/wilde-cell-003.png",
  "/media/wilde-cell-001.png",
];

function Actions() {
  return <div className="hero-actions internal-actions">
    <a className="cta-glow primary" href={WHATSAPP_URL}><span>Quiero una asesoría sin cargo</span></a>
    <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Quiero contactar un experto</span></a>
  </div>;
}

function ProjectActions() {
  return <div className="hero-actions internal-actions review-project-actions">
    <a className="cta-glow primary" href={WHATSAPP_URL}><span>Quiero una asesoría sin cargo</span></a>
    <PortfolioLink button>Ver proyectos realizados</PortfolioLink>
  </div>;
}

function CenteredLead({ copy }: { copy: string }) {
  return <h3>{copy.split("\n").map((sentence, index) => (
    <span className="centered-lead-line" key={`${sentence}-${index}`}>{sentence}</span>
  ))}</h3>;
}

function EmphasizedCopy({ copy }: { copy: string }) {
  return <>{copy.split("\n").map((line, lineIndex) => (
    <Fragment key={`${line}-${lineIndex}`}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) => (
        part.startsWith("**") && part.endsWith("**")
          ? <strong key={`${part}-${partIndex}`}>{part.slice(2, -2)}</strong>
          : part
      ))}
    </Fragment>
  ))}</>;
}

export default function ReviewInternalPage({ page, additions, evidence, guideContent }: { page: ServicePage; additions: ReactNode; evidence: ReactNode; guideContent: ReactNode }) {
  const [wildeFrame, setWildeFrame] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const sections = page.sections ?? [
    { eyebrow: "ESTRATEGIA + DISEÑO + TECNOLOGÍA", title: page.sectionTitle ?? "", paragraphs: [page.sectionCopy ?? ""], items: page.items?.map(([title, copy]) => ({ title, copy })) },
    { eyebrow: "SOLUCIONES A TU MEDIDA", title: page.darkTitle ?? "", paragraphs: [page.darkCopy ?? ""], dark: true, contact: true },
  ];
  const hasWildeSequence = sections.some((section) => section.visual === "wilde");

  useEffect(() => {
    const phone = phoneRef.current;
    if (!hasWildeSequence || !phone) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: number | undefined;
    const update = () => {
      window.clearInterval(timer);
      if (visible && !document.hidden && !motion.matches) {
        timer = window.setInterval(() => setWildeFrame(current => (current + 1) % wildeFrames.length), 2000);
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(phone);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => { observer.disconnect(); window.clearInterval(timer); document.removeEventListener("visibilitychange", update); motion.removeEventListener("change", update); };
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

  return <main className={`internal-page ${s.reviewPage}`}>
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

    <LightGridFrame className={`internal-light-grid ${s.reviewCanvas}`}>
    {sections.map((section, sectionIndex) => {
      if (section.visual === "human") {
        return <section key={`${section.title}-${sectionIndex}`} className="human-cta internal-human-cta">
          <div className="human-copy">
            <p>{section.eyebrow}</p>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((copy, index) => <span key={index}>{copy}</span>)}
            <a className="orange-cta" href={WHATSAPP_URL}>QUIERO AGENDAR UNA ASESORÍA</a>
          </div>
          <ManagedBackgroundVideo src={asset("/media/human.mp4")} />
        </section>;
      }

      if (section.visual === "xtreme") {
        return <Fragment key={`${section.title}-${sectionIndex}`}>
        <section className={`service-section service-visual service-xtreme ${page.hideSectionIndexes ? "without-service-index" : ""} ${page.sharedSectionBackground ? "shared-section-bg" : ""}`}>
          {!page.hideSectionIndexes && <div className="service-index">0{sectionIndex + 2} — IDEAMOS <i /></div>}
          <header className="service-heading">
            <p>{section.eyebrow}</p>
            <h2>{section.title === "Creamos webs que generan\nconfianza y oportunidades"
              ? <><span className="review-title-accent">Creamos</span> webs que generan<br />confianza <span className="review-title-accent">y oportunidades</span></>
              : section.title.split("\n").map((line, index) => (
                <Fragment key={`${line}-${index}`}>{index > 0 && <br />}{line}</Fragment>
              ))}</h2>
            {section.lead && <h3><EmphasizedCopy copy={section.lead} /></h3>}
            {section.paragraphs?.map((copy, index) => <div className="service-copy" key={index}><EmphasizedCopy copy={copy} /></div>)}
            {section.actions && (page.guide === "web" ? <ProjectActions /> : <Actions />)}
          </header>
          <div className="service-visual-media">
            <img src={asset("/media/xtreme-service.webp")} srcSet={`${asset("/revision/diseno-web-assets/xtreme-service-480.webp")} 480w, ${asset("/revision/diseno-web-assets/xtreme-service-800.webp")} 800w, ${asset("/media/xtreme-service.webp")} 1300w`} sizes="(max-width: 980px) 80vw, 45vw" alt="Sitio web Xtreme desarrollado por Ideamos" width="1300" height="987" loading="lazy" decoding="async" />
          </div>
        </section>
        {section.afterVideo && <section className="service-showcase-video" aria-label="Proyecto web desarrollado por Ideamos">
          <ManagedBackgroundVideo src={asset(section.afterVideo)} />
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
            {section.lead && <CenteredLead copy={section.lead} />}
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
            <div className="design-phone-video design-phone-sequence" ref={phoneRef}>
              <img src={asset(wildeFrames[wildeFrame])} srcSet={`${asset(wildeFrames[wildeFrame].replace('/media/', '/revision/diseno-web-assets/').replace('.png', '-360.webp'))} 360w, ${asset(wildeFrames[wildeFrame].replace('/media/', '/revision/diseno-web-assets/').replace('.png', '-525.webp'))} 525w`} sizes="(max-width: 600px) 80vw, 360px" alt="Tienda online Wilde visualizada en un teléfono" width="525" height="1080" loading="lazy" decoding="async" />
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
            {section.lead && (section.variant === "benefits" ? <CenteredLead copy={section.lead} /> : <h3>{section.lead}</h3>)}
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
    {additions}
    {evidence}
    </LightGridFrame>
    {guideContent}
    <HomeClosingSections darkGrid />
  </main>;
}

export type { ServicePage };
