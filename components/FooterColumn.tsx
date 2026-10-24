"use client";

import { useId, useState, type ReactNode } from "react";

export default function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <>
    <h3 className="ef-column-heading">
      <span className="ef-desktop-heading">{title}</span>
      <button className="ef-column-toggle" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {title}<span className="ef-toggle-icon" aria-hidden="true" />
      </button>
    </h3>
    <div className="ef-column-content" id={id} data-open={open}>{children}</div>
  </>;
}
