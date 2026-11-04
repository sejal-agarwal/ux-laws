import type { CSSProperties } from "react";
import type { Category } from "@/content/laws/types";

export const CATEGORIES: Category[] = ["Behaviour", "Perception", "Memory", "Heuristic"];

/** Sets --c so `.sq`, card rules and calendar bars pick up the category colour. */
export const categoryStyle = (category: Category) =>
  ({ "--c": `var(--c-${category.toLowerCase()})` }) as CSSProperties;

/** "Law of Proximity" -> "Proximity", for tight spaces like calendar cells. */
export const shortName = (name: string) =>
  name.replace(" Effect", "").replace(" Rule", "").replace("Law of ", "").replace(" Threshold", "");
