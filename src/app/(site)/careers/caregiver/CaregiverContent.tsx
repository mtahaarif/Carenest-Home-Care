"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Briefcase, Check, Clock } from "@/components/icons";
import { GlowCard } from "@/components/fx/GlowCard";
import { Magnetic } from "@/components/fx/Magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { PERKS, QUALIFICATIONS, RESPONSIBILITIES } from "@/content/site";
import { IMAGES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function DutyList({ title, items, tone }: { title: React.ReactNode; items: string[]; tone: "primary" | "accent" }) {
  return (
    <div>
      <Reveal>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
      </Reveal>
      <RevealGroup className="mt-8 space-y-3" stagger={0.05}>
        {items.map((item) => (
          <RevealItem key={item}>
            <div className="group flex items-start gap-4 rounded-2xl border border-foreground/5 bg-card p-5 shadow-card transition-all duration-500 hover:translate-x-1 hover:border-primary/20">
              <span
                className={cn(
                  "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500",
                  tone === "primary" ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground" : "bg-accent/15 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
                )}
              >
                <Check className="h-4 w-4" />
              </span>
              <span className="text-foreground/85">{item}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export function CaregiverContent() {
  return (
    <>
      <PageHero
        eyebrow="Career opportunity"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: "Caregiver" }]}
        title={[
          "Caregiver",
          <>
            <span className="accent-serif text-gradient pr-2">position</span>
          </>,
        ]}
        description="Join our team of dedicated caregivers and start a rewarding career helping seniors and individuals in need."
        image={IMAGES.personalCare}
        imageAlt="Professional caregiver providing personalized care"
        badge={
          <div className="flex animate-float items-center gap-3 rounded-2xl glass p-4">
            <Clock className="h-7 w-7 text-primary" />
            <span>
              <span className="block font-bold text-foreground">Full-time / Part-time</span>
              <span className="block text-sm text-muted-foreground">Flexible scheduling</span>
            </span>
          </div>
        }
        actions={
          <>
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <a href={SITE.applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowUpRight />
                </a>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="xl">
              <Link href="/careers">
                <ArrowLeft /> All jobs
              </Link>
            </Button>
          </>
        }
      />

      {/* Perks bento */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Perks & benefits"
            title={
              <>
                Why work at <span className="accent-serif text-primary">Carenest?</span>
              </>
            }
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {PERKS.map((p, i) => (
              <RevealItem key={p.title} className={cn(i === 0 && "lg:col-span-2", i === 5 && "lg:col-span-2")}>
                <GlowCard
                  tilt
                  className={cn(
                    "group flex h-full flex-col justify-between gap-10 rounded-[2rem] border p-8 shadow-card",
                    i === 0 || i === 5 ? "border-transparent bg-ink-gradient text-ink-foreground" : "border-foreground/5 bg-card",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]",
                      i === 0 || i === 5 ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary",
                    )}
                  >
                    <p.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <p className={cn("mt-2", i === 0 || i === 5 ? "text-ink-foreground/70" : "text-muted-foreground")}>{p.description}</p>
                  </div>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Responsibilities + qualifications with sticky apply card */}
      <section className="bg-secondary/50 py-24 md:py-32">
        <div className="container grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="space-y-20">
            <DutyList
              tone="primary"
              items={RESPONSIBILITIES}
              title={
                <>
                  <span className="accent-serif text-primary">Responsibilities</span>
                </>
              }
            />
            <DutyList
              tone="accent"
              items={QUALIFICATIONS}
              title={
                <>
                  <span className="accent-serif text-accent">Qualifications</span>
                </>
              }
            />
          </div>
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal direction="left">
              <div className="relative overflow-hidden rounded-[2rem] bg-ink-gradient p-8 text-ink-foreground grain">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <Briefcase className="h-7 w-7" />
                </span>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent">Caregiver</p>
                <p className="mt-2 text-2xl font-bold leading-tight">Ready to make a difference?</p>
                <p className="mt-2 text-sm text-ink-foreground/70">Full-time / Part-time</p>
                <Button asChild variant="accent" className="mt-8 w-full">
                  <a href={SITE.applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="glass" className="mt-3 w-full">
                  <Link href="/careers">View All Jobs</Link>
                </Button>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to make a difference?"
        title={
          <>
            Join our team of <span className="accent-serif text-accent">dedicated</span> caregivers.
          </>
        }
        description="Join our team of dedicated caregivers and start a rewarding career today."
        primary={{ label: "Apply Now", href: SITE.applyUrl, external: true }}
        secondary={{ label: "View All Jobs", href: "/careers" }}
        image={IMAGES.patientCare}
      />
    </>
  );
}
