import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Ready to learn more about our home care services? Reach Carenest Homecare by phone, email, or our contact form.",
};

export default function ContactPage() {
  return <ContactContent />;
}
