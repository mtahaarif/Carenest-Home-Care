import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

/** Eyebrow + display title + supporting copy, with a staggered reveal. */
export function SectionHeading({ eyebrow, title, description, align = "left", tone = "light", className, titleClassName, as: Title = "h2" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <span className={cn("eyebrow", dark ? "text-accent" : "text-primary", align === "center" && "justify-center")}>
            <span className={cn("h-px w-8", dark ? "bg-accent/70" : "bg-primary/60")} />
            {eyebrow}
            {align === "center" && <span className={cn("h-px w-8", dark ? "bg-accent/70" : "bg-primary/60")} />}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Title
          className={cn(
            "mt-4 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl",
            dark ? "text-ink-foreground" : "text-foreground",
            titleClassName,
          )}
        >
          {title}
        </Title>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-ink-foreground/70" : "text-muted-foreground", align === "center" && "mx-auto max-w-2xl")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
