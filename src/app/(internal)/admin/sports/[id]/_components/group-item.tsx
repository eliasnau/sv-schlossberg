"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Edit2, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GroupForm } from "./group-form";
import { AgeGroup as PrismaAgeGroup } from "@prisma/client";

interface GroupItemProps {
  group: PrismaAgeGroup;
  onUpdate: (updatedGroup: PrismaAgeGroup) => void;
  onRemove: (id: string) => void;
}

export function GroupItem({ group, onUpdate, onRemove }: GroupItemProps) {
  const [groupItem, setGroupItem] = useState<PrismaAgeGroup>(group);
  const [isEditing, setIsEditing] = useState(false);

  // Effect to update the API whenever groupItem changes
  useEffect(() => {
    const updateGroup = async () => {
      try {
        console.log(JSON.stringify(groupItem));
        const response = await fetch(
          `/api/admin/sports/groups/${groupItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(groupItem),
          }
        );

        if (response.ok) {
          onUpdate(groupItem);
        } else {
          console.error("Failed to update group");
        }
      } catch (error) {
        console.error("Error updating group:", error);
      }
    };

    // Update the group only if it's not in edit mode
    if (!isEditing) {
      setIsEditing(false);
      updateGroup();
    }
  }, [groupItem, isEditing]);

  const handleSave = (updatedGroup: PrismaAgeGroup) => {
    setGroupItem(updatedGroup);
    setIsEditing(false);
  };

  return (
    <Card key={groupItem.id} className="mb-4">
      <CardHeader>
        <CardTitle>{groupItem.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <GroupForm
            group={groupItem}
            onSave={handleSave}
            setGroup={setGroupItem}
          />
        ) : (
          <>
            <p>
              <strong>Beschreibung:</strong> {groupItem.description}
            </p>
            {groupItem.image && (
              <Image
                src={groupItem.image}
                alt={groupItem.name}
                width={50}
                height={50}
              />
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Save /> : <Edit2 />}
        </Button>
        <Button onClick={() => onRemove(groupItem.id)} color="danger">
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}
