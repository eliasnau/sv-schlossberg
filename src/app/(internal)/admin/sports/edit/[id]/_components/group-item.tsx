"use client";

import { useState } from "react";
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

export function GroupItem({ group, onUpdate, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedGroup) => {
    onUpdate(updatedGroup);
    setIsEditing(false);
  };

  return (
    <Card key={group.id} className="mb-4">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <GroupForm group={group} onSave={handleSave} />
        ) : (
          <>
            <p>
              <strong>Beschreibung:</strong> {group.description}
            </p>
            {group.image && (
              <div className="mt-4">
                <Image
                  src={group.image}
                  alt={group.name}
                  width={200}
                  height={200}
                />
              </div>
            )}
            <h4 className="font-semibold mt-4 mb-2">Trainingszeiten:</h4>
            <ul>
              {group.trainingTimes.map((time) => (
                <li key={time.id}>
                  {time.day}: {time.startTime} - {time.endTime}
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Trainingspläne:</h4>
            <ul>
              {group.trainingPlans.map((plan) => (
                <li key={plan.id}>
                  {plan.date}: {plan.description}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}>
            <Save className="h-4 w-4 mr-2" /> Speichern
          </Button>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" /> Bearbeiten
            </Button>
            <Button
              variant="destructive"
              className="ml-2"
              onClick={() => onRemove(group.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Entfernen
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
