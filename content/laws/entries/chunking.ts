import { defineLaw } from "../types";
import ContactCard from "./chunking.demo";

export default defineLaw({
  slug: "chunking",
  date: "2026-11-06",
  blurb: "Breaking down information so it can be represented and processed by users in a meaningful and manageable way.",
  notes: [
    "Chunking is a method that breaks down information into smaller, more manageable pieces. This enables users to easily scan content and identify information that is most relevant to their own goals.",
    "There are several ways to structuring the chunked information such as visually distinct groups or illustrating a hierarchy."
  ],
  Example: ContactCard,
  caption: "Contact card with personal information chunked in labelled sections. Easy to glance and find what you need!",
});
