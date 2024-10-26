"use client";
/* eslint-disable */

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GroupItem } from "./group-item";
import {
  AgeGroup as PrismaAgeGroup,
  TrainingPlan,
  TrainingTime,
} from "@prisma/client"; // Importing AgeGroup from Prisma

// Define the AgeGroup type with additional properties
export interface AgeGroup extends PrismaAgeGroup {
  trainingTimes: TrainingTime[]; // Adjust these types based on your structure
  trainingPlans: TrainingPlan[];
}

interface Sport {
  id: string; // Assuming Sport has an id
  name: string; // Assuming Sport has a name
  description?: string; // Optional description
  groups: AgeGroup[];
}

interface AgeGroupsProps {
  sport: Sport;
  setSport: (sport: Sport) => void;
}

export function AgeGroups({ sport, setSport }: AgeGroupsProps) {
  const [newGroup, setNewGroup] = useState<AgeGroup>({
    id: "",
    name: "",
    description: "",
    image: null, // Initialize as null if optional
    trainingTimes: [], // Initialize as an empty array
    trainingPlans: [], // Initialize as an empty array
    sportId: sport.id, // Automatically associate the new group with the sport
  });

  const handleAddGroup = () => {
    if (!newGroup.name) return; // Prevent adding empty group

    setSport({
      ...sport,
      groups: [
        ...sport.groups,
        {
          ...newGroup,
          id: Date.now().toString(), // Generate a unique ID
        },
      ],
    });
    // Reset the new group state
    setNewGroup({
      id: "",
      name: "",
      description: "",
      image: null,
      trainingTimes: [],
      trainingPlans: [],
      sportId: sport.id,
    });
  };

  const handleUpdateGroup = (updatedGroup: AgeGroup) => {
    const updatedGroups = sport.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setSport({ ...sport, groups: updatedGroups });
  };

  const handleRemoveGroup = (id: string) => {
    setSport({
      ...sport,
      groups: sport.groups.filter((group) => group.id !== id),
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Altersgruppen</CardTitle>
      </CardHeader>
      <CardContent>
        {sport.groups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            onUpdate={handleUpdateGroup}
            onRemove={handleRemoveGroup}
          />
        ))}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Input
            placeholder="Name"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          />
          <Input
            placeholder="Beschreibung"
            value={newGroup.description}
            onChange={(e) =>
              setNewGroup({ ...newGroup, description: e.target.value })
            }
          />
          <Button onClick={handleAddGroup}>
            <Plus className="h-4 w-4 mr-2" /> Gruppe hinzufügen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
