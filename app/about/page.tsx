import type { Metadata } from "next";

import AboutHero from "@/components/about/AboutHero";
import DualIdentitySplit from "@/components/about/DualIdentitySplit";
import TransformationBridge from "@/components/about/TransformationBridge";
import PhilosophySection from "@/components/about/PhilosophySection";
import AboutClosingCTA from "@/components/about/AboutClosingCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind DJ Lidan, his creative identity, and the philosophy shaping each Progressive House journey.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | DJ Lidan",
    description:
      "Learn the story behind DJ Lidan, his creative identity, and the philosophy shaping each Progressive House journey.",
    url: "/about",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About DJ Lidan",
      },
    ],
  },
  twitter: {
    title: "About | DJ Lidan",
    description:
      "Learn the story behind DJ Lidan, his creative identity, and the philosophy shaping each Progressive House journey.",
    images: ["/og-image.jpg"],
  },
};

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
