"use client";

import { Quote, Star } from "@/components/icons";
import { GlowCard } from "@/components/fx/GlowCard";
import { Marquee } from "@/components/fx/Marquee";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { TESTIMONIALS } from "@/content/site";

function TestimonialCard({ quote, name }: { quote: string; name: string }) {
  return (
    <GlowCard className="mx-3 flex h-full w-[22rem] shrink-0 flex-col rounded-[1.75rem] border border-foreground/5 bg-card p-7 shadow-card md:w-[26rem]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
        <Quote className="h-8 w-8 text-primary/15" />
      </div>
      <p className="mt-5 flex-1 leading-relaxed text-foreground/80">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 border-t border-foreground/5 pt-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">{name.charAt(0)}</span>
        <span className="font-semibold text-foreground">{name}</span>
      </div>
    </GlowCard>
  );
}

export function TestimonialsMarquee() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={
            <>
              What people are <span className="accent-serif text-primary">saying</span>
            </>
          }
          description="Real stories from our caregivers and families."
        />
      </div>
      <div className="mt-16 space-y-6">
        <Marquee duration={60} trackClassName="items-stretch py-2">
          {TESTIMONIALS.slice(0, half).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <Marquee duration={55} reverse trackClassName="items-stretch py-2">
          {TESTIMONIALS.slice(half).map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
