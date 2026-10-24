import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import EditorialFooter from "./EditorialFooter";
import ContactLeadForm from "./ContactLeadForm";
import LightGridFrame from "./LightGridFrame";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const socialLinks = {
  instagram: "https://www.instagram.com/ideamosargentina/",
  linkedin: "https://www.linkedin.com/company/64755212",
  facebook: "https://www.facebook.com/ideamos.com.ar",
} as const;

type ContactIconName = "phone" | "email" | "instagram" | "linkedin" | "facebook" | "whatsapp";

function ContactIcon({ name }: { name: ContactIconName }) {
  const commonProps = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

  if (name === "instagram") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
  if (name === "linkedin") {
    return <svg {...commonProps} fill="currentColor"><path d="M5.34 3.6a2.14 2.14 0 1 1 0 4.28 2.14 2.14 0 0 1 0-4.28ZM3.5 9.42h3.68V20.5H3.5V9.42Zm5.72 0h3.53v1.52h.05c.49-.93 1.69-1.91 3.48-1.91 3.72 0 4.41 2.45 4.41 5.64v5.83h-3.68v-5.17c0-1.23-.02-2.82-1.72-2.82-1.72 0-1.98 1.34-1.98 2.73v5.26H9.22V9.42Z" /></svg>;
  }
  if (name === "facebook") {
    return <svg {...commonProps} fill="currentColor"><path d="M13.72 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56H17V3.14A22.6 22.6 0 0 0 14.54 3c-2.43 0-4.1 1.49-4.1 4.21V9.6H7.7v3.2h2.74V21h3.28Z" /></svg>;
  }
  if (name === "whatsapp") {
    return <svg {...commonProps} fill="currentColor"><path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.77L2 22l5.38-1.41A9.96 9.96 0 0 0 12.04 21 9.86 9.86 0 0 0 12.04 2Zm0 17.34a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.2.84.86-3.11-.2-.32a8.16 8.16 0 1 1 7.02 3.91Zm4.48-6.12c-.25-.12-1.45-.72-1.68-.8-.22-.08-.38-.12-.55.12-.16.25-.63.8-.77.96-.14.17-.29.19-.53.07-.25-.12-1.04-.38-1.98-1.22a7.43 7.43 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.83-.85 2.02 0 1.18.87 2.33.99 2.49.12.16 1.7 2.59 4.11 3.63.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.45-.6 1.66-1.17.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.47-.28Z" /></svg>;
  }
  if (name === "email") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  }
  return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.6 3.5h3l1.5 4-2.2 1.6a15.2 15.2 0 0 0 6 6l1.6-2.2 4 1.5v3c0 1.1-.9 2-2 2A15.9 15.9 0 0 1 4.6 5.5c0-1.1.9-2 2-2Z" /></svg>;
}

const heroLogos = ["wynns", "uba", "stromberg", "santillana", "remax", "oner", "macba", "ivess", "kapelusz", "bgh"];
export function HeroLogoTrack() {
  return <div className="logo-track">{[...heroLogos, ...heroLogos].map((name, index) =>
    <img key={`${name}-${index}`} src={asset(`/logos/${name}.webp`)} alt={name} width="1644" height="528" loading="lazy" decoding="async" fetchPriority="low" />
  )}</div>;
}

export function HeroChrome() {
  return <>
    <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
    <div className="tech-frame frame-right"><i/><span>DIGITAL SYSTEMS</span><b>2026</b></div>
    <div className="data-line line-a"><span>STRATEGY</span><i/></div>
    <div className="data-line line-b"><span>RESULTS</span><i/></div>
    <div className="hero-caption">DISEÑO WEB &amp; MARKETING DIGITAL</div>
    <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
  </>;
}

export function DarkGridBackground({ half = false }: { half?: boolean } = {}) {
  return <div className={`dark-grid-background${half ? " dark-grid-background--half" : ""}`} aria-hidden="true">
    {[0, 1, 2, 3, 4, 5].map((line) => <i key={line} />)}
  </div>;
}

