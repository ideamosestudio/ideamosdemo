type ArrowDirection = "up-right" | "left" | "right" | "up" | "down";

const paths: Record<ArrowDirection, string> = {
  "up-right": "M6 18 18 6M6 6h12v12",
  left: "M19 12H5m7-7-7 7 7 7",
  right: "M5 12h14m-7-7 7 7-7 7",
  up: "M12 19V5m-7 7 7-7 7 7",
  down: "M12 5v14m-7-7 7 7 7-7",
};

// Decorative SVG: the parent link or button supplies its accessible name.
export default function ArrowIcon({ direction = "up-right" }: { direction?: ArrowDirection }) {
  return <svg className="site-arrow" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={paths[direction]} />
  </svg>;
}
