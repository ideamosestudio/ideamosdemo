"use client";

import { useEffect, useRef, useState } from "react";
import { observeVisibleActivity } from "../../lib/visible-activity";

export type GalleryWork = {
  src: string;
  previewSrc?: string;
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
      <img src={work.previewSrc ?? asset(work.src)} alt={work.alt} width={work.format === "phone" ? 582 : 1324} height="1000" loading="lazy" decoding="async" />
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
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stageRef.current) return;
    const tracks = stageRef.current.querySelectorAll<HTMLElement>(".cases-marquee-track");
    return observeVisibleActivity(stageRef.current, active => {
      tracks.forEach(track => { track.style.animationPlayState = active && !selected ? "running" : "paused"; });
    });
  }, [selected]);

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
    <div ref={stageRef} className="cases-marquee-stage">
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
        <img src={asset(selected.src)} alt={selected.alt} width={selected.format === "phone" ? 582 : 1324} height="1000" decoding="async" />
        <p>{selected.alt}</p>
      </div>
    </div>}
  </>;
}
