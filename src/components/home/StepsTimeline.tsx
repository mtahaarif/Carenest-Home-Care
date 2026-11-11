"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "motion/react";
import { GlowCard } from "@/components/fx/GlowCard";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { STEPS } from "@/content/site";
import { cn } from "@/lib/utils";

/** Vertical timeline whose spine draws itself as you scroll; steps alternate sides on desktop. */
export function StepsTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={
            <>
              Our simple <span className="accent-serif text-primary">three-step</span> plan
            </>
          }
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-foreground/10 md:left-1/2 md:-translate-x-1/2" />
          <m.div style={{ scaleY }} className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-primary via-primary-light to-accent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <div key={step.title} className="relative grid items-center md:grid-cols-2 md:gap-20">
                  <Reveal className="absolute left-6 top-8 z-10 -translate-x-1/2 md:left-1/2" blur={false} distance={0}>
                    <span className="grid h-12 w-12 place-items-center rounded-full border-4 border-background bg-brand-gradient text-sm font-bold text-white shadow-glow">
                      {i + 1}
                    </span>
                  </Reveal>
                  <div className={cn("hidden md:row-start-1 md:flex", right ? "md:col-start-1 md:justify-end" : "md:col-start-2 md:justify-start")}>
                    <Reveal direction={right ? "right" : "left"} distance={60}>
                      <span className="block text-[10rem] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_hsl(var(--primary)/0.22)]">
                        0{i + 1}
                      </span>
                    </Reveal>
                  </div>
                  <Reveal direction={right ? "left" : "right"} className={cn("pl-16 md:row-start-1 md:pl-0", right ? "md:col-start-2" : "md:col-start-1")}>
                    <GlowCard tilt className="rounded-[2rem] border border-foreground/5 bg-card p-8 shadow-card">
                      <div className="flex items-center gap-4">
                        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                          <step.icon className="h-7 w-7" />
                        </span>
                        <span className="eyebrow text-accent">Step {i + 1}</span>
                      </div>
                      <h3 className="mt-6 text-2xl font-bold text-foreground">{step.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
                    </GlowCard>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
