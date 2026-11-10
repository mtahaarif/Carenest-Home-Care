"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, X } from "@/components/icons";
import { Magnetic } from "@/components/fx/Magnetic";
import { EASE_OUT } from "@/components/fx/Reveal";
import { Button } from "@/components/ui/button";
import { SERVICES, serviceHref } from "@/content/site";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", mega: true },
  { label: "Areas", href: "/area-of-service" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lenis = useLenis();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !megaOpen && !mobileOpen);
  });

  // Close menus on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI state when the route changes
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Lock scrolling behind the mobile menu.
  useEffect(() => {
    if (mobileOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen, lenis]);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const activeHref = NAV.find((n) => isActive(pathname, n.href))?.href;
  const pillTarget = hovered ?? activeHref;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <div className={cn("container transition-[padding] duration-500", scrolled ? "pt-3" : "pt-5")}>
          <nav
            className={cn(
              "relative flex items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-all duration-500",
              scrolled || megaOpen ? "glass" : "border border-transparent bg-white/40 backdrop-blur-md",
            )}
            onMouseLeave={closeMega}
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
              {NAV.map((item) => (
                <li key={item.href} onMouseEnter={() => (item.mega ? openMega() : closeMega())}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => (item.mega ? openMega() : setMegaOpen(false))}
                    aria-expanded={item.mega ? megaOpen : undefined}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                      isActive(pathname, item.href) ? "text-primary" : "text-foreground/75 hover:text-foreground",
                    )}
                  >
                    {pillTarget === item.href && (
                      <motion.span
                        layoutId="nav-pill"
                        className={cn("absolute inset-0 -z-10 rounded-full", isActive(pathname, item.href) ? "bg-primary/10" : "bg-foreground/5")}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                    {item.mega && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", megaOpen && "rotate-180")} />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={SITE.phoneHref}
                aria-label={`Call ${SITE.phone}`}
                className="hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary xl:flex"
              >
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </a>
              <Magnetic className="hidden sm:inline-block" strength={0.25}>
                <Button asChild variant="hero" size="lg" className="h-11 rounded-full px-6">
                  <Link href="/contact">
                    Get Started
                    <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </Button>
              </Magnetic>
              <button
                onClick={() => setMobileOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition-transform hover:scale-105 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Services mega menu */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                  className="absolute left-0 right-0 top-[calc(100%+12px)] hidden overflow-hidden rounded-3xl glass p-3 lg:block"
                >
                  <div className="grid grid-cols-[1fr_1fr_1fr_17rem] gap-2">
                    {SERVICES.map((s, i) => (
                      <motion.div key={s.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.4, ease: EASE_OUT }}>
                        <Link href={serviceHref(s.slug)} className="group flex items-start gap-3 rounded-2xl p-4 transition-colors hover:bg-white/80">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-[-6deg]">
                            <s.icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="flex items-center gap-1 font-semibold text-foreground">
                              {s.title}
                              <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            <span className="mt-0.5 block text-xs text-muted-foreground">{s.short}</span>
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                    <Link href="/services" className="group relative row-span-2 col-start-4 row-start-1 overflow-hidden rounded-2xl">
                      <img src={SERVICES[2].image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground">
                        <span className="eyebrow text-accent">Explore</span>
                        <span className="mt-1 flex items-center gap-1 text-lg font-bold">
                          All services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink-gradient text-ink-foreground lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="container flex items-center justify-between pt-5">
              <Logo tone="dark" onClick={() => setMobileOpen(false)} />
              <button onClick={() => setMobileOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="container flex flex-1 flex-col overflow-y-auto pb-8 pt-10">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <motion.li key={item.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE_OUT }}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn("flex items-baseline gap-4 py-2 text-4xl font-bold tracking-tight", isActive(pathname, item.href) ? "text-accent" : "text-ink-foreground")}
                    >
                      <span className="text-xs font-semibold text-ink-foreground/40">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={serviceHref(s.slug)} onClick={() => setMobileOpen(false)} className="rounded-full glass-dark px-4 py-2 text-sm">
                    {s.title}
                  </Link>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-auto space-y-3 pt-10">
                <a href={SITE.phoneHref} className="flex items-center gap-3 text-lg font-semibold">
                  <Phone className="h-5 w-5 text-accent" /> {SITE.phone}
                </a>
                <a href={SITE.emailHref} className="flex items-center gap-3 text-ink-foreground/80">
                  <Mail className="h-5 w-5 text-accent" /> {SITE.email}
                </a>
                <Button asChild variant="accent" size="xl" className="mt-4 w-full rounded-full">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Get Started <ArrowUpRight />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
