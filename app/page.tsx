"use client";

import { useEffect, useState } from "react";

const services = [
  ["01", "Diseño web", "Sitios de alto impacto pensados para transmitir autoridad, generar confianza y convertir visitas en oportunidades reales."],
  ["02", "Ecommerce", "Tiendas online estratégicas, automatizadas y listas para escalar. Tu negocio vendiendo incluso cuando no estás."],
  ["03", "Marketing digital", "Estrategia, campañas y contenido para que tu marca encuentre a las personas correctas en el momento correcto."],
  ["04", "SEO & Google Ads", "Posicionamos tu empresa donde ya están buscando lo que ofrecés. Más tráfico, mejores leads, resultados medibles."],
];

const projects = [
  { image: "/media/mock-004.png", title: "Experiencias que convierten", tag: "Diseño + desarrollo" },
  { image: "/media/mock-007.png", title: "Marcas listas para crecer", tag: "Ecommerce + estrategia" },
  { image: "/media/mock-001.png", title: "Ideas que mueven negocios", tag: "Producto digital" },
];

const clients = ["WYNN'S", "UBA", "STROMBERG", "SANTILLANA", "RE/MAX", "ONER VFX", "MACBA", "IVESS", "KAPELUSZ", "BGH"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <a className="brand" href="#inicio" aria-label="Ideamos, inicio">
          <img src="/logos/ideamos-light.webp" alt="Ideamos" />
        </a>
        <nav className={menu ? "navlinks navlinks--open" : "navlinks"} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenu(false)}>Servicios</a>
          <a href="#trabajos" onClick={() => setMenu(false)}>Proyectos</a>
          <a href="#nosotros" onClick={() => setMenu(false)}>Estudio</a>
          <a href="#contacto" onClick={() => setMenu(false)}>Contacto</a>
        </nav>
        <a className="nav-cta" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer">Hablemos <span>↗</span></a>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Abrir menú">{menu ? "×" : "≡"}</button>
      </header>

      <section className="hero" id="inicio">
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="orb orb-a" /><div className="orb orb-b" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Estudio digital independiente · Buenos Aires</p>
          <h1>Ideas que<br /><em>mueven</em> negocios.</h1>
          <div className="hero-bottom">
            <p>Diseñamos experiencias digitales que atraen, conectan y convierten. Estrategia, diseño y tecnología en un mismo equipo.</p>
            <a className="glow-button" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer"><span>Empecemos un proyecto</span><b>↗</b></a>
          </div>
        </div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="client-strip" aria-label="Clientes">
        <p>Confían en nosotros</p>
        <div className="client-mask"><div className="client-track">{[...clients, ...clients].map((client, i) => <span key={`${client}-${i}`}>{client}</span>)}</div></div>
      </section>

      <section className="intro section-pad" id="nosotros">
        <div className="section-kicker reveal"><span>01</span> Lo que hacemos</div>
        <div className="intro-copy reveal">
          <h2>No hacemos solo<br />sitios lindos.</h2>
          <p>Construimos herramientas de crecimiento.</p>
        </div>
        <p className="intro-side reveal">Combinamos estrategia, diseño y tecnología para transformar negocios en marcas digitales memorables — y marcas memorables en resultados.</p>
        <div className="kinetic-word" aria-hidden="true">IDEAMOS</div>
      </section>

      <section className="services section-pad" id="servicios">
        <div className="section-kicker light reveal"><span>02</span> Especialidades</div>
        <div className="services-head reveal"><h2>Todo lo que tu marca<br />necesita para <em>crecer.</em></h2><p>Sin fórmulas enlatadas. Cada solución nace de entender tu negocio, tus desafíos y a dónde querés llegar.</p></div>
        <div className="service-list">
          {services.map(([number, title, copy]) => <article className="service reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></article>)}
        </div>
      </section>

      <section className="work section-pad" id="trabajos">
        <div className="section-kicker reveal"><span>03</span> Trabajo seleccionado</div>
        <div className="work-title reveal"><h2>Diseñamos para<br /><em>dejar marca.</em></h2><a href="https://ideamos.com.ar/casos-de-exito/">Ver todos los casos ↗</a></div>
        <div className="project-grid">
          {projects.map((project, index) => <article className={`project reveal project-${index + 1}`} key={project.image}><div className="project-image"><img src={project.image} alt={project.title} /><span>VER CASO ↗</span></div><p>{project.tag}</p><h3>{project.title}</h3></article>)}
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-glow" />
        <p className="reveal">LA IDEA ES EL PRINCIPIO.</p>
        <h2 className="reveal">Lo digital cambia.<br />Una gran idea <em>permanece.</em></h2>
        <div className="manifesto-stats reveal"><div><strong>15+</strong><span>Años creando</span></div><div><strong>300+</strong><span>Proyectos lanzados</span></div><div><strong>8</strong><span>Países alcanzados</span></div></div>
      </section>

      <section className="contact-bridge" id="contacto">
        <p>¿Tenés una idea?</p><h2>Hagámosla<br /><em>real.</em></h2>
        <a className="glow-button dark" href="https://wa.link/wgb5pk" target="_blank" rel="noreferrer"><span>Contanos tu proyecto</span><b>↗</b></a>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><img src="/logos/ideamos-light.webp" alt="Ideamos" /><p>Diseño web & marketing digital</p><h3>Más estrategia.<br /><em>Más resultados.</em></h3><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar ↗</a></div>
          <div><span>Explorá</span><a href="#servicios">Servicios</a><a href="#trabajos">Proyectos</a><a href="#nosotros">Estudio</a><a href="https://ideamos.com.ar/blog/">Blog</a></div>
          <div><span>Conectá</span><a href="https://www.instagram.com/ideamosweb/">Instagram</a><a href="https://www.linkedin.com/company/ideamos/">LinkedIn</a><a href="https://wa.link/wgb5pk">WhatsApp</a></div>
          <div><span>Contacto</span><a href="tel:+5491168758285">+54 9 11 6875-8285</a><p>Buenos Aires<br />Argentina</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 IDEAMOS — TODOS LOS DERECHOS RESERVADOS</span><a href="#inicio">VOLVER ARRIBA ↑</a></div>
        <div className="footer-shape shape-ring" /><div className="footer-shape shape-square" />
      </footer>
    </main>
  );
}
