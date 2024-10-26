import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await db.user.findMany({
      include: {
        groups: true,
      },
    });
    return NextResponse.json({ members }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
