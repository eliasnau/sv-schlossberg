import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const user = await auth();

    if (!(user?.user.role === "ADMIN") || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { groupId } = await params;

    const { startTime, endTime, day } = await req.json();

    const group = await db.trainingTime.create({
      data: {
        startTime,
        endTime,
        day,
        ageGroupId: groupId,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[idk]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const user = await auth();

    if (!(user?.user.role === "ADMIN") || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { groupId } = await params;

    const group = await db.trainingTime.delete({
      where: {
        id: groupId,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.log("[idk]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
