import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { SITE, SITE_URL } from "./site";

interface PageMetaInput {
  /** Page title; the root layout appends " | Carenest Homecare". */
  title: string;
  /** Keep under ~155 characters so search snippets aren't truncated. */
  description: string;
  /** Route path, e.g. "/about". Used for the canonical URL and og:url. */
  path: string;
  /** Social preview image (defaults to the site OG image). */
  image?: StaticImageData;
  /** Use the title verbatim instead of the layout template. */
  absoluteTitle?: boolean;
}

/** Complete per-page metadata: canonical, Open Graph (incl. og:url) and Twitter card. */
export function pageMetadata({ title, description, path, image, absoluteTitle = false }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  const images = image
    ? [{ url: image.src, width: image.width, height: image.height, alt: fullTitle }]
    : [{ url: "/og-image.png", width: 1200, height: 630, alt: "Carenest Home Care — Compassionate In-Home Care Services" }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@CarenestHomecare",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Organization / local business structured data (rendered once in the root layout). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    description: "Compassionate, non-medical in-home care for seniors and families across Cook, Lake, and DuPage counties in Illinois.",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-full.png`,
    image: `${SITE_URL}/og-image.png`,
    telephone: SITE.phoneE164,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: "US",
    },
    areaServed: ["Cook County, IL", "Lake County, IL", "DuPage County, IL"].map((name) => ({ "@type": "AdministrativeArea", name })),
    sameAs: [SITE.instagram.split("?")[0]],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: ["Cook County, IL", "Lake County, IL", "DuPage County, IL"],
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}
