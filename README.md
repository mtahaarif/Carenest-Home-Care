# Carenest Homecare — Next.js

Marketing site and admin portal for [Carenest Homecare](https://carenesthc.com), built on the Next.js App Router with a
motion-rich design system: smooth scrolling, scroll-driven sections, glassmorphism and page transitions.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Styling | Tailwind CSS 4, `tw-animate-css`, Radix UI primitives |
| Motion | `motion` (Framer Motion) + `lenis` smooth scroll |
| Fonts | Plus Jakarta Sans + Instrument Serif (italic accents) via `next/font` |
| Backend | Supabase (auth, `patient_inquiries`, `career_applications`, `user_roles`) |
| Map | `d3-geo` with a pre-extracted Illinois counties GeoJSON (`public/data/illinois-counties.json`) |

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

## Routes

| Route | Highlights |
|---|---|
| `/` | Full-bleed photo slideshow banner and service-pill marquee, stat counters, sticky heading + vertically stacking cards, scroll text reveal, expanding image panels for services, scroll-drawn timeline, families/caregivers switcher, dual testimonial marquees, interactive county map |
| `/about` | Sticky-sidebar story, values bento with tilt/glow cards, hover-reveal reasons list |
| `/services` | Hover-reveal service bento, pinned **horizontal stacking cards** process, sticky-sidebar FAQ |
| `/services/[slug]` | 7 statically generated pages: sticky consultation sidebar, glow grid, animated step track, draggable carousel |
| `/area-of-service`, `/careers`, `/careers/caregiver`, `/contact` | County marquee + linked map, sticky hiring-step tracker, perks bento, radio-card contact form |
| `/auth`, `/admin` | Supabase-backed admin portal (outside the marketing layout) |
| `/consultation` | Redirects to `/contact` |
| `/api/notify` | Contact-form hook; emails via Resend when `RESEND_API_KEY` is set, otherwise logs |

Every page opens with a full-bleed photo banner (`sections/PageHero.tsx` + `sections/BannerMedia.tsx`): slow Ken Burns zoom,
scroll parallax, a soft left wash for legible copy, and a cross-fading slideshow with progress controls when given several images.

Marketing pages live in the `src/app/(site)` route group, which shares the header, footer, scroll progress bar
and the page-transition curtain (`(site)/template.tsx`).

## Project layout

```
src/
  app/(site)/          marketing pages (server page.tsx for metadata + client *Content.tsx)
  app/auth, app/admin  admin portal
  components/
    fx/                reusable motion primitives (see below)
    sections/          PageHero, CTASection, ServiceArea
    home/, careers/, services/, admin/, maps/, layout/, ui/
  content/site.ts      all page copy and lists in one place
  lib/                 supabase client, site constants, cn()
```

### Motion primitives (`src/components/fx`)

| Component | What it does |
|---|---|
| `SmoothScroll` | Lenis smooth scroll, reduced-motion aware, resets scroll on navigation |
| `Reveal`, `RevealGroup`, `MaskLines` | In-view fade/blur reveals, staggered groups, masked line-by-line headings |
| `TextReveal` | Scroll-linked word-by-word reveal |
| `StackingCards` | Sticky vertical card stack that scales earlier cards down |
| `HorizontalStack` | Pins a section; cards slide in from the right and fan over each other |
| `GlowCard` | Pointer-tracked glowing border + spotlight, optional 3D tilt |
| `Marquee` | Seamless infinite marquee (pause on hover, reversible) |
| `DragCarousel` | Momentum drag carousel |
| `Magnetic`, `Counter`, `ParallaxImage`, `Aurora`, `ScrollProgress` | Magnetic buttons, count-up stats, parallax images, animated gradient fields, progress bar |

All motion respects `prefers-reduced-motion`: Lenis is disabled, pinned sections fall back to static layouts and CSS
animations are minimised.
