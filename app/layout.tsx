import type { Metadata } from "next";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
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

export const metadata: Metadata = {
  title: "Ideamos — Diseño web & marketing digital",
  description: "Creamos experiencias digitales que atraen clientes, generan confianza y hacen crecer negocios.",
  icons: { icon: "/favicon.jpg", shortcut: "/favicon.jpg", apple: "/favicon.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Poppins:wght@400;600;700&family=Roboto+Condensed:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body id="site-root">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
