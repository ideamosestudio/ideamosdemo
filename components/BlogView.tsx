import SiteHeader from "./SiteHeader";
import { SharedFooter } from "./SharedHomeSections";
import { BLOG_DATE, blogCategories, blogPosts, type BlogPost } from "../lib/blog";
import { SITE_URL } from "../lib/seo";

const href = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
const imageSet = (post: BlogPost) => `${href(post.image.replace(".webp", "-640.webp"))} 640w, ${href(post.image)} 1200w`;
export default function BlogView({ post, category }: { post?: BlogPost; category?: typeof blogCategories[number] }) {
  const topic = category ?? blogCategories.find(c => c.slug === post?.category);
  const title = post?.title ?? category?.title ?? "Ideas para tu próxima web";
  const description = post?.intro ?? category?.description ?? "Guías prácticas para tomar mejores decisiones sobre el diseño web de tu empresa y tu tienda online. Sin vueltas: qué preparar, qué preguntar y cómo empezar.";
  const path = post ? `/blog/${post.slug}/` : category ? `/blog/${category.slug}/` : "/blog/";
  const posts = blogPosts.filter(p => p !== post && (!topic || p.category === topic.slug));
  const crumbs = [{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog/" }];
  if (topic) crumbs.push({ name: topic.title, path: `/blog/${topic.slug}/` });
  if (post) crumbs.push({ name: post.title, path });
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: SITE_URL + c.path })) },
    post ? { "@type": "BlogPosting", "@id": SITE_URL + path + "#article", headline: title, description: post.description, mainEntityOfPage: SITE_URL + path, url: SITE_URL + path, inLanguage: "es-AR", datePublished: BLOG_DATE, dateModified: BLOG_DATE, author: { "@type": "Organization", name: "Ideamos", url: SITE_URL, "@id": SITE_URL + "/#organization" }, publisher: { "@id": SITE_URL + "/#organization" }, image: SITE_URL + post.image, articleSection: topic?.title } : { "@type": "CollectionPage", name: title, description, url: SITE_URL + path, inLanguage: "es-AR", mainEntity: { "@type": "ItemList", itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: SITE_URL + `/blog/${p.slug}/` })) } },
  ] };
  return <div className="blog-shell">
    <SiteHeader solid />
    <main id="inicio" className="blog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="blog-heading">
        <nav aria-label="Ruta de navegación" className="blog-crumbs">{crumbs.map((c, i) => <span key={c.path}>{i > 0 && <span aria-hidden="true"> / </span>}{i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <a href={href(c.path)}>{c.name}</a>}</span>)}</nav>
        <p className="blog-eyebrow">{post ? "GUÍA PRÁCTICA" : "BLOG · IDEAMOS"}</p>
        <h1>{post || category ? title : <>Ideas para tu<br/><em>próxima web.</em></>}</h1>
        <p className="blog-intro">{description}</p>
        {post && <p className="blog-byline">Por Ideamos · Publicado el <time dateTime={BLOG_DATE}>24 de octubre de 2026</time></p>}
        {!post && <nav className="blog-topics" aria-label="Temas del blog">{blogCategories.map(c => <a key={c.slug} href={href(`/blog/${c.slug}/`)} aria-current={category === c ? "page" : undefined}>{c.slug === "tiendas-online" ? "Tiendas online" : "Diseño web"}</a>)}</nav>}
      </header>
      {post && <div className="blog-reading">
        <aside className="blog-toc"><nav aria-label="Contenido del artículo"><strong>En esta guía</strong>{post.sections.map((s, i) => <a key={s.title} href={`#seccion-${i + 1}`}>{s.title}</a>)}</nav></aside>
        <article className="blog-article" aria-label={title}>
          <figure className="blog-cover"><img src={href(post.image)} srcSet={imageSet(post)} sizes="(max-width:800px) calc(100vw - 48px), 740px" alt={post.imageAlt} width="1200" height="686" loading="lazy" decoding="async" /></figure>
          {post.sections.map((s, i) => <section key={s.title} id={`seccion-${i + 1}`}><span className="blog-section-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><h2>{s.title}</h2>{s.paragraphs.map(p => <p key={p}>{p}</p>)}{s.checklist && <div className="blog-checklist"><h3>Tu lista de verificación</h3><ul>{s.checklist.map(item => <li key={item}>{item}</li>)}</ul></div>}</section>)}
          {post.source && <p className="blog-source">Para ampliar: <a href={post.source.url}>{post.source.label}</a>.</p>}
          <aside className="blog-cta"><h2>{post.category === "tiendas-online" ? "Preparemos tu tienda online" : "Pensemos la web de tu empresa"}</h2><p>Contanos qué necesitás y qué tenés preparado. Podemos ayudarte a definir el alcance y los próximos pasos.</p><a href={href(topic!.service)}>Conocé nuestro servicio de {post.category === "tiendas-online" ? "tiendas online" : "diseño web"}</a><a href={href("/portfolio/")}>Explorá proyectos de nuestro portfolio</a><a href={href("/contacto/")}>Hablemos de tu proyecto</a></aside>
        </article>
      </div>}
      <section className="blog-list" aria-labelledby="blog-list-title"><h2 id="blog-list-title">{post ? "Seguí leyendo" : "Guías para decidir con claridad"}</h2><div className="blog-cards">{posts.map(p => <article key={p.slug}>
        <img className="blog-card-image" src={href(p.image)} srcSet={imageSet(p)} sizes="(max-width:800px) calc(100vw - 96px), 500px" alt={p.imageAlt} width="1200" height="686" loading="lazy" decoding="async" />
        <p className="blog-eyebrow">{p.category === "tiendas-online" ? "TIENDAS ONLINE" : "DISEÑO WEB"}</p><h3><a href={href(`/blog/${p.slug}/`)}>{p.title}</a></h3><p>{p.description}</p></article>)}</div></section>
    </main>
    <SharedFooter />
  </div>;
}
