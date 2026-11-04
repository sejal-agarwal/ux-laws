import type { ComponentType } from "react";

export type Category = "Behaviour" | "Perception" | "Memory" | "Heuristic";

/** One of the 30 laws you are working through. */
export type CatalogItem = {
  slug: string;
  name: string;
  category: Category;
};

/** The page you write on the day you learn a law. */
export type LawEntry = {
  /** Must match a slug in catalog.ts. */
  slug: string;
  /** The day you learned it, as YYYY-MM-DD. */
  date: string;
  /** One or two sentences defining the law. */
  blurb: string;
  /** Your own notes: where you spotted it, what you took from it. One string per paragraph. */
  notes: string[];
  /** Two client components shown side by side, counter-example on the left. Write them in a
   *  `<slug>.demo.tsx` file next to this one (it needs "use client" for state). */
  Compare?: { Before: ComponentType; After: ComponentType };
  /** Or one client component behind a Counter-example / Applied toggle. It reads the current
   *  version with useMode(). */
  Demo?: ComponentType;
  /** What the example will be, shown until you build `Demo`. */
  sketch?: string;
  /** Captions under the example. Falls back to a generic pair. */
  captions?: { before: string; after: string };
  /** Remove this once the notes are your own. */
  sample?: boolean;
};

export const defineLaw = (entry: LawEntry): LawEntry => entry;
