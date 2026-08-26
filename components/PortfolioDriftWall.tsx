"use client";

import { useEffect, useState } from "react";
import DriftWall, { type DriftWallItem } from "./DriftWall";
import CasesGallery, { type GalleryWork } from "../app/casos-de-exito/CasesGallery";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Same grid used on the home page, kept for mobile: the drift-wall animation is desktop-only.
const mobileFirstRow: GalleryWork[] = [
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

const mobileSecondRow: GalleryWork[] = [
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

// Real aspect ratios: "desk" screenshots are 1324x1000 (1.324), "phone" are 582x1000 (0.582).
// Tiles are wide (320px) so 5 columns comfortably outrun any viewport width even after the
// rotateY tilt foreshortens one side — matching the ratio exactly keeps object-fit:contain
// from ever needing to shrink the image, so there's still no dead space inside a tile.
// Sized so columns*(width+gap) comfortably outruns very wide monitors (2560px+),
// not just common 1920px screens — otherwise the wall reads as "too narrow" with
// visible empty space on the sides once the 3D tilt is applied.
const TILE_W = 340;
const WIDE_H = Math.round(TILE_W / 1.324);
const PHONE_H = Math.round(TILE_W / 0.582);

const drift = (name: string) => asset(`/media/casos-exito/drift/${name}`);
const full = (name: string) => asset(`/media/casos-exito/${name}`);

const items: DriftWallItem[] = [
  { image: drift("desk-001.jpg"), fullImage: full("desk-001.jpg"), title: "Águilas de Oro", height: WIDE_H },
  { image: drift("desk-003.jpg"), fullImage: full("desk-003.jpg"), title: "Maqmax", height: WIDE_H },
  { image: drift("desk-002.jpg"), fullImage: full("desk-002.jpg"), title: "Garware Argentina", height: WIDE_H },
  { image: drift("phone-002.jpg"), fullImage: full("phone-002.jpg"), title: "Ecommerce de moda", height: PHONE_H },
  { image: drift("desk-005.jpg"), fullImage: full("desk-005.jpg"), title: "Empire Funds", height: WIDE_H },
  { image: drift("desk-007.jpg"), fullImage: full("desk-007.jpg"), title: "Trébol Café", height: WIDE_H },
  { image: drift("desk-006.jpg"), fullImage: full("desk-006.jpg"), title: "ONER VFX", height: WIDE_H },
  { image: drift("phone-005.jpg"), fullImage: full("phone-005.jpg"), title: "Wilde", height: PHONE_H },
  { image: drift("desk-014.jpg"), fullImage: full("desk-014.jpg"), title: "KRK Latinoamericana", height: WIDE_H },
  { image: drift("desk-013.jpg"), fullImage: full("desk-013.jpg"), title: "Mirtatulaj", height: WIDE_H },
  { image: drift("phone-001.jpg"), fullImage: full("phone-001.jpg"), title: "ONER VFX mobile", height: PHONE_H },
  { image: drift("desk-012.jpg"), fullImage: full("desk-012.jpg"), title: "Raisa Joya", height: WIDE_H },
  { image: drift("desk-009.jpg"), fullImage: full("desk-009.jpg"), title: "Equinox Training", height: WIDE_H },
  { image: drift("desk-010.jpg"), fullImage: full("desk-010.jpg"), title: "AirPods Pro", height: WIDE_H },
  { image: drift("desk-004.jpg"), fullImage: full("desk-004.jpg"), title: "Xtreme D10", height: WIDE_H },
];

export default function PortfolioDriftWall() {
  const [lightbox, setLightbox] = useState<DriftWallItem | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return <section className="cases-work pdw-section" id="portfolio" aria-labelledby="portfolio-title">
    <header className="section-heading pdw-heading">
      <p>TRABAJOS REALIZADOS</p>
      <h2 id="portfolio-title">Proyectos que hablan por nosotros</h2>
      <span><b>Resultados reales</b> para marcas de distintos rubros: una selección de experiencias digitales creadas para vender más.</span>
    </header>
    <div className="drift-wall-stage pdw-desktop-only">
      <div className="drift-wall-vignette" aria-hidden="true" />
      <DriftWall
        items={items}
        columns={5}
        tileWidth={TILE_W}
        tileHeight={WIDE_H}
        gap={18}
        tilt={16}
        turn={-14}
        perspective={1200}
        depth={120}
        speed={34}
        direction="up"
        variance={0.4}
        parallax={0}
        fade={0.4}
        dim={0.9}
        overlayColor="#0a0a0f"
        onItemClick={setLightbox}
      />
    </div>
    <div className="pdw-mobile-only">
      <CasesGallery firstRow={mobileFirstRow} secondRow={mobileSecondRow} />
    </div>
    <div className="pdw-actions">
      <a className="cta-glow primary" href={WHATSAPP_URL}><span className="desktop-only">Solicitá asesoramiento</span><span className="mobile-only">Contactanos</span></a>
      <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Quiero contactarme</span></a>
    </div>

    {lightbox && <div className="pdw-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title ?? "Imagen ampliada"} onClick={() => setLightbox(null)}>
      <button type="button" className="pdw-lightbox-close" aria-label="Cerrar" onClick={() => setLightbox(null)}>×</button>
      <img src={lightbox.fullImage ?? lightbox.image} alt={lightbox.title ?? ""} onClick={(e) => e.stopPropagation()} />
    </div>}
  </section>;
}
