"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Facebook, Instagram, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SportsvereinSchlossberg() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0]">
      <header className="bg-[#1a5f1a] text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex items-center justify-between">
            <li>
              <Link href="/" className="text-2xl font-bold flex items-center">
                <Image
                  src="/img/logo2.jpg"
                  alt="SV Schloßberg Logo"
                  width={40}
                  height={40}
                  className="mr-2 rounded-full"
                />
                SV Schloßberg
              </Link>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-[#2a7f2a]"
                  >
                    Sportangebot <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Fußball</DropdownMenuItem>
                  <DropdownMenuItem>Volleyball</DropdownMenuItem>
                  <DropdownMenuItem>Gymnastik</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-[#2a7f2a]"
                  >
                    Verein <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Geschichte</DropdownMenuItem>
                  <DropdownMenuItem>Vorstand</DropdownMenuItem>
                  <DropdownMenuItem>Mitgliedschaft</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Kontakt
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Mehr
              </Button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
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
              ].map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="relative">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={800}
                          height={400}
                          className="w-full"
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

        <section className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-4 text-[#1a5f1a]">
              Willkommen beim SV Schloßberg
            </h2>
            <p className="text-lg mb-4">
              Der Sportsverein Schloßberg ist mehr als nur ein Verein - wir sind
              eine Gemeinschaft von Sportbegeisterten, die seit 1920 den Geist
              des Zusammenhalts und der sportlichen Exzellenz verkörpert.
            </p>
            <p className="text-lg mb-4">
              Von unseren grünen Fußballplätzen bis zu den modernen
              Gymnastikräumen bieten wir für jeden etwas. Ob Sie ein
              ambitionierter Athlet oder ein Freizeitsportler sind, bei uns
              finden Sie die perfekte Möglichkeit, aktiv zu werden und Teil
              einer großartigen Gemeinschaft zu sein.
            </p>
            <p className="text-lg">
              Entdecken Sie die Vielfalt unseres Angebots und erleben Sie, wie
              Sport Menschen zusammenbringt. Werden Sie Teil der SV Schloßberg
              Familie - wo Tradition auf Moderne trifft und jeder Willkommen
              ist!
            </p>
          </div>
        </section>

        <section className="bg-[#e0ebe0] py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#1a5f1a]">
              Unsere Sponsoren
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((sponsor) => (
                <div
                  key={sponsor}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src="/placeholder.svg?height=100&width=200"
                    alt={`Sponsor ${sponsor}`}
                    width={200}
                    height={100}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1a5f1a] text-white mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Kontakt</h3>
              <p>Sportsverein Schloßberg e.V.</p>
              <p>Am Sportplatz 1</p>
              <p>12345 Schloßberg</p>
              <p>Tel: 01234 / 56789</p>
              <p>E-Mail: info@sv-schlossberg.de</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Schnelllinks</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/impressum" className="hover:underline">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/datenschutz" className="hover:underline">
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link href="/satzung" className="hover:underline">
                    Satzung
                  </Link>
                </li>
                <li>
                  <Link href="/mitglied-werden" className="hover:underline">
                    Mitglied werden
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Folgen Sie uns</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="hover:text-[#a3d9a3] transition-colors duration-300"
                >
                  <Facebook size={24} />
                </Link>
                <Link
                  href="#"
                  className="hover:text-[#a3d9a3] transition-colors duration-300"
                >
                  <Instagram size={24} />
                </Link>
                <Link
                  href="#"
                  className="hover:text-[#a3d9a3] transition-colors duration-300"
                >
                  <Twitter size={24} />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center border-t border-[#2a7f2a] pt-4">
            <p>
              &copy; 2024 Sportsverein Schloßberg e.V. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
