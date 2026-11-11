"use client";

import { useRef } from "react";
import Image from "next/image";
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
  /** Responsive `sizes` hint for next/image. */
  sizes?: string;
}

/** Optimised image that drifts vertically inside its frame while scrolling. */
export function ParallaxImage({ image, alt, className, imgClassName, amount = 12, sizes = "(min-width: 1024px) 40vw, 90vw" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div style={{ y, scale: 1 + (amount * 2.2) / 100 }} className="absolute inset-0">
        <Image src={image.src} alt={alt ?? image.alt} sizes={sizes} placeholder="blur" className={cn("h-full w-full object-cover", imgClassName)} />
      </m.div>
    </div>
  );
}
