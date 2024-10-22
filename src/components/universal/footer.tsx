import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
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
                href="https://www.facebook.com/SVSchlossbergHerren/?locale=de_DE"
                className="hover:text-[#a3d9a3] transition-colors duration-300"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/svs_leichtathletik/"
                className="hover:text-[#a3d9a3] transition-colors duration-300"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-[#a3d9a3] transition-colors duration-300 hidden"
              >
                <Twitter size={24} />
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
  );
}
