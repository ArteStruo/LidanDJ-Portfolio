import AboutHero from "@/components/about/AboutHero";
import DualIdentitySplit from "@/components/about/DualIdentitySplit";
import TransformationBridge from "@/components/about/TransformationBridge";
import PhilosophySection from "@/components/about/PhilosophySection";
import AboutClosingCTA from "@/components/about/AboutClosingCTA";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <AboutHero />
      <DualIdentitySplit />
      <TransformationBridge />
      <PhilosophySection />
      <AboutClosingCTA />
    </main>
  );
}
