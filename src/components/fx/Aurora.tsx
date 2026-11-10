import { cn } from "@/lib/utils";

/** Slow-drifting blurred colour fields used behind heroes and CTAs. */
export function Aurora({ className, variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute -left-[10%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full blur-3xl animate-aurora",
          dark ? "bg-primary/35" : "bg-primary/18",
        )}
      />
      <div
        className={cn(
          "absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] rounded-full blur-3xl animate-aurora [animation-delay:-6s]",
          dark ? "bg-accent/20" : "bg-accent/16",
        )}
      />
      <div
        className={cn(
          "absolute bottom-[-30%] left-[30%] h-[45vmax] w-[45vmax] rounded-full blur-3xl animate-aurora [animation-delay:-12s]",
          dark ? "bg-primary-light/25" : "bg-secondary",
        )}
      />
    </div>
  );
}
