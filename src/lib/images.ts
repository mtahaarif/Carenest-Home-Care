import { IMAGE_ASSETS, type ImageAsset } from "./image-manifest";

export type { ImageAsset };

/** A pre-optimised image (see scripts/optimize-images.mjs) with its descriptive alt text. */
export interface SiteImage {
  src: ImageAsset;
  alt: string;
}

export const IMAGES = {
  logo: { src: IMAGE_ASSETS["logo-full"], alt: "Carenest Home Care logo" },
  granddaughterGrandma: { src: IMAGE_ASSETS["granddaughter-grandma"], alt: "Granddaughter sharing tea with her grandmother on the sofa" },
  personalCare: { src: IMAGE_ASSETS["care-personal-care"], alt: "Caregiver gently comforting a senior woman in a blue sweater" },
  elderlyTablet: { src: IMAGE_ASSETS["elderly-tablet"], alt: "Senior woman and her daughter looking at a tablet together" },
  familyJoy: { src: IMAGE_ASSETS["family-joy"], alt: "Two women laughing together over cups of tea" },
  ctaBanner: { src: IMAGE_ASSETS["cta-banner"], alt: "Caregiver sitting beside a senior woman who uses a walking cane" },
  patientCare: { src: IMAGE_ASSETS["patient-care"], alt: "Caregiver handing medication to a senior man by the window" },
  teaConversation: { src: IMAGE_ASSETS["tea-conversation"], alt: "Grandmother and granddaughter talking over tea at the table" },
  mealService: { src: IMAGE_ASSETS["care-meal-service"], alt: "Caregiver checking in on a smiling senior man at home" },
  familyTogether: { src: IMAGE_ASSETS["care-family-together"], alt: "Young woman holding hands with smiling seniors in a bright living room" },
  bedsideSupport: { src: IMAGE_ASSETS["care-bedside-support"], alt: "Caregiver keeping a senior woman company as she rests in bed" },
  mobilitySupport: { src: IMAGE_ASSETS["care-mobility-support"], alt: "Caregiver supporting a smiling senior woman with a walking cane" },
  consultation: { src: IMAGE_ASSETS["care-consultation"], alt: "Caregiver taking notes during a home visit with a senior woman" },
} satisfies Record<string, SiteImage>;
