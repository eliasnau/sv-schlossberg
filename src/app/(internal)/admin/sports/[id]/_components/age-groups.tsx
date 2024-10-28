/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GroupItem } from "./group-item";
import {
  AgeGroup as PrismaAgeGroup,
  TrainingPlan,
  TrainingTime,
} from "@prisma/client";

export interface AgeGroup extends PrismaAgeGroup {
  trainingTimes: TrainingTime[];
  trainingPlans: TrainingPlan[];
}

interface AgeGroupsProps {
  initialData: any;
}

export function AgeGroups({ initialData: sport }: AgeGroupsProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Altersgruppen</CardTitle>
      </CardHeader>
      <CardContent>
        {sport.groups.map(
          (group: {
            name: string;
            id: string;
            description: string;
            image: string | null;
            sportId: string;
            userId: string | null;
          }) => (
            <GroupItem key={group.id} group={group} />
          )
        )}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Input
            placeholder="Name"
            // value={newGroup.name}
            // onChange={() => {}} //(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          />
          <Input
            placeholder="Beschreibung"
            // value={newGroup.description}
            // onChange={(e) =>
            //   setNewGroup({ ...newGroup, description: e.target.value })
            // }
          />
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Gruppe hinzufügen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
