type PhotoCardProps = {
  src: string;
  alt: string;
  caption?: string;
};

export function PhotoCard({ src, alt, caption }: PhotoCardProps) {
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
