"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { LazyMotion, MotionConfig, useReducedMotion } from "motion/react";

const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

function RouteScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, lenis]);

  return null;
}

/**
 * Lenis smooth scrolling + lazily loaded animation features (LazyMotion, strict: only the light `m`
 * components are allowed) + reduced-motion aware config + scroll reset on navigation.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        {reduceMotion ? (
          <>
            <RouteScrollReset />
            {children}
          </>
        ) : (
          <ReactLenis
            root
            options={{
              lerp: 0.11,
              smoothWheel: true,
              wheelMultiplier: 1,
              anchors: true,
            }}
          >
            <RouteScrollReset />
            {children}
          </ReactLenis>
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
