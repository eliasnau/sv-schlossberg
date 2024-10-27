import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sports = await db.sport.findMany({
      include: {
        groups: {
          include: {
            trainingTimes: true,
            trainingPlans: true,
          },
        },
      },
    });
    return NextResponse.json({ sports }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { name, description } = await request.json();

    // Validate the input
    if (!name || !description) {
      return NextResponse.json(
        { message: "Name and description are required" },
        { status: 400 }
      );
    }

    // Create a new sport in the database
    const newSport = await db.sport.create({
      data: {
        name,
        description,
      },
      include: {
        groups: true, // Include related groups if necessary
      },
    });

    // Return the created sport
    return NextResponse.json({ sport: newSport }, { status: 201 }); // 201 Created status
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
