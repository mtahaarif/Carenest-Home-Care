import type { ReactNode } from "react";

/**
 * Scroll-triggered entrance animations, driven by CSS plus the tiny inline runtime in
 * `reveal-runtime.ts`. These are plain server components: no hydration, no animation library, and
 * no inline styles in the HTML. They still work inside client components.
 *
 * Keyframes and hidden states live in globals.css ("Scroll reveal"). Before JavaScript runs, with
 * JavaScript off, or with reduced motion, content is simply visible.
 *
 * The runtime may add `data-revealed` and an animation delay before React hydrates, hence
 * `suppressHydrationWarning` (it only covers the element's own attributes, not its children).
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";
/** Travel distance in px. Each value has a matching rule in globals.css. */
type Distance = 0 | 28 | 40 | 60;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the animation starts once in view. */
  delay?: number;
  /** Seconds (default 0.8). */
  duration?: number;
  direction?: Direction;
  distance?: Distance;
  blur?: boolean;
  as?: "div" | "li" | "span" | "section";
}

/** Fades/slides content in when it enters the viewport. */
export function Reveal({ children, className, delay = 0, duration, direction = "up", distance = 28, blur = true, as: Comp = "div" }: RevealProps) {
  return (
    <Comp
      className={className}
      data-reveal={direction}
      data-reveal-distance={distance === 28 ? undefined : distance}
      data-reveal-blur={blur ? undefined : "off"}
      data-reveal-delay={delay > 0 ? +delay.toFixed(3) : undefined}
      data-reveal-duration={duration}
      suppressHydrationWarning
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <RevealItem> children (in document order) once it enters the viewport. */
export function RevealGroup({ children, className, stagger = 0.08, delay = 0 }: { children: ReactNode; className?: string; stagger?: number; delay?: number }) {
  return (
    <div
      className={className}
      data-reveal-group=""
      data-reveal-stagger={stagger === 0.08 ? undefined : stagger}
      data-reveal-delay={delay > 0 ? delay : undefined}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={className} data-reveal-item="" suppressHydrationWarning>
      {children}
    </div>
  );
}
