import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "A fresh approach to home care, built on the belief that families deserve personalized care that truly fits their needs.",
};

export default function AboutPage() {
  return <AboutContent />;
}
