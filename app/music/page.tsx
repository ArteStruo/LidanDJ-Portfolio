import { MusicPageClient } from "@/components/music/MusicPageClient";
import { readMusicData } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function MusicPage() {
  const { tracks } = await readMusicData();

  return <MusicPageClient tracks={tracks} />;
}
