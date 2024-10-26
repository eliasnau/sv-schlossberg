import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if ID is provided
    if (!params.id) {
      return NextResponse.json({ message: "ID is missing" }, { status: 400 });
    }

    // Retrieve the user by ID, including their groups
    const member = await db.user.findFirst({
      where: { id: params.id },
      include: {
        groups: true,
      },
    });

    // Check if the member was found
    if (!member) {
      return NextResponse.json(
        { message: "Member not found" },
        { status: 404 }
      );
    }

    // Return the found member
    return NextResponse.json({ member }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
