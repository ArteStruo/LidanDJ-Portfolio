import { dualIdentityContent } from "@/lib/about/dualIdentity.data";

export default function RealIdentitySection() {
  const real = dualIdentityContent.real;

  return (
    <div className="relative overflow-hidden flex items-center bg-[#090909] px-6 py-24 md:px-12 lg:px-20">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-right opacity-15"
          style={{
            backgroundImage: "url('/images/about/nadil-studio.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          {real.label}
        </p>

        <h2 className="mt-5 text-4xl font-light md:text-6xl">
          {real.title}
        </h2>

        <p className="mt-8 text-lg leading-9 text-zinc-400">
          {real.story}
        </p>

        <div className="mt-10 space-y-4 border-l border-white/10 pl-6">
          {real.highlights.map((item) => (
            <p key={item} className="text-zinc-300">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}