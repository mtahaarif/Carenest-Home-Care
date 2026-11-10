"use client";

import { useEffect, useMemo, useState } from "react";
import { geoBounds, geoMercator, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { cn } from "@/lib/utils";

const W = 800;
const H = 600;
const SERVICE_IDS: Record<string, string> = { "17031": "Cook County", "17097": "Lake County", "17043": "DuPage County" };
const CHICAGO: [number, number] = [-87.6298, 41.8781];
const LAKE_LABEL: [number, number] = [-87.05, 42.35];

type Props = { name: string };
type Data = { counties: FeatureCollection<Geometry, Props>; states: FeatureCollection<Geometry, Props> };

let cache: Promise<Data> | null = null;
const load = () => (cache ??= fetch("/data/illinois-counties.json").then((r) => r.json() as Promise<Data>));

interface IllinoisMapProps {
  /** County name (e.g. "Cook County") to emphasise, controlled by the parent. */
  active: string | null;
  onHover: (name: string | null) => void;
  className?: string;
}

/** Northern Illinois county map highlighting the Carenest service area. */
export function IllinoisMap({ active, onHover, className }: IllinoisMapProps) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    let alive = true;
    load()
      .then((d) => alive && setData(d))
      .catch(() => {
        cache = null;
      });
    return () => {
      alive = false;
    };
  }, []);

  const geo = useMemo(() => {
    if (!data) return null;
    const service = data.counties.features.filter((f) => SERVICE_IDS[String(f.id)]);
    const [[x0, y0], [x1, y1]] = geoBounds({ type: "FeatureCollection", features: service });
    const padX = (x1 - x0) * 0.85;
    const padY = (y1 - y0) * 0.35;
    const frame: Feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "MultiPoint",
        coordinates: [
          [x0 - padX * 1.35, y0 - padY],
          [x1 + padX * 0.65, y1 + padY],
        ],
      },
    };
    const projection = geoMercator().fitExtent(
      [
        [0, 0],
        [W, H],
      ],
      frame,
    );
    const path = geoPath(projection);
    return { projection, path };
  }, [data]);

  if (!data || !geo) {
    return <div className={cn("animate-pulse rounded-3xl bg-white/40", className)} />;
  }

  const { path, projection } = geo;
  const [cx, cy] = projection(CHICAGO) ?? [0, 0];
  const [lx, ly] = projection(LAKE_LABEL) ?? [0, 0];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-full w-full", className)} role="img" aria-label="Map of northern Illinois highlighting Cook, Lake, and DuPage counties">
      <defs>
        <linearGradient id="svc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(175 55% 30%)" />
          <stop offset="100%" stopColor="hsl(172 50% 44%)" />
        </linearGradient>
        <filter id="lift" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="hsl(190 40% 11%)" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Neighbouring states for context */}
      {data.states.features
        .filter((f) => String(f.id) !== "17")
        .map((f) => (
          <path key={`s-${f.id}`} d={path(f) ?? ""} fill="hsl(40 25% 92%)" stroke="white" strokeWidth={1.5} />
        ))}

      {/* Illinois counties */}
      {data.counties.features
        .filter((f) => !SERVICE_IDS[String(f.id)])
        .map((f) => (
          <path key={f.id} d={path(f) ?? ""} fill="hsl(168 28% 86%)" stroke="white" strokeWidth={1} className="transition-[fill] duration-300 hover:fill-[hsl(168_28%_80%)]" />
        ))}

      {/* Service counties */}
      {data.counties.features
        .filter((f) => SERVICE_IDS[String(f.id)])
        .map((f) => {
          const name = SERVICE_IDS[String(f.id)];
          const isActive = active === name;
          const [tx, ty] = path.centroid(f);
          return (
            <g
              key={f.id}
              onMouseEnter={() => onHover(name)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(name)}
              onBlur={() => onHover(null)}
              tabIndex={0}
              className="cursor-pointer outline-none"
              style={{ transformBox: "fill-box", transformOrigin: "center", transform: isActive ? "scale(1.04)" : "scale(1)", transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)" }}
            >
              <path d={path(f) ?? ""} fill={isActive ? "hsl(38 72% 52%)" : "url(#svc)"} stroke="white" strokeWidth={2} filter={isActive ? "url(#lift)" : undefined} className="transition-[fill] duration-300" />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none fill-white text-[15px] font-bold"
                style={{ paintOrder: "stroke", stroke: "hsl(190 40% 11% / 0.25)", strokeWidth: 3 }}
              >
                {f.properties.name}
              </text>
            </g>
          );
        })}

      <text x={lx} y={ly} textAnchor="middle" className="pointer-events-none select-none fill-[hsl(190_20%_45%)] font-serif text-[22px] italic">
        Lake Michigan
      </text>

      {/* Chicago marker */}
      <g transform={`translate(${cx}, ${cy})`} className="pointer-events-none">
        <circle r={10} fill="hsl(38 72% 52%)" opacity={0.35}>
          <animate attributeName="r" values="8;22;8" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.45;0;0.45" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r={7} fill="hsl(38 72% 52%)" stroke="white" strokeWidth={2.5} />
        <text x={12} y={-12} className="fill-[hsl(190_40%_11%)] text-[14px] font-bold">
          Chicago
        </text>
      </g>
    </svg>
  );
}
