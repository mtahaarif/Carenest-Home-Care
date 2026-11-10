"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin } from "@/components/icons";
import { GlowCard } from "@/components/fx/GlowCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { IllinoisMap } from "@/components/maps/IllinoisMap";
import { COUNTIES } from "@/content/site";
import { cn } from "@/lib/utils";

/** Interactive county map + county cards; hovering either side highlights the other. */
export function ServiceArea({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const activeCounty = COUNTIES.find((c) => c.name === active);

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        {heading && (
          <SectionHeading
            eyebrow="Where we serve"
            title={
              <>
                Care across <span className="accent-serif text-primary">Chicagoland</span>
              </>
            }
            description="Bringing compassionate, professional home care across Cook, Lake, and DuPage counties."
          />
        )}

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-secondary/70 p-4 md:p-6">
            <div className="absolute inset-0 bg-dots opacity-70" aria-hidden />
            <div className="relative flex items-center justify-between px-2 pt-2">
              <p className="font-semibold text-foreground">Serving northern Illinois</p>
              <span className="flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-semibold">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Service area
              </span>
            </div>
            <div className="relative aspect-[4/3]">
              <IllinoisMap active={active} onHover={setActive} />
              <AnimatePresence>
                {activeCounty && (
                  <motion.div
                    key={activeCounty.name}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 6 }}
                    className="pointer-events-none absolute bottom-3 left-3 rounded-2xl bg-ink px-4 py-3 text-ink-foreground shadow-lg"
                  >
                    <p className="font-bold">{activeCounty.name}</p>
                    <p className="text-xs text-ink-foreground/70">{activeCounty.blurb}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <RevealGroup className="flex flex-col gap-4" stagger={0.1}>
            {COUNTIES.map((c, i) => (
              <RevealItem key={c.name} className="flex-1">
                <GlowCard
                  onMouseEnter={() => setActive(c.name)}
                  onMouseLeave={() => setActive(null)}
                  className={cn(
                    "group flex h-full items-center gap-5 rounded-[1.75rem] border bg-card p-6 shadow-card transition-all duration-500",
                    active === c.name ? "-translate-y-1 border-accent/50 shadow-elevated" : "border-foreground/5",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-all duration-500",
                      active === c.name ? "rotate-[-8deg] bg-accent text-accent-foreground" : "bg-accent/15 text-accent",
                    )}
                  >
                    <MapPin className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xl font-bold text-foreground">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.blurb}</p>
                  </div>
                  <span className="text-4xl font-extrabold tracking-tighter text-foreground/10">0{i + 1}</span>
                </GlowCard>
              </RevealItem>
            ))}
            <RevealItem>
              <Link
                href="/contact"
                className="group flex items-center justify-between rounded-[1.75rem] bg-brand-gradient p-6 text-primary-foreground transition-transform duration-500 hover:-translate-y-1"
              >
                <span>
                  <span className="block text-sm text-white/70">Not sure if we serve your area?</span>
                  <span className="block text-lg font-bold">Contact us to find out</span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
