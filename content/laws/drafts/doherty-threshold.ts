import { defineLaw } from "../types";

export default defineLaw({
  slug: "doherty-threshold",
  date: "2026-10-24",
  blurb:
    "Keep responses under about 400 ms and neither the person nor the system feels like it is waiting.",
  notes: [
    "Skeleton screens made a slow page feel quicker.",
    "Instant feedback matters more than instant results.",
  ],
  sketch: "A button that answers in 100 ms versus one that stalls for a second.",
  sample: true,
});
