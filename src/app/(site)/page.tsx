import { AudienceSwitcher } from "@/components/home/AudienceSwitcher";
import { CareShowcase } from "@/components/home/CareShowcase";
import { HomeHero } from "@/components/home/HomeHero";
import { IntroStatement } from "@/components/home/IntroStatement";
import { ProblemsStack } from "@/components/home/ProblemsStack";
import { StatsBand } from "@/components/home/StatsBand";
import { StepsTimeline } from "@/components/home/StepsTimeline";
import { TestimonialsMarquee } from "@/components/home/TestimonialsMarquee";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceArea } from "@/components/sections/ServiceArea";

export default function HomePage() {
  return (
    <>
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
