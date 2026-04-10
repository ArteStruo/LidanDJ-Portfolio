import { FadeInUp } from "@/components/animations/FadeInUp";
import { FadeIn } from "@/components/animations/FadeIn";
import { VideoCard } from "@/components/gallery/VideoCard";

// ── Placeholder images from Unsplash ─────────────────────────────────────────
const img1 = "https://images.unsplash.com/photo-1768885512764-3ebafdf20402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHBlcmZvcm1hbmNlJTIwbmlnaHRjbHViJTIwZGFyayUyMHN0YWdlfGVufDF8fHx8MTc3NTgxMzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080";
const img2 = "https://images.unsplash.com/photo-1624929303661-22c5bce0169b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBmZXN0aXZhbCUyMGNyb3dkJTIwbGlnaHRzfGVufDF8fHx8MTc3NTgxMzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080";
const img3 = "https://images.unsplash.com/photo-1578251955495-a8060f2b9cfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxESiUyMHR1cm50YWJsZSUyMG1peGVyJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzU4MTM0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const img4 = "https://images.unsplash.com/photo-1761431246385-abb584084ce1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXZlJTIwdW5kZXJncm91bmQlMjBwYXJ0eSUyMGRhcmslMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3NTgxMzQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const img5 = "https://images.unsplash.com/photo-1773274157508-ddbf6074aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsYXNlciUyMGxpZ2h0cyUyMG5pZ2h0fGVufDF8fHx8MTc3NTgxMzQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const img6 = "https://images.unsplash.com/photo-1656231267321-282e40e05d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwaGVhZHBob25lcyUyMHN0dWRpbyUyMGRhcmt8ZW58MXx8fHwxNzc1ODEzNDk3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const img7 = "https://images.unsplash.com/photo-1768885514740-d64d25ac9a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodGNsdWIlMjBkYW5jZSUyMGZsb29yJTIwZGFyayUyMG5lb258ZW58MXx8fHwxNzc1ODEzNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080";

const imgImageLidanPoster = "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1080&auto=format&fit=crop&q=80";
const imgImageCrowd = "https://images.unsplash.com/photo-1540039155732-684734e5d590?w=1080&auto=format&fit=crop&q=80";
const imgImageGear = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1080&auto=format&fit=crop&q=80";

// ── Photo card ────────────────────────────────────────────────────────────────
function PhotoCard({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div className="relative w-full h-full rounded-[16px] overflow-hidden group cursor-pointer bg-[#111]">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.08]"
        style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[400ms]">
          <p
            className="text-[11px] tracking-[1.8px] uppercase text-white"
            style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}
          >
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* ── HEADER ── */}
        <FadeInUp duration={0.6} className="mb-10">
          <p
            className="text-[#ff003f] tracking-[3px] uppercase text-xs mb-3"
            style={{ fontFamily: "var(--font-space)", fontWeight: 700 }}
          >
            DJ Lidan · Sri Lanka
          </p>
          <h1
            className="text-[clamp(48px,8vw,80px)] leading-none text-white uppercase"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Moments
          </h1>
          <p
            className="text-[#99a1af] text-[14px] mt-3 max-w-[480px] leading-relaxed"
            style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}
          >
            Behind the decks — photos and video from DJ Lidan&apos;s progressive and electronic music
            performances across Sri Lanka.
          </p>
        </FadeInUp>

        {/* ── ROW 1: FEATURED VIDEO (full width, hero) ── */}
        <FadeIn
          duration={0.8} delay={0.1}
          className="w-full h-[360px] sm:h-[480px] lg:h-[580px] mb-4"
        >
          <VideoCard
            thumbnail={imgImageLidanPoster}
            title="DJ Lidan — Live at Kulture Warehouse, Colombo"
            subtitle="Progressive House · Sri Lanka · Feb 2026"
            duration="1:42:30"
            embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with actual video
            large
          />
        </FadeIn>

        {/* ── ROW 2: Three images ── */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { src: img1, alt: "DJ Lidan performing live — nightclub Colombo Sri Lanka", caption: "Stage · Colombo" },
            { src: img2, alt: "Electronic music festival crowd in Sri Lanka", caption: "Festival Crowd" },
            { src: img3, alt: "DJ Lidan&apos;s turntable mixer setup", caption: "The Decks" },
          ].map((item, i) => (
            <FadeInUp
              key={i}
              yOffset={24}
              duration={0.6} delay={0.2 + i * 0.07}
              className="h-[220px] sm:h-[280px]"
            >
              <PhotoCard {...item} />
            </FadeInUp>
          ))}
        </div>

        {/* ── ROW 3: Tall image + Second video ── */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <FadeIn
            duration={0.7} delay={0.3}
            className="col-span-12 sm:col-span-5 h-[360px] sm:h-[460px]"
          >
            {/* Translated x: -20 logic to just simple fade or we keep the wrapper simple, we'll just fade in */}
            <PhotoCard
              src={img4}
              alt="Underground rave party dark atmosphere — Sri Lanka electronic music"
              caption="Underground · Colombo"
            />
          </FadeIn>
          <FadeIn
            duration={0.7} delay={0.35}
            className="col-span-12 sm:col-span-7 h-[360px] sm:h-[460px]"
          >
            <VideoCard
              thumbnail={imgImageCrowd}
              title="Marathon Set — 12 Hours Underground"
              subtitle="Electronic Music · Colombo · Mar 2026"
              duration="12:00:00"
              embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with actual video
            />
          </FadeIn>
        </div>

        {/* ── ROW 4: Four images ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {[
            { src: img5, alt: "Concert stage laser lights at DJ Lidan set Sri Lanka", caption: "Lasers · Galle" },
            { src: img6, alt: "Music producer DJ Lidan headphones studio Colombo", caption: "Studio Sessions" },
            { src: img7, alt: "Nightclub dance floor neon lights electronic music", caption: "Dance Floor" },
            { src: imgImageGear, alt: "DJ Lidan equipment setup — electronic music DJ Colombo", caption: "The Setup" },
          ].map((item, i) => (
            <FadeInUp
              key={i}
              yOffset={20}
              duration={0.5} delay={0.4 + i * 0.06}
              className="h-[200px] sm:h-[240px]"
            >
              <PhotoCard {...item} />
            </FadeInUp>
          ))}
        </div>

        {/* ── ROW 5: Wide image + two images ── */}
        <div className="grid grid-cols-12 gap-4">
          <FadeInUp
            yOffset={20}
            duration={0.6} delay={0.5}
            className="col-span-12 sm:col-span-7 h-[260px] sm:h-[320px]"
          >
            <PhotoCard
              src={imgImageLidanPoster}
              alt="DJ Lidan — progressive electronic music DJ Sri Lanka official photo"
              caption="DJ Lidan · Official"
            />
          </FadeInUp>
          <div className="col-span-12 sm:col-span-5 grid grid-rows-2 gap-4 h-[280px] sm:h-[320px]">
            <FadeInUp
              yOffset={20}
              duration={0.6} delay={0.55}
              className="h-full"
            >
              <PhotoCard
                src={imgImageCrowd}
                alt="Crowd at DJ Lidan event — electronic music Sri Lanka"
                caption="Crowd Energy"
              />
            </FadeInUp>
            <FadeInUp
              yOffset={20}
              duration={0.6} delay={0.6}
              className="h-full"
            >
              <PhotoCard
                src={imgImageGear}
                alt="DJ mixer gear — DJ Lidan Colombo Sri Lanka"
                caption="Gear · Studio"
              />
            </FadeInUp>
          </div>
        </div>

      </div>
    </div>
  );
}
