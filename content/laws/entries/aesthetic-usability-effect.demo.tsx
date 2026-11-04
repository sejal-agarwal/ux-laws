"use client";

import { useRef, useState, type CSSProperties } from "react";

// Two buttons that do exactly the same thing: count a like.
// The only difference is how they look and feel. Edit freely; styles for `.nice-*` and
// `.float-heart` are in app/globals.css and `.raw` shows the browser's own default styling.

// Both sides show the same line under the button.
const likeText = (n: number) =>
  n === 0 ? "Be the first to like this" : `${n} ${n === 1 ? "person likes" : "people like"} this`;

// The floating hearts are the site's browns (tan, deep brown, cream, taupe). Every 10th like
// sends a red one, the brick red used for Memory elsewhere on the site.
const HEART_COLOURS = ["var(--accent)", "var(--brown)", "var(--ink)", "var(--muted)"];
const SURPRISE = "var(--c-memory)";
const SURPRISE_EVERY = 10;

const HEART ="M12 20.5s-7.5-4.6-9.2-9.3C1.7 8 3.6 5 6.8 5c1.9 0 3.5 1 5.2 3 1.7-2 3.3-3 5.2-3 3.2 0 5.1 3 4 6.2-1.7 4.7-9.2 9.3-9.2 9.3z";

/** Counter-example: a plain HTML button, left as the browser draws it. */
export function Before() {
  const [likes, setLikes] = useState(0);
  return (
    <div className="raw">
      <button onClick={() => setLikes(likes + 1)}>Like</button>
      <p aria-live="polite">{likeText(likes)}</p>
    </div>
  );
}

/** Applied: the same button with colour, type, a hover lift, a press, a focus ring, and a heart that floats away. */
export function After() {
  const [likes, setLikes] = useState(0);
  const [floating, setFloating] = useState<{ id: number; drift: number; colour: string }[]>([]);
  const nextId = useRef(0);
  const liked = likes > 0;

  function like() {
    setLikes(likes + 1);
    const id = nextId.current++;
    const drift = Math.round(Math.random() * 40 - 20);
    const colour =
      (likes + 1) % SURPRISE_EVERY === 0
        ? SURPRISE
        : HEART_COLOURS[Math.floor(Math.random() * HEART_COLOURS.length)];
    setFloating((f) => [...f, { id, drift, colour }]);
    // The heart fades out after ~0.9s, then it is removed.
    setTimeout(() => setFloating((f) => f.filter((h) => h.id !== id)), 1000);
  }

  return (
    <div className="nice">
      <div className="nice-wrap">
        <button className={`nice-btn${liked ? " liked" : ""}`} onClick={like}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d={HEART} />
          </svg>
          Like
        </button>
        {floating.map(({ id, drift, colour }) => (
          <svg key={id} className="float-heart" viewBox="0 0 24 24" aria-hidden="true" style={{ "--drift": `${drift}px`, "--heart": colour } as CSSProperties}>
            <path d={HEART} />
          </svg>
        ))}
      </div>
      <p className="nice-note" aria-live="polite">{likeText(likes)}</p>
    </div>
  );
}
