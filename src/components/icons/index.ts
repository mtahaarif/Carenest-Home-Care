/**
 * Icon entry point: re-exports lucide-react and adds the brand glyphs lucide no longer ships.
 */
import { createIcon } from "./create-icon";

export * from "lucide-react";

/** Instagram glyph (lucide v0.462 geometry, ISC license). */
export const Instagram = createIcon("instagram", [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" }],
]);
