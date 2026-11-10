"use client";

import { Reveal } from "@/components/fx/Reveal";
import { ParallaxImage } from "@/components/fx/Parallax";
import { TextReveal } from "@/components/fx/TextReveal";
import { IMAGES } from "@/lib/site";

export function IntroStatement() {
  return (
    <section className="relative overflow-hidden bg-secondary/60 py-24 md:py-36">
      <div className="absolute inset-0 bg-dots opacity-60" aria-hidden />
      <div className="container relative grid items-center gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal direction="right" className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rotate-[-4deg] rounded-[2.5rem] bg-primary/15" />
          <ParallaxImage src={IMAGES.elderlyTablet} alt="Elderly woman and daughter browsing tablet together" className="relative aspect-[3/4] rounded-[2.5rem] shadow-elevated" />
          <div className="absolute -bottom-8 -right-6 flex items-center gap-3 rounded-3xl glass p-3 pr-5">
            <img src={IMAGES.logo} alt="Carenest" className="h-16 w-16 rounded-2xl bg-white object-contain p-1" />
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">We are</span>
              <span className="block text-lg font-extrabold text-foreground">Carenest</span>
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow text-primary">
              <span className="h-px w-8 bg-primary/60" />
              Home care, your way
            </span>
          </Reveal>
          <TextReveal
            className="mt-6 text-3xl font-bold leading-[1.2] tracking-tight text-foreground md:text-[2.75rem]"
            highlight={["different", "licensing", "payroll", "insurance", "training", "matters"]}
            text="We are a different kind of home care agency. Whether you have someone in mind or need us to find the right caregiver, we handle licensing, payroll, insurance, and training so you can focus on what matters most."
          />
        </div>
      </div>
    </section>
  );
}
