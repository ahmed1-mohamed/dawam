import { ArrowRight } from "lucide-react";

/**
 * Arrow that always points "forward" in reading direction.
 * Mirrored in RTL by `.dawam[dir="rtl"] .arr svg` (landing.css).
 */
export function DirArrow() {
  return (
    <span className="arr" aria-hidden="true">
      <ArrowRight strokeWidth={2.2} />
    </span>
  );
}
