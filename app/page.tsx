import Gallery from "@/components/Gallery";
import ProgressBar from "@/components/ProgressBar";
import { DISCOVERED, TOTAL, currentStreak, getGalleryItems } from "@/content/laws";

export default function GalleryPage() {
  return (
    <div className="stack">
      <ProgressBar found={DISCOVERED.length} total={TOTAL} streak={currentStreak()} />
      <Gallery items={getGalleryItems()} />
    </div>
  );
}
