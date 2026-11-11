import type { MetadataRoute } from "next";
import { SERVICE_PAGES } from "@/components/services/service-data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9, "weekly"),
    ...Object.keys(SERVICE_PAGES).map((slug) => page(`/services/${slug}`, 0.8)),
    page("/about", 0.7),
    page("/area-of-service", 0.7),
    page("/contact", 0.8),
    page("/careers", 0.6),
    page("/careers/caregiver", 0.6),
  ];
}
