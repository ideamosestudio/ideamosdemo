import type { Metadata } from "next";
import "./shops.css";

export const metadata: Metadata = {
  title: "Tiendas Online — Ecommerce profesional | Ideamos",
  description: "Tiendas online profesionales, sin comisiones y preparadas para vender y crecer.",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
