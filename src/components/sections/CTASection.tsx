"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Phone } from "@/components/icons";
import { Aurora } from "@/components/fx/Aurora";
import { Magnetic } from "@/components/fx/Magnetic";
import { ParallaxImage } from "@/components/fx/Parallax";
import { Reveal } from "@/components/fx/Reveal";
import { Button } from "@/components/ui/button";
import { IMAGES, SITE } from "@/lib/site";

interface CTASectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  primary?: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string } | null;
  image?: string;
}

/** Gradient call-to-action band with parallax imagery and glass chips. */
export function CTASection({
  eyebrow = "Free consultation",
  title,
  description = "Free consultation. No pressure. Just answers.",
  primary = { label: "Contact Us Today", href: "/contact" },
  secondary,
  image = IMAGES.ctaBanner,
}: CTASectionProps) {
  const second = secondary === undefined ? { label: `Call ${SITE.phone}`, href: SITE.phoneHref } : secondary;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <Reveal blur={false} distance={40}>
          <div className="relative isolate grid overflow-hidden rounded-[2.5rem] bg-ink-gradient text-ink-foreground grain lg:grid-cols-[1.25fr_1fr]">
            <Aurora variant="dark" />
            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <span className="eyebrow text-accent">
                <span className="h-px w-8 bg-accent/70" />
                {eyebrow}
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">{title}</h2>
              {description && <p className="mt-5 max-w-lg text-lg text-ink-foreground/70">{description}</p>}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button asChild variant="accent" size="xl">
                    {primary.external ? (
                      <a href={primary.href} target="_blank" rel="noopener noreferrer">
                        {primary.label} <ArrowUpRight />
                      </a>
                    ) : (
                      <Link href={primary.href}>
                        {primary.label} <ArrowUpRight />
                      </Link>
                    )}
                  </Button>
                </Magnetic>
                {second && (
                  <Button asChild variant="glass" size="xl">
                    {second.href.startsWith("tel:") ? (
                      <a href={second.href}>
                        <Phone /> {second.label}
                      </a>
                    ) : second.href.startsWith("http") ? (
                      <a href={second.href} target="_blank" rel="noopener noreferrer">
                        {second.label} <ArrowUpRight />
                      </a>
                    ) : (
                      <Link href={second.href}>{second.label}</Link>
                    )}
                  </Button>
                )}
              </div>
            </div>
            <div className="relative min-h-72 lg:min-h-full">
              <ParallaxImage src={image} alt="" className="absolute inset-0 lg:[mask-image:linear-gradient(to_right,transparent,black_35%)]" imgClassName="object-[center_20%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:hidden" />
              <div className="absolute bottom-6 right-6 hidden animate-float rounded-2xl glass-dark px-5 py-4 sm:block">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-foreground/60">Licensed</p>
                <p className="font-semibold">Bonded &amp; insured</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
