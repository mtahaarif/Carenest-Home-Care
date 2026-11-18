import Link from "next/link";
import { ArrowUpRight, CircleCheckBig, Phone } from "@/components/icons";
import { Magnetic } from "@/components/fx/Magnetic";
import { Marquee } from "@/components/fx/Marquee";
import { BannerMedia, type BannerImage } from "@/components/sections/BannerMedia";
import { HERO_DELAYS, HeroLines } from "@/components/sections/HeroLines";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/content/site";
import type { SiteImage } from "@/lib/images";
import { IMAGES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const TRUST = ["Licensed, bonded & insured", "Free consultation", "Locally owned and operated"];

/** Later slides are fully decoded before they fade in, so their blur placeholder would never show. */
const noBlur = ({ src, alt }: SiteImage): SiteImage => ({ alt, src: { ...src, blur: undefined } });

const SLIDES: BannerImage[] = [
  { image: IMAGES.teaConversation, position: "object-[65%_center]" },
  { image: noBlur(IMAGES.familyJoy), position: "object-[70%_center]" },
  { image: noBlur(IMAGES.ctaBanner), position: "object-[center_22%]" },
  { image: noBlur(IMAGES.elderlyTablet), position: "object-[75%_center]" },
];

function ServicePills() {
  return (
    <>
      {SERVICES.map((s) => (
        <span key={s.slug} className="flex items-center gap-2.5 rounded-full border border-foreground/10 bg-white/70 py-2 pl-2 pr-5 text-sm font-semibold text-foreground/80">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
            <s.icon className="h-4 w-4" />
          </span>
          {s.title}
        </span>
      ))}
    </>
  );
}

/** Home banner. Entrance animations are CSS-only so the headline paints before hydration. */
export function HomeHero() {
  return (
    <section className="relative">
      {/* 60% of the window height; content condenses on shorter screens (see PageHero). */}
      <div data-banner className="relative isolate flex h-banner flex-col justify-center overflow-hidden pb-6 pt-[6.25rem] md:pb-10 md:pt-[8rem]">
        <BannerMedia images={SLIDES} controls interval={6000} />

        <div className="container relative">
          <div data-banner-content className="max-w-2xl">
            <p className={cn("inline-flex animate-rise items-center gap-2 rounded-full glass py-1.5 pl-1.5 pr-4 text-xs font-semibold text-foreground/80", HERO_DELAYS[1])}>
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-2.5 py-1 text-primary-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Welcome to Carenest
              </span>
              <span className="whitespace-nowrap">
                Cook · Lake · DuPage<span className="hidden sm:inline"> counties</span>
              </span>
            </p>

            <h1 className="mt-4 text-hero font-extrabold leading-[1] tracking-tight text-foreground md:mt-5">
              <HeroLines
                startIndex={2}
                lines={[
                  "Your loved one",
                  "deserves care that",
                  <>
                    feels like <span className="accent-serif text-gradient pr-2">family</span>
                  </>,
                ]}
              />
            </h1>

            <p
              className={cn(
                "mt-3 line-clamp-3 max-w-xl animate-rise text-base leading-relaxed text-foreground/75 md:mt-4 md:text-lg very-short-screen:line-clamp-2",
                HERO_DELAYS[5],
              )}
            >
              Every family faces care decisions. You want care that feels right, delivered by someone you trust. At Carenest, we work with you to find{" "}
              <strong className="font-semibold text-foreground">the right caregiver</strong>, whether that&apos;s someone you already know or a qualified professional
              from our team.
            </p>

            <div className={cn("mt-5 flex animate-rise flex-wrap items-center gap-3 md:mt-7 md:gap-4", HERO_DELAYS[6])}>
              <Magnetic>
                <Button asChild variant="hero" size="lg">
                  <a href={SITE.phoneHref}>
                    <Phone /> Call or Text Today
                  </a>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">
                  Explore home care services <ArrowUpRight />
                </Link>
              </Button>
            </div>

            <ul className={cn("mt-7 flex animate-rise flex-wrap gap-x-6 gap-y-3 max-md:hidden short-screen:hidden", HERO_DELAYS[7])}>
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <CircleCheckBig className="h-4 w-4 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Decorative service ticker */}
      <div className={cn("relative animate-rise border-y border-foreground/5 bg-white/50 py-5 backdrop-blur-sm", HERO_DELAYS[8])}>
        <Marquee duration={38} trackClassName="gap-3 pr-3">
          <ServicePills />
        </Marquee>
      </div>
    </section>
  );
}
