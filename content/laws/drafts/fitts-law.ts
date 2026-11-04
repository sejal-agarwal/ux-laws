import { defineLaw } from "../types";
import FittsDemo from "@/components/demos/FittsDemo";

export default defineLaw({
  slug: "fitts-law",
  date: "2026-11-03",
  blurb:
    "The time to reach a target depends on how far away it is and how big it is. Make important targets large and close.",
  notes: [
    "Tiny close buttons on pop-ups are a Fitts failure.",
    "Screen edges and corners are easy to hit because the cursor stops there.",
  ],
  Demo: FittsDemo,
  captions: {
    before: "A 16px target across the arena. Every click is a small aiming problem.",
    after: "Same distance, a 64px target. You can land anywhere on it, so the aim costs less.",
  },
  sample: true,
});
