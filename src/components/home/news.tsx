import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function News() {
  return (
    <section className="py-16 bg-[#f0f4f0]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center text-[#1a5f1a]">
          Aktuelles & Termine
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[#1a5f1a]">
                Sommerfest 2024
              </h3>
              <p className="text-gray-700 mb-4">
                Am 15. Juli feiern wir unser jährliches Sommerfest. Sei dabei
                und erlebe einen Tag voller Sport, Spiel und guter Laune!
              </p>
              <Button variant="link" className="p-0 text-[#1a5f1a]" asChild>
                <Link href="/termine">Alle Termine ansehen</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[#1a5f1a]">
                Neue Yoga-Kurse
              </h3>
              <p className="text-gray-700 mb-4">
                Ab September erweitern wir unser Angebot um Yoga-Kurse für
                Anfänger und Fortgeschrittene. Melde dich jetzt an!
              </p>
              <Button variant="link" className="p-0 text-[#1a5f1a]" asChild>
                <Link href="/sportangebot">Zum Sportangebot</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
