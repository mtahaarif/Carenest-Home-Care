"use client";

import { Img as Image } from "@/components/ui/img";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "@/components/icons";
import { GlowCard } from "@/components/fx/GlowCard";
import { Magnetic } from "@/components/fx/Magnetic";
import { ParallaxImage } from "@/components/fx/Parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { TextReveal } from "@/components/fx/TextReveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { REASONS, VALUES } from "@/content/site";
import { IMAGES } from "@/lib/site";
import { cn } from "@/lib/utils";

const STORY = [
  {
    label: "The question",
    text: "Carenest Homecare was born from a simple question: Why can't families have more control over how care is delivered in their homes?",
    emphasis: "Why can't families have more control over how care is delivered in their homes?",
  },
  {
    label: "What we saw",
    text: 'We saw families struggling with traditional home care agencies. Caregivers rotating in and out, no real connection, and the constant worry of "who\'s coming today?" We knew there had to be a better way.',
  },
  {
    label: "Our answer",
    emphasis: "a flexible model",
    text: "So we built Carenest around a flexible model: whether you have someone in mind or need us to find the right caregiver, we handle training, certification, payroll, and insurance. You get professional care that feels personal, because we take the time to understand your needs.",
  },
];

export function AboutContent() {
  return (
    <>
      <PageHero
        eyebrow="About Carenest"
        breadcrumbs={[{ label: "Carenest Homecare", href: "/" }, { label: "About" }]}
        title={[
          "A fresh approach",
          <>
            to <span className="accent-serif text-gradient pr-2">home care</span>
          </>,
        ]}
        description="A fresh approach to home care, built on the belief that families deserve personalized care that truly fits their needs."
        image={IMAGES.familyJoy}
        badge={
          <div className="flex animate-float items-center gap-3 rounded-2xl glass p-4">
            <BadgeCheck className="h-8 w-8 text-primary" />
            <span>
              <span className="block font-bold text-foreground">Locally owned</span>
              <span className="block text-sm text-muted-foreground">and operated in Chicago</span>
            </span>
          </div>
        }
        actions={
          <Magnetic>
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Talk to our team <ArrowUpRight />
              </Link>
            </Button>
          </Magnetic>
        }
      />

      {/* Story — sticky sidebar */}
      <section className="py-24 md:py-32">
        <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  Built on <span className="accent-serif text-primary">trust</span>
                </>
              }
            />
            <Reveal delay={0.2} className="mt-10 hidden lg:block">
              <ParallaxImage image={IMAGES.teaConversation} sizes="(min-width: 1024px) 40vw, 90vw" className="aspect-[4/3] rounded-[2rem] shadow-elevated" />
            </Reveal>
          </div>

          <div className="space-y-6">
            {STORY.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <article className={cn("rounded-[2rem] p-8 md:p-12", i === 1 ? "bg-ink-gradient text-ink-foreground" : "border border-foreground/5 bg-card shadow-card")}>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-sm font-bold", i === 1 ? "text-accent" : "text-primary")}>0{i + 1}</span>
                    <span className={cn("h-px w-10", i === 1 ? "bg-accent/50" : "bg-primary/40")} />
                    <span className={cn("eyebrow", i === 1 ? "text-ink-foreground/60" : "text-muted-foreground")}>{s.label}</span>
                  </div>
                  {i === 1 ? (
                    <TextReveal text={s.text} className="mt-6 text-2xl font-semibold leading-snug md:text-3xl" highlight={["who's", "coming", "today"]} />
                  ) : (
                    <p className="mt-6 text-xl leading-relaxed text-foreground/85 md:text-2xl">
                      {s.emphasis ? (
                        <>
                          {s.text.slice(0, s.text.indexOf(s.emphasis))}
                          <strong className="font-semibold text-foreground">{s.emphasis}</strong>
                          {s.text.slice(s.text.indexOf(s.emphasis) + s.emphasis.length)}
                        </>
                      ) : (
                        s.text
                      )}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values — bento */}
      <section className="bg-secondary/50 py-24 md:py-32">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="What drives us"
            title={
              <>
                Our core <span className="accent-serif text-primary">values</span>
              </>
            }
          />
          <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2" stagger={0.1}>
            <RevealItem className="md:col-span-2 lg:row-span-2">
              <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[2rem]">
                <Image src={IMAGES.familyTogether.src} alt={IMAGES.familyTogether.alt} sizes="(min-width: 1024px) 50vw, 92vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white md:p-10">
                  {(() => {
                    const V = VALUES[0];
                    return (
                      <>
                        <span className="grid h-14 w-14 place-items-center rounded-2xl glass-dark">
                          <V.icon className="h-7 w-7 text-accent" />
                        </span>
                        <h3 className="mt-5 text-4xl font-bold">{V.title}</h3>
                        <p className="mt-2 max-w-md text-white/80">{V.description}</p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </RevealItem>
            {VALUES.slice(1).map((v, i) => (
              <RevealItem key={v.title} className={cn(i === 2 && "md:col-span-2")}>
                <GlowCard tilt className="group h-full rounded-[2rem] border border-foreground/5 bg-card p-8 shadow-card">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-foreground">{v.title}</h3>
                  <p className="mt-2 text-muted-foreground">{v.description}</p>
                </GlowCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Why choose — hover-reveal rows */}
      <section className="py-24 md:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="The Carenest difference"
            title={
              <>
                Why choose <span className="accent-serif text-primary">Carenest?</span>
              </>
            }
            description="Families across Cook, Lake, and DuPage counties choose Carenest for a flexible, transparent approach to in-home care — with one point of contact, always."
          />
          <RevealGroup className="mt-14 grid border-t border-foreground/10 md:grid-cols-2 md:gap-x-10" stagger={0.06}>
            {REASONS.map((r, i) => (
              <RevealItem key={r}>
                <div className="group relative flex items-center gap-6 overflow-hidden border-b border-foreground/10 py-6">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative w-10 text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="relative flex-1 text-lg font-semibold text-foreground transition-transform duration-500 group-hover:translate-x-2 md:text-xl">{r}</span>
                  <ArrowUpRight className="relative h-5 w-5 -translate-x-3 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to get started?"
        title={
          <>
            Let&apos;s build a care plan that <span className="accent-serif text-accent">fits</span>.
          </>
        }
        description="Contact us today for a free consultation. We will work with you to create a care plan that fits your family's needs."
        image={IMAGES.familyJoy}
      />
    </>
  );
}
