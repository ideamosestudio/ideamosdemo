import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ideamos — Diseño web & marketing digital",
  description: "Creamos experiencias digitales que atraen clientes, generan confianza y hacen crecer negocios.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
