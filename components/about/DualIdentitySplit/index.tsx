import ArtistPersonaSection from "./ArtistPersonaSection";
import RealIdentitySection from "./RealIdentitySection";
import IdentityDivider from "./IdentityDivider";

export default function DualIdentitySplit() {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
      <ArtistPersonaSection />
      <IdentityDivider />
      <RealIdentitySection />
    </section>
  );
}
