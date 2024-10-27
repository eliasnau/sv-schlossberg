import { db } from "@/lib/db"; // Import the Prisma client

// GET all age groups
export async function GET() {
  try {
    const ageGroups = await db.ageGroup.findMany();
    return new Response(JSON.stringify(ageGroups), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching age groups:", error);
    return new Response("Error fetching age groups", { status: 500 });
  }
}

// POST a new age group
export async function POST(request: Request) {
  const { name, description, image, sportId, userId } = await request.json();

  try {
    const newAgeGroup = await db.ageGroup.create({
      data: {
        name,
        description,
        image,
        sportId,
        userId,
      },
    });

    return new Response(JSON.stringify(newAgeGroup), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating age group:", error);
    return new Response("Error creating age group", { status: 500 });
  }
}

// PUT (update) an age group
export async function PUT(request: Request) {
  const { id, name, description, image, sportId, userId, trainingTimes } =
    await request.json();

  try {
    // Update the age group and handle trainingTimes
    const updatedAgeGroup = await db.ageGroup.update({
      where: { id },
      data: {
        name,
        description,
        image,
        sportId,
        userId,
        // Handle trainingTimes here
        trainingTimes: {
          // Upsert training times: create if not exists or update if exists
          upsert: trainingTimes.map(
            (time: {
              id: string;
              day: string;
              startTime: string;
              endTime: string;
            }) => ({
              where: { id: time.id || "" }, // Adjust to use the ID or a temporary empty string for new entries
              create: {
                day: time.day,
                startTime: time.startTime,
                endTime: time.endTime,
              },
              update: {
                day: time.day,
                startTime: time.startTime,
                endTime: time.endTime,
              },
            })
          ),
        },
      },
    });

    return new Response(JSON.stringify(updatedAgeGroup), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating age group:", error);
    return new Response("Error updating age group", { status: 500 });
  }
}

// DELETE an age group
export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    await db.ageGroup.delete({
      where: { id },
    });

    return new Response("Age group deleted", { status: 204 });
  } catch (error) {
    console.error("Error deleting age group:", error);
    return new Response("Error deleting age group", { status: 500 });
  }
}
