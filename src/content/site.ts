import {
  Award,
  Bath,
  Brain,
  Briefcase,
  Clock,
  Clock3,
  DollarSign,
  FileText,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  House,
  Phone,
  PhoneOff,
  Puzzle,
  Shield,
  ShieldX,
  UserCheck,
  Users,
  UserX,
  type LucideIcon,
} from "@/components/icons";
import { IMAGES } from "@/lib/site";

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

export interface ServiceSummary {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

export const SERVICES: ServiceSummary[] = [
  {
    slug: "senior-care",
    title: "Senior Care",
    short: "Comprehensive care for seniors",
    description: "Personalized support that helps seniors thrive in the comfort of home.",
    image: IMAGES.mealService,
    icon: HandHeart,
  },
  {
    slug: "personal-care",
    title: "Personal Care",
    short: "Daily assistance & hygiene support",
    description: "Dignified assistance with bathing, dressing, and daily routines.",
    image: IMAGES.personalCare,
    icon: Bath,
  },
  {
    slug: "companion-care",
    title: "Companion Care",
    short: "Meaningful companionship",
    description: "Warm companionship that brightens every day.",
    image: IMAGES.familyTogether,
    icon: HeartHandshake,
  },
  {
    slug: "24-hour-care",
    title: "24-Hour Care",
    short: "Around-the-clock support",
    description: "Round-the-clock peace of mind for you and your family.",
    image: IMAGES.bedsideSupport,
    icon: Clock3,
  },
  {
    slug: "alzheimer-care",
    title: "Alzheimer's Care",
    short: "Specialized memory care",
    description: "Compassionate, specialized care for memory challenges.",
    image: IMAGES.mobilitySupport,
    icon: Brain,
  },
  {
    slug: "dementia-care",
    title: "Dementia Care",
    short: "Cognitive support services",
    description: "Expert support tailored to cognitive needs.",
    image: IMAGES.consultation,
    icon: Puzzle,
  },
];

export const TRADITIONAL_CARE: ServiceSummary = {
  slug: "traditional-home-care",
  title: "Traditional Home Care",
  short: "Everyday help at home",
  description: "Compassionate support in the comfort of home.",
  image: IMAGES.mealService,
  icon: House,
};

export const serviceHref = (slug: string) => `/services/${slug}`;

/* ------------------------------------------------------------------ */
/*  Home                                                               */
/* ------------------------------------------------------------------ */

export const PROBLEMS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldX,
    title: "Care You Can Trust From Day One",
    description: "We carefully match you with caregivers you can meet, trust, and feel comfortable with — because your home should always feel safe and familiar.",
  },
  { icon: UserX, title: "One-Size-Fits-All Care", description: "Cookie-cutter care plans ignore what makes your family unique. You deserve better." },
  { icon: PhoneOff, title: "No One Answers", description: "When you have questions or concerns, the last thing you need is a voicemail maze." },
];

export const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Phone,
    title: "Connect with Us",
    description: "Call or email anytime. We will answer your questions, walk you through your options, and make getting started simple.",
  },
  {
    icon: Users,
    title: "Choose Your Caregiver",
    description: "You choose the caregiver who feels like the right fit, because the best care begins with trust and comfort.",
  },
  {
    icon: Heart,
    title: "Onboarding and Start of Care",
    description: "Your chosen caregiver is onboarded, after which you begin to receive the personalized care you deserve.",
  },
];

export const CAREGIVER_BENEFITS = [
  "Competitive hourly rates",
  "Flexible scheduling that works for you",
  "Full training and certification provided",
  "Ongoing support from our care coordinators",
  "Be part of a team that values your work",
];

export const FAMILY_BENEFITS = [
  "Personalized caregiver matching",
  "Care plans built around your routine",
  "One point of contact, always",
  "No surprise fees or hidden costs",
  "Peace of mind for the whole family",
];

