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
import { CompetitionForm } from "./competition-form";

export function CompetitionItem({ competition, groups, onUpdate, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedCompetition) => {
    onUpdate(updatedCompetition);
    setIsEditing(false);
  };

  return (
    <Card key={competition.id} className="mb-4">
      <CardHeader>
        <CardTitle>{competition.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <CompetitionForm
            competition={competition}
            groups={groups}
            onSave={handleSave}
          />
        ) : (
          <>
            <p>
              <strong>Datum:</strong> {competition.date}
            </p>
            <p>
              <strong>Beschreibung:</strong> {competition.description}
            </p>
            <p>
              <strong>Gruppen:</strong>{" "}
              {competition.groups
                .map((id) => groups.find((g) => g.id === id)?.name)
                .join(", ")}
            </p>
            {competition.image && (
              <div className="mt-4">
                <Image
                  src={competition.image}
                  alt={competition.name}
                  width={200}
                  height={200}
                />
              </div>
            )}
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
              onClick={() => onRemove(competition.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Entfernen
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
