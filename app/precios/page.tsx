"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "../../components/MobileMenu";
import { HomeClosingSections } from "../../components/SharedHomeSections";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const navigation = [
  ["Diseño Web", "diseno-web-autoadministrable"],
  ["Tiendas Online", "tiendas-online"],
  ["Marketing Digital", "marketing-digital"],
  ["Aparecé primero en Google", "posicionamiento-web"],
  ["Casos de Éxito", "casos-de-exito"],
];

const plans = [
  {
    name: "Landing Page",
    detail: "Microweb / página única",
    priceLabel: "Por solo",
    price: "$ 250.000",
    description: "Micrositio express para mostrar lo esencial. Ideal como presencia inicial de emprendedores low cost.",
    closing: "Ideal para campañas puntuales, lanzamientos o servicios simples. Todo listo para recibir consultas y mostrar profesionalismo, sin necesidad de una web completa.",
    features: [
      "Una sola página clara y directa.",
      "Templates exclusivas premium.",
      "Adaptable a todas las pantallas.",
      "Diseño profesional y moderno.",
      "Formulario + WhatsApp.",
      "Enlace a redes + Google Maps.",
      "Hasta 5 imágenes.",
      "Animaciones de textos e imágenes.",
      "Velocidad optimizada.",
    ],
  },
  {
    name: "Web Básica",
    detail: "Hasta 4 páginas a medida",
    priceLabel: "Por solo",
    price: "$ 400.000",
    description: "Sitio web para marcas personales o servicios profesionales. Transmití confianza desde el inicio.",
    closing: "Una solución para profesionales, freelancers y pequeños equipos que necesitan generar confianza. Te ayudamos a tener presencia digital sólida y a la altura de lo que ofrecés.",
    features: [
      "Hasta 4 páginas / URLs.",
      "Diseño 100% a medida.",
      "Adaptable a todas las pantallas.",
      "Diseño profesional y moderno.",
      "Formulario + WhatsApp.",
      "Enlace a redes + Google Maps.",
      "Hasta 20 imágenes.",
      "Animaciones de textos e imágenes.",
      "Velocidad optimizada.",
    ],
  },
  {
    name: "Tienda Base",
    detail: "Hasta 10 categorías",
    priceLabel: "Desde",
    price: "$ 500.000",
    description: "Ideal para ofrecer un catálogo reducido con carrito, medios de pago y todo listo para vender desde el primer día.",
    features: [
      "Hasta 20 categorías.",
      "Diseño 100% personalizado.",
      "Subí todos tus productos (autogestionado y sin restricciones).",
      "Carrito de compras.",
      "Múltiples medios de pago.",
      "Autoadministrable.",
      "Animación de textos e imágenes.",
      "Adaptable a todas las pantallas.",
      "Formulario de contacto.",
      "Acceso directo a WhatsApp.",
      "Link a redes sociales.",
      "Google Maps integrado.",
      "Velocidad optimizada.",
    ],
  },
  {
    name: "Tienda Pyme",
    detail: "Hasta 40 categorías",
    priceLabel: "Desde",
    price: "$ 700.000",
    description: "Para empresas con más estructura que necesitan organizar un catálogo amplio. Diseño profesional y gestión avanzada.",
    features: [
      "Hasta 40 categorías.",
      "Diseño 100% personalizado.",
      "Subí todos tus productos (autogestionado y sin restricciones).",
      "Carrito de compras.",
      "Múltiples medios de pago.",
      "Autoadministrable.",
      "Animación de textos e imágenes.",
      "Adaptable a todas las pantallas.",
      "Formulario de contacto.",
      "Acceso directo a WhatsApp.",
      "Link a redes sociales.",
      "Google Maps integrado.",
      "Velocidad optimizada.",
    ],
  },
];

export default function PricesPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="prices-page">
    <header className={`nav internal-nav prices-nav nav-black ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="../" className="brand"><img src={asset("/logos/ideamos-light.webp")} alt="Ideamos" /></Link>
      <nav className="nav-links desktop-navigation">
        {navigation.map(([label, href]) => <Link key={href} href={`../${href}/`}>{label}</Link>)}
      </nav>
      <a className="nav-contact" href="https://wa.link/wgb5pk">Quiero que me asesoren</a>
      <MobileMenu
        logoSrc={asset("/logos/ideamos-light.webp")}
        items={[
          ...navigation.map(([label, href]) => ({ label, href: `../${href}/` })),
          { label: "Contacto", href: "#contacto" },
        ]}
      />
    </header>

    <section className="pricing-intro" id="inicio">
      <div className="pricing-orbit" aria-hidden="true"><i/><i/><i/></div>
      <div className="pricing-intro-copy" data-reveal>
        <p><i/> PLANES IDEAMOS</p>
        <h1>Una web profesional.<br/><em>Un plan claro.</em></h1>
        <span>Elegí la solución que mejor acompaña el momento de tu negocio. Diseño profesional, foco en resultados y todo listo para empezar.</span>
      </div>
      <div className="pricing-index" aria-hidden="true"><span>04 PLANES</span><i/><span>2026</span></div>
    </section>

    <section className="pricing-plans" aria-label="Planes y precios de Ideamos">
      <header className="pricing-heading" data-reveal>
        <p>PRECIOS DE SITIOS WEB Y TIENDAS ONLINE</p>
        <h2>Encontrá el plan<br/>ideal para tu negocio</h2>
      </header>

      <div className="pricing-grid">
        {plans.map((plan, index) => <article className="price-card" key={plan.name} data-reveal>
          <div className="price-card-top">
            <small>{String(index + 1).padStart(2, "0")} — PLAN</small>
            <span className="price-card-mark" aria-hidden="true" />
          </div>
          <h3>{plan.name}</h3>
          <p className="price-detail">{plan.detail}</p>
          <div className="price-value"><small>{plan.priceLabel}</small><strong>{plan.price}</strong><span>FINAL</span></div>
          <p className="price-description">{plan.description}</p>
          <a className="price-cta" href="https://wa.link/wgb5pk">QUIERO ESTE PLAN <span>↗</span></a>
          <div className="price-features">
            <b>EL PLAN INCLUYE:</b>
            <ul>{plan.features.map((feature) => <li key={feature}><i>✓</i><span>{feature}</span></li>)}</ul>
          </div>
          {plan.closing && <p className="price-closing">{plan.closing}</p>}
          <a className="price-more" href="https://wa.link/wgb5pk">QUIERO MÁS INFO <span>→</span></a>
        </article>)}
      </div>
    </section>

    <HomeClosingSections includeClientLogos={false} />
  </main>;
}
