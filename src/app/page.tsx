import { Sponsors } from "@/components/home/sponsors";
import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { CTA } from "@/components/home/cta";
import { About } from "@/components/home/about";
import { News } from "@/components/home/news";

export default function SportsvereinSchlossberg() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0]">
      <main className="flex-grow">
        <Hero />
        <Features />
        <About />
        <CTA />
        <News />
        {/* <SportsCarousel />
        <Welcome /> */}
        <Sponsors />
      </main>
    </div>
  );
}
