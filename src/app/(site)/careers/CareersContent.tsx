"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, Check, Heart, UserCheck } from "@/components/icons";
import { HiringProcess } from "@/components/careers/HiringProcess";
import { GlowCard } from "@/components/fx/GlowCard";
import { Magnetic } from "@/components/fx/Magnetic";
import { Marquee } from "@/components/fx/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { CAREER_BENEFITS, CAREER_FAQS, OPENINGS, REQUIREMENTS } from "@/content/site";
import { FaqSection } from "@/components/sections/FaqSection";
import { IMAGES, SITE } from "@/lib/site";

export function CareersContent() {
  return (
    <>
      <PageHero
        eyebrow="Careers at Carenest"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        title={[
          "Join our",
          <>
            <span className="accent-serif text-gradient pr-2">team</span>
          </>,
        ]}
        description={
          <>
            Make a real difference in people&apos;s lives. Join our team of compassionate caregivers and build a <strong className="font-semibold text-foreground">rewarding career</strong>.
          </>
        }
        image={IMAGES.patientCare}
        badge={
          <div className="flex animate-float items-center gap-3 rounded-2xl glass p-4">
            <Heart className="h-7 w-7 fill-accent text-accent" />
            <span>
              <span className="block font-bold text-foreground">Meaningful work</span>
              <span className="block text-sm text-muted-foreground">Every single day</span>
            </span>
          </div>
        }
        actions={
          <>
            <Magnetic>
              <Button asChild variant="hero" size="xl">
                <a href="#openings">
                  View Open Positions <ArrowUpRight />
                </a>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="xl">
              <a href={SITE.applyUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
          </>
        }
      />

      {/* Benefits ribbon */}
      <div className="border-y border-foreground/5 bg-white/50 py-5">
        <Marquee duration={35} trackClassName="gap-3 pr-3">
          {CAREER_BENEFITS.map((b) => (
            <span key={b} className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground">
              <Check className="h-4 w-4 text-primary" /> {b}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Openings */}
      <section id="openings" className="scroll-mt-28 py-24 md:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="Current openings"
            title={
              <>
                Find your <span className="accent-serif text-primary">place</span> with us
              </>
            }
          />
          <div className="mt-12 space-y-5">
            {OPENINGS.map((job) => (
              <Reveal key={job.title}>
                <Link href={job.href} className="block">
                  <GlowCard className="group grid items-center gap-6 rounded-[2rem] border border-foreground/5 bg-card p-6 shadow-card transition-all duration-500 hover:shadow-elevated md:grid-cols-[auto_1fr_auto] md:p-8">
                    <span className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-gradient text-white transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                      <Briefcase className="h-9 w-9" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-3xl font-bold text-foreground">{job.title}</h3>
                        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-foreground">{job.type}</span>
                      </div>
                      <p className="mt-2 text-lg text-muted-foreground">{job.description}</p>
                    </div>
                    <span className="flex items-center gap-3 font-semibold text-primary">
                      View role
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-foreground">
                        <ArrowUpRight className="h-6 w-6" />
                      </span>
                    </span>
                  </GlowCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HiringProcess />

      {/* Benefits & requirements */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-gradient p-6 text-ink-foreground grain sm:p-10 lg:p-14">
            <div className="absolute inset-0 bg-dots-light opacity-50" aria-hidden />
            <div className="relative grid gap-6 lg:grid-cols-2">
              <Reveal className="rounded-[2rem] glass-dark p-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <Heart className="h-6 w-6" />
                  </span>
                  <h3 className="text-2xl font-bold md:text-3xl">
                    Why join <span className="accent-serif text-accent">Carenest?</span>
                  </h3>
                </div>
                <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.05}>
                  {CAREER_BENEFITS.map((b) => (
                    <RevealItem key={b}>
                      <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10">
                        <Check className="h-4 w-4 shrink-0 text-accent" /> {b}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Reveal>
              <Reveal delay={0.15} className="rounded-[2rem] glass-dark p-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    <UserCheck className="h-6 w-6" />
                  </span>
                  <h3 className="text-2xl font-bold md:text-3xl">Requirements</h3>
                </div>
                <RevealGroup className="mt-8 space-y-3" stagger={0.05}>
                  {REQUIREMENTS.map((r, i) => (
                    <RevealItem key={r}>
                      <div className="flex items-center gap-4 border-b border-white/10 pb-3 text-ink-foreground/85">
                        <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                        {r}
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Careers FAQs"
        title={
          <>
            Questions about <span className="accent-serif text-primary">caregiving jobs</span>
          </>
        }
        description="What to expect when you apply to join the Carenest team."
        items={CAREER_FAQS}
      />

      <CTASection
        eyebrow="Ready to make a difference?"
        title={
          <>
            Start a <span className="accent-serif text-accent">rewarding</span> career today.
          </>
        }
        description="Join our team of dedicated caregivers and start a rewarding career today."
        primary={{ label: "View Caregiver Position", href: "/careers/caregiver" }}
        secondary={{ label: "Apply Now", href: SITE.applyUrl }}
        image={IMAGES.teaConversation}
      />
    </>
  );
}
