"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CircleCheckBig, Phone } from "@/components/icons";
import { Magnetic } from "@/components/fx/Magnetic";
import { Marquee } from "@/components/fx/Marquee";
import { EASE_OUT, MaskLines } from "@/components/fx/Reveal";
import { BannerMedia, type BannerImage } from "@/components/sections/BannerMedia";
import { Button } from "@/components/ui/button";
import { SERVICES, serviceHref } from "@/content/site";
import { IMAGES, SITE } from "@/lib/site";

const TRUST = ["Licensed, bonded & insured", "Free consultation", "Locally owned and operated"];

const SLIDES: BannerImage[] = [
  { src: IMAGES.teaConversation, alt: "Grandmother and granddaughter enjoying tea together", position: "65% center" },
  { src: IMAGES.familyJoy, alt: "Happy family members enjoying time together", position: "70% center" },
  { src: IMAGES.ctaBanner, alt: "Caregiver with elderly patient", position: "center 22%" },
  { src: IMAGES.elderlyTablet, alt: "Elderly woman and daughter browsing tablet together", position: "75% center" },
];

export function HomeHero() {
  return (
    <section className="relative">
      <div className="relative isolate flex min-h-[720px] items-center overflow-hidden pb-28 pt-36 lg:min-h-[100svh] lg:pt-32">
        <BannerMedia images={SLIDES} controls interval={6000} />

        <div className="container relative">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full glass py-1.5 pl-1.5 pr-4 text-xs font-semibold text-foreground/80"
            >
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
            </motion.div>

            <h1 className="mt-7 text-[2.9rem] font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl xl:text-[5rem]">
              <MaskLines
                immediate
                delay={0.45}
                lines={[
                  "Your loved one",
                  "deserves care that",
                  <>
                    feels like <span className="accent-serif text-gradient pr-2">family</span>
                  </>,
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.85, duration: 0.8, ease: EASE_OUT }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75"
            >
              Every family faces care decisions. You want care that feels right, delivered by someone you trust. At Carenest, we work with you to find the right
              caregiver, whether that&apos;s someone you already know or a qualified professional from our team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: EASE_OUT }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button asChild variant="hero" size="xl">
                  <a href={SITE.phoneHref}>
                    <Phone /> Call or Text Today
                  </a>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="xl">
                <Link href="/services">
                  Explore Your Options <ArrowUpRight />
                </Link>
              </Button>
            </motion.div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1.15 } } }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            >
              {TRUST.map((t) => (
                <motion.li key={t} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <CircleCheckBig className="h-4 w-4 text-primary" />
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      {/* Service pills marquee */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} className="relative border-y border-foreground/5 bg-white/50 py-5 backdrop-blur-sm">
        <Marquee duration={38} trackClassName="gap-3 pr-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={serviceHref(s.slug)}
              className="group flex items-center gap-2.5 rounded-full border border-foreground/10 bg-white/70 py-2 pl-2 pr-5 text-sm font-semibold text-foreground/80 transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <s.icon className="h-4 w-4" />
              </span>
              {s.title}
            </Link>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
