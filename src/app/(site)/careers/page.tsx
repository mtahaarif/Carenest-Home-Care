import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description: "Make a real difference in people's lives. Join our team of compassionate caregivers and build a rewarding career.",
};

export default function CareersPage() {
  return <CareersContent />;
}
