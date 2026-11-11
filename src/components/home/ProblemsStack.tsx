"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake } from "@/components/icons";
import { Reveal } from "@/components/fx/Reveal";
import { StackingCards } from "@/components/fx/StackingCards";
import { Button } from "@/components/ui/button";
import { PROBLEMS } from "@/content/site";
import { IMAGES } from "@/lib/site";

const IMAGES_FOR = [IMAGES.consultation, IMAGES.personalCare, IMAGES.teaConversation];

export function ProblemsStack() {
  const cards = [
    ...PROBLEMS.map((p, i) => (
      <article key={p.title} className="grid overflow-hidden rounded-[2rem] border border-foreground/5 bg-card shadow-elevated md:grid-cols-[1fr_1.1fr]">
        <div className="relative h-56 md:h-auto">
          <Image src={IMAGES_FOR[i].src} alt="" sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 90vw" placeholder="blur" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-xs font-bold text-foreground">0{i + 1}</span>
        </div>
        <div className="relative p-8 md:p-10">
          <span aria-hidden className="pointer-events-none absolute right-6 top-2 text-8xl font-extrabold tracking-tighter text-primary/[0.07]">
            0{i + 1}
          </span>
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
            <p.icon className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-2xl font-bold text-foreground md:text-3xl">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
        </div>
      </article>
    )),
    <article key="answer" className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 text-primary-foreground shadow-glow md:p-12">
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <HeartHandshake className="h-10 w-10 text-accent" />
      <h3 className="mt-6 max-w-lg text-3xl font-bold md:text-4xl">
        Care built around <span className="accent-serif">your</span> family — not a template.
      </h3>
      <Button asChild variant="accent" size="lg" className="mt-8">
        <Link href="/contact">
          Book a free consultation <ArrowUpRight />
        </Link>
      </Button>
    </article>,
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Reveal>
            <span className="eyebrow text-primary">
              <span className="h-px w-8 bg-primary/60" />
              The problem
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
              Sound
              <br />
              <span className="accent-serif text-primary">familiar?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-sm text-lg text-muted-foreground">These are the problems we solve.</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 hidden gap-1.5 lg:flex">
              <span className="h-1 w-10 rounded-full bg-primary" />
              <span className="h-1 w-5 rounded-full bg-primary/40" />
              <span className="h-1 w-3 rounded-full bg-primary/20" />
            </div>
          </Reveal>
        </div>
        <StackingCards items={cards} top={128} gap={22} />
      </div>
    </section>
  );
}
