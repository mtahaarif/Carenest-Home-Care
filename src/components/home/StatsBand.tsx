"use client";

import { Counter } from "@/components/fx/Counter";
import { RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { STATS } from "@/content/site";

export function StatsBand() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-foreground/5 bg-foreground/5 lg:grid-cols-4">
          {STATS.map((s) => (
            <RevealItem key={s.label} className="group relative bg-background p-7 transition-colors duration-500 hover:bg-white md:p-10">
              <p className="text-5xl font-extrabold tracking-tighter text-foreground md:text-6xl">
                <Counter value={s.value} from={s.prefix ? 24 : 0} prefix={s.prefix ?? ""} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-700 group-hover:w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
