import dynamic from "next/dynamic";
import { HomeHero } from "@/components/home/HomeHero";
import { StatsBand } from "@/components/home/StatsBand";

// Below-the-fold sections are code-split: still server-rendered (full HTML for crawlers),
// but each hydrates from its own chunk instead of one long main-thread task.
const ProblemsStack = dynamic(() => import("@/components/home/ProblemsStack").then((m) => m.ProblemsStack));
const IntroStatement = dynamic(() => import("@/components/home/IntroStatement").then((m) => m.IntroStatement));
const CareShowcase = dynamic(() => import("@/components/home/CareShowcase").then((m) => m.CareShowcase));
const StepsTimeline = dynamic(() => import("@/components/home/StepsTimeline").then((m) => m.StepsTimeline));
const AudienceSwitcher = dynamic(() => import("@/components/home/AudienceSwitcher").then((m) => m.AudienceSwitcher));
const TestimonialsMarquee = dynamic(() => import("@/components/home/TestimonialsMarquee").then((m) => m.TestimonialsMarquee));
const ServiceArea = dynamic(() => import("@/components/sections/ServiceArea").then((m) => m.ServiceArea));
const CTASection = dynamic(() => import("@/components/sections/CTASection").then((m) => m.CTASection));
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Carenest Homecare | In-Home Senior Care in Chicago, IL",
  absoluteTitle: true,
  description:
    "Compassionate in-home care across Cook, Lake & DuPage counties: senior, personal, companion, 24-hour, Alzheimer's and dementia care. Free consultation.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Carenest Homecare", url: SITE_URL }} />
      <HomeHero />
      <StatsBand />
      <ProblemsStack />
      <IntroStatement />
      <CareShowcase />
      <StepsTimeline />
      <AudienceSwitcher />
      <TestimonialsMarquee />
      <ServiceArea />
      <CTASection
        eyebrow="Ready to talk?"
        title={
          <>
            Free consultation. <span className="accent-serif text-accent">No pressure.</span> Just answers.
          </>
        }
        description="Call or email anytime. We will answer your questions, walk you through your options, and make getting started simple."
      />
    </>
  );
}
