import { defineLaw } from "../types";
import { After, Before } from "./aesthetic-usability-effect.demo";

export default defineLaw({
  slug: "aesthetic-usability-effect",
  date: "2026-11-04",
  blurb: "Users perceive aesthetic designs as more usable.",
  notes: [
    "The Aesthetic-Usability Effect claims that users perceive aesthetic designs as more usable. When I think about my daily life and what types of interfaces I prefer, I definitely trust aesthetic designs more, not only because they look better, but because they feel more enjoyable to use.",

    "The first example that came to my mind was comparing a simple plain text HTML button versus a beautifully designed button with distinct colours, hover effects, and nice typography. Both buttons might work exactly the same, but I can definitely see how people would be less drawn to using the plain text HTML button over the fancy, well-designed button, thus making the well-designed button more “usable”.",
  ],
  exampleNotes: [
    "Another interesting phenomenon of this law is that when a user is presented with a more aesthetically pleasing design, they tend to be more forgiving to minor usability errors. This illustrates how good design can help cover up for minor issues when navigating user interfaces.",
  ],
  Compare: { Before, After },
  captions: {
    before: "A plain HTML button. It works, but nothing about it invites a click.",
    after: "Same job, with colour, type, a hover lift and a count that reacts.",
  },
  sample: true,
});
