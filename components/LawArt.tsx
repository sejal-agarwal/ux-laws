import { artSvg } from "@/lib/art";

export default function LawArt({ slug }: { slug: string }) {
  return <svg viewBox="0 0 200 140" aria-hidden="true" dangerouslySetInnerHTML={{ __html: artSvg(slug) }} />;
}
