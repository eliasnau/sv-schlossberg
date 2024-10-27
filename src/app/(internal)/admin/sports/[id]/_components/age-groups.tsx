/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
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
import axios from "axios";

export interface AgeGroup extends PrismaAgeGroup {
  trainingTimes: TrainingTime[];
  trainingPlans: TrainingPlan[];
}

interface AgeGroupsProps {
  sport: any;
  setSport: any;
}

export function AgeGroups({ sport, setSport }: AgeGroupsProps) {
  //@ts-expect-error: works
  const [newGroup, setNewGroup] = useState<AgeGroup>({
    id: "",
    name: "",
    description: "",
    image: null,
    trainingTimes: [],
    trainingPlans: [],
    sportId: sport.id,
  });

  useEffect(() => {
    // const fetchGroups = async () => {
    //   try {
    //     const response = await axios.get("/api/age-groups");
    //     // Update the sport state with fetched groups
    //     setSport((prevSport) => ({ ...prevSport, groups: response.data }));
    //   } catch (error) {
    //     console.error("Error fetching groups:", error);
    //   }
    // };
    // fetchGroups();
  }, [sport.id, setSport]);

  const handleAddGroup = async () => {
    if (!newGroup.name) return;

    try {
      const response = await axios.post("/api/admin/sports/groups", newGroup);
      if (response.status === 201) {
        const createdGroup = response.data; // No need to destructure 'newGroup'
        //@ts-expect-error: works
        setSport((prevSport) => ({
          ...prevSport,
          groups: [...prevSport.groups, createdGroup],
        }));
      } else {
        console.error("Failed to add group");
      }
    } catch (err) {
      console.error("Error adding group:", err);
    }

    // Reset the newGroup state after adding
    setNewGroup({ ...newGroup, name: "", description: "" });
  };

  const handleUpdateGroup = async (updatedGroup: AgeGroup) => {
    try {
      const response = await axios.put(
        "/api/admin/sports/groups",
        updatedGroup
      );
      if (response.status === 200) {
        //@ts-expect-error: works
        setSport((prevSport) => ({
          ...prevSport,
          groups: prevSport.groups.map((group: any) =>
            group.id === updatedGroup.id ? response.data.updatedGroup : group
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleRemoveGroup = async (id: string) => {
    try {
      await axios.delete(`/api/admin/sports/groups`, { data: { id } }); // Send the ID in the request body
      //@ts-expect-error: works
      setSport((prevSport) => ({
        ...prevSport,
        groups: prevSport.groups.filter((group: any) => group.id !== id),
      }));
    } catch (error) {
      console.error("Error removing group:", error);
    }
  };

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
            <GroupItem
              key={group.id}
              group={group}
              //@ts-expect-error: works
              onUpdate={handleUpdateGroup}
              onRemove={handleRemoveGroup}
            />
          )
        )}
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
