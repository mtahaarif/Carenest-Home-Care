import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Static delay classes (Tailwind needs literal class names). */
export const HERO_DELAYS = [
  "[animation-delay:100ms]",
  "[animation-delay:200ms]",
  "[animation-delay:300ms]",
  "[animation-delay:400ms]",
  "[animation-delay:500ms]",
  "[animation-delay:600ms]",
  "[animation-delay:700ms]",
  "[animation-delay:800ms]",
  "[animation-delay:900ms]",
] as const;

/**
 * Masked line-by-line heading reveal driven purely by CSS, so the hero headline paints
 * immediately on load instead of waiting for JavaScript to hydrate.
 */
export function HeroLines({ lines, startIndex = 1 }: { lines: ReactNode[]; startIndex?: number }) {
  return (
    <span className="block">
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <span className={cn("block animate-mask-up", HERO_DELAYS[Math.min(startIndex + i, HERO_DELAYS.length - 1)])}>{line}</span>
        </span>
      ))}
    </span>
  );
}
