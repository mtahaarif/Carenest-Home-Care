/**
 * Canonical origin used for metadata, canonical links, sitemap and llms.txt.
 * Priority: NEXT_PUBLIC_SITE_URL → Vercel production domain → carenesthc.com.
 */
const productionHost = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? (productionHost ? `https://${productionHost}` : "https://carenesthc.com")).replace(/\/$/, "");

export const SITE = {
  name: "Carenest Homecare",
  url: SITE_URL,
  phone: "(224) 524-9111",
  phoneHref: "tel:+12245249111",
  phoneE164: "+12245249111",
  email: "info@carenesthc.com",
  emailHref: "mailto:info@carenesthc.com",
  address: "4001 W Devon Ave STE 300, Chicago, IL 60646",
  streetAddress: "4001 W Devon Ave STE 300",
  locality: "Chicago",
  region: "IL",
  postalCode: "60646",
  instagram: "https://www.instagram.com/carenesthomecare?igsh=dHQyYWs5b2s3ODdo&utm_source=qr",
  applyUrl: "https://carenesthc.caresmartz360.com/v2/caregiver-applicant-form",
} as const;

export { IMAGES, type SiteImage } from "./images";
