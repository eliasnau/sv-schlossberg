"use client";

import {
  BarChart,
  ClipboardList,
  FolderClosed,
  Layout,
  Table,
  Trophy,
  Users,
  Volleyball,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const memberRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Trophy,
    label: "Wettkämpfe",
    href: "/members/competitions",
  },
  {
    icon: Table,
    label: "Trainingsplan",
    href: "/members/plan",
  },
];

const adminRoutes = [
  {
    icon: Volleyball,
    label: "Sportarten",
    href: "/admin/sports",
  },
  {
    icon: Users,
    label: "Mitglieder",
    href: "/admin/analytics",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    icon: Users,
    label: "Personen",
    href: "/admin/personen",
  },
  {
    icon: ClipboardList,
    label: "Vereinsseiten",
    href: "/admin/seiten",
  },
  {
    icon: FolderClosed,
    label: "Datein",
    href: "/admin/seiten",
  },
  {
    icon: BarChart,
    label: "Personen",
    href: "/admin/personen",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");

  const routes = isAdminPage ? adminRoutes : memberRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
