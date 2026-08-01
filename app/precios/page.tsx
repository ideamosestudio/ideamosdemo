"use client";

import { useEffect } from "react";
import { HomeClosingSections } from "../../components/SharedHomeSections";
import SiteHeader from "../../components/SiteHeader";

const plans = [
  {
    name: "Landing page",
    detail: "Microweb / página única",
    priceLabel: "Desde",
    price: "$ 250.000",
    description: "Micrositio express para mostrar lo esencial. Ideal como presencia inicial de emprendedores low cost.",
    closing: "Ideal para campañas, lanzamientos o servicios simples. Todo listo para recibir consultas y mostrar profesionalismo, sin necesidad de una web completa.",
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
    name: "Web básica",
    detail: "Hasta 4 páginas a medida",
    priceLabel: "Desde",
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
    name: "Tienda base",
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
    name: "Tienda pyme",
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
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="prices-page">
    <SiteHeader solid />

    <section className="pricing-plans" id="inicio" aria-label="Planes y precios de Ideamos">
      <header className="pricing-heading" data-reveal>
        <p>PLANES IDEAMOS</p>
        <h1>Precios simples.<br/>Cuatro formas de empezar.</h1>
        <span>Elegí el plan que mejor se adapta a tu proyecto. Todos incluyen diseño profesional, adaptación mobile y acompañamiento de nuestro equipo.</span>
      </header>

      <div className="pricing-grid">
        {plans.map((plan, index) => <article className="price-card" key={plan.name} data-reveal>
          <div className="price-card-top"><small>PLAN {String(index + 1).padStart(2, "0")}</small></div>
          <h3>{plan.name}</h3>
          <p className="price-detail">{plan.detail}</p>
          <div className="price-value"><small>{plan.priceLabel}</small><strong>{plan.price}</strong><span>FINAL</span></div>
          <p className="price-description">{plan.description}</p>
          <a className="orange-cta price-cta" href="https://wa.link/wgb5pk">QUIERO ESTE PLAN</a>
          <div className="price-features">
            <b>EL PLAN INCLUYE:</b>
            <ul>{plan.features.map((feature) => <li key={feature}><i>✓</i><span>{feature}</span></li>)}</ul>
          </div>
          {plan.closing && <p className="price-closing">{plan.closing}</p>}
          <a className="orange-cta price-more" href="https://wa.link/wgb5pk">QUIERO MÁS INFO <span>→</span></a>
        </article>)}
      </div>
    </section>

    <HomeClosingSections />
  </main>;
}
