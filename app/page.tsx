import { HomeEventsSection } from "@/components/home/HomeEventsSection";
import { HomeHero } from "@/components/home/HomeHero";
import { homeEvents, homeHeroTags } from "@/lib/home-content";

export default function HomePage() {
  return (
    <div className="bg-[#050505]">
      <HomeHero tags={homeHeroTags} />
      <HomeEventsSection events={homeEvents} />
    </div>
  );
}
