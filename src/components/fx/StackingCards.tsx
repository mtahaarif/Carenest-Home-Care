"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

function StackItem({
  children,
  index,
  total,
  progress,
  top,
  gap,
  isLast,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  top: number;
  gap: number;
  isLast: boolean;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const brightness = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.06]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div className={cn("sticky", !isLast && "mb-[18vh]")} style={{ top: top + index * gap }}>
      <m.div style={{ scale, filter, transformOrigin: "50% 0%" }} className="will-change-transform">
        {children}
      </m.div>
    </div>
  );
}

/**
 * Vertically stacking sticky cards: each card pins under the previous one and earlier
 * cards shrink slightly as the stack builds up.
 */
export function StackingCards({ items, className, top = 120, gap = 26 }: { items: ReactNode[]; className?: string; top?: number; gap?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {items.map((item, i) => (
        <StackItem key={i} index={i} total={items.length} progress={scrollYProgress} top={top} gap={gap} isLast={i === items.length - 1}>
          {item}
        </StackItem>
      ))}
    </div>
  );
}
