import { HomeEventsSection } from "@/components/home/HomeEventsSection";
import { HomeHero } from "@/components/home/HomeHero";
import { readEventsData } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { heroTags, events } = await readEventsData();

  return (
    <div className="bg-[#050505]">
      <HomeHero tags={heroTags} />
      <HomeEventsSection events={events} />
    </div>
  );
}
