import Link from "next/link";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/site";

export function Logo({ className, tone = "light", onClick }: { className?: string; tone?: "light" | "dark"; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Carenest Homecare — home" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white shadow-soft ring-1 ring-black/5 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
        <img src={IMAGES.logoMark} alt="" className="h-9 w-9 object-contain" />
      </span>
      <span className="leading-none">
        <span className={cn("block text-lg font-extrabold tracking-tight", tone === "dark" ? "text-ink-foreground" : "text-foreground")}>Carenest</span>
        <span className={cn("block text-[0.62rem] font-semibold uppercase tracking-[0.28em]", tone === "dark" ? "text-accent" : "text-primary")}>Home Care</span>
      </span>
    </Link>
  );
}
