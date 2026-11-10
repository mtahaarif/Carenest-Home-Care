import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  fade?: boolean;
}

/** Infinite CSS marquee. Content is rendered twice and translated by -50% for a seamless loop. */
export function Marquee({ children, className, trackClassName, reverse = false, pauseOnHover = true, duration = 40, fade = true }: MarqueeProps) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", fade && "mask-fade-x", className)} style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
      <div
        className={cn(
          "flex w-max shrink-0",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        <div className={cn("flex shrink-0 items-center", trackClassName)}>{children}</div>
        <div aria-hidden className={cn("flex shrink-0 items-center", trackClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
