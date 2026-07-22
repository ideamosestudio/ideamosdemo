"use client";

import { useEffect, useState } from "react";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const clients = ["SANTILLANA", "RE/MAX", "ONER VFX", "MACBA", "IVESS", "KAPELUSZ", "BGH", "UBA"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--scroll", String(y));
      document.documentElement.style.setProperty("--scroll-vh", String(y / window.innerHeight));
      setScrolled(y > 30);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .14 });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <main>
    <header className={`nav ${scrolled ? "nav-black" : ""}`}>
      <a href="#inicio" className="brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos" /></a>
      <nav className={menu ? "nav-links open" : "nav-links"}>
        <a href="#web">Diseño Web</a><a href="#tiendas">Tiendas Online</a><a href="#marketing">Marketing Digital</a><a href="#google">Aparecé primero en Google</a><a href="#casos">Casos de Éxito</a>
      </nav>
      <a className="nav-contact" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer">Contacto <b>↗</b></a>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Menú">{menu ? "×" : "≡"}</button>
    </header>

    <section className="hero" id="inicio">
      <video autoPlay muted loop playsInline className="hero-video"><source src={asset("/media/hero.mp4")} type="video/mp4" /></video>
      <div className="hero-overlay" /><div className="hero-aurora" />
      <div className="space-particles"><i/><i/><i/><i/><i/><i/></div>
      <div className="wire-sphere"><span/><span/><span/><span/></div>
      <div className="hero-center">
        <p className="availability"><i/> Más estrategia, más resultados</p>
        <h1><span>Expertos en crear webs</span><em>que atraen clientes y ventas</em></h1>
        <p className="hero-copy"><b>Sitios web, tiendas online y marketing digital</b> para que tu empresa venda más y más fácil.</p>
        <div className="hero-actions">
          <a className="cta-glow primary" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer"><span>Quiero una asesoría sin cargo</span><b>↗</b></a>
          <a className="cta-glow secondary" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer"><span>Quiero contactar un experto</span><b>↗</b></a>
        </div>
      </div>
      <div className="hero-caption">DISEÑO WEB & MARKETING DIGITAL</div>
      <div className="scroll-line"><span>DESCUBRÍ MÁS</span><i/></div>
    </section>

    <section className="logo-bar">
      <small>Confían en nosotros</small>
      <div className="logo-fade"><div className="logo-run">{[...clients,...clients].map((name,i)=><b key={`${name}-${i}`}>{name}</b>)}</div></div>
    </section>

    <section className="statement white-section" id="web">
      <div className="index" data-reveal><span>01</span> DISEÑO WEB PROFESIONAL</div>
      <p className="statement-label" data-reveal>DISEÑO WEB PROFESIONAL EN WORDPRESS — ESTUDIO IDEAMOS</p>
      <h2 data-reveal><span>Webs de alto impacto</span><em>ideadas para generar confianza y resultados</em></h2>
      <p className="statement-copy" data-reveal>Creamos sitios web pensados para transmitir autoridad, confianza y generar contactos reales. Desde el diseño a medida hasta el contenido, todo está enfocado en convertir visitas en potenciales clientes.</p>
      <a className="text-link" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer">CHARLEMOS DE TU PROYECTO <b>↗</b></a>
      <div className="giant-type" aria-hidden="true">IDEAMOS</div>
    </section>

    <section className="showcase" id="casos">
      <div className="showcase-sticky">
        <div className="showcase-copy">
          <p>DISEÑO + ESTRATEGIA + TECNOLOGÍA</p>
          <h2>Una web que trabaja<br/><em>para tu negocio.</em></h2>
          <span>Desarrollamos sitios web profesionales y tiendas online en WordPress pensadas para atraer clientes, mejorar tu posicionamiento en Google y aumentar tus conversiones.</span>
        </div>
        <div className="device-stage"><div className="device-glow"/><img className="device one" src={asset("/media/mock-004.png")} alt="Proyecto de diseño web de Ideamos"/><img className="device two" src={asset("/media/mock-007.png")} alt="Proyecto ecommerce de Ideamos"/><img className="device three" src={asset("/media/mock-001.png")} alt="Proyecto digital de Ideamos"/></div>
        <div className="orbit-copy"><span>SCROLL</span><span>IDEAS</span><span>RESULTADOS</span></div>
      </div>
    </section>

    <section className="ecommerce white-section" id="tiendas">
      <div className="index" data-reveal><span>02</span> ECOMMERCE ESTRATÉGICO</div>
      <div className="split-heading"><h2 data-reveal><span>¿Necesitás una tienda online</span><em>para automatizar tus ventas?</em></h2><p data-reveal>Automatizá tus ventas con una tienda diseñada para convertir: estrategia, procesos simples y tecnología que trabaja por vos. Es escalable, segura y pensada para crecer con tu negocio.</p></div>
      <div className="feature-grid">
        <article data-reveal><b>01</b><h3>Pagos integrados</h3><p>Aceptá tarjetas, transferencias y billeteras en un checkout rápido y seguro. Activamos Mercado Pago y métodos locales para que cobres desde el día uno.</p></article>
        <article data-reveal><b>02</b><h3>Envíos automáticos</h3><p>Mostrá tarifas y tiempos en vivo con Correo Argentino, Andreani y OCA. Seguimiento para el cliente y retiro en punto o a domicilio.</p></article>
        <article data-reveal><b>03</b><h3>Tu tienda es tuya</h3><p>Dominio, hosting y acceso administrador desde el día uno. Ideamos no te cobra por venta ni alquiler mensual.</p></article>
        <article data-reveal><b>04</b><h3>Decisiones con datos</h3><p>Mirá ventas, conversión y ticket promedio en un tablero claro. Detectá qué canales rinden y dónde conviene invertir más.</p></article>
      </div>
    </section>

    <section className="google-scene" id="google">
      <div className="google-grid"/><div className="search-ring ring-a"/><div className="search-ring ring-b"/>
      <div className="google-content" data-reveal>
        <p>POSICIONAMIENTO EN GOOGLE</p>
        <h2><span>Convertimos tu web en una máquina</span><em>de generar tráfico, leads y ventas</em></h2>
        <h3>Liderá Google con estrategias de SEO y Google Ads</h3>
        <p className="body-copy">Traemos a tu web personas que ya buscan lo que ofrecés y las convertimos en consultas. Con Google Ads te mostramos primero cuando te buscan. Con posicionamiento en Google hacemos que te encuentren sin pagar cada clic.</p>
        <a className="cta-glow primary" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer"><span>Quiero estar primero en Google</span><b>↗</b></a>
      </div>
      <div className="rank-number">01</div>
    </section>

    <section className="problems white-section" id="marketing">
      <div className="index" data-reveal><span>03</span> SOLUCIONES A TU MEDIDA</div>
      <h2 data-reveal><span>¿Qué problemas resolvemos</span><em>para vos y tu empresa?</em></h2>
      <div className="problem-list">
        <article data-reveal><span>01</span><h3>Necesitás una presencia online profesional</h3><p>Diseñamos sitios que transmiten confianza, explican claro lo que hacés y te ayudan a captar más clientes desde el primer día.</p><b>↗</b></article>
        <article data-reveal><span>02</span><h3>No sabés por dónde empezar</h3><p>SEO, campañas, blog, Google Ads, posicionamiento… Nosotros lo simplificamos y armamos un plan realista.</p><b>↗</b></article>
        <article data-reveal><span>03</span><h3>Tu proyecto necesita un equipo completo</h3><p>Programadores, diseñadores, maquetadores y estrategas para proyectos grandes, complejos y personalizados.</p><b>↗</b></article>
        <article data-reveal><span>04</span><h3>Querés vender online de verdad</h3><p>Tiendas con diseño profesional, que inspiran confianza y venden solas: automatizadas, fáciles de usar y listas para escalar.</p><b>↗</b></article>
      </div>
    </section>

    <section className="contact-panel">
      <p data-reveal>MUCHOS CLIENTES LLEGAN CON UN MIX DE DUDAS, URGENCIAS Y GANAS DE MEJORAR.</p>
      <h2 data-reveal><span>Tengamos una charla</span><em>sin compromiso.</em></h2>
      <p data-reveal>Te ayudamos a ordenar prioridades y entender qué conviene hacer paso a paso.</p>
      <a className="cta-glow light" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer"><span>Agendá un llamado rápido</span><b>↗</b></a>
    </section>

    <footer>
      <div className="footer-top"><div className="footer-brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos"/><p>Diseño web & marketing digital</p><h3>Más estrategia.<br/><em>Más resultados.</em></h3><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar ↗</a></div><div><b>Servicios</b><a href="#web">Diseño Web</a><a href="#tiendas">Tiendas Online</a><a href="#marketing">Marketing Digital</a><a href="#google">Posicionamiento Web</a></div><div><b>Ideamos</b><a href="https://ideamos.com.ar/la-empresa-estudio-ideamos/">La empresa</a><a href="https://ideamos.com.ar/casos-de-exito/">Casos de éxito</a><a href="https://ideamos.com.ar/blog/">Nuestro blog</a></div><div><b>Contacto</b><a href="https://wa.link/wgb5pk">+54 9 11 6875-8285</a><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar</a><p>Buenos Aires, Argentina</p></div></div>
      <div className="footer-bottom"><span>© 2026 ESTUDIO IDEAMOS</span><a href="#inicio">VOLVER ARRIBA ↑</a></div><i className="foot-ring"/><i className="foot-block"/>
    </footer>
  </main>;
}
