import { serviceGuides, serviceLinks, type ServiceGuideKey } from "../lib/service-guides";
import { SITE_URL } from "../lib/seo";
import ArrowIcon from "./ArrowIcon";
import { blogPosts } from "../lib/blog";

const href = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Visible, server-rendered answers: no hidden keyword blocks or extra animation dependencies.
export default function ServiceGuide({ service }: { service: ServiceGuideKey }) {
  const guide = serviceGuides[service];
  const readingSlugs = service === "web"
    ? ["diseno-web-profesional/diseno-web-profesional", "seo/renovacion-de-sitio-web-2026-seo-conversiones"]
    : service === "shop"
      ? ["tiendas-online/tienda-online-a-medida-o-plataforma", "tiendas-online/que-necesitas-para-lanzar-tienda-online"]
      : [];
  const reading = readingSlugs.map(slug => blogPosts.find(post => post.slug === slug)).filter(post => post !== undefined);
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${serviceLinks[service].href}#preguntas-frecuentes`,
    inLanguage: "es-AR",
    mainEntity: guide.questions.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  return <section className="service-guide service-faq" aria-labelledby={`guide-${service}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />
    <div className="service-faq__inner">
      <div className="service-faq__layout">
        <header className="service-faq__intro">
          <p className="service-faq__eyebrow">PREGUNTAS FRECUENTES</p>
          <h2 id={`guide-${service}`}>{guide.title}</h2>
          <p className="service-faq__description">{guide.intro}</p>
          <div className="service-faq__help">
            <p>¿Tenés otra pregunta?</p>
            <a className="service-faq__contact" href={href("/contacto/")}>Hablemos <span aria-hidden="true"><ArrowIcon /></span></a>
          </div>
        </header>
        <div className="service-faq__questions" id="preguntas-frecuentes">
          {guide.questions.map(([question, answer], index) => <details className="service-faq__item" name={`faq-${service}`} open={index === 0} key={question}>
            <summary>
              <span className="service-faq__question">{question}</span>
              <span className="service-faq__toggle" aria-hidden="true" />
            </summary>
            <div className="service-faq__answer"><p>{answer}</p></div>
          </details>)}
        </div>
      </div>
      <nav className="service-faq__related" aria-label="Servicios y recursos relacionados">
        <p>SEGUÍ EXPLORANDO</p>
        <div>
          {guide.related.map((key) => <a key={key} href={href(serviceLinks[key].href)}>{serviceLinks[key].label}<span aria-hidden="true"><ArrowIcon /></span></a>)}
          <a href={href("/portfolio/")}>Portfolio<span aria-hidden="true"><ArrowIcon /></span></a>
          <a href={href("/casos-de-exito/")}>Casos de éxito<span aria-hidden="true"><ArrowIcon /></span></a>
          <a href={href("/testimonios/")}>Testimonios de clientes<span aria-hidden="true"><ArrowIcon /></span></a>
        </div>
      </nav>
      {reading.length > 0 && <nav className="service-faq__reading" aria-label="Guías para preparar tu proyecto">
        <p>PARA PREPARAR TU PROYECTO</p>
        <ul>{reading.map(post => <li key={post.slug}><a href={href(`/blog/${post.slug}/`)}>{post.title}</a></li>)}</ul>
      </nav>}
    </div>
  </section>;
}
