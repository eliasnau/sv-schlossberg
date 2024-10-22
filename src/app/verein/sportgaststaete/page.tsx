"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const images = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Innenansicht der Sportgaststätte",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Außenbereich mit Terrasse",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Speisekarte Highlight",
  },
  { src: "/placeholder.svg?height=400&width=600", alt: "Theke und Barbereich" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Veranstaltungsraum" },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Blick auf den Sportplatz",
  },
];

export default function SportgaststatteWaldering() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0]">
      <header className="bg-[#1a5f1a] text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex items-center justify-between flex-wrap">
            <li>
              <Link href="/" className="text-2xl font-bold flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="SV Schloßberg Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                SV Schloßberg
              </Link>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Startseite
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Sportangebot
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Verein
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Termine
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="text-white hover:bg-[#2a7f2a]">
                Kontakt
              </Button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1a5f1a] mb-8">
          Sportgaststätte Waldering
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Sportgaststätte Waldering"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Willkommen in der Sportgaststätte Waldering
                </h2>
                <p className="mb-4">
                  Unsere Sportgaststätte Waldering ist mehr als nur ein Ort zum
                  Essen und Trinken. Sie ist das Herz unseres Vereinslebens, wo
                  Sportler, Fans und Gäste zusammenkommen, um gemeinsam zu
                  feiern, zu entspannen und die Gemeinschaft zu genießen.
                </p>
                <p className="mb-4">
                  Mit einer gemütlichen Atmosphäre, einer Terrasse mit Blick auf
                  unsere Sportanlagen und einer Küche, die sowohl traditionelle
                  als auch moderne Gerichte anbietet, ist die Sportgaststätte
                  Waldering der perfekte Ort für jede Gelegenheit.
                </p>
                <p>
                  Ob Sie nach dem Training einen Snack suchen, ein Fußballspiel
                  live verfolgen möchten oder einen Raum für Ihre private Feier
                  benötigen - bei uns sind Sie genau richtig!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Impressionen</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={200}
                    className="rounded-lg shadow-md hover:opacity-80 transition-opacity"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <div className="relative">
                  <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    width={800}
                    height={600}
                    className="rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogContent>
            </Dialog>
          ))}
        </div>
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
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="hover:text-[#a3d9a3] transition-colors duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="hover:text-[#a3d9a3] transition-colors duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24  24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
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
