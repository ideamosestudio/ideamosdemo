import type { Metadata, Viewport } from "next";
import DeferredAnalytics from "../components/DeferredAnalytics";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import WhatsAppTracking from "../components/WhatsAppTracking";
import { GA_MEASUREMENT_ID } from "../lib/whatsapp";
import { createPageMetadata, SITE_URL } from "../lib/seo";
import "./globals.css";
import "./refinement.css";
import "./iteration.css";
import "./final-tuning.css";
import "./revision.css";
import "./request-2026-08-01.css";
import "./mobile-site-rules.css";
import "./floating-whatsapp.css";
import "./button-spacing.css";
import "./footer-credits.css";
import "./mobile-home-request-2026-08-19.css";
import "./spacing-consistency.css";
import "./desktop-responsive.css";
import "./mobile-button-fix.css";
import "./casos-de-exito/casos.css";
import "../components/DriftWall.css";
import "./manual-tipografico-modulos-desktop.css";
import "./eyebrows.css";
import "./split-module-consistency.css";

const homeMetadata = createPageMetadata({
  title: "Diseño web y marketing digital | Ideamos",
  description: "Diseñamos sitios web, tiendas online y estrategias de marketing digital para atraer clientes, generar confianza y aumentar tus ventas.",
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...homeMetadata,
  applicationName: "Ideamos",
  authors: [{ name: "Ideamos", url: SITE_URL }],
  creator: "Ideamos",
  publisher: "Ideamos",
  generator: "Ideamos — Next.js",
  category: "Diseño web y marketing digital",
  keywords: [
    "diseño web",
    "desarrollo web",
    "tiendas online",
    "marketing digital",
    "SEO",
    "Google Ads",
    "Buenos Aires",
  ],
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.jpg", shortcut: "/favicon.jpg", apple: "/favicon.jpg" },
  other: {
    "llms-txt": `${SITE_URL}/llms.txt`,
    "developed-by": "Ideamos — https://ideamos.com.ar",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090d",
  colorScheme: "dark light",
};

// Developed by Ideamos — https://ideamos.com.ar
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ideamos",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logos/ideamos-light.webp`,
      email: "hola@ideamos.com.ar",
      telephone: "+54 9 11 6875-8285",
      sameAs: ["https://www.instagram.com/ideamosargentina/"],
      address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      areaServed: ["Argentina", "Uruguay", "España", "Estados Unidos", "México"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Ideamos",
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Ideamos",
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og-precios.png`,
      description: "Estudio de diseño web, ecommerce, marketing digital, SEO y Google Ads.",
      priceRange: "$$",
      telephone: "+54 9 11 6875-8285",
      email: "hola@ideamos.com.ar",
      address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" href="/fonts/Gilroy-ExtraBold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="describedby" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body id="site-root">
        {children}
        <FloatingWhatsApp />
        <WhatsAppTracking />
        <DeferredAnalytics measurementId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
