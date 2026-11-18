import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      {/* Clip horizontally here (not only on <body>, whose overflow is handed to the viewport): elements
          waiting to slide in from the side would otherwise widen the page and make phones zoom out.
          `clip` (unlike `hidden`) keeps position: sticky working. */}
      <main id="main" className="overflow-x-clip">
        {children}
      </main>
      <Footer />
    </>
  );
}
