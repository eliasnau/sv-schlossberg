"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Mail, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BasketballPage() {
  const [isAktuellesOpen, setIsAktuellesOpen] = useState(false);
  const [isTermineOpen, setIsTermineOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0] flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1a5f1a] mb-8">
        Basketball bei SV Schloßberg
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src="/img/persons/1.png"
            alt="Basketball-Team des SV Schloßberg"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Über unsere Basketball-Abteilung
          </h2>
          <p className="mb-4">
            Die Basketball-Abteilung des SV Schloßberg bietet Spielern aller
            Altersgruppen und Fähigkeitsstufen die Möglichkeit, ihre
            Leidenschaft für den Sport auszuleben. Unser engagiertes Trainerteam
            fördert nicht nur die sportliche Entwicklung, sondern auch Teamgeist
            und Fairplay.
          </p>
          <p>
            Ob Sie Anfänger sind oder schon Erfahrung haben, bei uns finden Sie
            das passende Team und die Unterstützung, die Sie brauchen, um Ihre
            Basketball-Fähigkeiten zu verbessern und Spaß am Spiel zu haben.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Trainingszeiten</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Montag & Mittwoch</span>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>18:00 - 20:00 Uhr</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>Sporthalle Schloßberg, Sportplatzstr. 1</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontakt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Max Mustermann"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Max Mustermann</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Abteilungsleiter Basketball
                </p>
                <p className="text-sm">
                  &quot;Basketball ist mehr als ein Sport - es ist eine
                  Leidenschaft, die ich gerne mit anderen teile!&quot;
                </p>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>+49 123 45678900</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>max.mustermann@sv-schlossberg.de</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Aktuelles</h2>
          <Dialog open={isAktuellesOpen} onOpenChange={setIsAktuellesOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Mehr anzeigen</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Aktuelle Neuigkeiten</DialogTitle>
                <DialogDescription>
                  Die neuesten Updates aus unserer Basketball-Abteilung
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Erfolgreicher Saisonstart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Unsere erste Mannschaft hat die Saison mit einem
                      überzeugenden 78:65 Sieg gegen den Stadtrivalen begonnen.
                      Eine starke Teamleistung, die Lust auf mehr macht!
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Neuer Jugendtrainer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Wir freuen uns, ab nächsten Monat einen neuen
                      Jugendtrainer in unserem Team begrüßen zu dürfen. Er wird
                      sich besonders um die Förderung unserer U14 und U16 Teams
                      kümmern.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sommerfest-Ankündigung</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Save the Date! Am 15. Juli findet unser jährliches
                      Sommerfest statt. Es erwarten Sie spannende Spiele,
                      leckeres Essen und tolle Stimmung. Alle Mitglieder und
                      Freunde sind herzlich eingeladen!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Erfolgreicher Saisonstart</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Unsere erste Mannschaft hat die Saison mit einem überzeugenden
                78:65 Sieg gegen den Stadtrivalen begonnen. Eine starke
                Teamleistung, die Lust auf mehr macht!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Neuer Jugendtrainer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Wir freuen uns, ab nächsten Monat einen neuen Jugendtrainer in
                unserem Team begrüßen zu dürfen. Er wird sich besonders um die
                Förderung unserer U14 und U16 Teams kümmern.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Termine</h2>
          <Dialog open={isTermineOpen} onOpenChange={setIsTermineOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Mehr anzeigen</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Kommende Termine</DialogTitle>
                <DialogDescription>
                  Alle anstehenden Veranstaltungen und Spiele
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">
                      15.05.2024 - Heimspiel gegen BC Adler
                    </h3>
                    <p>20:00 Uhr, Sporthalle Schloßberg</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">
                      22.05.2024 - Auswärtsspiel bei SG Sternfeld
                    </h3>
                    <p>19:30 Uhr, Sternfeld Arena</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">
                      01.06.2024 - Jugend-Basketballcamp
                    </h3>
                    <p>10:00 - 16:00 Uhr, Sporthalle Schloßberg</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">
                      15.06.2024 - Heimspiel gegen TSV Waldstadt
                    </h3>
                    <p>18:30 Uhr, Sporthalle Schloßberg</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <h3 className="font-semibold">
                      29.06.2024 - Saisonabschlussfeier
                    </h3>
                    <p>19:00 Uhr, Vereinsheim SV Schloßberg</p>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardContent>
            <ul className="space-y-4">
              <li>
                <p className="font-semibold">
                  15.05.2024 - Heimspiel gegen BC Adler
                </p>
                <p>20:00 Uhr, Sporthalle Schloßberg</p>
              </li>
              <li>
                <p className="font-semibold">
                  22.05.2024 - Auswärtsspiel bei SG Sternfeld
                </p>
                <p>19:30 Uhr, Sternfeld Arena</p>
              </li>
              <li>
                <p className="font-semibold">
                  01.06.2024 - Jugend-Basketballcamp
                </p>
                <p>10:00 - 16:00 Uhr, Sporthalle Schloßberg</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
