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
              src: "/img/sports/fussball.jpg", // External placeholder for testing
              alt: "Fußball",
              sport: "Fußball",
            },
            {
              src: "/img/sports/ballet.jpg", // External placeholder for testing
              alt: "Ballet",
              sport: "Ballet",
            },
            {
              src: "/img/sports/gymnastik.jpg", // External placeholder for testing
              alt: "Gymnastik",
              sport: "Gymnastik",
            },
            {
              src: "/img/sports/eisstock.jpg",
              alt: "Eisstock",
              sport: "Eisstock",
            },
            {
              src: "/img/sports/funsportskaterwelle.jpg",
              alt: "funsportskaterwelle",
              sport: "Skaterpark(Funsport)",
            },
            {
              src: "/img/sports/icehockey.jpg",
              alt: "Eishockey",
              sport: "Eishockey",
            },
            {
              src: "/img/sports/jugendfussball.jpg",
              alt: "Jugendfussball",
              sport: "Jugendfussball",
            },
            {
              src: "/img/sports/leichtathletik.jpg",
              alt: "Leichtathletik",
              sport: "Leichtathletik",
            },
            {
              src: "/img/sports/ski.jpg",
              alt: "Ski",
              sport: "Ski",
            },
            {
              src: "/img/sports/tennis.jpg",
              alt: "Tennis",
              sport: "Tennis",
            },
            {
              src: "/img/sports/tischtennis.jpg",
              alt: "Tischtennis",
              sport: "Tischtennis",
            },
            {
              src: "/img/sports/turnen.jpg",
              alt: "Turnen",
              sport: "Turnen",
            },
          ].map((image, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 rounded"
            >
              <div className="p-1">
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                </CarouselItem>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
