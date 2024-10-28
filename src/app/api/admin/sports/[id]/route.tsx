import { auth } from "@/auth";
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await auth();

    if (!(user?.user.role === "ADMIN") || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { id } = await params;

    const values = await req.json();

    const sport = await db.sport.update({
      where: {
        id: id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(sport);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
