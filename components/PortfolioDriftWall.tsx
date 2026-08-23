"use client";

import DriftWall, { type DriftWallItem } from "./DriftWall";
import { DarkGridBackground } from "./SharedHomeSections";

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const items: DriftWallItem[] = [
  { image: asset("/media/casos-exito/desk-001.jpg"), title: "Águilas de Oro", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-003.jpg"), title: "Maqmax", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-002.jpg"), title: "Garware Argentina", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/phone-002.jpg"), title: "Ecommerce de moda", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-005.jpg"), title: "Empire Funds", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-007.jpg"), title: "Trébol Café", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-006.jpg"), title: "ONER VFX", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/phone-005.jpg"), title: "Wilde", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-014.jpg"), title: "KRK Latinoamericana", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-013.jpg"), title: "Mirtatulaj", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/phone-001.jpg"), title: "ONER VFX mobile", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-012.jpg"), title: "Raisa Joya", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-009.jpg"), title: "Equinox Training", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-010.jpg"), title: "AirPods Pro", href: asset("/casos-de-exito/") },
  { image: asset("/media/casos-exito/desk-004.jpg"), title: "Xtreme D10", href: asset("/casos-de-exito/") },
];

export default function PortfolioDriftWall({ darkGrid = false }: { darkGrid?: boolean } = {}) {
  return <section className="cases-work" id="portfolio" aria-labelledby="portfolio-title">
    {darkGrid && <DarkGridBackground />}
    <header className="cases-work-heading">
      <p>TRABAJOS REALIZADOS</p>
      <h2 id="portfolio-title">Proyectos que<br/>hablan por nosotros</h2>
      <span>Una selección de experiencias digitales creadas para marcas de distintas industrias.</span>
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
      />
    </div>
  </section>;
}
