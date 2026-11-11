"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Img as Image } from "@/components/ui/img";
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { useUserEngaged } from "@/hooks/use-user-engaged";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

export interface BannerImage {
  image: SiteImage;
  /** Tailwind object-position class, e.g. "object-[70%_center]". */
  position?: string;
}

interface BannerMediaProps {
  images: BannerImage[];
  /** Milliseconds per slide when there is more than one image. */
  interval?: number;
  controls?: boolean;
  className?: string;
}

/**
 * Full-bleed banner background: slow Ken Burns zoom, scroll parallax, cross-fading slideshow
 * (when given several images) and a left-to-right wash so copy stays legible.
 */
export function BannerMedia({ images, interval = 6500, controls = false, className }: BannerMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const engaged = useUserEngaged();
  // Autoplay starts after the first interaction so the initial render settles fast.
  const paused = hidden || !engaged;
  const multi = images.length > 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!multi || paused || reduceMotion) return;
    const t = setTimeout(() => go(1), interval);
    return () => clearTimeout(t);
  }, [index, multi, paused, reduceMotion, interval, go]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const current = images[index];

  return (
    <div ref={ref} className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <m.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <m.div
            key={current.image.src.src}
            initial={{ opacity: 0, scale: 1.14 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: interval / 1000 + 2, ease: "linear" } }}
            className="absolute inset-0"
          >
            {/* The first slide is the LCP element: preload it at high priority. */}
            <Image
              src={current.image.src}
              alt={current.image.alt}
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              placeholder="blur"
              className={cn("absolute inset-0 h-full w-full object-cover", current.position ?? "object-center")}
            />
          </m.div>
        </AnimatePresence>
      </m.div>

      {/* Legibility washes: vertical on mobile, from the left on desktop, and a fade into the page below. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/70 lg:hidden" />
      <div className="absolute inset-0 hidden bg-banner-wash lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

      {multi && controls && (
        <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10">
          <div className="container flex justify-end">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full glass py-1.5 pl-4 pr-1.5">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Banner slides">
                {images.map((img, i) => (
                  <button
                    key={img.image.src.src}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn("relative h-1.5 overflow-hidden rounded-full bg-foreground/15 transition-all duration-500", i === index ? "w-10" : "w-4 hover:bg-foreground/30")}
                  >
                    {i === index && (
                      <m.span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        initial={{ width: reduceMotion || paused ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reduceMotion || paused ? 0 : interval / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <span className="w-12 text-center text-xs font-bold tabular-nums text-foreground/70">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button onClick={() => go(-1)} aria-label="Previous slide" className="grid h-9 w-9 place-items-center rounded-full bg-white/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => go(1)} aria-label="Next slide" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
