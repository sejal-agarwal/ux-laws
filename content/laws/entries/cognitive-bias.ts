import { defineLaw } from "../types";
import BandwagonDemo from "./cognitive-bias.demo";

export default defineLaw({
  slug: "cognitive-bias",
  date: "2026-11-16",
  blurb: "A way of thinking about the world that influences our perceptions and judgements.",
  notes: [
    "Decision-making processes and judgements are often influenced by our past experiences. We find ways to conserve mental energy or remember certain patterns such that we can efficiently make decisions.",
    "While understanding our own biases can help us be more aware of our own decision-making processes, it is really hard to completely eliminate them. Regardless, being aware of cognitive biases can help us evaluate and design tools such that they don't lead to faulty reasoning.",
    "[This website](https://uxplanet.org/top-10-cognitive-biases-in-product-design-00cc12703c02) provides some great examples of cognitive biases such as confirmation bias, availability heuristic, the framing effect, and more!"
  ],
  Example: BandwagonDemo,
  caption: "Aurora has the better specs and the lower price, but Bolt has thousands of ratings and a \"Best seller\" flag. Hide the crowd signals and the choice looks different; the bandwagon effect is when people follow the actions of others, even if it goes against their own judgment.",
});
