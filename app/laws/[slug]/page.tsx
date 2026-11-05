import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Comparison from "@/components/Comparison";
import ExampleSection from "@/components/ExampleSection";
import LawArt from "@/components/LawArt";
import Sketch from "@/components/Sketch";
import { getDiscovered } from "@/content/laws";
import { CATALOG } from "@/content/laws/catalog";
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
  const { Compare, Demo, Example } = entry;

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
          {entry.notes.map((n) => <p key={n}>{n}</p>)}
        </div>
      </section>

      {Example ? (
        <section className="sec plain rise d5">
          <div className="sechead">
            <h2>Example</h2>
          </div>
          <div className="frame"><Example /></div>
          {entry.caption && <p className="caption">{entry.caption}</p>}
        </section>
      ) : Compare ? (
        <Comparison before={<Compare.Before />} after={<Compare.After />} captions={entry.captions} />
      ) : (
        <ExampleSection key={slug} captions={entry.captions}>
          {Demo ? <Demo /> : <Sketch idea={entry.sketch} />}
        </ExampleSection>
      )}

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
