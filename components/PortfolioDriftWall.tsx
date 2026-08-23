"use client";

import { useEffect, useState } from "react";
import DriftWall, { type DriftWallItem } from "./DriftWall";
import { DarkGridBackground } from "./SharedHomeSections";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const items: DriftWallItem[] = [
  { image: asset("/media/casos-exito/desk-001.jpg"), title: "Águilas de Oro" },
  { image: asset("/media/casos-exito/desk-003.jpg"), title: "Maqmax" },
  { image: asset("/media/casos-exito/desk-002.jpg"), title: "Garware Argentina" },
  { image: asset("/media/casos-exito/phone-002.jpg"), title: "Ecommerce de moda" },
  { image: asset("/media/casos-exito/desk-005.jpg"), title: "Empire Funds" },
  { image: asset("/media/casos-exito/desk-007.jpg"), title: "Trébol Café" },
  { image: asset("/media/casos-exito/desk-006.jpg"), title: "ONER VFX" },
  { image: asset("/media/casos-exito/phone-005.jpg"), title: "Wilde" },
  { image: asset("/media/casos-exito/desk-014.jpg"), title: "KRK Latinoamericana" },
  { image: asset("/media/casos-exito/desk-013.jpg"), title: "Mirtatulaj" },
  { image: asset("/media/casos-exito/phone-001.jpg"), title: "ONER VFX mobile" },
  { image: asset("/media/casos-exito/desk-012.jpg"), title: "Raisa Joya" },
  { image: asset("/media/casos-exito/desk-009.jpg"), title: "Equinox Training" },
  { image: asset("/media/casos-exito/desk-010.jpg"), title: "AirPods Pro" },
  { image: asset("/media/casos-exito/desk-004.jpg"), title: "Xtreme D10" },
];

export default function PortfolioDriftWall({ darkGrid = false }: { darkGrid?: boolean } = {}) {
  const [lightbox, setLightbox] = useState<DriftWallItem | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return <section className="cases-work pdw-section" id="portfolio" aria-labelledby="portfolio-title">
    {darkGrid && <DarkGridBackground />}
    <header className="pdw-heading">
      <p>TRABAJOS REALIZADOS</p>
      <h2 id="portfolio-title">Proyectos que hablan por nosotros</h2>
      <h3><b>Resultados reales</b>, para marcas de distintos rubros</h3>
      <p className="pdw-copy">Una selección de experiencias digitales creadas para marcas de distintas industrias: diseño, estrategia y ejecución pensados para vender más.</p>
      <a className="orange-cta" href={asset("/casos-de-exito/")}>VER TODOS LOS CASOS DE ÉXITO</a>
    </header>
    <div className="drift-wall-stage">
      <DriftWall
        items={items}
        columns={5}
        tileWidth={220}
        tileHeight={150}
        gap={18}
        tilt={14}
        turn={-12}
        perspective={1300}
        depth={100}
        speed={34}
        direction="up"
        variance={0.4}
        parallax={0.55}
        lift={56}
        fade={0.55}
        dim={0.6}
        overlayColor="#0a0a0f"
        onItemClick={setLightbox}
      />
    </div>

    {lightbox && <div className="pdw-lightbox" role="dialog" aria-modal="true" aria-label={lightbox.title ?? "Imagen ampliada"} onClick={() => setLightbox(null)}>
      <button type="button" className="pdw-lightbox-close" aria-label="Cerrar" onClick={() => setLightbox(null)}>×</button>
      <img src={lightbox.image} alt={lightbox.title ?? ""} onClick={(e) => e.stopPropagation()} />
    </div>}
  </section>;
}
