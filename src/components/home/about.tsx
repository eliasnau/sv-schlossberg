import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export function About() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 text-[#1a5f1a]">
              Unsere Geschichte, unsere Zukunft
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Der SV Schloßberg ist mehr als nur ein Sportverein - wir sind eine
              Familie, die seit über 100 Jahren den Sport in unserer Region
              prägt. Mit Leidenschaft, Engagement und Teamgeist schreiben wir
              unsere Erfolgsgeschichte weiter.
            </p>
            <Button
              variant="outline"
              className="border-[#1a5f1a] text-[#1a5f1a] hover:bg-[#1a5f1a] hover:text-white"
              asChild
            >
              <Link href="/verein/geschichte">Mehr über uns erfahren</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/img/history.jpg?height=400&width=600"
              alt="Historisches Bild des SV Schloßberg"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
