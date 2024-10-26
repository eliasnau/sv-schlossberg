import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const groups = await db.ageGroup.findMany({
      include: {
        sport: true,
      },
    });
    return NextResponse.json({ groups }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
