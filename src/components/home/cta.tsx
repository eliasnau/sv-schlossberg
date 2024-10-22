import Link from "next/link";
import { Button } from "../ui/button";

export function CTA() {
  return (
    <section className="py-16 bg-[#1a5f1a] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
          Werde Teil unserer Gemeinschaft
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Egal ob als aktiver Sportler, ehrenamtlicher Helfer oder Unterstützer
          - bei uns findest du deinen Platz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/verein/mitgliedschaft">Jetzt Mitglied werden</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent hover:bg-white hover:text-[#1a5f1a]"
            asChild
          >
            <Link href="/kontakt">Kontaktiere uns</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
