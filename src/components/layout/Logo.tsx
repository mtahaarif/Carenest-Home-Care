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
}

export function Logo({ className, imgClassName, tone = "light", onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Carenest Home Care — home"
      className={cn("group flex shrink-0 items-center", tone === "dark" && "w-fit rounded-2xl bg-white/95 px-3 py-2 shadow-soft", className)}
    >
      <img
        src={IMAGES.logo}
        alt="Carenest Home Care"
        width={667}
        height={535}
        className={cn("h-14 w-auto transition-all duration-500 ease-out group-hover:scale-[1.04]", imgClassName)}
      />
    </Link>
  );
}
