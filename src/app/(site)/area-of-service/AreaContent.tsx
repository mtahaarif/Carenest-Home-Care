"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "@/components/icons";
import { Magnetic } from "@/components/fx/Magnetic";
import { Marquee } from "@/components/fx/Marquee";
import { EASE_OUT } from "@/components/fx/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Button } from "@/components/ui/button";
import { COUNTIES } from "@/content/site";
import { IMAGES } from "@/lib/site";

export function AreaContent() {
  return (
    <>
      <PageHero
        eyebrow="Service coverage"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Areas of Service" }]}
        title={[
          "Where",
          <>
            <span className="accent-serif text-gradient pr-2">we serve</span>
          </>,
        ]}
        description="Carenest Homecare proudly provides compassionate, professional in-home care services throughout Cook, Lake, and DuPage counties. Our dedicated caregivers are ready to support you and your loved ones right at home."
        image={IMAGES.ctaBanner}
        imageAlt="Caregiver with elderly patient"
        imagePosition="center 22%"
        actions={
          <Magnetic>
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Check your area <ArrowUpRight />
              </Link>
            </Button>
          </Magnetic>
        }
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {COUNTIES.map((c) => (
            <motion.span
              key={c.name}
              variants={{ hidden: { opacity: 0, scale: 0.8, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { ease: EASE_OUT, duration: 0.6 } } }}
              className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-foreground"
            >
              <MapPin className="h-4 w-4 text-accent" /> {c.name}
            </motion.span>
          ))}
        </motion.div>
      </PageHero>

      <div className="border-y border-foreground/5 bg-ink py-6 text-ink-foreground">
        <Marquee duration={30} trackClassName="gap-12 pr-12">
          {[...COUNTIES, ...COUNTIES].map((c, i) => (
            <span key={i} className="flex items-center gap-12 text-3xl font-bold tracking-tight md:text-5xl">
              {c.name}
              <span className="accent-serif text-accent">&amp;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <ServiceArea />

      <CTASection
        eyebrow="Outside these counties?"
        title={
          <>
            Not sure if we <span className="accent-serif text-accent">serve your area?</span>
          </>
        }
        description="Contact us today to discuss your care needs. We may be able to accommodate additional areas not listed above."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
