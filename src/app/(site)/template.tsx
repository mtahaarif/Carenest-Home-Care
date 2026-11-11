"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Img as Image } from "@/components/ui/img";
import { m } from "motion/react";
import { IMAGES } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;

/** True once the first page has hydrated; later templates are client-side navigations. */
let hasHydrated = false;

/**
 * Re-mounts on every navigation. The initial page load renders immediately (no hidden content,
 * so it never delays First/Largest Contentful Paint); subsequent navigations get a brand curtain
 * that sweeps away while the new page eases in.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [isInitialLoad] = useState(() => !hasHydrated);

  useEffect(() => {
    hasHydrated = true;
  }, []);

  if (isInitialLoad) return <>{children}</>;

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-brand-gradient"
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
        transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
      >
        <m.div initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.35, ease: EASE }} className="rounded-3xl bg-white/95 p-4 shadow-elevated">
          <Image src={IMAGES.logo.src} alt="" sizes="140px" className="h-28 w-auto" />
        </m.div>
      </m.div>
      <m.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </m.div>
    </>
  );
}
