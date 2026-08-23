"use client";

import { useEffect, useState } from "react";
import DriftWall, { type DriftWallItem } from "./DriftWall";
import { WHATSAPP_URL } from "../lib/whatsapp";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

// Real aspect ratios: "desk" screenshots are 1324x1000 (1.324), "phone" are 582x1000 (0.582).
// At tileWidth=220 that's 166px tall for desk and 378px for phone — matching these exactly
// means object-fit:contain never needs to shrink the image, so there's no dead space.
const WIDE_H = 166;
const PHONE_H = 378;

const items: DriftWallItem[] = [
  { image: asset("/media/casos-exito/desk-001.jpg"), title: "Águilas de Oro", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-003.jpg"), title: "Maqmax", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-002.jpg"), title: "Garware Argentina", height: WIDE_H },
  { image: asset("/media/casos-exito/phone-002.jpg"), title: "Ecommerce de moda", height: PHONE_H },
  { image: asset("/media/casos-exito/desk-005.jpg"), title: "Empire Funds", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-007.jpg"), title: "Trébol Café", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-006.jpg"), title: "ONER VFX", height: WIDE_H },
  { image: asset("/media/casos-exito/phone-005.jpg"), title: "Wilde", height: PHONE_H },
  { image: asset("/media/casos-exito/desk-014.jpg"), title: "KRK Latinoamericana", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-013.jpg"), title: "Mirtatulaj", height: WIDE_H },
  { image: asset("/media/casos-exito/phone-001.jpg"), title: "ONER VFX mobile", height: PHONE_H },
  { image: asset("/media/casos-exito/desk-012.jpg"), title: "Raisa Joya", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-009.jpg"), title: "Equinox Training", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-010.jpg"), title: "AirPods Pro", height: WIDE_H },
  { image: asset("/media/casos-exito/desk-004.jpg"), title: "Xtreme D10", height: WIDE_H },
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
    <div className="drift-wall-stage">
      <div className="drift-wall-vignette" aria-hidden="true" />
      <DriftWall
        items={items}
        columns={5}
        tileWidth={220}
        tileHeight={150}
        gap={18}
        tilt={16}
        turn={-14}
        perspective={1200}
        depth={120}
        speed={34}
        direction="up"
        variance={0.4}
        parallax={0.6}
        fade={0.4}
        dim={0.9}
        overlayColor="#0a0a0f"
        onItemClick={setLightbox}
      />
    </div>
    <div className="pdw-actions">
      <a className="cta-glow primary" href={WHATSAPP_URL}><span>Solicitá asesoramiento</span></a>
      <a className="cta-glow secondary" href={WHATSAPP_URL}><span>Quiero contactarme</span></a>
    </div>

    {lightbox && <div className="pdw-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title ?? "Imagen ampliada"} onClick={() => setLightbox(null)}>
      <button type="button" className="pdw-lightbox-close" aria-label="Cerrar" onClick={() => setLightbox(null)}>×</button>
      <img src={lightbox.image} alt={lightbox.title ?? ""} onClick={(e) => e.stopPropagation()} />
    </div>}
  </section>;
}
