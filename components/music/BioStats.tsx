import { FadeInUp } from "@/components/animations/FadeInUp";

type Stat = {
  value: string;
  label: string;
  desc: string;
};

type BioStatsProps = {
  stats: Stat[];
};

export function BioStats({ stats }: BioStatsProps) {
  return (
    <FadeInUp duration={0.6} delay={0.7} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-[rgba(255,255,255,0.07)] rounded-[16px] px-6 py-5 flex items-center gap-5"
        >
          <div className="text-[42px] text-[#ff003f] leading-none shrink-0" style={{ fontFamily: "var(--font-bebas)" }}>
            {stat.value}
          </div>
          <div>
            <div className="text-[13px] text-white mb-0.5" style={{ fontFamily: "var(--font-space)", fontWeight: 600 }}>
              {stat.label}
            </div>
            <div className="text-[12px] text-[#6a7282]" style={{ fontFamily: "var(--font-space)", fontWeight: 400 }}>
              {stat.desc}
            </div>
          </div>
        </div>
      ))}
    </FadeInUp>
  );
}
