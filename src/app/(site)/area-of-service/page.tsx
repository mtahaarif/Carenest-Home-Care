import type { Metadata } from "next";
import { AreaContent } from "./AreaContent";

export const metadata: Metadata = {
  title: "Areas of Service",
  description: "Compassionate, professional in-home care services throughout Cook, Lake, and DuPage counties in Illinois.",
};

export default function AreaOfServicePage() {
  return <AreaContent />;
}
