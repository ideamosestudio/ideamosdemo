"use client";

import { useEffect, useState } from "react";

export type GalleryWork = {
  src: string;
  alt: string;
  format: "wide" | "phone";
};

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function WorkGroup({
  works,
  duplicate = false,
  onOpen,
}: {
  works: GalleryWork[];
  duplicate?: boolean;
  onOpen: (work: GalleryWork) => void;
}) {
  return <div className="cases-marquee-group" aria-hidden={duplicate || undefined}>
    {works.map((work) => <button
      className={`case-card is-${work.format}`}
      key={work.src}
      type="button"
      tabIndex={duplicate ? -1 : 0}
      aria-label={`Ampliar ${work.alt}`}
      onClick={() => onOpen(work)}
    >
      <img src={asset(work.src)} alt={work.alt} loading="lazy" />
      <span className="case-card-zoom" aria-hidden="true">Ampliar</span>
    </button>)}
  </div>;
}

function WorkRow({
  works,
  reverse = false,
  onOpen,
}: {
  works: GalleryWork[];
  reverse?: boolean;
  onOpen: (work: GalleryWork) => void;
}) {
  return <div className={`cases-marquee ${reverse ? "is-reverse" : ""}`}>
    <div className="cases-marquee-track">
      <WorkGroup works={works} onOpen={onOpen} />
      <WorkGroup works={works} duplicate onOpen={onOpen} />
    </div>
  </div>;
}

export default function CasesGallery({
  firstRow,
  secondRow,
}: {
  firstRow: GalleryWork[];
  secondRow: GalleryWork[];
}) {
  const [selected, setSelected] = useState<GalleryWork | null>(null);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return <>
    <div className="cases-marquee-stage">
      <WorkRow works={firstRow} onOpen={setSelected} />
      <WorkRow works={secondRow} reverse onOpen={setSelected} />
    </div>

    {selected && <div
      className="case-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={selected.alt}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setSelected(null);
      }}
    >
      <div className={`case-lightbox-content is-${selected.format}`}>
        <button className="case-lightbox-close" type="button" onClick={() => setSelected(null)} autoFocus>
          <span>Cerrar</span><b aria-hidden="true">×</b>
        </button>
        <img src={asset(selected.src)} alt={selected.alt} />
        <p>{selected.alt}</p>
      </div>
    </div>}
  </>;
}
