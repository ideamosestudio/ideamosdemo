import ManagedBackgroundVideo from "../app/components/ManagedBackgroundVideo";
import PremiumFooter from "./PremiumFooter";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const heroLogos = ["wynns", "uba", "stromberg", "santillana", "remax", "oner", "macba", "ivess", "kapelusz", "bgh"];
export function HeroLogoTrack() {
  return <div className="logo-track">{[...heroLogos, ...heroLogos].map((name, index) =>
    <img key={`${name}-${index}`} src={asset(`/logos/${name}.webp`)} alt={name} />
  )}</div>;
}

export function HomeClosingSections() {
  return <>
    <section className="human-cta shared-section-bg">
      <div className="human-design" aria-hidden="true">
        <i className="human-glow human-glow-a"/><i className="human-glow human-glow-b"/>
      </div>
      <div className="human-copy" data-reveal>
        <p>ENVIANOS UN MENSAJE</p>
        <h2>Contactanos y agendá una asesoría sin cargo</h2>
        <span>Somos un equipo de profesionales con más de 10 años de experiencia, listos para asesorarte. <b>Contactanos y coordinamos una charla para entender tu negocio, sus desafíos y objetivos.</b> Durante la conversación, te proponemos acciones concretas y armamos una propuesta a medida en menos de 48 horas.</span>
        <a className="orange-cta" href="https://wa.link/wgb5pk">QUIERO AGENDAR UNA ASESORÍA</a>
      </div>
      <ManagedBackgroundVideo src={asset("/media/videollamada-final.webm")} poster={asset("/media/human-poster.webp")} />
    </section>

    <section className="contact-form" id="contacto">
      <div className="contact-main">
        <p><i/> CONTACTO</p>
        <h2>Hablemos de tu proyecto</h2>
        <span>Contanos qué necesitás. Te respondemos con ideas concretas y próximos pasos.</span>
        <form>
          <div>
            <label>Nombre<input type="text" name="nombre" placeholder="Tu nombre"/></label>
            <label>Empresa<input type="text" name="empresa" placeholder="Nombre de tu empresa"/></label>
          </div>
          <div>
            <label>Email<input type="email" name="email" placeholder="nombre@empresa.com"/></label>
            <label>Teléfono<input type="tel" name="telefono" placeholder="+54"/></label>
          </div>
          <label>Mensaje<textarea name="mensaje" rows={4} placeholder="Contanos brevemente sobre tu proyecto"/></label>
          <a className="contact-submit" href="https://wa.link/wgb5pk">Enviar consulta</a>
        </form>
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

    <PremiumFooter />
  </>;
}
