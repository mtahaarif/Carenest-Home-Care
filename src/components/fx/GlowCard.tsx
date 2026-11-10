"use client";

import { useRef, type ComponentProps, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends ComponentProps<"div"> {
  /** Adds a subtle 3D tilt that follows the pointer. */
  tilt?: boolean;
}

/** Card with a pointer-tracked glowing border + soft inner spotlight (see `glow-card` utility). */
export function GlowCard({ className, children, tilt = false, onPointerMove, onPointerLeave, ...props }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      if (tilt) {
        rx.set(((y - rect.height / 2) / rect.height) * -8);
        ry.set(((x - rect.width / 2) / rect.width) * 8);
      }
    }
    onPointerMove?.(e);
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    rx.set(0);
    ry.set(0);
    onPointerLeave?.(e);
  };

  if (!tilt) {
    return (
      <div ref={ref} onPointerMove={handleMove} onPointerLeave={handleLeave} className={cn("glow-card", className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ transform }}
      className={cn("glow-card", className)}
      {...(props as ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
