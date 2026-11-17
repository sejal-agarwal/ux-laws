import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Comparison from "@/components/Comparison";
import ExampleSection from "@/components/ExampleSection";
import LawArt from "@/components/LawArt";
import { getDiscovered } from "@/content/laws";
import { CATALOG } from "@/content/laws/catalog";
import type { ExampleBlock, LawEntry } from "@/content/laws/types";
import { categoryStyle } from "@/lib/categories";
import { formatLong } from "@/lib/dates";

// Build a page for every law in the catalog. Laws that have no entry yet show the 404 page,
// and this keeps the list non-empty before the first entry is added.
export function generateStaticParams() {
  return CATALOG.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/laws/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const law = getDiscovered(slug);
  return law ? { title: law.name, description: law.entry.blurb } : {};
}

/** Turns [text](https://url) in a note into a link; everything else stays plain text. */
function withLinks(text: string) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    return m ? <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a> : part;
  });
}

/** The entry's examples. Falls back to the older Example / Compare / Demo fields. No example means no section. */
function examplesOf(entry: LawEntry): ExampleBlock[] {
  if (entry.examples) return entry.examples;
  if (entry.Example) return [{ kind: "single", Component: entry.Example, caption: entry.caption }];
  if (entry.Compare) return [{ kind: "compare", ...entry.Compare, captions: entry.captions }];
  if (entry.Demo) return [{ kind: "toggle", Component: entry.Demo, captions: entry.captions }];
  return [];
}

// The page itself does not await params. Only <Law> does, behind Suspense, so the back link
// and the skeleton are available the moment you navigate here.
export default function LawPage({ params }: PageProps<"/laws/[slug]">) {
  return (
    <article className="article">
      <Link className="back rise d1" href="/">← All laws</Link>
      <Suspense fallback={<LawSkeleton />}>
        <Law params={params} />
      </Suspense>
    </article>
  );
}

function LawSkeleton() {
  return (
    <div className="skeleton" aria-hidden="true">
      <i style={{ width: "40%", height: 12 }} />
      <i style={{ width: "70%", height: 52 }} />
      <i style={{ width: "95%", height: 20 }} />
      <i style={{ width: "80%", height: 20 }} />
    </div>
  );
}

async function Law({ params }: Pick<PageProps<"/laws/[slug]">, "params">) {
  const { slug } = await params;
  const law = getDiscovered(slug);
  if (!law) notFound();

  const { entry } = law;

  return (
    <>
      <header className="lawhead rise d2">
        <div className="meta">
          <span className="cat"><span className="sq" style={categoryStyle(law.category)} />{law.category}</span>
          <span className="cat">Day {law.day}</span>
          <span className="cat">{formatLong(entry.date)}</span>
        </div>
        <h1>{law.name}</h1>
        <p className="lede">{entry.blurb}</p>
      </header>

      <div className="plate rise d3" style={categoryStyle(law.category)}>
        <LawArt slug={slug} />
      </div>

      <section className="sec rise d4">
        <div className="sechead">
          <h2>My notes</h2>
        </div>
        <div className="prose">
          {entry.notes.map((n) => <p key={n}>{withLinks(n)}</p>)}
        </div>
      </section>

      {examplesOf(entry).map((block, i) => {
        const title = block.title ?? (i === 0 ? "Example" : `Example ${i + 1}`);
        if (block.kind === "compare") {
          return <Comparison key={i} title={title} before={<block.Before />} after={<block.After />} captions={block.captions} />;
        }
        if (block.kind === "toggle") {
          return (
            <ExampleSection key={`${slug}-${i}`} title={title} captions={block.captions}>
              <block.Component />
            </ExampleSection>
          );
        }
        return (
          <section key={i} className="sec plain rise d5">
            <div className="sechead">
              <h2>{title}</h2>
            </div>
            <div className="frame"><block.Component /></div>
            {block.caption && <p className="caption">{block.caption}</p>}
          </section>
        );
      })}

      {entry.exampleNotes?.some((n) => n.trim()) && (
        <section className="sec plain rise d5">
          <div className="prose">
            {entry.exampleNotes.filter((n) => n.trim()).map((n) => <p key={n}>{n}</p>)}
          </div>
        </section>
      )}
    </>
  );
}
