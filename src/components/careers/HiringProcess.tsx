"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { EASE_OUT, Reveal } from "@/components/fx/Reveal";
import { HIRING_STEPS } from "@/content/site";
import { cn } from "@/lib/utils";

function StepPanel({ index, onActive }: { index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const step = HIRING_STEPS[index];

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[60vh] items-center lg:min-h-[70vh]">
      <Reveal className="w-full">
        <article
          className={cn(
            "rounded-[2rem] border p-8 transition-all duration-700 md:p-12",
            inView ? "border-primary/20 bg-card shadow-elevated" : "border-foreground/5 bg-card/60 shadow-card lg:opacity-50",
          )}
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
            <step.icon className="h-8 w-8" />
          </span>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-accent">Step {index + 1}</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">{step.title}</h3>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{step.description}</p>
        </article>
      </Reveal>
    </div>
  );
}

/** Sticky sidebar that tracks which hiring step is currently in view. */
export function HiringProcess() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
          <Reveal>
            <span className="eyebrow text-primary">
              <span className="h-px w-8 bg-primary/60" /> Hiring process
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Our <span className="accent-serif text-primary">hiring</span> process
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">Getting started is simple. Here is what you can expect when you apply.</p>
          </Reveal>

          <div className="mt-12 hidden items-end gap-8 lg:flex">
            <div className="relative h-[8.5rem] w-60 shrink-0 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                  className="absolute inset-0 text-[9rem] font-extrabold leading-none tracking-tighter text-gradient"
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
            </div>
            <ol className="space-y-3 pb-3">
              {HIRING_STEPS.map((s, i) => (
                <li key={s.title} className="flex items-center gap-3">
                  <span className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-10 bg-primary" : "w-4 bg-foreground/15")} />
                  <span className={cn("text-sm font-semibold transition-colors duration-500", i === active ? "text-foreground" : "text-muted-foreground")}>{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div>
          {HIRING_STEPS.map((s, i) => (
            <StepPanel key={s.title} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
