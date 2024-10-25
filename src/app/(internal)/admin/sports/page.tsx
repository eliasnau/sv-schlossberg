import { auth } from "@/auth";
import React from "react";

async function Sports() {
  const user = await auth();

  if (!user || user.user.role !== "ADMIN") {
    return <div>You need to be admin in to access this page.</div>;
  }

  return <div>Sports</div>;
}

export default Sports;
