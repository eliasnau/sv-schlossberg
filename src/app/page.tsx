import { SportsCarousel } from "@/components/home/carousel";
import { Welcome } from "@/components/home/welcome";
import { Sponsors } from "@/components/home/sponsors";

export default function SportsvereinSchlossberg() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0]">
      <main className="flex-grow">
        <SportsCarousel />
        <Welcome />
        <Sponsors />
      </main>
    </div>
  );
}