export const TESTIMONIALS = [
  {
    quote:
      "Very professional. Love the staff, they're quick to answer questions. I switched from another company due to payment issues. I don't have any problems with that here. Definitely the best.",
    name: "Lehair C.",
  },
  {
    quote: "Great agency! The staff is very friendly and professional. They care very much about their clients and employees. I'd recommend them to anyone.",
    name: "Annamarie",
  },
  { quote: "I was nervous to transfer to a new company but everything has been good and most of all PROFESSIONAL! I am comfortable here.", name: "Superstar G." },
  {
    quote: "Our care agency was very thoughtful, always going the extra mile. Her sincere concern about helping us was needed and appreciated. Thank you!",
    name: "Rhona H.",
  },
  {
    quote: "This is an awesome and very caring agency. They make sure your loved ones are taken care of as well as their workers. A comfortable, caring atmosphere.",
    name: "Devonnie G.",
  },
  { quote: "Great place! The company and employees are patient, caring, easy to talk to, and very respectful. They are a joy. I love them.", name: "Annette G." },
  { quote: "The best agency I have worked for. The pay is great, the people are awesome, and very professional.", name: "Ali S." },
  {
    quote: "I transferred agencies and brought my client with me! I have been extremely satisfied. The communication has been excellent! Highly recommend!",
    name: "Dawn G.",
  },
];

/** Figures stated elsewhere on the site (services offered, counties, FAQ start time, 24-hour care). */
export const STATS = [
  { value: 6, suffix: "", label: "Specialized care services" },
  { value: 3, suffix: "", label: "Counties served across Chicagoland" },
  { value: 24, suffix: "/7", label: "Around-the-clock care available" },
  { value: 48, prefix: "24–", suffix: "h", label: "Typical time to begin care" },
];

export const COUNTIES = [
  { name: "Cook County", blurb: "Chicago and its surrounding communities" },
  { name: "Lake County", blurb: "Serving the northern suburbs" },
  { name: "DuPage County", blurb: "Serving the western suburbs" },
];

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export const VALUES: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Heart, title: "Compassion", description: "We treat every client and their family with genuine care, empathy, and respect." },
  { icon: Shield, title: "Trust", description: "Building lasting relationships through transparency, reliability, and integrity." },
  { icon: Award, title: "Excellence", description: "Committed to delivering the highest quality care through continuous improvement." },
  { icon: Users, title: "Family", description: "We consider our clients and caregivers as part of the Carenest family." },
];

export const REASONS = [
  "Flexible caregiver matching options",
  "Full training and certification provided",
  "We handle payroll, taxes, and insurance",
  "Transparent communication always",
  "Flexible scheduling options",
  "No hidden fees or surprise costs",
  "Licensed, bonded, and insured",
  "Locally owned and operated",
];

/* ------------------------------------------------------------------ */
/*  Services overview                                                  */
/* ------------------------------------------------------------------ */

export const PROCESS = [
  { step: "01", title: "Free Consultation", description: "We start with a thorough evaluation to determine the needs, preferences, and objectives of your loved one." },
  {
    step: "02",
    title: "Individualized Strategy",
    description: "From medical needs to daily routines and social activities, our team creates a personalized plan to meet individual needs.",
  },
  {
    step: "03",
    title: "Matching Caregivers",
    description: "We take care to pair you with a qualified and kind caregiver whose background and disposition match the requirements of your family.",
  },
  {
    step: "04",
    title: "Continued Assistance & Observation",
    description: "To guarantee the best possible assistance as needs change, we offer ongoing supervision, frequent check-ins, and plan modifications.",
  },
];

