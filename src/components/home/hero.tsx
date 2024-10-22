import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { DropdownMenuContent } from "../ui/dropdown-menu";
import Link from "next/link";

const sports = [
  { name: "Fußball", href: "/sportangebot/fussball" },
  { name: "Basketball", href: "/sportangebot/basketball" },
  { name: "Volleyball", href: "/sportangebot/volleyball" },
  { name: "Gymnastik", href: "/sportangebot/gymnastik" },
];

export function Hero() {
  return (
    <section className="relative bg-[url('/img/fussball.jpg?height=600&width=1200')] bg-cover bg-center py-32">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Willkommen beim SV Schloßberg
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Seit 1920 vereinen wir Sport, Gemeinschaft und Tradition in
            Schloßberg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="lg">
                  Sportart wählen <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sports.map((sport) => (
                  <DropdownMenuItem key={sport.name} asChild>
                    <Link href={sport.href}>{sport.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-[#1a5f1a] hover:bg-[#1a5f1a] hover:text-white"
              asChild
            >
              <Link href="/verein">
                Über uns <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
