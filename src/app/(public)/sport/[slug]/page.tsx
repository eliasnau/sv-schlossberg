import React from "react";
import SportPage from "./sport";
import { db } from "@/lib/db";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const href = slug.toLowerCase();

  const sport = await db.sport.findFirst({
    where: { href },
    include: {
      groups: {
        include: {
          trainingTimes: true,
        },
      },
    },
  });

  if (!sport) {
    return <h1>Sport nicht gefunden</h1>;
  }

  return <SportPage sport={sport} />;
}

export default Page;
