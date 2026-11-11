import { SERVICE_PAGES, SERVICE_SEO, type ServiceSlug } from "@/components/services/service-data";
import { SITE, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt — a concise map of the site for AI answer engines (https://llmstxt.org). */
export function GET() {
  const link = (title: string, path: string, summary: string) => `- [${title}](${SITE_URL}${path}): ${summary}`;

  const body = [
    `# ${SITE.name}`,
    "",
    "> Compassionate, non-medical in-home care for seniors and families across Cook, Lake, and DuPage counties in Illinois. Services include senior care, personal care, companion care, 24-hour care, Alzheimer's care, and dementia care, with a free consultation and personalized caregiver matching.",
    "",
    `Contact: ${SITE.phone} · ${SITE.email} · ${SITE.address}`,
    "",
    "## Core pages",
    link("Home", "/", "Overview of Carenest Homecare, how care works, and the communities we serve."),
    link("Home care services", "/services", "All services, how we work, and frequently asked questions about home care."),
    link("About Carenest", "/about", "Our story, values, and why families choose a flexible, locally owned agency."),
    link("Areas of service", "/area-of-service", "Coverage across Cook, Lake, and DuPage counties in Illinois."),
    link("Contact", "/contact", "Request a free consultation by phone, email, or online form."),
    "",
    "## Care services",
    ...(Object.keys(SERVICE_PAGES) as ServiceSlug[]).map((slug) => link(SERVICE_PAGES[slug].title, `/services/${slug}`, SERVICE_SEO[slug].description)),
    "",
    "## Careers",
    link("Careers", "/careers", "Caregiver jobs, hiring process, benefits, and requirements."),
    link("Caregiver position", "/careers/caregiver", "Full-time and part-time caregiver role: responsibilities, qualifications, and how to apply."),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
