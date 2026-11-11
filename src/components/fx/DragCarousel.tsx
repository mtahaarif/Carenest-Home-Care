"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

/** Free-dragging carousel with momentum; constraints follow the track width. */
export function DragCarousel({ children, className }: { children: ReactNode; className?: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      if (viewport.current && track.current) setLeft(Math.min(0, viewport.current.offsetWidth - track.current.scrollWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={viewport} className={cn("overflow-hidden", dragging ? "cursor-grabbing" : "cursor-grab", className)}>
      <m.div
        ref={track}
        drag="x"
        dragConstraints={{ left, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setTimeout(() => setDragging(false), 50)}
        onClickCapture={(e) => {
          if (dragging) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="flex w-max gap-5"
      >
        {children}
      </m.div>
    </div>
  );
}
