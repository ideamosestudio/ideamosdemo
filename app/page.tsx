"use client";

import { useEffect, useState } from "react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const logos = ["wynns", "uba", "stromberg", "santillana", "remax", "oner", "macba", "ivess", "kapelusz", "bgh"];
const ecommerceLeft = [
  ["Cobrás online sin vueltas", "Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro. Activamos Mercado Pago y métodos locales para que cobres desde el día uno."],
  ["Envíos más fácil", "Mostrá tarifas y tiempos en vivo con Correo Argentino, Andreani y OCA. Seguimiento para el cliente y retiro en punto o a domicilio, sin complicaciones."],
  ["No nos pagás comisiones", "Tu tienda es 100% tuya: dominio, hosting y acceso administrador desde el día uno. Ideamos no te cobra por venta ni alquiler mensual."],
  ["Transmití confianza", "Una web profesional con dominio propio, pagos seguros y envíos integrados le da a tu marca el respaldo que un perfil de redes no puede ofrecer."],
];
const ecommerceRight = [
  ["Gestión de catálogo y stock", "Cargá productos, variantes y precios en minutos, sin planillas eternas. Sincronizá inventario y alertas para no vender lo que no hay."],
  ["Diseño estratégico a medida", "Cada elemento cumple una función: guiar al usuario, simplificar la compra y aumentar la conversión. Nada está puesto al azar."],
  ["Tomá decisiones informadas", "Mirá ventas, conversión y ticket promedio en un tablero claro. Detectá qué canales rinden y dónde conviene invertir más."],
  ["Mejor atención en menos tiempo", "El cliente puede ver precios, stock, tiempos y medios de pago sin preguntarte nada. Respondés menos mensajes y vendés más."],
];
const faqs = [
  ["“Pierdo oportunidades por no tener una web profesional”", "Diseñamos sitios que transmiten confianza, explican claro lo que hacés y te ayudan a captar más clientes desde el primer día."],
  ["“Quiero una tienda online para vender más y automatizar”", "Hacemos tiendas con diseño profesional que inspiran confianza, automatizan tareas y quedan listas para escalar."],
  ["“Quiero ser primero en Google pero no sé por dónde empezar”", "Simplificamos SEO, campañas y Google Ads en un plan realista para generar visibilidad, consultas y resultados medibles."],
  ["“Necesito delegar el marketing en una empresa confiable”", "Nos ocupamos de estrategia, diseño, campañas y seguimiento para que vos puedas enfocarte en hacer crecer tu negocio."],
  ["“Necesitamos una web compleja, con funcionalidades específicas”", "Contamos con programadores, diseñadores, maquetadores y estrategas para proyectos grandes y personalizados."],
  ["“No sé por cómo arrancar, pero sé que necesito hacer algo”", "Ordenamos prioridades, entendemos tu contexto y definimos juntos qué conviene hacer paso a paso."],
];
const cases = [
  ["case-cyl.png", "CYL NEUMÁTICOS"],
  ["case-empire.png", "EMPIRE"],
  ["case-garware.png", "GARWARE ARGENTINA"],
  ["case-aguilas.png", "ÁGUILAS DE ORO"],
  ["case-oner.png", "ONER VFX"],
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [screen, setScreen] = useState(0);
  const [testimonialPlaying, setTestimonialPlaying] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      document.documentElement.style.setProperty("--scroll", String(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setScreen((value) => (value + 1) % 3), 2200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const LogoTrack = () => <div className="logo-track">{[...logos, ...logos].map((name, index) =>
    <img key={`${name}-${index}`} src={asset(`/logos/${name}.webp`)} alt={name} />
  )}</div>;

  return <main>
    <header className={`nav ${scrolled ? "nav-black" : ""}`}>
      <a href="#inicio" className="brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos" /></a>
      <nav className={menu ? "nav-links open" : "nav-links"}>
        <a href={asset("/diseno-web-autoadministrable/")}>Diseño Web</a><a href={asset("/tiendas-online/")}>Tiendas Online</a><a href={asset("/marketing-digital/")}>Marketing Digital</a><a href={asset("/posicionamiento-web/")}>Aparecé primero en Google</a><a href={asset("/casos-de-exito/")}>Casos de Éxito</a>
      </nav>
      <a className="nav-contact" href="#contacto">Contacto <b aria-hidden="true">▶</b></a>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Menú">{menu ? "×" : "≡"}</button>
    </header>

    <section className="hero" id="inicio">
      <video autoPlay muted loop playsInline className="hero-video"><source src={asset("/media/hero.mp4")} type="video/mp4" /></video>
      <div className="hero-overlay" /><div className="hero-aurora" />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="tech-frame frame-left"><i/><span>34°36&apos;S</span><b>001</b></div>
      <div className="tech-frame frame-right"><i/><span>DIGITAL SYSTEMS</span><b>2026</b></div>
      <div className="data-line line-a"><span>STRATEGY</span><i/></div><div className="data-line line-b"><span>RESULTS</span><i/></div>
      <div className="hero-center">
        <p className="availability"><i/> Más estrategia, más resultados</p>
        <h1><span>Expertos en crear webs</span><em>que atraen clientes y ventas</em></h1>
        <p className="hero-copy"><b>Sitios web, tiendas online y marketing digital</b> para que tu empresa venda más y más fácil.</p>
        <div className="hero-actions">
          <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span><b aria-hidden="true">▶</b></a>
          <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span><b aria-hidden="true">▶</b></a>
        </div>
        <div className="hero-clients"><LogoTrack /></div>
      </div>
      <div className="hero-caption">DISEÑO WEB & MARKETING DIGITAL</div>
      <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
    </section>

    <section className="statement white-section" id="web">
      <div className="statement-copyblock" data-reveal>
        <img className="happy-clients" src={asset("/media/happy-clients.png")} alt="Más de 2000 clientes felices" />
        <h2><span>Webs de alto impacto</span><em>ideadas para generar <b>confianza y resultados</b></em></h2>
        <h3><b>Posicioná tu marca</b> con una <b>comunicación digital efectiva</b></h3>
        <p className="statement-copy">Creamos <b>sitios web pensados para transmitir autoridad, confianza y generar contactos reales.</b> Desde el diseño a medida hasta el contenido, todo está enfocado en convertir visitas en potenciales clientes. Contactanos y coordinamos una asesoría online sin cargo para conocer tu negocio y sus desafíos, identificar oportunidades y proponerte ideas concretas para crecer con mejores resultados.</p>
        <a className="orange-cta" href="https://wa.link/wgb5pk">CHARLEMOS DE TU PROYECTO <b aria-hidden="true">▶</b></a>
      </div>
      <div className="screen-swap" data-reveal>
        {[1,2,3].map((n, index) => <img key={n} className={screen === index ? "active" : ""} src={asset(`/media/screen-${n}.png`)} alt={`Proyecto web ${n}`} />)}
        <div className="screen-dots">{[0,1,2].map((n) => <button key={n} className={screen === n ? "active" : ""} onClick={() => setScreen(n)} aria-label={`Ver pantalla ${n + 1}`} />)}</div>
      </div>
    </section>

    <section className="ecommerce white-section" id="tiendas">
      <div className="section-heading" data-reveal><p>ECOMMERCE ESTRATÉGICO</p><h2>¿Necesitás una tienda online para automatizar tus ventas?</h2><span><b>Automatizá tus ventas</b> con una <b>tienda diseñada para convertir</b>: estrategia, procesos simples y <b>tecnología que trabaja por vos.</b> Es escalable, segura y pensada para crecer con tu negocio.</span></div>
      <div className="shop-layout">
        <div className="shop-column">{ecommerceLeft.map(([title, copy]) => <article key={title} data-reveal><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
        <div className="phone-stage phone-swap">
          {[1,2,3].map((number, index) => <img key={number} className={screen === index ? "active" : ""} src={asset(`/media/shop-screen-${number}.png`)} alt={`Pantalla ${number} de tienda online desarrollada por Ideamos`}/>)}
        </div>
        <div className="shop-column">{ecommerceRight.map(([title, copy]) => <article key={title} data-reveal><i/><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
      <div className="ecommerce-actions"><a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una tienda online</span><b aria-hidden="true">▶</b></a><a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero hablar con un experto</span><b aria-hidden="true">▶</b></a></div>
    </section>

    <section className="google-scene white-section" id="google">
      <div className="google-content" data-reveal>
        <p>POSICIONAMIENTO EN GOOGLE</p>
        <h2>Convertimos tu web en una máquina de generar tráfico, leads y ventas</h2>
        <h3><b>Liderá Google</b> con estrategias de <b>SEO y Google Ads</b></h3>
        <p className="body-copy"><b>Traemos a tu web personas que ya buscan lo que ofrecés</b> y las convertimos en consultas. Con Google Ads te mostramos primero cuando te buscan y las llevamos a contactarte. Con posicionamiento en Google hacemos que te encuentren sin pagar cada clic. Medimos llamadas y mensajes para invertir donde rinde más.</p>
        <a className="orange-cta" href="https://wa.link/wgb5pk">QUIERO ESTAR PRIMERO EN GOOGLE <b aria-hidden="true">▶</b></a>
      </div>
          <div className="google-visual google-swap" aria-label="Proyecto web FroSZ">
            {[1, 2, 3].map((item, index) => (
              <img
                key={item}
                className={screen === index ? "active" : ""}
                src={asset(`/media/frosz-screen-${item}.png`)}
                alt={index === 0 ? "Proyecto web FroSZ desarrollado por Ideamos" : ""}
                aria-hidden={index !== 0}
              />
            ))}
          </div>
    </section>

    <section className="cases-section" id="casos"><p data-reveal>POR QUÉ ELEGIRNOS</p><h2 data-reveal>Casos de éxito:<br/>Conocé a las marcas que ya dieron el salto</h2><span data-reveal><b>Diseños que no solo se ven bien: funcionan.</b> Aumentan ventas, mejoran el posicionamiento en Google y generan más contactos calificados. Acá te mostramos ejemplos concretos de empresas que lograron resultados reales con nuestro método.</span><div className="case-window"><div className="case-rail">{[...cases,...cases].map(([image,label],index)=><article key={`${label}-${index}`}><img src={asset(`/media/${image}`)} alt={label}/><b>{label}</b></article>)}</div></div></section>

    <section className="testimonial"><div className="testimonial-copy" data-reveal><p>TESTIMONIOS</p><h2>«Notamos un cambio real: Más consultas, más movimiento y sobretodo, más ventas»</h2><div className="stars">★★★★★ <small>(5.0)</small></div><div className="testimonial-person"><span>PA</span><div><b>Pablo Avila</b><small>Coordinador de CYL S.A.</small></div></div><a className="orange-cta" href="https://wa.link/wgb5pk">CHATEÁ CON UN EXPERTO <b aria-hidden="true">▶</b></a></div><div className="testimonial-media">{testimonialPlaying ? <video autoPlay controls playsInline><source src={asset("/media/testimonial.mp4")} type="video/mp4"/></video> : <button className="video-cover" onClick={() => setTestimonialPlaying(true)} aria-label="Reproducir testimonio"><img src={asset("/media/testimonial-cover.webp")} alt="Testimonio de Pablo Avila, CYL S.A."/><i>▶</i><span>VER TESTIMONIO</span></button>}</div></section>

    <section className="problems white-section" id="marketing">
      <div className="section-heading" data-reveal><p>SOLUCIONES A TU MEDIDA</p><h2>¿Qué problemas resolvemos para vos y tu empresa?</h2></div>
      <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} data-reveal open={index === 0}><summary><span>0{index + 1}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div>
      <div className="problem-actions"><a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span><b aria-hidden="true">▶</b></a><a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span><b aria-hidden="true">▶</b></a></div>
    </section>

    <section className="human-cta">
      <div className="human-copy" data-reveal><p>ENVIANOS UN MENSAJE</p><h2>Contactanos y reservá una asesoría online sin cargo</h2><span>Somos un equipo de profesionales con más de 10 años de experiencia, listos para asesorarte. <b>Contactanos y coordinamos una charla para entender tu negocio, sus desafíos y objetivos.</b> Durante la conversación, te proponemos acciones concretas y armamos una propuesta a medida en menos de 48 horas.</span><a className="orange-cta" href="https://wa.link/wgb5pk">QUIERO AGENDAR UNA ASESORÍA <b aria-hidden="true">▶</b></a></div>
      <video autoPlay muted loop playsInline><source src={asset("/media/human.mp4")} type="video/mp4"/></video>
    </section>

    <section className="trusted"><p>MÁS DE 10 AÑOS DE EXPERIENCIA</p><h2>Confían en nosotros</h2><div className="trusted-marquee"><LogoTrack /></div></section>

    <section className="contact-form" id="contacto">
      <div className="contact-main"><p><i/> CONTACTO</p><h2>Hablemos de tu proyecto</h2><span>Contanos qué necesitás. Te respondemos con ideas concretas y próximos pasos.</span><form><div><label>Nombre<input type="text" name="nombre" placeholder="Tu nombre"/></label><label>Empresa<input type="text" name="empresa" placeholder="Nombre de tu empresa"/></label></div><div><label>Email<input type="email" name="email" placeholder="nombre@empresa.com"/></label><label>Teléfono<input type="tel" name="telefono" placeholder="+54"/></label></div><label>Mensaje<textarea name="mensaje" rows={4} placeholder="Contanos brevemente sobre tu proyecto"/></label><button type="button">Enviar consulta <b aria-hidden="true">▶</b></button></form></div>
      <aside className="contact-card"><span>ESTAMOS PARA AYUDARTE</span><h3>Hola. Conversemos sobre lo que querés lograr.</h3><a href="tel:+5491168758285"><i>☎</i><div><small>Teléfono</small><b>+54 9 11 6875-8285</b></div></a><a href="mailto:hola@ideamos.com.ar"><i>✉</i><div><small>Email</small><b>hola@ideamos.com.ar</b></div></a><a href="https://www.instagram.com/ideamosargentina/" target="_blank" rel="noreferrer"><i>◎</i><div><small>Instagram</small><b>@ideamosargentina</b></div></a><div className="contact-social"><span>Seguinos</span><a href="https://www.instagram.com/ideamosargentina/" target="_blank" rel="noreferrer">IG</a></div></aside>
    </section>

    <footer><div className="footer-top"><div className="footer-brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos"/><h3>Más estrategia.<br/><em>Más resultados.</em></h3><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar ▶</a></div><div><b>Servicios</b><a href={asset("/diseno-web-autoadministrable/")}>Diseño Web</a><a href={asset("/tiendas-online/")}>Tiendas Online</a><a href={asset("/marketing-digital/")}>Marketing Digital</a><a href={asset("/posicionamiento-web/")}>Posicionamiento Web</a></div><div><b>Contacto</b><a href="https://wa.link/wgb5pk">+54 9 11 6875-8285</a><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar</a><p>Buenos Aires, Argentina</p></div></div><div className="footer-bottom"><span>© 2026 ESTUDIO IDEAMOS</span><a href="#inicio">VOLVER ARRIBA ↑</a></div></footer>
  </main>;
}
