import { dayDiff } from "@/lib/dates";
import { CATALOG } from "./catalog";
import type { CatalogItem, LawEntry } from "./types";
import aestheticUsabilityEffect from "./entries/aesthetic-usability-effect";

// To add a day: put an entry file in ./entries (drafts for every law are in ./drafts), then
// import it here and add it to ENTRIES.
//
//   import chunking from "./entries/chunking";
//   const ENTRIES: LawEntry[] = [chunking];
const ENTRIES: LawEntry[] = [aestheticUsabilityEffect];

export type DiscoveredLaw = CatalogItem & { entry: LawEntry; day: number };

/** What the gallery needs for one card. Plain data, so it can cross into a client component. */
export type GalleryItem = CatalogItem & { day: number | null };

const catalogBySlug = new Map(CATALOG.map((c) => [c.slug, c]));

/** Discovered laws, oldest first. The day number is the position in this list. */
export const DISCOVERED: DiscoveredLaw[] = [...ENTRIES]
  .sort((a, b) => a.date.localeCompare(b.date))
  .map((entry, i) => {
    const item = catalogBySlug.get(entry.slug);
    if (!item) throw new Error(`Entry "${entry.slug}" has no matching slug in content/laws/catalog.ts`);
    return { ...item, entry, day: i + 1 };
  });

export const TOTAL = CATALOG.length;
/** Date of the newest entry, or null before the first one is added. */
export const NEWEST_DATE = DISCOVERED.at(-1)?.entry.date ?? null;

export function getDiscovered(slug: string) {
  return DISCOVERED.find((l) => l.slug === slug);
}

export function getNeighbours(slug: string) {
  const i = DISCOVERED.findIndex((l) => l.slug === slug);
  return { prev: DISCOVERED[i - 1] ?? null, next: DISCOVERED[i + 1] ?? null };
}

/** Discovered laws newest first, then the ones still to find in alphabetical order. */
export function getGalleryItems(): GalleryItem[] {
  const found = [...DISCOVERED].reverse().map(({ slug, name, category, day }) => ({ slug, name, category, day }));
  const have = new Set(DISCOVERED.map((l) => l.slug));
  const todo = CATALOG.filter((c) => !have.has(c.slug))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => ({ ...c, day: null }));
  return [...found, ...todo];
}

/** Consecutive days ending at the newest entry. */
export function currentStreak() {
  if (!DISCOVERED.length) return 0;
  let s = 1;
  for (let k = DISCOVERED.length - 1; k > 0; k--) {
    if (dayDiff(DISCOVERED[k].entry.date, DISCOVERED[k - 1].entry.date) === 1) s++;
    else break;
  }
  return s;
}

export function longestStreak() {
  if (!DISCOVERED.length) return 0;
  let best = 1;
  let run = 1;
  for (let k = 1; k < DISCOVERED.length; k++) {
    run = dayDiff(DISCOVERED[k].entry.date, DISCOVERED[k - 1].entry.date) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}
