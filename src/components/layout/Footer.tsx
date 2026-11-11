"use client";

import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight, Instagram, Mail, MapPin, Phone } from "@/components/icons";
import { Marquee } from "@/components/fx/Marquee";
import { Magnetic } from "@/components/fx/Magnetic";
import { SERVICES, TRADITIONAL_CARE, serviceHref } from "@/content/site";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { label: "About Carenest", href: "/about" },
  { label: "All home care services", href: "/services" },
  { label: "Cook, Lake & DuPage coverage", href: "/area-of-service" },
  { label: "Careers at Carenest", href: "/careers" },
  { label: "Caregiver job opening", href: "/careers/caregiver" },
  { label: "Contact our team", href: "/contact" },
];

export function Footer() {
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink-gradient text-ink-foreground">
      <div className="absolute inset-0 bg-dots-light opacity-60" aria-hidden />

      {/* Service marquee */}
      <div className="relative border-b border-white/10 py-8 md:py-10">
        <Marquee duration={45} trackClassName="gap-10 pr-10">
          {SERVICES.map((s) => (
            <span key={s.slug} className="flex items-center gap-10">
              <span className="text-4xl font-bold tracking-tight text-ink-foreground/90 md:text-6xl">{s.title}</span>
              <span aria-hidden className="shape-sparkle h-7 w-7 shrink-0 text-accent md:h-9 md:w-9" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="dark" alt="Back to the Carenest Home Care homepage" imgClassName="h-28" />
          <p className="mt-6 max-w-sm leading-relaxed text-ink-foreground/65">
            Home care, your way. Personalized care solutions tailored to your family&apos;s needs across Cook, Lake, and DuPage counties.
          </p>
          <div className="mt-8 rounded-3xl glass-dark p-6">
            <p className="text-sm font-semibold text-accent">Talk to a care coordinator</p>
            <a href={SITE.phoneHref} className="mt-2 block text-2xl font-bold tracking-tight transition-colors hover:text-accent">
              {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="mt-1 block text-sm text-ink-foreground/70 transition-colors hover:text-ink-foreground">
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow text-ink-foreground/50">Explore</h3>
          <ul className="mt-6 space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-1 text-ink-foreground/80 transition-colors hover:text-ink-foreground">
                  <span className="relative">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-ink-foreground/50">Care Services</h3>
          <ul className="mt-6 space-y-3">
            {[...SERVICES, TRADITIONAL_CARE].map((s) => (
              <li key={s.slug}>
                <Link href={serviceHref(s.slug)} className="group inline-flex items-center gap-1.5 text-ink-foreground/80 transition-colors hover:text-ink-foreground">
                  {s.title}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="eyebrow text-ink-foreground/50">Visit</h3>
          <ul className="mt-6 space-y-4 text-ink-foreground/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              {SITE.address}
            </li>
            <li>
              <a href={SITE.phoneHref} className="flex gap-3 transition-colors hover:text-ink-foreground">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="flex gap-3 transition-colors hover:text-ink-foreground">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                {SITE.email}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex items-center gap-3">
            <Magnetic strength={0.4}>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-12 w-12 place-items-center rounded-full glass-dark transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <button onClick={toTop} aria-label="Back to top" className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-110">
                <ArrowUp className="h-5 w-5" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div className="relative overflow-hidden" aria-hidden>
        <m.p
          style={{ y: wordY }}
          className="select-none text-center text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-transparent [-webkit-text-stroke:1px_hsl(0_0%_100%/0.14)]"
        >
          Carenest
        </m.p>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-foreground/55 md:flex-row">
          <p>© {new Date().getFullYear()} Carenest Homecare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
