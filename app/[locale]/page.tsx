
import { HeroParallaxDemo } from "@/components/ui/Hero";
import Services from "@/components/ui/Services";
import TimelineDemo from "@/components/ui/Timeline";
import CTA from "@/components/ui/cta-prefooter";

export default function Home() {

  return (
    <div className="flex flex-col  items-center justify-items-center min-h-screen gap-16 bg-black">

      <HeroParallaxDemo />
      <Services />
      <TimelineDemo />
      <CTA />

    </div>
  );
};