import { Trophy, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function Features() {
  return (
    <section className="py-16 bg-[#f0f4f0]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white border-[#1a5f1a] border-2">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 mb-4 text-[#1a5f1a]" />
              <h3 className="text-lg font-semibold mb-2 text-[#1a5f1a]">
                Starke Gemeinschaft
              </h3>
              <p className="text-gray-700">
                Erlebe Teamgeist und Freundschaften über den Sport hinaus.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-[#1a5f1a] border-2">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Trophy className="h-12 w-12 mb-4 text-[#1a5f1a]" />
              <h3 className="text-lg font-semibold mb-2 text-[#1a5f1a]">
                Erfolgreiche Jugendarbeit
              </h3>
              <p className="text-gray-700">
                Wir fördern junge Talente und vermitteln Werte fürs Leben.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
