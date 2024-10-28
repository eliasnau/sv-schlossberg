import * as React from "react";
import { ClientNavbar } from "./navbar-component";
import { db } from "@/lib/db";

export async function Navbar() {
  const sports = await db.sport.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return <ClientNavbar sports={sports} />;
}
