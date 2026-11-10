import { createElement, forwardRef, type SVGProps } from "react";

type IconNode = [tag: string, attrs: Record<string, string | number>][];

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  absoluteStrokeWidth?: boolean;
}

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Minimal lucide-compatible icon factory (same markup lucide-react v0.462 renders). */
export function createIcon(name: string, iconNode: IconNode) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, ...rest }, ref) =>
      createElement(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
          className: ["lucide", `lucide-${name}`, className].filter(Boolean).join(" "),
          ...rest,
        },
        ...iconNode.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs })),
        children,
      ),
  );
  Icon.displayName = name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());
  return Icon;
}

export type Icon = ReturnType<typeof createIcon>;
