import { auth } from "@/auth";
import React from "react";

async function Sports() {
  const user = await auth();
  console.log(user);

  if (!(user?.user.role === "ADMIN") || !user) {
    return <p>You need to be an Admin to view that page</p>;
  }

  return <div>Sports</div>;
}

export default Sports;
