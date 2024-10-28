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
import { Menu } from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import UserButton from "../user-button";

interface Sport {
  id: string;
  name: string;
  description: string | null;
}
export function ClientNavbar({ sports }: { sports: Sport[] }) {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as HTMLElement).closest(".dropdown-menu")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="bg-[#1a5f1a] text-white shadow-md relative">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
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
        <div className="flex-grow flex justify-center">
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Sportarten</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {sports ? (
                        sports.map((sport) => (
                          <ListItem
                            key={sport.id}
                            title={sport.name}
                            href={`/sport/${sport.name.toLowerCase()}`}
                          >
                            {sport.description || "Beschreibung fehlt."}
                          </ListItem>
                        ))
                      ) : (
                        <ListItem key={0} title="Keine Sportarten erstellt" />
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/verein" className={navigationMenuTriggerStyle()}>
                    Verein
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/kontakt"
                    className={navigationMenuTriggerStyle()}
                  >
                    Kontakt
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Sponsoren
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="hidden lg:flex lg:space-x-4 ml-8">
          <UserButton />
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
                {sports.map((sport: Sport) => (
                  <li key={sport.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/sport/${sport.name.toLowerCase()}`}
                        className={`${navigationMenuTriggerStyle()} text-center w-full`}
                      >
                        {sport.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
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
              </ul>
            </NavigationMenu>
          </div>
        )}
      </nav>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
