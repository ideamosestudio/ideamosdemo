import ArrowIcon from "../../../components/ArrowIcon";
import { testimonials } from "../../../lib/testimonials";
import s from "./additions.module.css";

// Descripciones respaldadas por public/portfolio/projects.js y lib/testimonials.ts.
// No se atribuyen métricas comerciales ni se infiere el alcance del proyecto testimonial.
const cases = [
  { id: "cylsa", name: "CYL Neumáticos", sector: "COMERCIO · NEUMÁTICOS", need: "Presentar una oferta de neumáticos multimarca para distintos vehículos y usos.", solution: "Un sitio comercial que organiza las líneas de producto y presenta la empresa y sus sucursales.", features: "Catálogo por aplicación, consultas de cotización y experiencia visual 3D.", person: "Pablo Avila, coordinador de CYL S.A., comparte su experiencia con Ideamos en el testimonio en video.", url: "https://www.cylneumaticos.com.ar/" },
  { id: "sphere-design", name: "Sphere Design", sector: "ARQUITECTURA · VISUALIZACIÓN 3D", need: "Mostrar el trabajo audiovisual de un estudio de visualización arquitectónica.", solution: "Un portfolio visual con un recorrido editorial que conecta proyectos y servicios.", features: "Presentación de renders, películas y experiencias inmersivas.", person: "Vanesa Vila, fundadora de Sphere Design, cuenta su experiencia con el equipo en el testimonio en video.", url: "https://studiospheredesign.com/" },
];
const href = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const caseDetails = {
  cylsa: { highlight: "organiza las líneas de producto", tags: ["Catálogo por aplicación", "Cotizaciones", "Experiencia 3D"] },
  "sphere-design": { highlight: "conecta proyectos y servicios", tags: ["Renders", "Películas", "Experiencias inmersivas"] },
};

export default function ProjectEvidence() {
  return <section className={s.evidence} aria-labelledby="project-evidence-title">
    <div className={s.inner}>
      <header><p className={s.eyebrow}>DISEÑO APLICADO A NEGOCIOS REALES</p><h2 id="project-evidence-title">Cada empresa, <em>una solución propia.</em></h2></header>
      <div className={s.caseGrid}>{cases.map(item => {
        const testimonial = testimonials.find(person => person.site === item.url);
        const details = caseDetails[item.id as keyof typeof caseDetails];
        return <article key={item.name}>
        <div className={s.caseHeading}><p className={s.caseSector}>{item.sector}</p><h3>{item.name}</h3></div>
        <figure className={s.caseImage}>
          <a className={s.caseImageLink} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar el sitio de ${item.name} (abre en una pestaña nueva)`}>
          <img src={href(`/portfolio/assets/thumbLarge-${item.id}.webp`)} srcSet={`${href(`/portfolio/assets/thumb-${item.id}.webp`)} 480w, ${href(`/portfolio/assets/thumbLarge-${item.id}.webp`)} 1200w`} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1340px) 42vw, 569px" width="1200" height="833" loading="lazy" decoding="async" alt={`Captura del proyecto de diseño web de ${item.name}`} />
          <span className={s.caseImageArrow}><ArrowIcon /></span>
          </a>
        </figure>
        <dl className={s.caseFacts}>
          <div><dt>El desafío</dt><dd>{item.need}</dd></div>
          <div><dt>La solución</dt><dd>{item.solution.split(details.highlight)[0]}<strong>{details.highlight}</strong>{item.solution.split(details.highlight)[1]}</dd></div>
        </dl>
        <div className={s.caseFeatures}><span>Funcionalidades</span><ul className={s.caseTags}>{details.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div>
        <div className={s.caseActions}>
          {testimonial && <div className={s.caseTestimonial}>
            <a href={href(testimonial.video)} target="_blank" rel="noopener noreferrer" aria-label={`Ver testimonio de ${testimonial.name} (video en una pestaña nueva)`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z" strokeLinejoin="round"/></svg>Ver testimonio de {testimonial.name.split(" ")[0]}</a>
          </div>}
          <a className={s.link} href={item.url} target="_blank" rel="noopener noreferrer">Ver sitio de {item.name}<ArrowIcon /></a>
        </div>
      </article>})}</div>
      <div className={s.caseMore}><p>Otros desafíos. Más proyectos.</p><a href={href("/portfolio/")}>Explorar portfolio <ArrowIcon /></a></div>
    </div>
  </section>;
}
