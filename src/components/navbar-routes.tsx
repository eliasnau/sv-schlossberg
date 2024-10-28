"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto mr-2">
      {isAdminPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 " />
            Verlassen
          </Button>
        </Link>
      ) : (
        <Link href="/admin/sports">
          <Button size="sm" variant="ghost">
            Admin Mode
          </Button>
        </Link>
      )}
      <></>
    </div>
  );
};
