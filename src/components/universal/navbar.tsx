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
import { motion } from "framer-motion"; // Framer Motion import
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Leichtathletik",
    href: "/sport/leichtathletik",
    description: "Bester Sport.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Navbar() {
  const [isMenuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close the menu when clicking outside
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
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
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

        {/* Desktop buttons for Login and Probetermin */}
        <div className="hidden lg:flex lg:space-x-4 ml-8">
          <Button className="bg-white text-[#1a5f1a]">Login</Button>
          <Link href="/probetermin">
            <Button className="bg-[#ffcc00] text-[#1a5f1a]">Probetermin</Button>
          </Link>
        </div>

        {/* Hamburger menu for mobile view */}
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
