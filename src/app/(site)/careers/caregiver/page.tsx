import type { Metadata } from "next";
import { CaregiverContent } from "./CaregiverContent";

export const metadata: Metadata = {
  title: "Caregiver Position",
  description: "Join our team of dedicated caregivers and start a rewarding career helping seniors and individuals in need.",
};

export default function CaregiverPositionPage() {
  return <CaregiverContent />;
}
