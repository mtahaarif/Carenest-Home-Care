"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone, Plus } from "@/components/icons";
import { GlowCard } from "@/components/fx/GlowCard";
import { HorizontalStack } from "@/components/fx/HorizontalStack";
import { Magnetic } from "@/components/fx/Magnetic";
import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { TextReveal } from "@/components/fx/TextReveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQS, PROCESS, SERVICES, TRADITIONAL_CARE, serviceHref, type ServiceSummary } from "@/content/site";
import { IMAGES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function ServiceTile({ service, index, large = false }: { service: ServiceSummary; index: number; large?: boolean }) {
  return (
    <Link href={serviceHref(service.slug)} className={cn("group relative block h-full overflow-hidden rounded-[2rem] bg-ink", large ? "min-h-[28rem]" : "min-h-[22rem]")}>
      <Image src={service.image.src} alt={service.image.alt} sizes={large ? "(min-width: 1024px) 66vw, (min-width: 768px) 50vw, 92vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw"} placeholder="blur" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      {/* Hover reveal panel */}
      <div className="absolute inset-0 translate-y-full bg-primary/85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 max-lg:hidden" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
        <span className="grid h-12 w-12 place-items-center rounded-2xl glass-dark text-accent">
          <service.icon className="h-6 w-6" />
        </span>
        <span className="text-sm font-bold text-white/60">0{index + 1}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
        <h3 className={cn("font-bold", large ? "text-3xl md:text-4xl" : "text-2xl")}>{service.title}</h3>
        <p className="mt-2 max-w-md text-white/80 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:max-h-40 lg:group-hover:opacity-100">
          {service.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-all duration-500 group-hover:bg-accent">
          Learn more <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

export function ServicesContent() {
  return (
    <>
      <PageHero
        eyebrow="Home care services"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={[
          "Compassionate help",
          <>
            when you <span className="accent-serif text-gradient pr-2">need it most</span>
          </>,
        ]}
        description="Seniors, individuals with disabilities, and recovering patients can maintain their independence and dignity in the comfort of their own homes with the help of Carenest's expert home care services."
        image={IMAGES.patientCare}
        badge={
          <a href={SITE.phoneHref} className="flex animate-float items-center gap-3 rounded-2xl glass p-4 transition-transform hover:scale-105">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white">
              <Phone className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Free consultation</span>
              <span className="block font-bold text-foreground">{SITE.phone}</span>
            </span>
          </a>
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
              <a href="#services">View services</a>
            </Button>
          </>
        }
      />

      {/* Common reasons */}
      <section className="relative overflow-hidden bg-ink-gradient py-24 text-ink-foreground md:py-32">
        <div className="absolute inset-0 bg-dots-light opacity-50" aria-hidden />
        <div className="container relative grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            tone="dark"
            eyebrow="Why families call us"
            title={
              <>
                Common reasons for <span className="accent-serif text-accent">home care</span>
              </>
            }
          />
          <div>
            <TextReveal
              className="text-2xl font-medium leading-snug md:text-3xl"
              text="When an elderly loved one needs assistance with everyday duties but still wishes to remain in their own home, many families choose to hire specialized home services for seniors. Following hospitalization, surgery recovery, or long-term conditions like dementia or Alzheimer's, some people require assistance."
            />
            <Reveal className="mt-8 text-lg leading-relaxed text-ink-foreground/70">
              People with disabilities can enhance their quality of life and gain <strong className="font-semibold text-ink-foreground">greater independence</strong>{" "}
              through services. Whether you need <strong className="font-semibold text-ink-foreground">daily assistance</strong> or just a few hours of companionship each
              week, our caregivers are available to help.
            </Reveal>
            <Reveal className="mt-10">
              <Button asChild variant="accent" size="lg">
                <Link href="/contact">
                  Contact Us Today <ArrowUpRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services bento */}
      <section id="services" className="scroll-mt-28 py-24 md:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                Care that <span className="accent-serif text-primary">adapts</span> to you
              </>
            }
            description="From companion care to specialized memory support, we offer services that adapt to your family's unique needs."
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {SERVICES.map((s, i) => (
              <RevealItem key={s.slug} className={cn(i === 0 && "lg:col-span-2")}>
                <ServiceTile service={s} index={i} large={i === 0} />
              </RevealItem>
            ))}
            <RevealItem className="md:col-span-2">
              <GlowCard className="flex h-full flex-col justify-between gap-6 rounded-[2rem] border border-foreground/5 bg-card p-8 shadow-card sm:flex-row sm:items-center">
                <div className="flex items-center gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <TRADITIONAL_CARE.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-xl font-bold text-foreground">{TRADITIONAL_CARE.title}</p>
                    <p className="text-muted-foreground">{TRADITIONAL_CARE.description}</p>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link href={serviceHref(TRADITIONAL_CARE.slug)}>
                    Explore traditional home care <ArrowUpRight />
                  </Link>
                </Button>
              </GlowCard>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* The way we work — horizontal stacking cards */}
      <HorizontalStack
        className="bg-secondary/50"
        header={
          <SectionHeading
            eyebrow="Our process"
            title={
              <>
                The way we <span className="accent-serif text-primary">work</span>
              </>
            }
            description="A clear, caring path from your first call to ongoing support."
          />
        }
        items={PROCESS.map((p, i) => (
          <article
            key={p.step}
            className={cn(
              "flex h-full flex-col justify-between rounded-[2rem] p-8 shadow-elevated md:p-10",
              i % 2 === 0 ? "bg-card text-foreground" : "bg-ink-gradient text-ink-foreground",
            )}
          >
            <div className="flex items-start justify-between">
              <span className={cn("text-7xl font-extrabold tracking-tighter", i % 2 === 0 ? "text-primary/15" : "text-white/15")}>{p.step}</span>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">{p.title}</h3>
              <p className={cn("mt-4 leading-relaxed", i % 2 === 0 ? "text-muted-foreground" : "text-ink-foreground/70")}>{p.description}</p>
            </div>
          </article>
        ))}
      />

      {/* FAQ — sticky sidebar */}
      <section className="py-24 md:py-32">
        <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <SectionHeading
              eyebrow="FAQs"
              title={
                <>
                  Questions, <span className="accent-serif text-primary">answered</span>
                </>
              }
              description="Find answers to commonly asked questions about our home care services."
            />
            <Reveal delay={0.2} className="mt-10">
              <div className="rounded-[2rem] bg-brand-gradient p-7 text-primary-foreground">
                <p className="font-semibold">Still have questions?</p>
                <p className="mt-1 text-sm text-white/75">Our care coordinators are happy to help.</p>
                <a href={SITE.phoneHref} className="mt-5 flex items-center gap-2 text-xl font-bold">
                  <Phone className="h-5 w-5 text-accent" /> {SITE.phone}
                </a>
              </div>
            </Reveal>
          </div>
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.question} delay={i * 0.04}>
                <AccordionItem
                  value={`item-${i}`}
                  className="group overflow-hidden rounded-[1.5rem] border border-foreground/5 bg-card px-6 shadow-card transition-shadow duration-500 data-[state=open]:shadow-elevated md:px-8"
                >
                  <AccordionTrigger className="gap-4 py-6 text-left text-lg font-semibold text-foreground hover:no-underline [&>svg]:hidden">
                    <span className="flex items-center gap-4">
                      <span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                      {f.question}
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-all duration-500 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                      <Plus className="h-4 w-4" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-9 text-base leading-relaxed text-muted-foreground">{f.answer}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection
        eyebrow="Contact us"
        title={
          <>
            Ready to learn more about our <span className="accent-serif text-accent">home care</span> services?
          </>
        }
        primary={{ label: "Get Started Today", href: "/contact" }}
        image={IMAGES.bedsideSupport}
      />
    </>
  );
}
