import ArrowIcon from "../../../components/ArrowIcon";
import s from "./additions.module.css";

// Descripciones respaldadas por public/portfolio/projects.js y lib/testimonials.ts.
// No se atribuyen métricas comerciales ni se infiere el alcance del proyecto testimonial.
const cases = [
  { name: "CYL Neumáticos", sector: "COMERCIO · NEUMÁTICOS", copy: "El proyecto del portfolio organiza las líneas de neumáticos por vehículo y uso, presenta las sucursales y ofrece un recorrido visual con modelos 3D. Una forma concreta de ordenar una oferta técnica y facilitar su consulta.", person: "Pablo Avila, coordinador de CYL S.A., comparte su experiencia con Ideamos en el testimonio en video.", url: "https://www.cylneumaticos.com.ar/" },
  { name: "Sphere Design", sector: "ARQUITECTURA · VISUALIZACIÓN 3D", copy: "Un portfolio visual para presentar renders, películas y experiencias inmersivas de un estudio de visualización arquitectónica. El recorrido editorial relaciona sus proyectos con la presentación de sus servicios.", person: "Vanesa Vila, fundadora de Sphere Design, cuenta su experiencia con el equipo en el testimonio en video.", url: "https://studiospheredesign.com/" },
];

export default function ProjectEvidence() {
  return <section className={s.evidence} aria-labelledby="project-evidence-title">
    <div className={s.inner}>
      <header><p className={s.eyebrow}>DISEÑO APLICADO A NEGOCIOS REALES</p><h2 id="project-evidence-title">Cada empresa, <em>una solución propia.</em></h2></header>
      <div className={s.caseGrid}>{cases.map(item => <article key={item.name}>
        <p className={s.caseSector}>{item.sector}</p><h3>{item.name}</h3>
        <p>{item.copy}</p><p className={s.casePerson}>{item.person}</p>
        <a className={s.link} href={item.url} target="_blank" rel="noopener noreferrer">Ver sitio de {item.name}<ArrowIcon /></a>
      </article>)}</div>
    </div>
  </section>;
}
