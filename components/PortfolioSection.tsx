"use client";

import CasesGallery, { type GalleryWork } from "../app/casos-de-exito/CasesGallery";

const firstRow: GalleryWork[] = [
  { src: "/media/casos-exito/desk-001.jpg", alt: "Sitio web Águilas de Oro", format: "wide" },
  { src: "/media/casos-exito/desk-003.jpg", alt: "Sitio web Maqmax", format: "wide" },
  { src: "/media/casos-exito/desk-002.jpg", alt: "Sitio web Garware Argentina", format: "wide" },
  { src: "/media/casos-exito/phone-002.jpg", alt: "Experiencia mobile para ecommerce de moda", format: "phone" },
  { src: "/media/casos-exito/desk-005.jpg", alt: "Sitio institucional Empire Funds", format: "wide" },
  { src: "/media/casos-exito/desk-007.jpg", alt: "Tienda online Trébol Café", format: "wide" },
  { src: "/media/casos-exito/desk-006.jpg", alt: "Sitio web ONER VFX", format: "wide" },
  { src: "/media/casos-exito/phone-005.jpg", alt: "Experiencia mobile para Wilde", format: "phone" },
  { src: "/media/casos-exito/desk-014.jpg", alt: "Sitio web industrial para KRK", format: "wide" },
  { src: "/media/casos-exito/desk-013.jpg", alt: "Tienda online Mirtatulaj", format: "wide" },
];

const secondRow: GalleryWork[] = [
  { src: "/media/casos-exito/phone-001.jpg", alt: "Experiencia mobile para ONER VFX", format: "phone" },
  { src: "/media/casos-exito/desk-012.jpg", alt: "Tienda online Raisa Joya", format: "wide" },
  { src: "/media/casos-exito/desk-009.jpg", alt: "Sitio web Equinox Training", format: "wide" },
  { src: "/media/casos-exito/desk-008.jpg", alt: "Portfolio de trabajos ONER VFX", format: "wide" },
  { src: "/media/casos-exito/phone-003.jpg", alt: "Experiencia mobile Empire Funds", format: "phone" },
  { src: "/media/casos-exito/desk-010.jpg", alt: "Concepto digital AirPods Pro", format: "wide" },
  { src: "/media/casos-exito/desk-004.jpg", alt: "Sitio web Xtreme D10", format: "wide" },
  { src: "/media/casos-exito/phone-004.jpg", alt: "Experiencia mobile Mixxerport", format: "phone" },
  { src: "/media/casos-exito/desk-011.jpg", alt: "Presentación de proyecto ONER VFX en tablet", format: "wide" },
];

export default function PortfolioSection() {
  return <section className="cases-work" id="portfolio" aria-labelledby="portfolio-title">
    <header className="cases-work-heading">
      <p>TRABAJOS REALIZADOS</p>
      <h2 id="portfolio-title">Proyectos que<br/>hablan por nosotros.</h2>
      <span>Una selección de experiencias digitales creadas para marcas de distintas industrias.</span>
    </header>
    <CasesGallery firstRow={firstRow} secondRow={secondRow} />
  </section>;
}
