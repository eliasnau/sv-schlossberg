"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const UserButton = () => {
  const userButtonItems = [
    {
      label: "Startseite",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Wettkämpfe",
      href: "/competitions",
      icon: Trophy,
    },
    {
      label: "Mitgliedschaft",
      href: "/payments",
      icon: CreditCard,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  //

  const router = useRouter();
  const session = useCurrentUser();

  const onClick = () => {
    router.push("/login");
  };
  const Logout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <>
      {!session ? (
        <>
          <div>
            <Link
              href="/login"
              className="flex md:hidden items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:bg-primary/10 px-2 py-2"
            >
              <LogOut className="h-5.5 w-5" />
            </Link>

            <Button
              type="submit"
              onClick={onClick}
              className="px-5 rounded-md hidden md:flex"
            >
              Probetermin
            </Button>
          </div>
          <div>
            <Link
              href="/probetermin"
              className="flex md:hidden items-center justify-center rounded-lg cursor-pointer transition duration-300 hover:bg-primary/10 px-2 py-2"
            >
              <LogOut className="h-5.5 w-5" />
            </Link>

            <Button
              type="submit"
              onClick={onClick}
              className="px-5 rounded-md hidden md:flex"
            >
              Login
            </Button>
          </div>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* User Avatar / Logo */}
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.image ? session.image : ""} alt="pfp" />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700"></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {/* Content */}
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel className="py-0 pt-1">
              {session?.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="opacity-70 text-sm font-normal">
              {session?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Main Icons */}
            <DropdownMenuGroup>
              {userButtonItems.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={item.href} className="flex">
                    <item.icon className="mr-2 mt-0.5 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {/* Logout Button */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={Logout} className="cursor-pointer">
              <LogOut className="mr-2 mt-0.5 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default UserButton;
