"use client";

import type { ReactNode } from "react";
import { m, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (direction: Direction, distance: number) =>
  ({
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  })[direction];

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  once?: boolean;
  as?: "div" | "li" | "span" | "section";
}

/** Fades/slides content in when it enters the viewport. */
export function Reveal({ children, className, delay = 0, duration = 0.8, direction = "up", distance = 28, blur = true, once = true, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance), filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({ children, className, stagger = 0.08, delay = 0 }: { children: ReactNode; className?: string; stagger?: number; delay?: number }) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </m.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_OUT } },
};

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={cn(className)} variants={itemVariants}>
      {children}
    </m.div>
  );
}

/** Line-by-line masked slide-up, for display headings. */
export function MaskLines({ lines, className, lineClassName, delay = 0, immediate = false }: { lines: ReactNode[]; className?: string; lineClassName?: string; delay?: number; immediate?: boolean }) {
  const trigger = immediate ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true } };
  return (
    <m.span className={cn("block", className)} initial="hidden" {...trigger} transition={{ staggerChildren: 0.1, delayChildren: delay }}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <m.span
            className={cn("block", lineClassName)}
            variants={{ hidden: { y: "110%", rotate: 2 }, visible: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT } } }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </m.span>
  );
}
