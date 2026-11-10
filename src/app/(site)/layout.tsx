import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
