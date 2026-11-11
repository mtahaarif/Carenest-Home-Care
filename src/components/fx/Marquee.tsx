import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const DURATIONS: Record<number, string> = {
  30: "[--marquee-duration:30s]",
  35: "[--marquee-duration:35s]",
  38: "[--marquee-duration:38s]",
  40: "[--marquee-duration:40s]",
  45: "[--marquee-duration:45s]",
  55: "[--marquee-duration:55s]",
  60: "[--marquee-duration:60s]",
};

interface MarqueeProps {
  children: ReactNode;
  /**
   * Content for the duplicated (aria-hidden) half of the loop. Pass a link-free version when the
   * children are links, so crawlers don't see every link twice. Defaults to `children`.
   */
  clone?: ReactNode;
  className?: string;
  trackClassName?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Seconds for one full loop (30, 35, 38, 40, 45, 55 or 60). */
  duration?: keyof typeof DURATIONS;
  fade?: boolean;
}

/** Infinite CSS marquee. Content is rendered twice and translated by -50% for a seamless loop. */
export function Marquee({ children, clone, className, trackClassName, reverse = false, pauseOnHover = true, duration = 40, fade = true }: MarqueeProps) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", fade && "mask-fade-x", DURATIONS[duration] ?? DURATIONS[40], className)}>
      <div
        className={cn(
          "flex w-max shrink-0",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        <div className={cn("flex shrink-0 items-center", trackClassName)}>{children}</div>
        <div aria-hidden inert className={cn("flex shrink-0 items-center", trackClassName)}>
          {clone ?? children}
        </div>
      </div>
    </div>
  );
}
