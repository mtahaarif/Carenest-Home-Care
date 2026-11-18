"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Img as Image, srcSetOf } from "@/components/ui/img";
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
/** Banner height as a share of the viewport (keep in sync with the `h-banner` utility in globals.css). */
const BANNER_VH = 80;
/** Peak Ken Burns zoom (see the slide animation below). */
const ZOOM = 1.06;

/** Below this width the photo sits under the 70–90% opaque mobile wash (see the `lg:hidden` wash below). */
const WASHED_MAX_WIDTH = 1023;
/** Share of the drawn resolution requested under the wash: the softening is invisible beneath it. */
const WASHED_SCALE = 0.5;

/**
 * `sizes` for a cover-cropped banner photo: it is drawn at whichever is larger, the full viewport width
 * or the banner height × the photo's aspect ratio (tall phone banners crop landscape photos wide).
 * On phones and tablets the photo is mostly covered by the legibility wash, so half that resolution
 * looks identical and makes the LCP image roughly 3× lighter.
 */
function bannerSizes(aspect: number) {
  const size = (scale: number) => `max(${Math.ceil(100 * ZOOM * scale)}vw, ${Math.ceil(BANNER_VH * aspect * ZOOM * scale)}vh)`;
  return `(max-width: ${WASHED_MAX_WIDTH}px) ${size(WASHED_SCALE)}, ${size(1)}`;
}

export function BannerMedia({ images, interval = 6500, controls = false, className }: BannerMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const engaged = useUserEngaged();
  // Autoplay starts after the first interaction so the initial render settles fast.
  const paused = hidden || !engaged;
  const multi = images.length > 1;
  const sizesFor = (b: BannerImage) => bannerSizes(b.image.src.width / b.image.src.height);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!multi || paused || reduceMotion) return;
    const t = setTimeout(() => go(1), interval);
    return () => clearTimeout(t);
  }, [index, multi, paused, reduceMotion, interval, go]);

  // Download and decode the next slide ahead of time so it cross-fades in fully loaded.
  useEffect(() => {
    if (!multi || !engaged) return;
    const next = images[(index + 1) % images.length];
    const img = new window.Image();
    img.sizes = bannerSizes(next.image.src.width / next.image.src.height);
    img.srcset = srcSetOf(next.image.src);
    img.decode().catch(() => {});
  }, [index, multi, engaged, images]);

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
            key={current.image.src.name}
            // Gentle zoom: a stronger one stretches the photo past its native pixels and softens it.
            initial={{ opacity: 0, scale: ZOOM }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: interval / 1000 + 2, ease: "linear" } }}
            className="absolute inset-0"
          >
            {/* The first slide is the LCP element: preload it at high priority. */}
            <Image
              src={current.image.src}
              alt={current.image.alt}
              sizes={sizesFor(current)}
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
        // Large screens only: on narrower ones the controls would overlap the banner copy.
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden lg:block">
          <div className="container flex justify-end">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full glass py-1.5 pl-4 pr-1.5">
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Banner slides">
                {images.map((img, i) => (
                  <button
                    key={img.image.src.name}
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
