"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Mode = "before" | "after";

const ModeContext = createContext<Mode>("before");

/** Demos call this to know whether to show the counter-example or the applied version. */
export const useMode = () => useContext(ModeContext);

const DEFAULT_CAPTIONS = {
  before: "The counter-example breaks the law on purpose so the difference is felt, not just read.",
  after: "The applied version changes one thing only, so the cause of the improvement is obvious.",
};

type Props = {
  captions?: { before: string; after: string };
  children: ReactNode;
};

export default function ExampleSection({ captions = DEFAULT_CAPTIONS, children }: Props) {
  const [mode, setMode] = useState<Mode>("before");

  return (
    <section className="sec plain rise d5">
      <div className="sechead">
        <h2>Example</h2>
        <div className="seg" role="radiogroup" aria-label="Example version">
          <button role="radio" aria-checked={mode === "before"} onClick={() => setMode("before")}>Counter-example</button>
          <button role="radio" aria-checked={mode === "after"} onClick={() => setMode("after")}>Applied</button>
        </div>
      </div>
      <div className="frame">
        <div className="state">{mode === "before" ? "Ignores the law" : "Applies the law"}</div>
        <ModeContext.Provider value={mode}>{children}</ModeContext.Provider>
      </div>
      <p className="caption">{captions[mode]}</p>
    </section>
  );
}
