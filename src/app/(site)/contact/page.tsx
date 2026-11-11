import { ContactContent } from "./ContactContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_FAQS } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Free Home Care Consultation",
  description: "Ready to learn more about our home care services? Call, email, or send a message to Carenest Homecare for a free, no-pressure consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Carenest Homecare", path: "/" }, { name: "Contact", path: "/contact" }]), faqJsonLd(CONTACT_FAQS)]} />
      <ContactContent />
    </>
  );
}
