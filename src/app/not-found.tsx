"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, Phone } from "@/components/icons";
import { Aurora } from "@/components/fx/Aurora";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-5">
      <Aurora />
      <div className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[9rem] font-extrabold leading-none tracking-tighter text-gradient sm:text-[14rem]"
        >
          404
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Oops! Page <span className="accent-serif text-primary">not found</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back home.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="hero" size="lg">
              <Link href="/">
                <ArrowLeft /> Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SITE.phoneHref}>
                <Phone /> {SITE.phone}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
