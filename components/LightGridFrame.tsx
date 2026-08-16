import type { ReactNode } from "react";

export default function LightGridFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`light-grid-frame ${className}`.trim()}>
    <div className="light-grid-frame__border" aria-hidden="true">
      <i className="light-grid-frame__node light-grid-frame__node--left" />
      <i className="light-grid-frame__node light-grid-frame__node--right" />
    </div>
    {children}
  </div>;
}
