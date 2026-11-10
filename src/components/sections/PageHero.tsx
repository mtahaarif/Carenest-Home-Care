"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "@/components/icons";
import { EASE_OUT, MaskLines } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";
import { BannerMedia, type BannerImage } from "./BannerMedia";

interface PageHeroProps {
  eyebrow: string;
  /** Each entry is rendered as its own masked line. */
  title: ReactNode[];
  description?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  /** Single banner photo… */
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** …or several, which cross-fade as a slideshow. */
  images?: BannerImage[];
  /** Floating glass element pinned to the banner's bottom-right. */
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Full-bleed photo banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, image, imageAlt = "", imagePosition, images, badge, children, className }: PageHeroProps) {
  const media: BannerImage[] = images ?? (image ? [{ src: image, alt: imageAlt, position: imagePosition ?? "70% center" }] : []);

  return (
    <section className={cn("relative isolate flex min-h-[600px] items-center overflow-hidden pb-20 pt-36 md:min-h-[640px] md:pt-40 lg:min-h-[72vh]", className)}>
      {media.length > 0 ? <BannerMedia images={media} controls={media.length > 1} /> : <div className="absolute inset-0 -z-10 bg-secondary/60" />}

      <div className="container relative">
        <div className="max-w-2xl">
          {breadcrumbs && (
            <motion.nav
              aria-label="Breadcrumb"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
              className="mb-7 flex w-fit items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-semibold text-muted-foreground"
            >
              {breadcrumbs.map((b, i) => (
                <span key={b.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
                  {b.href ? (
                    <Link href={b.href} className="transition-colors hover:text-primary">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{b.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}

          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT }}
            className="eyebrow text-primary"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: EASE_OUT }}
              className="h-px w-10 origin-left bg-primary/70"
            />
            {eyebrow}
          </motion.span>

          <h1 className="mt-5 text-5xl font-bold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            <MaskLines lines={title} immediate delay={0.45} />
          </h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75 md:text-xl"
            >
              {description}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              {actions}
            </motion.div>
          )}
          {children}
        </div>
      </div>

      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT }}
          className={cn("absolute bottom-10 right-[max(1.25rem,calc((100vw-80rem)/2+2rem))] hidden md:block", media.length > 1 && "bottom-24")}
        >
          {badge}
        </motion.div>
      )}
    </section>
  );
}
