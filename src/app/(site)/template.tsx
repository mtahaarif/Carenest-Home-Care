"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { IMAGES } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Re-mounts on every navigation: a brand curtain sweeps away and the new page eases in.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-brand-gradient"
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
        transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
      >
        <motion.div initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.35, ease: EASE }} className="flex items-center gap-3 text-white">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white">
            <img src={IMAGES.logoMark} alt="" className="h-11 w-11 object-contain" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight">Carenest</span>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
