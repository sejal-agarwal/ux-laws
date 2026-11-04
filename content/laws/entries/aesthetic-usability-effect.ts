import { defineLaw } from "../types";
import { After, Before } from "./aesthetic-usability-effect.demo";

export default defineLaw({
  slug: "aesthetic-usability-effect",
  date: "2026-11-04",
  blurb: "Users perceive aesthetic designs as more usable.",
  notes: [
    "When I read about this law, my gut reaction was, obviously. Of course I trust aesthetic designs more, not only because they they look better, but they feel more enjoyable to use. The first thought that came to my mind is comparing a a simple plain text HTML button verses a beautifully designed button with distinct colours, hover effects, and nice typography. Both buttons might work exactly the same, but I can definitely see how people would be less drawn to using the plain text HTML button over the fancy, well-designed button."
  ],
  Compare: { Before, After },
  captions: {
    before: "A plain HTML button. It works, but nothing about it invites a click.",
    after: "Same job, with colour, type, a hover lift and a count that reacts.",
  },
  sample: true,
});
