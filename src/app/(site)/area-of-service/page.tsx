import { AreaContent } from "./AreaContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { AREA_FAQS } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Home Care in Cook, Lake & DuPage Counties",
  description: "Compassionate, professional in-home care throughout Cook, Lake, and DuPage counties in Illinois — including Chicago and its suburbs.",
  path: "/area-of-service",
});

export default function AreaOfServicePage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Areas of Service", path: "/area-of-service" }]), faqJsonLd(AREA_FAQS)]} />
      <AreaContent />
    </>
  );
}
