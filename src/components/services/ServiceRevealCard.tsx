import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { serviceHref, type ServiceSummary } from "@/content/site";

/** Tall image card: description and CTA slide up on hover (always visible on touch). */
export function ServiceRevealCard({ service, index }: { service: ServiceSummary; index: number }) {
  return (
    <Link
      href={serviceHref(service.slug)}
      className="group relative block h-[30rem] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] bg-ink sm:w-[22rem] lg:h-[32rem] lg:w-[24rem]"
    >
      <Image
        src={service.image.src}
        alt=""
        sizes="(min-width: 1024px) 384px, (min-width: 640px) 352px, 78vw"
        placeholder="blur"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-primary/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-primary/40" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
        <span className="rounded-full glass-dark px-3 py-1 text-xs font-bold text-white">0{index + 1}</span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl glass-dark">
          <service.icon className="h-6 w-6 text-accent" />
        </span>
        <p className="text-2xl font-bold">{service.title}</p>
        <div className="grid grid-rows-[1fr] transition-all duration-500 lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-2 text-white/80">{service.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              Learn more <span className="h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