export const FAQS = [
  {
    question: "What types of home care services does Carenest provide?",
    answer:
      "Carenest provides a comprehensive range of home care services including Senior Care, Personal Care, Companion Care, 24-Hour Care, Alzheimer's Care, and Dementia Care. Each service is tailored to meet the unique needs of our clients.",
  },
  {
    question: "Who can benefit from your home care services?",
    answer:
      "Our services benefit seniors who need daily assistance, individuals recovering from surgery or illness, people living with Alzheimer's or dementia, those with disabilities, and families who need support with caregiving duties.",
  },
  {
    question: "How do you determine which services my loved one needs?",
    answer:
      "We begin with a free, comprehensive consultation where our care coordinators assess your loved one's physical, emotional, and social needs. Based on this evaluation, we create a personalized care plan together.",
  },
  {
    question: "Can we combine different services in one care plan?",
    answer:
      "Absolutely! We understand that care needs are often complex. We can combine multiple services to create a comprehensive care plan that addresses all aspects of your loved one's wellbeing.",
  },
  {
    question: "How are caregivers selected and matched with clients?",
    answer:
      "We carefully match caregivers based on personality, skills, experience, and specific care requirements. In some cases, you may have the option to bring someone you already know, and we can help make them an official caregiver.",
  },
  {
    question: "How quickly can home care services begin after we contact you?",
    answer:
      "In most cases, we can begin services within 24-48 hours of completing the initial consultation. For urgent situations, we offer expedited placement to ensure your loved one receives care as soon as possible.",
  },
];

/* ------------------------------------------------------------------ */
/*  Careers                                                            */
/* ------------------------------------------------------------------ */

export const HIRING_STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: FileText, title: "Apply Online", description: "Fill out our simple application form with your basic information and experience." },
  { icon: UserCheck, title: "Interview", description: "Meet with our team to discuss your background and passion for caregiving." },
  { icon: GraduationCap, title: "Training", description: "Complete our comprehensive training program to prepare you for success." },
  { icon: Briefcase, title: "Start Working", description: "Begin making a difference in the lives of those who need compassionate care." },
];

export const CAREER_BENEFITS = [
  "Competitive pay rates",
  "Flexible scheduling",
  "Comprehensive training",
  "Career advancement opportunities",
  "Supportive team environment",
  "Health benefits available",
  "Paid time off",
  "Recognition programs",
];

export const REQUIREMENTS = [
  "High school diploma or equivalent",
  "Previous caregiving experience preferred",
  "Valid driver's license (optional)",
  "Clear background check",
  "Compassionate and reliable",
  "Strong communication skills",
];

export const OPENINGS = [
  {
    title: "Caregiver",
    description: "Provide compassionate care and support to seniors and individuals in need.",
    href: "/careers/caregiver",
    type: "Full-time / Part-time",
  },
];

export const RESPONSIBILITIES = [
  "Assist clients with daily living activities such as bathing, dressing, and grooming",
  "Provide companionship and emotional support",
  "Help with meal preparation and light housekeeping",
  "Assist with medication reminders",
  "Accompany clients to appointments and errands",
  "Monitor and report changes in client condition",
  "Maintain accurate care records",
];

export const QUALIFICATIONS = [
  "High school diploma or equivalent",
  "Previous caregiving experience preferred but not required",
  "Compassionate and patient demeanor",
  "Strong communication skills",
  "Ability to pass background check",
  "Reliable transportation (preferred)",
  "CPR/First Aid certification (or willingness to obtain)",
];

export const PERKS: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: DollarSign, title: "Competitive Pay", description: "Earn competitive hourly rates with opportunities for increases" },
  { icon: Clock, title: "Flexible Schedule", description: "Choose hours that work for your lifestyle" },
  { icon: GraduationCap, title: "Free Training", description: "Comprehensive training and certification provided" },
  { icon: Users, title: "Supportive Team", description: "Join a caring community with ongoing support" },
  { icon: Heart, title: "Meaningful Work", description: "Make a real difference in people's lives every day" },
  { icon: Shield, title: "Benefits Available", description: "Health benefits and paid time off for eligible employees" },
];

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export const USER_TYPES = [
  { value: "client-need-caregiver", label: "I am a client in need of a caregiver" },
  { value: "caregiver-no-client", label: "I would like to be a caregiver, but do not have a client" },
  { value: "have-client-need-agency", label: "I have a client and need an agency" },
  { value: "something-else", label: "Something else" },
];
