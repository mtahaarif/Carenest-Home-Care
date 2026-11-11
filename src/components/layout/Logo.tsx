import { Img as Image } from "@/components/ui/img";
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
  /** Alt text — it doubles as the link text, so describe the destination when the logo repeats. */
  alt?: string;
  preload?: boolean;
}

export function Logo({ className, imgClassName, tone = "light", onClick, alt = IMAGES.logo.alt, preload = false }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Carenest Home Care — home"
      className={cn("group flex shrink-0 items-center", tone === "dark" && "w-fit rounded-2xl bg-white/95 px-3 py-2 shadow-soft", className)}
    >
      <Image
        src={IMAGES.logo.src}
        alt={alt}
        width={140}
        height={112}
        preload={preload}
        fetchPriority={preload ? "high" : "auto"}
        className={cn("h-14 w-auto transition-all duration-500 ease-out group-hover:scale-[1.04]", imgClassName)}
      />
    </Link>
  );
}
