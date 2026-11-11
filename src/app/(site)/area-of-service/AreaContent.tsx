"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowUpRight, MapPin } from "@/components/icons";
import { Magnetic } from "@/components/fx/Magnetic";
import { Marquee } from "@/components/fx/Marquee";
import { EASE_OUT } from "@/components/fx/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Button } from "@/components/ui/button";
import { AREA_FAQS, COUNTIES, SERVICES, TRADITIONAL_CARE, serviceHref } from "@/content/site";
import { RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { FaqSection } from "@/components/sections/FaqSection";
import { IMAGES } from "@/lib/site";

export function AreaContent() {
  return (
    <>
      <PageHero
        eyebrow="Service coverage"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Areas of Service" }]}
        title={[
          "Where",
          <>
            <span className="accent-serif text-gradient pr-2">we serve</span>
          </>,
        ]}
        description={
          <>
            Carenest Homecare proudly provides compassionate, professional in-home care services throughout{" "}
            <strong className="font-semibold text-foreground">Cook, Lake, and DuPage counties</strong>. Our dedicated caregivers are ready to support you and your loved ones right at home.
          </>
        }
        image={IMAGES.ctaBanner}
        imagePosition="object-[center_22%]"
        actions={
          <Magnetic>
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">
                Check your area <ArrowUpRight />
              </Link>
            </Button>
          </Magnetic>
        }
      >
        <m.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1 } } }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {COUNTIES.map((c) => (
            <m.span
              key={c.name}
              variants={{ hidden: { opacity: 0, scale: 0.8, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { ease: EASE_OUT, duration: 0.6 } } }}
              className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-foreground"
            >
              <MapPin className="h-4 w-4 text-accent" /> {c.name}
            </m.span>
          ))}
        </m.div>
      </PageHero>

      <div className="border-y border-foreground/5 bg-ink py-6 text-ink-foreground">
        <Marquee duration={30} trackClassName="gap-12 pr-12">
          {[...COUNTIES, ...COUNTIES].map((c, i) => (
            <span key={i} className="flex items-center gap-12 text-3xl font-bold tracking-tight md:text-5xl">
              {c.name}
              <span className="accent-serif text-accent">&amp;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <ServiceArea />

      {/* Services available across the service area */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Care near you"
            title={
              <>
                Home care services across <span className="accent-serif text-primary">Chicagoland</span>
              </>
            }
            description="Families in Cook, Lake, and DuPage counties can choose the support that fits — on its own or combined into one personalized care plan."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {[...SERVICES, TRADITIONAL_CARE].map((s) => (
              <RevealItem key={s.slug}>
                <Link
                  href={serviceHref(s.slug)}
                  className="group flex h-full items-start gap-4 rounded-[1.5rem] border border-foreground/5 bg-card p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5 text-lg font-bold text-foreground">
                      {s.title} in Chicagoland
                      <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{s.description}</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FaqSection
        eyebrow="Service area FAQs"
        title={
          <>
            Questions about <span className="accent-serif text-primary">coverage</span>
          </>
        }
        items={AREA_FAQS}
      />

      <CTASection
        eyebrow="Outside these counties?"
        title={
          <>
            Not sure if we <span className="accent-serif text-accent">serve your area?</span>
          </>
        }
        description="Contact us today to discuss your care needs. We may be able to accommodate additional areas not listed above."
        primary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
