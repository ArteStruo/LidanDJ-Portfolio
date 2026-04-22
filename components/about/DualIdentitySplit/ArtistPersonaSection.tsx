import { dualIdentityContent } from "@/lib/about/dualIdentity.data";

export default function ArtistPersonaSection() {
  const artist = dualIdentityContent.artist;

  return (
    <div className="relative overflow-hidden flex items-center bg-gradient-to-br from-[#140008] to-black px-6 py-24 md:px-12 lg:px-20">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-left opacity-20"
          style={{
            backgroundImage: "url('/images/about/lidan-live.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#ff0055]">
          {artist.label}
        </p>

        <h2 className="mt-5 text-5xl font-light md:text-7xl">
          {artist.title}
        </h2>

        <p className="mt-8 text-lg leading-9 text-zinc-400">
          {artist.story}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {artist.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#ff0055]/30 px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}