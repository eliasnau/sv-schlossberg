"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GroupForm } from "./group-form";
import { GroupItem } from "./group-item";

export function AgeGroups({ sport, setSport }) {
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleAddGroup = () => {
    setSport({
      ...sport,
      groups: [
        ...sport.groups,
        {
          ...newGroup,
          id: Date.now().toString(),
          trainingTimes: [],
          trainingPlans: [],
        },
      ],
    });
    setNewGroup({ name: "", description: "", image: "" });
  };

  const handleUpdateGroup = (updatedGroup) => {
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
