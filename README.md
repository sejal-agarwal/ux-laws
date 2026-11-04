# Learning UX Laws

A journal for learning one UX law a day. The home page is a gallery of 30 laws with an "x of 30 discovered" bar. Each discovered law opens to your notes and a small interactive example, and a calendar shows which law you learned on which day.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Add today's law

The journal starts empty: 0 of 30 discovered. `content/laws/drafts/` holds 14 ready-made starting points (blurb, example idea, and for Hick's and Fitts's the working demo) with sample notes, none of them registered.

1. Copy a draft into `content/laws/entries/` (or copy one and rename it for a law without a draft, for example `chunking.ts`).
2. Fill it in:
   - `slug` must match a slug in `content/laws/catalog.ts`.
   - `date` is the day you learned it (`YYYY-MM-DD`).
   - `blurb` is the one-or-two-sentence definition.
   - `notes` is one string per paragraph. Delete `sample: true` once the notes are yours.
   - `sketch` describes the example you plan to build. It shows until you add a `Demo`.
3. Import the file in `content/laws/index.ts` and add it to `ENTRIES`.

The gallery card, the law page, the calendar and the progress bar all update from that.

## Build the example

**Side by side.** Put two components in a `<slug>.demo.tsx` file next to the entry (it starts with `"use client"` so it can hold state), export them as `Before` and `After`, and set `Compare: { Before, After }` in the entry. See `content/laws/entries/aesthetic-usability-effect.ts` and its `.demo.tsx`. Add `captions: { before, after }` for a line under each side. Styles for new examples go in `app/globals.css`.

**Behind a toggle.** Make a client component in `components/demos/` (see `HickDemo.tsx` and `FittsDemo.tsx`). Call `useMode()` from `components/ExampleSection.tsx` to get `"before"` (counter-example) or `"after"` (applied), render the matching version, then set `Demo` in the entry file. Optional `captions: { before, after }` appear under the example.

## Where things live

- `content/laws/` the catalog of 30 laws, the entries you write, and the helpers that work out day numbers and streaks.
- `lib/art.ts` the small drawing for each law, shown on the gallery cards.
- `lib/dates.ts` date helpers. Dates are plain strings and never read the clock, which this project's Cache Components setting requires.
- `app/globals.css` the colours (Dark Academia browns) and all styling.
