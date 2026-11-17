import type { ComponentType } from "react";

export type Category = "Behaviour" | "Perception" | "Memory" | "Heuristic";

/** One of the 30 laws you are working through. */
export type CatalogItem = {
  slug: string;
  name: string;
  category: Category;
};

/** One coded example on a law's page. Add as many as you like, in any mix. */
export type ExampleBlock = { title?: string } & (
  | { kind: "single"; Component: ComponentType; caption?: string }
  | { kind: "compare"; Before: ComponentType; After: ComponentType; captions?: { before: string; after: string } }
  | { kind: "toggle"; Component: ComponentType; captions?: { before: string; after: string } }
);

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
  /** Any number of coded examples, rendered in order. Omit to show no example section at all.
   *  Each block is `{ kind: "single", Component, caption }`, `{ kind: "compare", Before, After,
   *  captions }` or `{ kind: "toggle", Component, captions }` (Component reads useMode()). Give a
   *  block a `title` to name it. Components live in `<slug>.demo.tsx` ("use client" for state).
   *  The older Compare / Demo / Example fields below still work when `examples` is not set. */
  examples?: ExampleBlock[];
  /** Two client components shown side by side, counter-example on the left. Write them in a
   *  `<slug>.demo.tsx` file next to this one (it needs "use client" for state). */
  Compare?: { Before: ComponentType; After: ComponentType };
  /** Or one client component behind a Counter-example / Applied toggle. It reads the current
   *  version with useMode(). */
  Demo?: ComponentType;
  /** A short write-up shown under the example. One string per paragraph; empty strings are skipped. */
  exampleNotes?: string[];
  /** Or one client component shown on its own, with no counter-example and no toggle. Use
   *  `caption` for the line under it. */
  Example?: ComponentType;
  caption?: string;
  /** A private note on what the example could be. Never shown on the page. */
  sketch?: string;
  /** Captions under the example. Falls back to a generic pair. */
  captions?: { before: string; after: string };
  /** Remove this once the notes are your own. */
  sample?: boolean;
};

export const defineLaw = (entry: LawEntry): LawEntry => entry;
