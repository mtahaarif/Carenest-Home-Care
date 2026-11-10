import { IMAGES } from "@/lib/site";

export interface ServicePageData {
  title: string;
  accentWord: string;
  subtitle: string;
  /** Long-form summary (kept from the original content model; not rendered by the template). */
  description: string;
  heroImage?: string;
  whatIsIt: { title: string; content: string };
  whoNeedsIt: { title: string; points: string[] };
  supportServices: { title: string; desc: string }[];
  howItWorks: { title: string; desc: string }[];
}

export const SERVICE_PAGES = {
  "traditional-home-care": {
    title: "Traditional Home Care",
    accentWord: "Traditional",
    subtitle: "Compassionate support in the comfort of home",
    description:
      "Our traditional home care services help seniors and individuals maintain their independence while receiving the assistance they need with daily activities. We provide personalized care that adapts to your unique situation.",
    heroImage: IMAGES.mealService,
    whatIsIt: {
      title: "What is Traditional Home Care?",
      content:
        "Traditional home care provides non-medical assistance to individuals who need help with daily activities but wish to remain in the comfort of their own home. Our trained caregivers offer personalized support with tasks like bathing, dressing, meal preparation, and companionship, allowing your loved ones to maintain their dignity and independence.",
    },
    whoNeedsIt: {
      title: "Who Needs Traditional Home Care Services?",
      points: [
        "Seniors who need assistance with daily activities",
        "Individuals recovering from surgery or illness",
        "Those who want to age in place safely",
        "Families seeking respite from caregiving duties",
        "Anyone needing companionship and social interaction",
      ],
    },
    supportServices: [
      { title: "Personal Care", desc: "Bathing, grooming, and dressing assistance" },
      { title: "Meal Preparation", desc: "Nutritious meals prepared fresh daily" },
      { title: "Light Housekeeping", desc: "Keeping homes clean and comfortable" },
      { title: "Medication Reminders", desc: "Timely medication management" },
      { title: "Companionship", desc: "Social interaction and emotional support" },
      { title: "Transportation", desc: "Safe transport to appointments and errands" },
    ],
    howItWorks: [
      { title: "Free Consultation", desc: "We discuss your needs and answer all your questions." },
      { title: "Care Plan Development", desc: "We create a personalized care plan tailored to you." },
      { title: "Caregiver Matching", desc: "You choose a caregiver that feels right for your family." },
      { title: "Begin Care", desc: "Start receiving compassionate, professional support at home." },
    ],
  },

  "24-hour-care": {
    title: "24-Hour Care",
    accentWord: "24-Hour",
    subtitle: "Around-the-clock support when you need it most",
    description:
      "Our 24-hour care services provide continuous, comprehensive support for individuals who require constant supervision and assistance. We ensure your loved one is never alone and always has the help they need.",
    heroImage: IMAGES.bedsideSupport,
    whatIsIt: {
      title: "What is 24-Hour Care?",
      content:
        "24-hour care provides continuous around-the-clock support through a team of caregivers who work in shifts. This ensures your loved one always has someone available to assist with their needs, day or night. Whether it is help with mobility, personal care, or simply having someone nearby for safety, our caregivers provide peace of mind for families.",
    },
    whoNeedsIt: {
      title: "Who Needs 24-Hour Care Services?",
      points: [
        "Individuals with advanced dementia or Alzheimer's",
        "Those at high risk for falls or wandering",
        "People recovering from major surgery or illness",
        "Seniors who cannot be left alone safely",
        "Those requiring constant medical monitoring",
      ],
    },
    supportServices: [
      { title: "Round-the-Clock Monitoring", desc: "Continuous supervision and assistance" },
      { title: "Overnight Care", desc: "Support during nighttime hours" },
      { title: "Safety Supervision", desc: "Fall prevention and emergency response" },
      { title: "Personal Care", desc: "Bathing, grooming, and hygiene assistance" },
      { title: "Meal Services", desc: "Preparation and feeding assistance" },
      { title: "Medication Management", desc: "Reminders and administration support" },
    ],
    howItWorks: [
      { title: "Assessment", desc: "We evaluate care needs and create a 24-hour care plan." },
      { title: "Team Assignment", desc: "We assign a dedicated team of caregivers." },
      { title: "Schedule Setup", desc: "We establish shift schedules for continuous coverage." },
      { title: "Ongoing Support", desc: "Regular check-ins ensure quality and consistency." },
    ],
  },

  "alzheimer-care": {
    title: "Alzheimer's Care",
    accentWord: "Alzheimer's",
    subtitle: "Specialized support for memory care needs",
    description:
      "Our Alzheimer's care services are designed specifically for individuals living with Alzheimer's disease. Our specially trained caregivers understand the unique challenges and provide compassionate, patient-centered care.",
    heroImage: IMAGES.mobilitySupport,
    whatIsIt: {
      title: "What is Alzheimer's Care?",
      content:
        "Alzheimer's care is specialized support designed for individuals diagnosed with Alzheimer's disease. Our caregivers are trained to understand the progression of the disease and provide appropriate care at each stage. We focus on maintaining quality of life, ensuring safety, and providing emotional support for both the individual and their family.",
    },
    whoNeedsIt: {
      title: "Who Needs Alzheimer's Care Services?",
      points: [
        "Individuals diagnosed with Alzheimer's disease",
        "Those experiencing memory loss and confusion",
        "People who need help with daily routines",
        "Families seeking specialized dementia support",
        "Those at risk of wandering or getting lost",
      ],
    },
    supportServices: [
      { title: "Memory Support", desc: "Activities to stimulate cognitive function" },
      { title: "Safety Monitoring", desc: "Preventing wandering and ensuring security" },
      { title: "Routine Maintenance", desc: "Consistent schedules for comfort" },
      { title: "Personal Care", desc: "Gentle assistance with daily hygiene" },
      { title: "Emotional Support", desc: "Patience and understanding during confusion" },
      { title: "Family Communication", desc: "Regular updates on your loved one" },
    ],
    howItWorks: [
      { title: "Specialized Assessment", desc: "We evaluate cognitive needs and behaviors." },
      { title: "Custom Care Plan", desc: "We develop strategies specific to Alzheimer's." },
      { title: "Trained Caregiver Match", desc: "We match you with dementia-trained caregivers." },
      { title: "Adaptive Care", desc: "We adjust care as the condition progresses." },
    ],
  },

  "dementia-care": {
    title: "Dementia Care",
    accentWord: "Dementia",
    subtitle: "Compassionate care for cognitive challenges",
    description:
      "Our dementia care services support individuals with various forms of dementia, including vascular dementia, Lewy body dementia, and frontotemporal dementia. We provide specialized care that addresses the unique needs of each type.",
    heroImage: IMAGES.consultation,
    whatIsIt: {
      title: "What is Dementia Care?",
      content:
        "Dementia care encompasses specialized support for individuals experiencing cognitive decline from various causes beyond Alzheimer's. Our caregivers are trained to recognize and respond to the different symptoms and behaviors associated with various forms of dementia, providing appropriate care that maintains dignity and quality of life.",
    },
    whoNeedsIt: {
      title: "Who Needs Dementia Care Services?",
      points: [
        "Individuals with vascular dementia",
        "Those diagnosed with Lewy body dementia",
        "People with frontotemporal dementia",
        "Anyone experiencing cognitive decline",
        "Families needing specialized memory care support",
      ],
    },
    supportServices: [
      { title: "Behavioral Support", desc: "Managing challenging behaviors with compassion" },
      { title: "Cognitive Activities", desc: "Engaging activities to maintain mental function" },
      { title: "Safe Environment", desc: "Home modifications for safety" },
      { title: "Nutrition Support", desc: "Meal planning for brain health" },
      { title: "Social Engagement", desc: "Reducing isolation and depression" },
      { title: "Family Education", desc: "Resources and support for families" },
    ],
    howItWorks: [
      { title: "Comprehensive Evaluation", desc: "We assess dementia type and stage." },
      { title: "Personalized Approach", desc: "We create a care plan for specific needs." },
      { title: "Specialized Training", desc: "Caregivers receive dementia-specific training." },
      { title: "Continuous Adaptation", desc: "Care evolves with changing needs." },
    ],
  },

  "senior-care": {
    title: "Senior Care",
    accentWord: "Senior",
    subtitle: "Dignified care for your loved ones",
    description:
      "Our senior care services provide comprehensive support that helps older adults maintain their independence, dignity, and quality of life while aging safely in their own homes.",
    heroImage: IMAGES.mealService,
    whatIsIt: {
      title: "What is Senior Care?",
      content:
        "Senior care encompasses a wide range of services designed to support older adults in their daily lives. From assistance with personal care tasks to companionship and health monitoring, our caregivers help seniors maintain their independence while ensuring their safety and well-being in the comfort of their own home.",
    },
    whoNeedsIt: {
      title: "Who Needs Senior Care Services?",
      points: [
        "Seniors who want to age in place safely",
        "Those needing help with daily activities",
        "Individuals recovering from hospitalization",
        "Seniors experiencing mobility challenges",
        "Those who benefit from regular companionship",
      ],
    },
    supportServices: [
      { title: "Daily Living Assistance", desc: "Help with everyday tasks and routines" },
      { title: "Medication Management", desc: "Ensuring medications are taken on time" },
      { title: "Mobility Support", desc: "Safe assistance with walking and transfers" },
      { title: "Meal Preparation", desc: "Nutritious meals tailored to dietary needs" },
      { title: "Companionship", desc: "Meaningful conversation and social engagement" },
      { title: "Light Housekeeping", desc: "Maintaining a clean, safe living environment" },
    ],
    howItWorks: [
      { title: "Initial Assessment", desc: "We evaluate your loved one's needs and preferences." },
      { title: "Custom Care Plan", desc: "We design a personalized care approach." },
      { title: "Caregiver Selection", desc: "You choose from our qualified, compassionate caregivers." },
      { title: "Ongoing Support", desc: "Regular check-ins ensure quality care continues." },
    ],
  },

  "personal-care": {
    title: "Personal Care",
    accentWord: "Personal",
    subtitle: "Compassionate assistance with daily needs",
    description:
      "Our personal care services provide dignified assistance with daily hygiene and grooming tasks, helping individuals maintain their self-esteem and quality of life while receiving the support they need.",
    heroImage: IMAGES.personalCare,
    whatIsIt: {
      title: "What is Personal Care?",
      content:
        "Personal care services provide hands-on assistance with activities of daily living such as bathing, dressing, grooming, and toileting. Our trained caregivers deliver these intimate services with the utmost respect for dignity and privacy, ensuring clients feel comfortable and cared for.",
    },
    whoNeedsIt: {
      title: "Who Needs Personal Care Services?",
      points: [
        "Individuals with limited mobility or physical challenges",
        "Seniors who need help with daily hygiene routines",
        "Those recovering from surgery or illness",
        "People with chronic conditions affecting self-care",
        "Anyone who wants to maintain personal hygiene safely",
      ],
    },
    supportServices: [
      { title: "Bathing Assistance", desc: "Safe, dignified help with bathing and showering" },
      { title: "Grooming Support", desc: "Hair care, shaving, and oral hygiene help" },
      { title: "Dressing Assistance", desc: "Help selecting and putting on clothing" },
      { title: "Toileting Care", desc: "Respectful assistance with bathroom needs" },
      { title: "Mobility Assistance", desc: "Safe transfers and walking support" },
      { title: "Incontinence Care", desc: "Discreet, compassionate incontinence management" },
    ],
    howItWorks: [
      { title: "Care Assessment", desc: "We discuss specific personal care needs." },
      { title: "Dignity-First Plan", desc: "We create a care plan that respects privacy." },
      { title: "Trained Caregivers", desc: "Matched with experienced personal care aides." },
      { title: "Quality Assurance", desc: "Regular feedback ensures comfort and satisfaction." },
    ],
  },

  "companion-care": {
    title: "Companion Care",
    accentWord: "Companion",
    subtitle: "Meaningful connections that enrich life",
    description:
      "Our companion care services combat loneliness and isolation by providing warm, friendly companionship. Our caregivers become trusted friends who bring joy, conversation, and engagement to daily life.",
    heroImage: IMAGES.familyTogether,
    whatIsIt: {
      title: "What is Companion Care?",
      content:
        "Companion care focuses on the social and emotional well-being of individuals who may be isolated or lonely. Our companions provide friendship, conversation, and engagement in activities that bring joy and meaning to daily life, helping to maintain mental sharpness and emotional health.",
    },
    whoNeedsIt: {
      title: "Who Needs Companion Care Services?",
      points: [
        "Seniors living alone who feel isolated",
        "Individuals who have lost a spouse or partner",
        "Those whose family lives far away",
        "People who want social interaction and friendship",
        "Anyone who benefits from regular company and conversation",
      ],
    },
    supportServices: [
      { title: "Friendly Conversation", desc: "Engaging dialogue and active listening" },
      { title: "Activity Engagement", desc: "Games, hobbies, and recreational activities" },
      { title: "Meal Companionship", desc: "Sharing meals and encouraging nutrition" },
      { title: "Errand Accompaniment", desc: "Going along for shopping and appointments" },
      { title: "Social Outings", desc: "Accompanying to events and gatherings" },
      { title: "Mental Stimulation", desc: "Puzzles, reading, and cognitive activities" },
    ],
    howItWorks: [
      { title: "Interest Discussion", desc: "We learn about hobbies and preferences." },
      { title: "Personality Matching", desc: "We pair clients with compatible companions." },
      { title: "Flexible Scheduling", desc: "Choose visit times that work best." },
      { title: "Relationship Building", desc: "Consistent companions build lasting bonds." },
    ],
  },
} satisfies Record<string, ServicePageData>;

export type ServiceSlug = keyof typeof SERVICE_PAGES;
