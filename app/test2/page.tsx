import type { Metadata } from "next";
import HomePageTest2 from "../../components/HomePageTest2";
import "../casos-de-exito/casos.css";

export const metadata: Metadata = {
  title: "Test 2 — Ideamos",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePageTest2 />;
}
