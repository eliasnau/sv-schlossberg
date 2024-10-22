"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SproutIcon, Menu } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion"; // Framer Motion import

export function Navbar() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Schließen des Menüs, wenn außerhalb geklickt wird
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".dropdown-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-[#1a5f1a] text-white shadow-md relative">
      <nav className="container mx-auto px-4 py-4 flex items-center">
        <Link href="/" className="text-2xl font-bold flex items-center mr-auto">
          <Image
            src="/img/logo2.jpg"
            alt="SV Schloßberg Logo"
            width={40}
            height={40}
            className="mr-2 rounded-full"
          />
          SV Schloßberg
        </Link>

        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Sportarten</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <SproutIcon className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Finde deine Sportart
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Finde mit unsererm Interactiven Sportsfinder deine
                            Sportart. Beantworte ein paar Fragen und erhalte in
                            wenigen Minuten den perfekten Sport.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {/* Weitere ListItems hier... */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/verein" className={navigationMenuTriggerStyle()}>
                  Verein
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/kontakt" className={navigationMenuTriggerStyle()}>
                  Kontakt
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Sponsoren
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <button className="lg:hidden ml-4" onClick={toggleMenu}>
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Menu />
          </motion.div>
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-[#1a5f1a] w-full text-left shadow-lg z-50 dropdown-menu flex">
            <NavigationMenu>
              <ul className="flex flex-col w-full">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/"
                      className={`${navigationMenuTriggerStyle()} text-center w-full`}
                    >
                      Sportarten
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/verein"
                      className={`${navigationMenuTriggerStyle()} text-center w-full`}
                    >
                      Verein
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/kontakt"
                      className={`${navigationMenuTriggerStyle()} text-center w-full`}
                    >
                      Kontakt
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/docs"
                      className={`${navigationMenuTriggerStyle()} text-center w-full`}
                    >
                      Sponsoren
                    </Link>
                  </NavigationMenuLink>
                </li>
                {/* Weitere Links hier... */}
              </ul>
            </NavigationMenu>
          </div>
        )}
      </nav>
    </header>
  );
}
