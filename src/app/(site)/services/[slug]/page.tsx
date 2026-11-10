import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { SERVICE_PAGES, type ServiceSlug } from "@/components/services/service-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SERVICE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const data = SERVICE_PAGES[slug as ServiceSlug];
  if (!data) return {};
  return { title: data.title, description: data.description, openGraph: { images: [data.heroImage ?? "/og-image.png"] } };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const data = SERVICE_PAGES[slug as ServiceSlug];
  if (!data) notFound();

  return <ServicePageTemplate slug={slug} data={data} />;
}
