"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

function SlidingCard({ index, total, progress, offset, enterFrom, children }: { index: number; total: number; progress: MotionValue<number>; offset: number; enterFrom: number; children: ReactNode }) {
  const segment = 1 / Math.max(1, total - 1);
  const start = Math.max(0, (index - 1) * segment);
  const end = index * segment;
  const x = useTransform(progress, index === 0 ? [0, 1] : [start, end], index === 0 ? [0, 0] : [enterFrom, index * offset]);
  const rotate = useTransform(progress, index === 0 ? [0, 1] : [start, end], index === 0 ? [0, 0] : [10, 0]);
  const dim = useTransform(progress, [end, Math.min(1, end + segment)], [1, index === total - 1 ? 1 : 0.9]);
  const filter = useTransform(dim, (d) => `brightness(${d})`);

  return (
    <m.div style={{ x, rotate, filter, zIndex: index }} className="absolute left-0 top-0 h-full will-change-transform">
      {children}
    </m.div>
  );
}

/**
 * Desktop: section pins; each card slides in from the right and stacks over the previous one
 * with a fanned offset. Mobile / reduced motion: a simple grid.
 */
export function HorizontalStack({
  items,
  header,
  className,
  cardWidth = 380,
  offset = 80,
  cardHeight = 440,
}: {
  items: ReactNode[];
  header?: ReactNode;
  className?: string;
  cardWidth?: number;
  offset?: number;
  cardHeight?: number;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [vw, setVw] = useState(1600);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useMotionValueEvent(progress, "change", (p) => setCurrent(Math.min(items.length - 1, Math.round(p * (items.length - 1)))));

  if (!isDesktop || reduceMotion) {
    return (
      <section ref={ref} className={cn("relative py-24", className)}>
        <div className="container">{header}</div>
        <div className="container mt-12 grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} style={{ minHeight: cardHeight * 0.8 }}>
              {item}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={cn("relative", className)} style={{ height: `${items.length * 70 + 30}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            {header}
            <div className="mt-10 flex items-center gap-4">
              <span className="text-5xl font-extrabold tabular-nums tracking-tighter text-foreground">{String(current + 1).padStart(2, "0")}</span>
              <span className="h-px w-16 bg-foreground/20" />
              <span className="text-lg font-semibold text-muted-foreground">{String(items.length).padStart(2, "0")}</span>
            </div>
            <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-foreground/10">
              <m.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
          </div>
          <div className="relative" style={{ height: cardHeight, width: cardWidth + offset * (items.length - 1) }}>
            {items.map((item, i) => (
              <SlidingCard key={i} index={i} total={items.length} progress={progress} offset={offset} enterFrom={vw}>
                <div style={{ width: cardWidth }} className="h-full">
                  {item}
                </div>
              </SlidingCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
