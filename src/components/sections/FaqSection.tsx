import type { ReactNode } from "react";
import { Phone } from "@/components/icons";
import { Reveal } from "@/components/fx/Reveal";
import { SectionHeading } from "@/components/fx/SectionHeading";
import { SITE } from "@/lib/site";
import { FaqList, type FaqItem } from "./FaqList";

/** Sticky-sidebar FAQ block used on supporting pages. */
export function FaqSection({ eyebrow = "FAQs", title, description, items }: { eyebrow?: string; title: ReactNode; description?: ReactNode; items: FaqItem[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
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
        <FaqList items={items} />
      </div>
    </section>
  );
}
