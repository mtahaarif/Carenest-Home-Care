"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

function RouteScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, lenis]);

  return null;
}

/** Lenis smooth scrolling + reduced-motion aware motion config + scroll reset on navigation. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion ? (
        <>
          <RouteScrollReset />
          {children}
        </>
      ) : (
        <ReactLenis root options={{ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1, anchors: true }}>
          <RouteScrollReset />
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
