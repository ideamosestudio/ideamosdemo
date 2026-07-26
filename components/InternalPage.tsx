import Link from "next/link";

type ServicePage = {
  eyebrow: string;
  title: string;
  intro: string;
  sectionTitle: string;
  sectionCopy: string;
  items: Array<[string, string]>;
  darkTitle: string;
  darkCopy: string;
};

const nav = [
  ["Diseño Web", "diseno-web-autoadministrable"],
  ["Tiendas Online", "tiendas-online"],
  ["Marketing Digital", "marketing-digital"],
  ["Aparecé primero en Google", "posicionamiento-web"],
  ["Casos de Éxito", "casos-de-exito"],
];

export default function InternalPage({ page }: { page: ServicePage }) {
  return <main className="internal-page">
    <header className="nav nav-black internal-nav">
      <Link href="../" className="brand"><img src="../logos/ideamos-light.webp" alt="Ideamos" /></Link>
      <nav className="nav-links">{nav.map(([label, href]) => <Link key={href} href={`../${href}/`}>{label}</Link>)}</nav>
      <Link className="nav-contact" href="../contacto/">Contacto <b>→</b></Link>
    </header>

    <section className="internal-hero">
      <video autoPlay muted loop playsInline><source src="../media/hero.mp4" type="video/mp4" /></video>
      <div className="internal-shade" />
      <div className="internal-tech">01 — IDEAMOS <i /></div>
      <div className="internal-hero-copy">
        <p>{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <span>{page.intro}</span>
        <div className="hero-actions">
          <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Quiero una asesoría sin cargo</span><b>→</b></a>
          <a className="cta-glow secondary" href="https://wa.link/wgb5pk"><span>Quiero contactar un experto</span><b>→</b></a>
        </div>
      </div>
    </section>

    <section className="internal-intro">
      <p>ESTRATEGIA + DISEÑO + TECNOLOGÍA</p>
      <h2>{page.sectionTitle}</h2>
      <span>{page.sectionCopy}</span>
    </section>

    <section className="internal-grid">
      {page.items.map(([title, copy], index) => <article key={title}>
        <small>0{index + 1}</small><i />
        <h3>{title}</h3><p>{copy}</p>
      </article>)}
    </section>

    <section className="internal-dark">
      <div className="internal-tech">RESULTS / 2026 <i /></div>
      <p>SOLUCIONES A TU MEDIDA</p>
      <h2>{page.darkTitle}</h2>
      <span>{page.darkCopy}</span>
      <div className="hero-actions">
        <a className="cta-glow primary" href="https://wa.link/wgb5pk"><span>Charlemos de tu proyecto</span><b>→</b></a>
        <Link className="cta-glow secondary" href="../contacto/"><span>Enviar una consulta</span><b>→</b></Link>
      </div>
    </section>

    <footer className="internal-footer">
      <div><img src="../logos/ideamos-light.webp" alt="Ideamos" /><h3>Más estrategia.<br />Más resultados.</h3></div>
      <div><small>CONTACTO</small><a href="tel:+5491168758285">+54 9 11 6875-8285</a><a href="mailto:hola@ideamos.com.ar">hola@ideamos.com.ar</a><a href="https://instagram.com/ideamosargentina">@ideamosargentina</a></div>
    </footer>
  </main>;
}

export type { ServicePage };
