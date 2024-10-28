"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Mail, Phone, MapPin, Smartphone } from "lucide-react";
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

type TooltipProps = {
  text: string;
  children: ReactNode;
};

type TrainingTime = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
};

type Group = {
  id: string;
  name: string;
  description: string;
  trainingTimes: TrainingTime[];
};

type Sport = {
  name: string;
  id: string;
  description: string | null;
  href: string | null;
  groups: Group[];
};

const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}
      {visible && (
        <div
          className="absolute bg-black text-white text-sm rounded p-1 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          style={{ pointerEvents: "none" }} // Verhindert, dass der Tooltip markiert werden kann
        >
          {text}
        </div>
      )}
    </span>
  );
};

export default function SportPage({ sport }: { sport: Sport }) {
  const [isAktuellesOpen, setIsAktuellesOpen] = useState(false);
  const [isTermineOpen, setIsTermineOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0] flex-grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1a5f1a] mb-8">
        {sport.name} beim SV Schloßberg
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src="/img/sports/leichtathletik/cover.jpg"
            alt="Leichtathletik-Team des SV Schloßberg"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Über unsere {sport.name}-Abteilung
          </h2>
          <p className="mb-4">{sport.description}</p>
          {/* <p>Same</p> */}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Trainingszeiten</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {sport.groups[0].trainingTimes.map((time) => (
                <li key={time.id} className="space-y-2">
                  <div className="flex items-center">
                    <Tooltip text="Trainingsdatum">
                      <Calendar className="mr-2 h-4 w-4" />
                    </Tooltip>
                    <span>{time.day}</span>
                  </div>
                  <div className="flex items-center">
                    <Tooltip text="Trainingszeit">
                      <Clock className="mr-2 h-4 w-4" />
                    </Tooltip>
                    <span>
                      {time.startTime} - {time.endTime} Uhr
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Tooltip text="Trainingsort">
                      <MapPin className="mr-2 h-4 w-4" />
                    </Tooltip>
                    <span>undefinded</span>
                  </div>
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="p-0"
                    onClick={() => toggleMap(time.id)}
                  >
                    {expandedMap === time.id ? (
                      <>
                        Karte ausblenden
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Karte anzeigen
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  {expandedMap === time.id && (
                    <iframe
                      src={time.mapUrl}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="mt-2"
                    ></iframe>
                  )}
                </li> */}
                </li>
              ))}
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
                src="/img/persons/andi.jpg"
                alt="Max Mustermann"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Andreas Scheibenzuber</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Abteilungsleiter Leichathletik
                </p>
                <p className="text-sm">
                  &quot;Leichtathletik ist mehr als ein Sport - es ist eine
                  Leidenschaft, die ich gerne mit anderen teile!&quot;
                </p>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center">
                <Tooltip text="Telefonnummer">
                  <Phone className="mr-2 h-4 w-4" />
                </Tooltip>
                <span> +49 8031 70169</span>
              </li>
              <li className="flex items-center">
                <Tooltip text="Mobilnummer">
                  <Smartphone className="mr-2 h-4 w-4" />
                </Tooltip>
                <span> +49 151 40570179</span>
              </li>
              <li className="flex items-center">
                <Tooltip text="E-Mail-Adresse">
                  <Mail className="mr-2 h-4 w-4" />
                </Tooltip>
                <span>leichtathletik@sv-schlossberg.de</span>
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
