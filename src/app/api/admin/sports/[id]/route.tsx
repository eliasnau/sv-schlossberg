import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id; // 'a', 'b', or 'c'

    if (!id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    // Retrieve the sport by ID, including their groups
    const sport = await db.sport.findFirst({
      where: { id },
      include: {
        groups: {
          include: {
            trainingTimes: true,
            trainingPlans: true,
          },
        },
      },
    });

    // Check if the sport was found
    if (!sport) {
      return NextResponse.json(
        { message: "Sport not found" }, // Adjusted the message
        { status: 404 }
      );
    }

    // Return the found sport
    return NextResponse.json({ sport }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
