import { serviceGuides, serviceLinks, type ServiceGuideKey } from "../lib/service-guides";
import { SITE_URL } from "../lib/seo";

const href = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Visible, server-rendered answers: no hidden keyword blocks or extra animation dependencies.
export default function ServiceGuide({ service }: { service: ServiceGuideKey }) {
  const guide = serviceGuides[service];
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
  return <section className="service-guide" aria-labelledby={`guide-${service}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />
    <div className="service-guide-inner">
      <header>
        <p className="service-guide-eyebrow">ANTES DE EMPEZAR</p>
        <h2 id={`guide-${service}`}>{guide.title}</h2>
        <p>{guide.intro}</p>
      </header>
      <div className="service-guide-questions" id="preguntas-frecuentes">
        {guide.questions.map(([question, answer]) => <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>)}
      </div>
      <nav className="service-guide-links" aria-label="Servicios y recursos relacionados">
        {guide.related.map((key) => <a key={key} href={href(serviceLinks[key].href)}>{serviceLinks[key].label}</a>)}
        <a href={href("/casos-de-exito/")}>Conocé nuestros casos de éxito</a>
        <a href={href("/testimonios/")}>Opiniones de nuestros clientes</a>
        <a href={href("/contacto/")}>Contanos tu proyecto</a>
      </nav>
    </div>
  </section>;
}
