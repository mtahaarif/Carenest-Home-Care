import type { StaticImageData } from "next/image";
import bedsideSupport from "../../public/assets/care-bedside-support.jpg";
import consultation from "../../public/assets/care-consultation.jpg";
import familyTogether from "../../public/assets/care-family-together.jpg";
import mealService from "../../public/assets/care-meal-service.jpg";
import mobilitySupport from "../../public/assets/care-mobility-support.jpg";
import personalCare from "../../public/assets/care-personal-care.jpg";
import ctaBanner from "../../public/assets/cta-banner.jpg";
import elderlyTablet from "../../public/assets/elderly-tablet.jpg";
import familyJoy from "../../public/assets/family-joy.jpg";
import granddaughterGrandma from "../../public/assets/granddaughter-grandma.jpg";
import logo from "../../public/assets/logo-full.png";
import patientCare from "../../public/assets/patient-care.jpg";
import teaConversation from "../../public/assets/tea-conversation.jpg";

/** A statically imported image (known dimensions + blur placeholder) with its descriptive alt text. */
export interface SiteImage {
  src: StaticImageData;
  alt: string;
}

export const IMAGES = {
  logo: { src: logo, alt: "Carenest Home Care logo" },
  granddaughterGrandma: { src: granddaughterGrandma, alt: "Granddaughter sharing tea with her grandmother on the sofa" },
  personalCare: { src: personalCare, alt: "Caregiver gently comforting a senior woman in a blue sweater" },
  elderlyTablet: { src: elderlyTablet, alt: "Senior woman and her daughter looking at a tablet together" },
  familyJoy: { src: familyJoy, alt: "Two women laughing together over cups of tea" },
  ctaBanner: { src: ctaBanner, alt: "Caregiver sitting beside a senior woman who uses a walking cane" },
  patientCare: { src: patientCare, alt: "Caregiver handing medication to a senior man by the window" },
  teaConversation: { src: teaConversation, alt: "Grandmother and granddaughter talking over tea at the table" },
  mealService: { src: mealService, alt: "Caregiver checking in on a smiling senior man at home" },
  familyTogether: { src: familyTogether, alt: "Young woman holding hands with smiling seniors in a bright living room" },
  bedsideSupport: { src: bedsideSupport, alt: "Caregiver keeping a senior woman company as she rests in bed" },
  mobilitySupport: { src: mobilitySupport, alt: "Caregiver supporting a smiling senior woman with a walking cane" },
  consultation: { src: consultation, alt: "Caregiver taking notes during a home visit with a senior woman" },
} satisfies Record<string, SiteImage>;
