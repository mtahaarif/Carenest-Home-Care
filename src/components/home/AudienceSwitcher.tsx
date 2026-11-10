"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "@/components/icons";
import { EASE_OUT, Reveal } from "@/components/fx/Reveal";
import { Button } from "@/components/ui/button";
import { CAREGIVER_BENEFITS, FAMILY_BENEFITS } from "@/content/site";
import { IMAGES } from "@/lib/site";
import { cn } from "@/lib/utils";

const AUDIENCES = {
  families: {
    tab: "For Families",
    kicker: "You stay in control",
    title: (
      <>
        Great care starts with <span className="accent-serif text-accent">trust.</span>
      </>
    ),
    body: "We believe great care starts with trust, and trust starts with choice. That is why you are in control.",
    items: FAMILY_BENEFITS,
    image: IMAGES.teaConversation,
    alt: "Grandmother and granddaughter enjoying tea together",
    cta: { label: "Get Started", href: "/contact" },
  },
  caregivers: {
    tab: "For Caregivers",
    kicker: "Already caring for someone?",
    title: (
      <>
        Get <span className="accent-serif text-accent">paid</span> for it.
      </>
    ),
    body: "You are already doing the work, so let us help you get compensated. When you join Carenest, you get more than a job. You get a partner who supports you every step of the way.",
    items: CAREGIVER_BENEFITS,
    image: IMAGES.patientCare,
    alt: "Caregiver providing medication assistance to elderly patient",
    cta: { label: "Become a Caregiver", href: "/careers" },
  },
} as const;

type Audience = keyof typeof AUDIENCES;

export function AudienceSwitcher() {
  const [active, setActive] = useState<Audience>("families");
  const a = AUDIENCES[active];

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-gradient p-6 text-ink-foreground grain sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-dots-light opacity-50" aria-hidden />

          <Reveal className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold md:text-5xl">
              Built for <span className="accent-serif text-accent">everyone</span> in the circle of care
            </h2>
            <div role="tablist" aria-label="Choose audience" className="flex shrink-0 rounded-full glass-dark p-1.5">
              {(Object.keys(AUDIENCES) as Audience[]).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active === key}
                  onClick={() => setActive(key)}
                  className={cn("relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", active === key ? "text-ink" : "text-ink-foreground/70 hover:text-ink-foreground")}
                >
                  {active === key && <motion.span layoutId="audience-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative">{AUDIENCES[key].tab}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="relative mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-img`}
                initial={{ opacity: 0, clipPath: "inset(0 0 0 100% round 2rem)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0 0% round 2rem)" }}
                exit={{ opacity: 0, clipPath: "inset(0 100% 0 0 round 2rem)" }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"
              >
                <motion.img initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE_OUT }} src={a.image} alt={a.alt} className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-copy`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{ visible: { transition: { staggerChildren: 0.06 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.25 } } }}
              >
                <motion.p variants={item} className="eyebrow text-accent">
                  {a.kicker}
                </motion.p>
                <motion.h3 variants={item} className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
                  {a.title}
                </motion.h3>
                <motion.p variants={item} className="mt-5 text-lg leading-relaxed text-ink-foreground/70">
                  {a.body}
                </motion.p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {a.items.map((it) => (
                    <motion.li key={it} variants={item} className="flex items-start gap-3 rounded-2xl glass-dark p-4 text-sm font-medium">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {it}
                    </motion.li>
                  ))}
                </ul>
                <motion.div variants={item} className="mt-9">
                  <Button asChild variant="accent" size="xl">
                    <Link href={a.cta.href}>
                      {a.cta.label} <ArrowUpRight />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
};
