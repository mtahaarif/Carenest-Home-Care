import type { ReactNode } from "react";
import { Plus } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

/**
 * Accessible FAQ list built on native <details>/<summary>: works without JavaScript and
 * keeps every answer in the server-rendered HTML for search engines and answer engines.
 */
export function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <details key={item.question} className="group rounded-[1.5rem] border border-foreground/5 bg-card px-6 shadow-card transition-shadow duration-500 open:shadow-elevated md:px-8" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-4">
              <span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              {item.question}
            </span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-all duration-500 group-open:rotate-45 group-open:bg-primary group-open:text-primary-foreground">
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <div className="pb-6 pl-9 text-base leading-relaxed text-muted-foreground">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
