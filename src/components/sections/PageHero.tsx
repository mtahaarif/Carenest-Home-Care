import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "@/components/icons";
import type { SiteImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import { BannerMedia, type BannerImage } from "./BannerMedia";
import { HERO_DELAYS, HeroLines } from "./HeroLines";

interface PageHeroProps {
  eyebrow: string;
  /** Each entry is rendered as its own masked line. */
  title: ReactNode[];
  description?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  /** Single banner photo… */
  image?: SiteImage;
  /** Tailwind object-position class for the banner photo, e.g. "object-[center_30%]". */
  imagePosition?: string;
  /** …or several, which cross-fade as a slideshow. */
  images?: BannerImage[];
  /** Floating glass element pinned to the banner's bottom-right. */
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * Full-bleed photo banner used at the top of every inner page. Entrance animations are pure CSS
 * so the banner paints on first load without waiting for JavaScript (better LCP / Speed Index).
 */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, image, imagePosition, images, badge, children, className }: PageHeroProps) {
  const media: BannerImage[] = images ?? (image ? [{ image, position: imagePosition ?? "object-[70%_center]" }] : []);

  return (
    <section className={cn("relative isolate flex min-h-[600px] items-center overflow-hidden pb-20 pt-40 md:min-h-[660px] md:pt-48 lg:min-h-[72vh]", className)}>
      {media.length > 0 ? <BannerMedia images={media} controls={media.length > 1} /> : <div className="absolute inset-0 -z-10 bg-secondary/60" />}

      <div className="container relative">
        <div className="max-w-2xl">
          {breadcrumbs && (
            <nav aria-label="Breadcrumb" className={cn("mb-7 flex w-fit animate-rise rounded-full glass px-4 py-2 text-xs font-semibold text-muted-foreground", HERO_DELAYS[0])}>
              <ol className="flex items-center gap-1.5">
                {breadcrumbs.map((b, i) => (
                  <li key={b.label} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />}
                    {b.href ? (
                      <Link href={b.href} className="transition-colors hover:text-primary">
                        {b.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-foreground">
                        {b.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <p className={cn("eyebrow animate-rise text-primary", HERO_DELAYS[1])}>
            <span className={cn("h-px w-10 origin-left animate-grow-x bg-primary/70", HERO_DELAYS[2])} />
            {eyebrow}
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            <HeroLines lines={title} startIndex={2} />
          </h1>

          {description && <p className={cn("mt-6 max-w-xl animate-rise text-lg leading-relaxed text-foreground/75 md:text-xl", HERO_DELAYS[4])}>{description}</p>}

          {actions && <div className={cn("mt-9 flex animate-rise flex-wrap items-center gap-4", HERO_DELAYS[5])}>{actions}</div>}
          {children && <div className={cn("animate-rise", HERO_DELAYS[6])}>{children}</div>}
        </div>
      </div>

      {badge && (
        <div className={cn("absolute bottom-10 right-[max(1.25rem,calc((100vw-80rem)/2+2rem))] hidden animate-pop md:block", HERO_DELAYS[8], media.length > 1 && "bottom-24")}>
          {badge}
        </div>
      )}
    </section>
  );
}
