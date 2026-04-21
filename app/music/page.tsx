import { MusicPageClient } from "@/components/music/MusicPageClient";
import { readMusicData } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function MusicPage() {
  const { tracks } = readMusicData();

  return <MusicPageClient tracks={tracks} />;
}
