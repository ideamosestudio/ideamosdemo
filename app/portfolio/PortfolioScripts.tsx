"use client";

import Script from "next/script";
import { useState } from "react";

export default function PortfolioScripts() {
  const [projectsReady, setProjectsReady] = useState(false);
  const [uiReady, setUiReady] = useState(false);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return <>
    <Script src={`${base}/portfolio/projects.js`} strategy="afterInteractive" onLoad={() => setProjectsReady(true)} />
    {projectsReady && <Script src={`${base}/portfolio/project-card.js`} strategy="afterInteractive" onLoad={() => setUiReady(true)} />}
    {uiReady && <Script src={`${base}/portfolio/gallery.js`} strategy="afterInteractive" />}
  </>;
}
