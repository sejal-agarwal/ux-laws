import { defineLaw } from "../types";
import SideBySide from "./choice-overload.demo";

export default defineLaw({
  slug: "choice-overload",
  date: "2026-11-05",
  blurb: "People get overwhelmed when presented with too many options.",
  notes: [
    "When users are presented with too many options, it can feel really overwhelming to determine which option is best. How they feel about this experience can greatly impact how they perceive the usability of the interface.",
    "There are several strategies to mitigate choice overload such that the decision-making process is simplified. For example, if a user must choose between several choices and compare between them (e.g. subscription tiers), it is best to display these choices side-by-side to mitigate choice overload. "
  ],
  exampleNotes: [
    "Other methods to help users make decisions through design is by prioritizing showing the content most important or relevant to them or providing them tools to narrow their choices (e.g. filters, search, etc.).",
  ],
  Example: SideBySide,
  caption: "All three subscription tiers side by side with the same rows lined up. Differences are visible at a glance, and the popular plan gives a sensible default.",
});
