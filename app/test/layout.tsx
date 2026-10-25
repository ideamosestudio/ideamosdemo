import type { Metadata } from "next";
import "./test.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TestLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
