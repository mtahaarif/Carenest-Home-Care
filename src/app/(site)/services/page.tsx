import { ServicesContent } from "./ServicesContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Home Care Services in Chicagoland",
  description: "Senior, personal, companion, 24-hour, Alzheimer's and dementia care — compassionate in-home support across Cook, Lake, and DuPage counties.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Carenest Homecare", path: "/" }, { name: "Services", path: "/services" }]), faqJsonLd(FAQS)]} />
      <ServicesContent />
    </>
  );
}
