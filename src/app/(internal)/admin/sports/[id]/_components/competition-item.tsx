"use client";
/* eslint-disable */
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

interface Group {
  id: string;
  name: string;
}

interface Competition {
  id: string;
  name: string;
  date: string; // ISO string format
  description: string;
  image?: string; // Optional for image upload
  groups: string[]; // Array of group IDs
}

interface CompetitionItemProps {
  competition: Competition;
  groups: Group[];
  onUpdate: (updatedCompetition: Competition) => void;
  onRemove: (id: string) => void;
}

export function CompetitionItem({
  competition,
  groups,
  onUpdate,
  onRemove,
}: CompetitionItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedCompetition: Competition) => {
    onUpdate(updatedCompetition); // Ensure this receives the updated competition
    setIsEditing(false);
  };

  const handleCancel = () => {
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
            onSave={handleSave} // This should now correctly handle the Competition type
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
          <>
            <Button onClick={() => handleSave(competition)} className="mr-2">
              <Save className="h-4 w-4 mr-2" /> Speichern
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Abbrechen
            </Button>
          </>
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
