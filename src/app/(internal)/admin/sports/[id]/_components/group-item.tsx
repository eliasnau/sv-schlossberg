/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AgeGroup as PrismaAgeGroup } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupDetails } from "./group-details";
import { GroupTime } from "./group-time";

interface GroupItemProps {
  group: PrismaAgeGroup;
}

export function GroupItem({ group }: GroupItemProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <>
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="training-times">Trainingszeiten</TabsTrigger>
              <TabsTrigger value="training-plans">Trainingspläne</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <GroupDetails initialData={group as any} groupId={group.id} />
            </TabsContent>
            <TabsContent value="training-times">
              <GroupTime initialData={group as any} groupId={group.id} />
            </TabsContent>
          </Tabs>
          {/* <p>
              <strong>Beschreibung:</strong> {group.description}
            </p>
            {group.image && (
              <Image
                src={group.image}
                alt={group.name}
                width={50}
                height={50}
              />
            )} */}
        </>
      </CardContent>
      {/* <CardFooter className="flex space-x-2">
        {isEditing ? (
          <></>
        ) : (
          <Button onClick={() => setIsEditing(!isEditing)}>
            <Edit2 /> Bearbeiten
          </Button>
        )}
      </CardFooter> */}
    </Card>
  );
}
