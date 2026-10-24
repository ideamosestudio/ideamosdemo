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
    return <svg {...commonProps} viewBox="-23 -21 682 682.66669" className="contact-icon-whatsapp" fill="currentColor"><path fillRule="evenodd" d="m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0" /></svg>;
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

    <SharedFooter />
  </>;
}

export function SharedFooter() {
  return <EditorialFooter socials={<>
      <a href={WHATSAPP_URL} aria-label="Contactar a Ideamos por WhatsApp" title="WhatsApp" target="_blank" rel="noopener noreferrer"><ContactIcon name="whatsapp" /></a>
      <a href={socialLinks.instagram} aria-label="Ideamos en Instagram" target="_blank" rel="noopener noreferrer"><ContactIcon name="instagram" /></a>
      <a href={socialLinks.linkedin} aria-label="Ideamos en LinkedIn" target="_blank" rel="noopener noreferrer"><ContactIcon name="linkedin" /></a>
      <a href={socialLinks.facebook} aria-label="Ideamos en Facebook" target="_blank" rel="noopener noreferrer"><ContactIcon name="facebook" /></a>
    </>} />;
}
