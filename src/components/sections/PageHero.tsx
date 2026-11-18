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
 *
 * The banner is always 60% of the window height (`h-banner`). The top padding clears the fixed
 * header; the headline scales with the window (`text-hero`), and secondary items condense or hide
 * on shorter screens so the content always fits.
 */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, image, imagePosition, images, badge, children, className }: PageHeroProps) {
  const media: BannerImage[] = images ?? (image ? [{ image, position: imagePosition ?? "object-[70%_center]" }] : []);

  return (
    <section data-banner className={cn("relative isolate flex h-banner flex-col justify-center overflow-hidden pb-6 pt-[6.25rem] md:pb-10 md:pt-[8rem]", className)}>
      {media.length > 0 ? <BannerMedia images={media} controls={media.length > 1} /> : <div className="absolute inset-0 -z-10 bg-secondary/60" />}

      <div className="container relative">
        <div data-banner-content className="max-w-2xl">
          {breadcrumbs && (
            <nav
              aria-label="Breadcrumb"
              className={cn("mb-4 flex w-fit animate-rise rounded-full glass px-4 py-2 text-xs font-semibold text-muted-foreground max-sm:hidden very-short-screen:hidden", HERO_DELAYS[0])}
            >
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

          <h1 className="mt-3 text-hero font-bold text-foreground md:mt-4">
            <HeroLines lines={title} startIndex={2} />
          </h1>

          {description && (
            <p
              className={cn(
                "mt-3 line-clamp-3 max-w-xl animate-rise text-base leading-relaxed text-foreground/75 md:mt-4 md:text-lg very-short-screen:line-clamp-2",
                HERO_DELAYS[4],
              )}
            >
              {description}
            </p>
          )}

          {actions && <div className={cn("mt-5 flex animate-rise flex-wrap items-center gap-3 md:mt-7 md:gap-4", HERO_DELAYS[5])}>{actions}</div>}
          {/* Optional extras (e.g. county chips) only where there is vertical room for them. */}
          {children && <div className={cn("animate-rise short-screen:hidden", HERO_DELAYS[6])}>{children}</div>}
        </div>
      </div>

      {badge && (
        <div className={cn("absolute bottom-8 right-[max(1.25rem,calc((100vw-80rem)/2+2rem))] hidden animate-pop lg:block", HERO_DELAYS[8], media.length > 1 && "bottom-20")}>
          {badge}
        </div>
      )}
    </section>
  );
}
