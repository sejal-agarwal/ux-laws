import type { ReactNode } from "react";

type Props = {
  before: ReactNode;
  after: ReactNode;
  captions?: { before: string; after: string };
};

/** The counter-example and the applied version next to each other. A server component:
 *  the two sides are the entry's own client components, passed in as elements. */
export default function Comparison({ before, after, captions }: Props) {
  return (
    <section className="sec rise d5">
      <div className="sechead">
        <h2>Example</h2>
      </div>
      <div className="compare">
        <figure className="pane">
          <figcaption className="state">Ignores the law</figcaption>
          <div className="stage">{before}</div>
          {captions && <p className="caption">{captions.before}</p>}
        </figure>
        <figure className="pane">
          <figcaption className="state">Applies the law</figcaption>
          <div className="stage">{after}</div>
          {captions && <p className="caption">{captions.after}</p>}
        </figure>
      </div>
    </section>
  );
}
