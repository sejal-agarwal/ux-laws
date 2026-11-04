import { defineLaw } from "../types";
import HickDemo from "@/components/demos/HickDemo";

export default defineLaw({
  slug: "hicks-law",
  date: "2026-11-04",
  blurb:
    "The more choices you offer, and the more complex they are, the longer a decision takes. Cut options and reveal the rest in steps.",
  notes: [
    "A streaming app settings page with sixteen options made me scan everything twice.",
    "Grouping into four headings first helped more than removing options.",
  ],
  Demo: HickDemo,
  captions: {
    before:
      "Sixteen equal options at once. Notice yourself scanning every label before you commit.",
    after:
      "Four groups first, then four items. Each step is a small decision, and you can predict where to go without reading everything.",
  },
  sample: true,
});
