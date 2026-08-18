import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import ContactLeadForm from "./ContactLeadForm";
import LightGridFrame from "./LightGridFrame";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const heroLogos = ["wynns", "uba", "stromberg", "santillana", "remax", "oner", "macba", "ivess", "kapelusz", "bgh"];
export function HeroLogoTrack() {
  return <div className="logo-track">{[...heroLogos, ...heroLogos].map((name, index) =>
    <img key={`${name}-${index}`} src={asset(`/logos/${name}.webp`)} alt={name} />
  )}</div>;
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

export function HomeAdvisorySection({ darkGrid = false }: { darkGrid?: boolean } = {}) {
  return <>
    <HomeLogoMarquee />
    <section className="human-cta shared-section-bg">
      {darkGrid && <DarkGridBackground half />}
      <div className="human-design" aria-hidden="true">
        <i className="human-glow human-glow-a"/><i className="human-glow human-glow-b"/>
      </div>
      <div className="human-copy">
        <p>ENVIANOS UN MENSAJE</p>
        <h2>Contactanos y agendá una asesoría sin cargo</h2>
        <span>Somos un equipo de profesionales con más de 10 años de experiencia, listos para asesorarte. <b>Contactanos y coordinamos una charla para entender tu negocio, sus desafíos y objetivos.</b> Durante la conversación, te proponemos acciones concretas y armamos una propuesta a medida en menos de 48 horas.</span>
        <a className="orange-cta" href="https://wa.link/wgb5pk">QUIERO AGENDAR UNA ASESORÍA</a>
      </div>
      <ManagedBackgroundVideo
        src={asset("/media/videollamada-final.webm")}
        poster={asset("/media/human-poster.webp")}
      />
    </section>
  </>;
}

export function HomeClosingSections({ showAdvisory = true, darkGrid = false }: { showAdvisory?: boolean; darkGrid?: boolean } = {}) {
  return <>
    {showAdvisory && <LightGridFrame className="closing-light-grid"><HomeAdvisorySection darkGrid={darkGrid} /></LightGridFrame>}

    <section className="contact-form" id="contacto">
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
        <a href="tel:+5491168758285"><i>☎</i><div><small>Teléfono</small><b>+54 9 11 6875-8285</b></div></a>
        <a href="mailto:hola@ideamos.com.ar"><i>✉</i><div><small>Email</small><b>hola@ideamos.com.ar</b></div></a>
        <a href="https://www.instagram.com/ideamosargentina/" target="_blank" rel="noreferrer"><i>◎</i><div><small>Instagram</small><b>@ideamosargentina</b></div></a>
        <div className="contact-social"><span>Seguinos</span><a href="https://www.instagram.com/ideamosargentina/" target="_blank" rel="noreferrer">IG</a></div>
      </aside>
    </section>

    <footer>
      <div className="footer-main">
        {darkGrid && <DarkGridBackground />}
        <div className="footer-top">
          <div className="footer-brand">
            <img src={asset("/logos/ideamos-light.webp")} alt="Ideamos"/>
            <h3>Más estrategia.<br/><em>Más resultados.</em></h3>
          </div>
          <div>
            <b>Servicios</b>
            <a href={asset("/diseno-web-autoadministrable/")}>Diseño Web</a>
            <a href={asset("/tiendas-online/")}>Tiendas Online</a>
            <a href={asset("/marketing-digital/")}>Marketing Digital</a>
            <a href={asset("/posicionamiento-web/")}>Posicionamiento Web</a>
          </div>
          <div>
            <b>Contacto</b>
            <a href="https://wa.link/wgb5pk">+54 9 11 6875-8285</a>
            <a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar</a>
            <p>Buenos Aires, Argentina</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 ESTUDIO IDEAMOS</span><a href="#inicio">VOLVER ARRIBA</a></div>
    </footer>
  </>;
}
