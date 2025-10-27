import LandingNav from "@/components/LandingNav";
import LandingHero from "@/components/LandingHero";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <LandingHero />
    </div>
  );
}
