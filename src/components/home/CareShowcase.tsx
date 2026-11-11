"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/icons";
import { EASE_OUT, Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { Button } from "@/components/ui/button";
import { SERVICES, serviceHref } from "@/content/site";
import { cn } from "@/lib/utils";

const AUTO_MS = 5000;

/**
 * Expanding image panels: one service is open at a time; the rest collapse to slim
 * labelled columns (rows on mobile). Auto-advances until the visitor interacts.
 */
export function CareShowcase() {
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();
  const autoplay = inView && !interacting && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % SERVICES.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active, autoplay]);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                The care <span className="accent-serif text-primary">we offer</span>
              </>
            }
            description="From companion care to specialized memory support, we offer services that adapt to your family's unique needs."
          />
          <Reveal delay={0.2}>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                View all services <ArrowUpRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal distance={40} blur={false} className="mt-14">
          <div
            ref={ref}
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocusCapture={() => setInteracting(true)}
            onBlurCapture={() => setInteracting(false)}
            className="flex flex-col gap-3 lg:h-[620px] lg:flex-row"
          >
            {SERVICES.map((s, i) => {
              const open = i === active;
              return (
                <div
                  key={s.slug}
                  onMouseEnter={() => setActive(i)}
                  style={{ flexGrow: open ? 7 : 1 }}
                  className={cn(
                    "group relative min-w-0 overflow-hidden lg:basis-0 rounded-[2rem] bg-ink transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "h-[26rem] lg:h-auto" : "h-[5.5rem] lg:h-auto",
                  )}
                >
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    sizes="(min-width: 1024px) 60vw, 92vw"
                    placeholder="blur"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]",
                      open ? "scale-100 opacity-100" : "scale-110 opacity-60 grayscale-[40%]",
                    )}
                  />
                  <div className={cn("absolute inset-0 transition-colors duration-700", open ? "bg-gradient-to-t from-ink via-ink/35 to-transparent" : "bg-ink/55")} />

                  {/* Auto-advance progress */}
                  {open && (
                    <div className="absolute inset-x-6 top-5 h-[3px] overflow-hidden rounded-full bg-white/20">
                      <m.div
                        key={`${active}-${autoplay}`}
                        className="h-full rounded-full bg-accent"
                        initial={{ width: autoplay ? "0%" : "100%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: autoplay ? AUTO_MS / 1000 : 0, ease: "linear" }}
                      />
                    </div>
                  )}

                  {/* Collapsed label */}
                  {!open && (
                    <button
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-label={`Show ${s.title}`}
                      className="absolute inset-0 flex items-center gap-4 px-6 text-left text-white lg:flex-col lg:justify-between lg:px-0 lg:py-7"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl glass-dark text-accent transition-transform duration-500 group-hover:scale-110">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-lg font-bold lg:flex-none lg:rotate-180 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">{s.title}</span>
                      <span className="text-xs font-bold text-white/50">0{i + 1}</span>
                    </button>
                  )}

                  {/* Expanded content */}
                  <AnimatePresence>
                    {open && (
                      <m.div
                        key={s.slug}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
                        className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10"
                      >
                        <m.div variants={item} className="flex items-center gap-3">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl glass-dark text-accent">
                            <s.icon className="h-6 w-6" />
                          </span>
                          <span className="eyebrow text-white/70">Service 0{i + 1}</span>
                        </m.div>
                        <m.h3 variants={item} className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
                          {s.title}
                        </m.h3>
                        <m.p variants={item} className="mt-3 max-w-md text-base text-white/80 md:text-lg">
                          {s.description}
                        </m.p>
                        <m.div variants={item} className="mt-7">
                          <Link
                            href={serviceHref(s.slug)}
                            className="group/link inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-accent"
                          >
                            Explore {s.title}
                            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover/link:rotate-45">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </Link>
                        </m.div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE_OUT } },
};
