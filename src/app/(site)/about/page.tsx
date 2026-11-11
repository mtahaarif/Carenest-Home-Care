import { AboutContent } from "./AboutContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Our Chicago Home Care Agency",
  description:
    "Carenest Homecare is a locally owned Chicago home care agency. We match families with trusted caregivers and handle training, payroll and insurance.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Carenest Homecare", path: "/" }, { name: "About", path: "/about" }])} />
      <AboutContent />
    </>
  );
}
