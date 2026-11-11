"use client";

import { useEffect, useSyncExternalStore } from "react";

const EVENT = "carenest:engaged";
const INPUT_EVENTS = ["pointermove", "pointerdown", "touchstart", "wheel", "keydown"] as const;

const isEngaged = () => typeof document !== "undefined" && document.documentElement.dataset.engaged === "true";

/**
 * Marks <html data-engaged="true"> on the visitor's first real input. Ambient, never-ending
 * animations (slideshow autoplay, marquees, floating glows) wait for it, so the first paint
 * settles quickly — better Speed Index / LCP and less work on low-end phones.
 */
export function useEngagementWatcher() {
  useEffect(() => {
    if (isEngaged()) return;
    const engage = () => {
      document.documentElement.dataset.engaged = "true";
      window.dispatchEvent(new Event(EVENT));
      cleanup();
    };
    const cleanup = () => INPUT_EVENTS.forEach((e) => window.removeEventListener(e, engage));
    INPUT_EVENTS.forEach((e) => window.addEventListener(e, engage, { passive: true }));
    return cleanup;
  }, []);
}

/** True once the visitor has interacted with the page (false during SSR). */
export function useUserEngaged() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener(EVENT, onChange);
      return () => window.removeEventListener(EVENT, onChange);
    },
    isEngaged,
    () => false,
  );
}
