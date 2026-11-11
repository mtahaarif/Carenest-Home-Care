"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowUpRight, Check, Hand, Phone, Sparkles } from "@/components/icons";
import { DragCarousel } from "@/components/fx/DragCarousel";
import { GlowCard } from "@/components/fx/GlowCard";
import { Magnetic } from "@/components/fx/Magnetic";
import { EASE_OUT, Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { ServiceRevealCard } from "@/components/services/ServiceRevealCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { SERVICES, TRADITIONAL_CARE, serviceHref } from "@/content/site";
import { SITE } from "@/lib/site";
import type { ServicePageData } from "./service-data";

function Highlight({ text, word }: { text: string; word: string }) {
  const parts = text.split(word);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="accent-serif text-primary">{word}</span>}
        </span>
      ))}
    </>
  );
}

/** Wraps the first case-insensitive occurrence of `phrase` in <strong>. */
function Emphasize({ text, phrase }: { text: string; phrase: string }) {
  const i = text.toLowerCase().indexOf(phrase.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <strong className="font-semibold text-foreground">{text.slice(i, i + phrase.length)}</strong>
      {text.slice(i + phrase.length)}
    </>
  );
}

export function ServicePageTemplate({ slug, data }: { slug: string; data: ServicePageData }) {
  const { title, accentWord, subtitle, heroImage, whatIsIt, whoNeedsIt, supportServices, howItWorks } = data;
  const [before, after] = title.split(accentWord);
  const others = SERVICES.filter((s) => s.slug !== slug);
  const sidebarLinks = [...SERVICES, TRADITIONAL_CARE].filter((s) => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={subtitle}
        breadcrumbs={[{ label: "Carenest Homecare", href: "/" }, { label: "Home care services", href: "/services" }, { label: title }]}
        title={[
          <>
            {before}
            <span className="accent-serif text-gradient pr-2">{accentWord}</span>
            {after}
          </>,
        ]}
        description={data.description}
        image={heroImage}
        imagePosition="object-[center_35%]"
        badge={
          <div className="flex animate-float items-center gap-3 rounded-2xl glass p-4">
            <Sparkles className="h-7 w-7 text-accent" />
            <span>
              <span className="block font-bold text-foreground">Personalized care plan</span>
              <span className="block text-sm text-muted-foreground">Built around your routine</span>
            </span>
          </div>
        }
        actions={
          <>
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">
                  Free Consultation <ArrowUpRight />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="xl">
              <a href={SITE.phoneHref}>
                <Phone /> {SITE.phone}
              </a>
            </Button>
          </>
        }
      />

      {/* Content + sticky sidebar */}
      <section className="py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="space-y-20">
            <div>
              <Reveal>
                <span className="eyebrow text-primary">
                  <span className="h-px w-8 bg-primary/60" /> Overview
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
                  <Highlight text={whatIsIt.title} word={accentWord} />
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-xl leading-relaxed text-foreground/75">
                  <Emphasize text={whatIsIt.content} phrase={title} />
                </p>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                  <Highlight text={whoNeedsIt.title} word={accentWord} />
                </h2>
              </Reveal>
              <RevealGroup className="mt-8 grid gap-3" stagger={0.07}>
                {whoNeedsIt.points.map((p, i) => (
                  <RevealItem key={p}>
                    <div className="group flex items-center gap-5 rounded-2xl border border-foreground/5 bg-card p-5 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-soft">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-accent-foreground">
                        <Check className="h-5 w-5" />
                      </span>
                      <p className="flex-1 text-lg font-medium text-foreground">{p}</p>
                      <span className="text-sm font-bold text-foreground/15">0{i + 1}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal direction="left" className="space-y-4">
              <div className="relative overflow-hidden rounded-[2rem] bg-ink-gradient p-7 text-ink-foreground grain">
                <Hand className="h-8 w-8 text-accent" />
                <p className="mt-4 text-2xl font-bold leading-tight">Talk to a care coordinator</p>
                <p className="mt-2 text-sm text-ink-foreground/70">Free consultation. No pressure. Just answers.</p>
                <Button asChild variant="accent" className="mt-6 w-full">
                  <Link href="/contact">
                    Book consultation <ArrowUpRight />
                  </Link>
                </Button>
                <a href={SITE.phoneHref} className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-ink-foreground/80 hover:text-ink-foreground">
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
              </div>
              <div className="rounded-[2rem] border border-foreground/5 bg-card p-5 shadow-card">
                <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Other services</p>
                <ul>
                  {sidebarLinks.map((s) => (
                    <li key={s.slug}>
                      <Link href={serviceHref(s.slug)} className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-secondary">
                        <s.icon className="h-4 w-4 text-primary" />
                        <span className="flex-1 text-sm font-medium text-foreground">{s.title}</span>
                        <ArrowUpRight className="h-4 w-4 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Support services */}
      <section className="bg-secondary/50 py-24 md:py-32">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="What's included"
            title={
              <>
                Support services <span className="accent-serif text-primary">we provide</span>
              </>
            }
            description="Comprehensive care tailored to your specific needs"
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {supportServices.map((s, i) => (
              <RevealItem key={s.title}>
                <GlowCard tilt className="group h-full rounded-[1.75rem] border border-foreground/5 bg-card p-7 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-primary-foreground">
                      <Check className="h-6 w-6" />
                    </span>
                    <span className="text-3xl font-extrabold tracking-tighter text-foreground/10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.desc}</p>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* How it works — animated track */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="How does it work?"
            title={
              <>
                Four steps to <span className="accent-serif text-primary">peace of mind</span>
              </>
            }
          />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-foreground/10 lg:block" />
            <m.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 1.6, ease: EASE_OUT }}
              className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-primary via-primary-light to-accent lg:block"
            />
            <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.18}>
              {howItWorks.map((step, i) => (
                <RevealItem key={step.title}>
                  <div className="group">
                    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-background bg-brand-gradient font-bold text-white shadow-glow transition-transform duration-500 group-hover:scale-110">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Explore more */}
      <section className="overflow-hidden pb-8">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Explore more care"
              title={
                <>
                  Other ways <span className="accent-serif text-primary">we help</span>
                </>
              }
            />
            <p className="hidden text-sm font-semibold text-muted-foreground md:block">Drag to explore →</p>
          </div>
          <Reveal className="mt-12">
            <DragCarousel>
              {others.map((s) => (
                <ServiceRevealCard key={s.slug} service={s} index={SERVICES.indexOf(s)} />
              ))}
            </DragCarousel>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to get started?"
        title={
          <>
            Let&apos;s talk about <span className="accent-serif text-accent">{title.toLowerCase()}</span> for your family.
          </>
        }
        description="Contact us today for a free consultation. We will work with you to create a care plan that fits your family's needs."
        primary={{ label: "Get Free Consultation", href: "/contact" }}
        image={heroImage}
      />
    </>
  );
}
