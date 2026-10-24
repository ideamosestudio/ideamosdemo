import type { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";

export default function PortfolioLink({ children, button = false }: { children: ReactNode; button?: boolean }) {
  return <a
    className={button ? "cta-glow secondary" : "portfolio-link"}
    href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/portfolio/`}
  >
    <span>{children}</span>
    {!button && <ArrowIcon />}
  </a>;
}
