import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ManagedBackgroundVideo from "../components/ManagedBackgroundVideo";
import SiteHeader from "../../components/SiteHeader";
import HomeTestimonials from "../../components/HomeTestimonials";
import LightGridFrame from "../../components/LightGridFrame";
import { HeroChrome, HomeAdvisorySection, HomeClosingSections } from "../../components/SharedHomeSections";
import PortfolioScripts from "./PortfolioScripts";
import { WHATSAPP_URL } from "../../lib/whatsapp";
import PageStructuredData from "../../components/PageStructuredData";
import { createPageMetadata } from "../../lib/seo";
import "./catalogue.css";
import "./portfolio.css";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const title = "Portfolio de diseño web y tiendas online | Ideamos";
const description = "Explorá los trabajos de Ideamos: diseño web, tiendas online y sitios corporativos para marcas de distintos rubros. Contanos tu próximo proyecto.";

export const metadata: Metadata = createPageMetadata({ title, description, path: "/portfolio/" });

function legacyFragment(pattern: RegExp) {
  const source = readFileSync(join(process.cwd(), "content", "portfolio-catalogue.html"), "utf8");
  const match = source.match(pattern);
  if (!match) throw new Error("No se encontró el contenido del portfolio.");
  return match[0];
}

export default function PortfolioPage() {
  const work = legacyFragment(/<section class="work"[\s\S]*?<\/section>/);
  const dialog = legacyFragment(/<dialog id="project-dialog"[\s\S]*?<\/dialog>/);

  return <main className="portfolio-page">
    <PageStructuredData name="Portfolio de diseño web y tiendas online" description={description} path="/portfolio/" pageType="CollectionPage" />
    <SiteHeader />

    <section className="hero internal-home-hero matches-home-hero" id="inicio">
      <ManagedBackgroundVideo eager className="hero-video" src={asset("/media/hero.mp4")} poster={asset("/media/hero-poster.webp")} />
      <div className="hero-overlay"/><div className="hero-aurora"/>
      <HeroChrome />
      <div className="hero-center">
        <p className="availability"><i/> Ideas que toman forma</p>
        <h1><span>Cada marca, un mundo.</span><span>Cada web, una idea.</span></h1>
        <p className="hero-copy">Diseñamos experiencias digitales con identidad y propósito. Estos son algunos de nuestros trabajos.</p>
        <div className="hero-actions internal-actions">
          <a className="cta-glow primary" href="#trabajos"><span>Explorá el portfolio</span></a>
          <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Hablemos de tu proyecto</span></a>
        </div>
      </div>
    </section>

    <div dangerouslySetInnerHTML={{ __html: work }} />

    <LightGridFrame className="home-closing-light-grid">
      <HomeTestimonials />
      <HomeAdvisorySection />
    </LightGridFrame>
    <HomeClosingSections showAdvisory={false} darkGrid />

    <div dangerouslySetInnerHTML={{ __html: dialog }} />
    <PortfolioScripts />
  </main>;
}
