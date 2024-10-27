import { Mail, Phone, Printer, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-[#1a5f1a] mb-8">Kontakt</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Geschäftsstelle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              SV Schloßberg Stephanskirchen e. V.
              <br />
              Walderingerstr. 80
              <br />
              83071 Stephanskirchen
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#1a5f1a]" />
                <span>+49 8036 2368</span>
              </div>
              <div className="flex items-center">
                <Printer className="mr-2 h-5 w-5 text-[#1a5f1a]" />
                <span>+49 8036 3031898</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#1a5f1a]" />
                <a
                  href="mailto:info@sv-schlossberg.de"
                  className="text-blue-600 hover:underline"
                >
                  info@sv-schlossberg.de
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Öffnungszeiten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Clock className="mr-2 h-5 w-5 text-[#1a5f1a]" />
              <span>Mittwoch von 18:30 - 19:30 Uhr</span>
            </div>
            <p className="text-sm text-muted-foreground">
              In der Ferienzeit ist die Geschäftsstelle geschlossen. Per Email
              sind wir erreichbar unter{" "}
              <a
                href="mailto:info@sv-schlossberg.de"
                className="text-blue-600 hover:underline"
              >
                info@sv-schlossberg.de
              </a>{" "}
              oder über{" "}
              <a
                href="mailto:Vorstand@sv-schlossberg.de"
                className="text-blue-600 hover:underline"
              >
                Vorstand@sv-schlossberg.de
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Ansprechpartner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#1a5f1a] flex items-center justify-center text-white text-2xl font-bold">
              GH
            </div>
            <div>
              <h3 className="text-xl font-semibold">Gabi Hell</h3>
              <div className="flex items-center mt-2">
                <Mail className="mr-2 h-5 w-5 text-[#1a5f1a]" />
                <a
                  href="mailto:info@sv-schlossberg.de"
                  className="text-blue-600 hover:underline"
                >
                  info@sv-schlossberg.de
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
