import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { SERVICE_PAGES, SERVICE_SEO, type ServiceSlug } from "@/components/services/service-data";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = SERVICE_PAGES[slug as ServiceSlug];
  if (!data) return {};
  const seo = SERVICE_SEO[slug as ServiceSlug];
  return pageMetadata({ title: seo.title, description: seo.description, path: `/services/${slug}`, image: data.heroImage?.src });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const data = SERVICE_PAGES[slug as ServiceSlug];
  if (!data) notFound();
  const path = `/services/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: data.title, description: SERVICE_SEO[slug as ServiceSlug].description, path }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: data.title, path },
          ]),
        ]}
      />
      <ServicePageTemplate slug={slug} data={data} />
    </>
  );
}
