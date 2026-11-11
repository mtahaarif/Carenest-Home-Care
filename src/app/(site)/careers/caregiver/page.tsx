import { CaregiverContent } from "./CaregiverContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Caregiver Job — Full & Part-Time",
  description: "Apply for a caregiver position with Carenest Homecare. Full-time and part-time roles helping seniors and individuals in need across Chicagoland.",
  path: "/careers/caregiver",
});

export default function CaregiverPositionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Carenest Homecare", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: "Caregiver", path: "/careers/caregiver" },
        ])}
      />
      <CaregiverContent />
    </>
  );
}
