import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/site";

interface LogoProps {
  className?: string;
  /** Controls the rendered height (width follows the logo's aspect ratio). */
  imgClassName?: string;
  /** On dark surfaces the logo sits on a light card so the teal script stays legible. */
  tone?: "light" | "dark";
  onClick?: () => void;
  /** Hide the alt text when the logo is repeated on the page (the link keeps its aria-label). */
  decorative?: boolean;
  preload?: boolean;
}

export function Logo({ className, imgClassName, tone = "light", onClick, decorative = false, preload = false }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Carenest Home Care — home"
      className={cn("group flex shrink-0 items-center", tone === "dark" && "w-fit rounded-2xl bg-white/95 px-3 py-2 shadow-soft", className)}
    >
      <Image
        src={IMAGES.logo.src}
        alt={decorative ? "" : IMAGES.logo.alt}
        sizes="(min-width: 768px) 120px, 90px"
        preload={preload}
        fetchPriority={preload ? "high" : "auto"}
        className={cn("h-14 w-auto transition-all duration-500 ease-out group-hover:scale-[1.04]", imgClassName)}
      />
    </Link>
  );
}
