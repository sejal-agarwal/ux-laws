import { defineLaw } from "../types";
import { Cluttered, Simple } from "./cognitive-load.demo";

export default defineLaw({
  slug: "cognitive-load",
  date: "2026-11-17",
  blurb: "The mental load and resources required for a user to navigate and use an interface.",
  notes: [
    "Our brains can only hold so much information at once. Cognitive load is all about understanding how much and what information we want to show users in order for them to easily process and interact with the interface.",
    "There are two types of cognitive load: intrinsic and extraneous. Intrinsic cognitive load is the information needed by users to keep track of information relevant to their personal goals. In contrast, extraneous cognitive load is the information that requires mental resources to process but isn't relevant to helping the user understand the content in the interface."
  ],
  Compare: { Before: Cluttered, After: Simple },
  captions: {
    before: "A sticky note app with banners, toolbars, tags and icons on every note. Finding the one thing you came to do (writing a note) takes effort, and none of the extras help you with it.",
    after: "Only what the task needs: a place to write, an Add button, and the notes themselves. Pin and delete tuck away behind the ⋯ on each note, and double-clicking a note edits it. Less to read and decide on, so more attention left for the notes.",
  },
});
