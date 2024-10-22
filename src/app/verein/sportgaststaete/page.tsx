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
      <div className="flex-grow container mx-auto px-4 py-8">
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
      </div>
    </div>
  );
}
