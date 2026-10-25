import ArrowIcon from "../../../components/ArrowIcon";
import s from "./additions.module.css";

// Descripciones respaldadas por public/portfolio/projects.js y lib/testimonials.ts.
// No se atribuyen métricas comerciales ni se infiere el alcance del proyecto testimonial.
const cases = [
  { id: "cylsa", name: "CYL Neumáticos", sector: "COMERCIO · NEUMÁTICOS", need: "Presentar una oferta de neumáticos multimarca para distintos vehículos y usos.", solution: "Un sitio comercial que organiza las líneas de producto y presenta la empresa y sus sucursales.", features: "Catálogo por aplicación, consultas de cotización y experiencia visual 3D.", person: "Pablo Avila, coordinador de CYL S.A., comparte su experiencia con Ideamos en el testimonio en video.", url: "https://www.cylneumaticos.com.ar/" },
  { id: "sphere-design", name: "Sphere Design", sector: "ARQUITECTURA · VISUALIZACIÓN 3D", need: "Mostrar el trabajo audiovisual de un estudio de visualización arquitectónica.", solution: "Un portfolio visual con un recorrido editorial que conecta proyectos y servicios.", features: "Presentación de renders, películas y experiencias inmersivas.", person: "Vanesa Vila, fundadora de Sphere Design, cuenta su experiencia con el equipo en el testimonio en video.", url: "https://studiospheredesign.com/" },
];
const href = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export default function ProjectEvidence() {
  return <section className={s.evidence} aria-labelledby="project-evidence-title">
    <div className={s.inner}>
      <header><p className={s.eyebrow}>DISEÑO APLICADO A NEGOCIOS REALES</p><h2 id="project-evidence-title">Cada empresa, <em>una solución propia.</em></h2></header>
      <div className={s.caseGrid}>{cases.map(item => <article key={item.name}>
        <figure className={s.caseImage}>
          <img src={href(`/portfolio/assets/thumbLarge-${item.id}.webp`)} srcSet={`${href(`/portfolio/assets/thumb-${item.id}.webp`)} 480w, ${href(`/portfolio/assets/thumbLarge-${item.id}.webp`)} 1200w`} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1340px) 42vw, 569px" width="1200" height="833" loading="lazy" decoding="async" alt={`Captura del proyecto de diseño web de ${item.name}`} />
        </figure>
        <p className={s.caseSector}>{item.sector}</p><h3>{item.name}</h3>
        <dl className={s.caseFacts}>
          <div><dt>Necesidad</dt><dd>{item.need}</dd></div>
          <div><dt>Solución</dt><dd>{item.solution}</dd></div>
          <div><dt>Funciones</dt><dd>{item.features}</dd></div>
        </dl><p className={s.casePerson}>{item.person}</p>
        <a className={s.link} href={item.url} target="_blank" rel="noopener noreferrer">Ver sitio de {item.name}<ArrowIcon /></a>
      </article>)}</div>
      <p className={s.caseMore}>¿Tu empresa tiene otro desafío? <a href={href("/portfolio/")}>Explorá más proyectos de diseño web en nuestro portfolio <ArrowIcon /></a></p>
    </div>
  </section>;
}
