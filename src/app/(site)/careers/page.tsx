import { CareersContent } from "./CareersContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { CAREER_FAQS } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Caregiver Jobs in Chicagoland",
  description: "Make a real difference in people's lives. Join Carenest's team of compassionate caregivers with flexible schedules, training and competitive pay.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]), faqJsonLd(CAREER_FAQS)]} />
      <CareersContent />
    </>
  );
}
