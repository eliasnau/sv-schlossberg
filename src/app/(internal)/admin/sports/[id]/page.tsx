/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SportDetails } from "./_components/edit-sport";
import { AgeGroups } from "./_components/age-groups";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function EditSportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  if (!sport) {
    return redirect("/admin/sports");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Sportart bearbeiten: {sport.name}
      </h1>

      <Tabs defaultValue="details" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Sportart Details</TabsTrigger>
          <TabsTrigger value="groups">Altersgruppen</TabsTrigger>
          <TabsTrigger value="competitions">Wettbewerbe</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <SportDetails initialData={sport as any} sportId={sport.id} />
        </TabsContent>
        <TabsContent value="groups">
          <AgeGroups initialData={sport as any} />
        </TabsContent>
        {/* <TabsContent value="competitions">
          <Competitions sport={sport as any} />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
