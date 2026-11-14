// Share visibility policy across animations without changing their visible design.
export function observeVisibleActivity(element: Element, onChange: (active: boolean) => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  const update = () => onChange(visible && !document.hidden && !motion.matches);
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    update();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", update);
  motion.addEventListener("change", update);
  update();
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", update);
    motion.removeEventListener("change", update);
    onChange(false);
  };
}
