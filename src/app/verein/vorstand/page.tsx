import Image from "next/image";
import { Mail, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const boardMembers = [
  {
    name: "Dr. Anna Schmidt",
    position: "1. Vorsitzende",
    image: "/placeholder.svg?height=300&width=300",
    phone: "+49 123 4567890",
    email: "anna.schmidt@sv-schlossberg.de",
  },
  {
    name: "Thomas Müller",
    position: "2. Vorsitzender",
    image: "/placeholder.svg?height=300&width=300",
    phone: "+49 123 4567891",
    email: "thomas.mueller@sv-schlossberg.de",
  },
  {
    name: "Maria Weber",
    position: "Schatzmeisterin",
    image: "/placeholder.svg?height=300&width=300",
    phone: "+49 123 4567892",
    email: "maria.weber@sv-schlossberg.de",
  },
  {
    name: "Michael Bauer",
    position: "Schriftführer",
    image: "/placeholder.svg?height=300&width=300",
    phone: "+49 123 4567893",
    email: "michael.bauer@sv-schlossberg.de",
  },
  {
    name: "Sandra Klein",
    position: "Jugendwartin",
    image: "/placeholder.svg?height=300&width=300",
    phone: "+49 123 4567894",
    email: "sandra.klein@sv-schlossberg.de",
  },
  {
    name: "Peter Hoffmann",
    position: "Beisitzer",
    image: "/placeholder.svg?height=300&width=300",
    phone: "+49 123 4567895",
    email: "peter.hoffmann@sv-schlossberg.de",
  },
];

export default function Vorstand() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f0]">
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1a5f1a] mb-8">
          Unser Vorstand
        </h1>

        <section className="mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=800&width=1200"
              alt="Vorstand des SV Schloßberg"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </section>

        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <p className="text-lg">
                Der Vorstand des SV Schloßberg setzt sich aus engagierten
                Mitgliedern zusammen, die sich ehrenamtlich für die Belange
                unseres Vereins einsetzen. Mit ihrer Erfahrung, ihrem
                Enthusiasmus und ihrer Leidenschaft für den Sport treiben sie
                die Entwicklung des Vereins voran und sorgen dafür, dass der SV
                Schloßberg eine wichtige Rolle in unserer Gemeinschaft spielt.
                Hier stellen wir Ihnen die Personen vor, die hinter den Kulissen
                für einen reibungslosen Ablauf und die Zukunft unseres Vereins
                sorgen.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {member.position}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
