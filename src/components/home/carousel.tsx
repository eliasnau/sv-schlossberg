import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Image from "next/image";

export function SportsCarousel() {
  return (
    <section className="container mx-auto px-4 py-8">
      <Carousel>
        <CarouselContent>
          {[
            {
              src: "/img/sports/fussball.jpg",
              alt: "Fußball",
              sport: "Fußball",
              link: "/sport/fussball", // Beispiel-Link
            },
            {
              src: "/img/sports/ballet.jpg",
              alt: "Ballet",
              sport: "Ballet",
              link: "/sport/ballet", // Beispiel-Link
            },
            {
              src: "/img/sports/gymnastik.jpg",
              alt: "Gymnastik",
              sport: "Gymnastik",
              link: "/sport/gymnastik", // Beispiel-Link
            },
            {
              src: "/img/sports/eisstock.jpg",
              alt: "Eisstock",
              sport: "Eisstock",
              link: "/sport/eisstock", // Beispiel-Link
            },
            {
              src: "/img/sports/funsportskaterwelle.jpg",
              alt: "funsportskaterwelle",
              sport: "Skaterpark(Funsport)",
              link: "/sport/skaterpark", // Beispiel-Link
            },
            {
              src: "/img/sports/icehockey.jpg",
              alt: "Eishockey",
              sport: "Eishockey",
              link: "/sport/eishockey", // Beispiel-Link
            },
            {
              src: "/img/sports/jugendfussball.jpg",
              alt: "Jugendfussball",
              sport: "Jugendfussball",
              link: "/sport/jugendfussball", // Beispiel-Link
            },
            {
              src: "/img/sports/leichtathletik.jpg",
              alt: "Leichtathletik",
              sport: "Leichtathletik",
              link: "/sport/leichtathletik", // Beispiel-Link
            },
            {
              src: "/img/sports/ski.jpg",
              alt: "Ski",
              sport: "Ski",
              link: "/sport/ski", // Beispiel-Link
            },
            {
              src: "/img/sports/tennis.jpg",
              alt: "Tennis",
              sport: "Tennis",
              link: "/sport/tennis", // Beispiel-Link
            },
            {
              src: "/img/sports/tischtennis.jpg",
              alt: "Tischtennis",
              sport: "Tischtennis",
              link: "/sport/tischtennis", // Beispiel-Link
            },
            {
              src: "/img/sports/turnen.jpg",
              alt: "Turnen",
              sport: "Turnen",
              link: "/sport/turnen", // Beispiel-Link
            },
          ].map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 rounded">
              <a href={image.link} className="block p-1">
                <div className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={400}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#1a5f1a]/80 text-white px-4 py-2 rounded">
                    {image.sport}
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
