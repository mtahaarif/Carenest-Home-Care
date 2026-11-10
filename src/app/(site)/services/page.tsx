import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Home Care Services",
  description:
    "Senior care, personal care, companion care, 24-hour care, Alzheimer's and dementia care — compassionate in-home support across Cook, Lake, and DuPage counties.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
