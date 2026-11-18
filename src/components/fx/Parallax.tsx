"use client";

import { useRef } from "react";
import { Img as Image } from "@/components/ui/img";
import { m, useScroll, useTransform } from "motion/react";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  image: SiteImage;
  /** Override the image's default alt text ("" for decorative use). */
  alt?: string;
  className?: string;
  imgClassName?: string;
  amount?: number;
  /** Responsive `sizes` hint for the frame (the overscale is added automatically). */
  sizes?: string;
}

/**
 * Multiplies every length in a `sizes` attribute, e.g. "(min-width: 1024px) 40vw, 90vw" →
 * "(min-width: 1024px) calc(40vw * 1.26), calc(90vw * 1.26)". Supports one media condition per entry.
 */
function scaleSizes(sizes: string, factor: number) {
  return sizes
    .split(",")
    .map((entry) => {
      const match = entry.trim().match(/^(\([^)]*\))\s+(.+)$/);
      const [condition, length] = match ? [`${match[1]} `, match[2]] : ["", entry.trim()];
      return `${condition}calc(${length} * ${factor.toFixed(3)})`;
    })
    .join(", ");
}

/** Optimised image that drifts vertically inside its frame while scrolling. */
export function ParallaxImage({ image, alt, className, imgClassName, amount = 12, sizes = "(min-width: 1024px) 40vw, 90vw" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  const scale = 1 + (amount * 2.2) / 100;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div style={{ y, scale }} className="absolute inset-0">
        {/* The image is drawn `scale`× larger than its frame, so request a correspondingly larger file. */}
        <Image src={image.src} alt={alt ?? image.alt} sizes={scaleSizes(sizes, scale)} className={cn("h-full w-full object-cover", imgClassName)} />
      </m.div>
    </div>
  );
}
