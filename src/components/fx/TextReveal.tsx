"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
      {children}&nbsp;
    </motion.span>
  );
}

/** Scroll-linked word-by-word reveal. Words listed in `highlight` get the accent treatment. */
export function TextReveal({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const clean = word.replace(/[^\w']/g, "").toLowerCase();
        return (
          <span key={i} className={highlight.includes(clean) ? "accent-serif text-primary" : undefined}>
            <Word progress={scrollYProgress} range={[start, start + 1 / words.length]}>
              {word}
            </Word>
          </span>
        );
      })}
    </p>
  );
}
