"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Image that drifts vertically inside its frame while scrolling. */
export function ParallaxImage({ src, alt, className, imgClassName, amount = 12 }: { src: string; alt: string; className?: string; imgClassName?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1 + (amount * 2.2) / 100 }} className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)} />
    </div>
  );
}