export function HomeLogoMarquee() {
  return <div className="home-logo-marquee" aria-hidden="true">
    <DarkGridBackground />
    <HeroLogoTrack />
  </div>;
}

export function HomeAdvisorySection({ darkGrid = false, showMarquee = true }: { darkGrid?: boolean; showMarquee?: boolean } = {}) {
  return <>
    {showMarquee && <HomeLogoMarquee />}
    <section className="human-cta home-advisory shared-section-bg">
      {darkGrid && <DarkGridBackground half />}
      <div className="human-design" aria-hidden="true">
        <i className="human-glow human-glow-a"/><i className="human-glow human-glow-b"/>
      </div>
      <div className="human-copy">
        <p>ENVIANOS UN MENSAJE</p>
        <h2>Contactanos y agendá una asesoría sin cargo</h2>
        <span>Somos un equipo de profesionales con más de 10 años de experiencia, listos para asesorarte. <b>Contactanos y coordinamos una charla para entender tu negocio, sus desafíos y objetivos.</b> Durante la conversación, te proponemos acciones concretas y armamos una propuesta a medida en menos de 48 horas.</span>
        <a className="orange-cta" href={WHATSAPP_URL}>QUIERO AGENDAR UNA ASESORÍA</a>
      </div>
      <ManagedBackgroundVideo
        src={asset("/media/videollamada-final.webm")}
        poster={asset("/media/human-poster-square.webp")}
        width={1254}
        height={1254}
      />
    </section>
  </>;
}

export function HomeClosingSections({ showAdvisory = true, darkGrid = false }: { showAdvisory?: boolean; darkGrid?: boolean } = {}) {
  return <>
    {showAdvisory && <LightGridFrame className="closing-light-grid"><HomeAdvisorySection darkGrid={darkGrid} /></LightGridFrame>}

    <section className={`contact-form${darkGrid ? " shared-dark-contact" : ""}`} id="contacto">
      {darkGrid && <DarkGridBackground />}
      <div className="contact-main">
        <p><i/> CONTACTO</p>
        <h2>Hablemos de tu proyecto</h2>
        <span>Contanos qué necesitás. Te respondemos con ideas concretas y próximos pasos.</span>
        <ContactLeadForm />
      </div>
      <aside className="contact-card">
        <span>ESTAMOS PARA AYUDARTE</span>
        <h3><span className="contact-greeting">Hola. </span>Conversemos sobre lo que querés lograr.</h3>
        <a href="tel:+5491168758285"><i><ContactIcon name="phone" /></i><div><small>Teléfono</small><b>+54 9 11 6875-8285</b></div></a>
        <a href="mailto:hola@ideamos.com.ar"><i><ContactIcon name="email" /></i><div><small>Email</small><b>hola@ideamos.com.ar</b></div></a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><i><ContactIcon name="whatsapp" /></i><div><small>WhatsApp</small><b>Escribinos ahora</b></div></a>
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><i><ContactIcon name="instagram" /></i><div><small>Instagram</small><b>@ideamosargentina</b></div></a>
        <div className="contact-social">
          <span>Seguinos</span>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Ideamos en LinkedIn" title="LinkedIn"><ContactIcon name="linkedin" /></a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ideamos en Instagram" title="Instagram"><ContactIcon name="instagram" /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Contactar a Ideamos por WhatsApp" title="WhatsApp"><ContactIcon name="whatsapp" /></a>
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Ideamos en Facebook" title="Facebook"><ContactIcon name="facebook" /></a>
        </div>
      </aside>
    </section>

    <EditorialFooter socials={<>
      <a href={socialLinks.instagram} aria-label="Ideamos en Instagram" target="_blank" rel="noopener noreferrer"><ContactIcon name="instagram" /></a>
      <a href={socialLinks.linkedin} aria-label="Ideamos en LinkedIn" target="_blank" rel="noopener noreferrer"><ContactIcon name="linkedin" /></a>
      <a href={socialLinks.facebook} aria-label="Ideamos en Facebook" target="_blank" rel="noopener noreferrer"><ContactIcon name="facebook" /></a>
    </>} />
  </>;
}
