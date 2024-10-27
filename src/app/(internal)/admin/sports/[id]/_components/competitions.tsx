"use client";
/* eslint-disable */
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CompetitionForm } from "./competition-form";
import { CompetitionItem } from "./competition-item";

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

interface Sport {
  id: string;
  name: string;
  competitions: Competition[];
  groups: Group[];
}

interface CompetitionsProps {
  sport: Sport;
  setSport: any;
}

export function Competitions({ sport, setSport }: CompetitionsProps) {
  const [newCompetition, setNewCompetition] = useState<Competition>({
    id: "", // Temporary ID for new competitions
    name: "",
    date: "",
    description: "",
    groups: [],
    image: "",
  });

  const handleAddCompetition = (competition: Competition) => {
    setSport({
      ...sport,
      competitions: [
        ...sport.competitions,
        { ...competition, id: Date.now().toString() }, // Ensure unique ID
      ],
    });
    setNewCompetition({
      id: "", // Reset ID
      name: "",
      date: "",
      description: "",
      groups: [],
      image: "",
    });
  };

  const handleUpdateCompetition = (updatedCompetition: Competition) => {
    const updatedCompetitions = sport.competitions.map((comp) =>
      comp.id === updatedCompetition.id ? updatedCompetition : comp
    );
    setSport({ ...sport, competitions: updatedCompetitions });
  };

  const handleRemoveCompetition = (id: string) => {
    setSport({
      ...sport,
      competitions: sport.competitions.filter(
        (competition) => competition.id !== id
      ),
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Wettbewerbe</CardTitle>
      </CardHeader>
      <CardContent>
        {sport.competitions.map((competition) => (
          <CompetitionItem
            key={competition.id}
            competition={competition}
            groups={sport.groups}
            onUpdate={handleUpdateCompetition}
            onRemove={handleRemoveCompetition}
          />
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Wettbewerb hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Wettbewerb hinzufügen</DialogTitle>
            </DialogHeader>
            <CompetitionForm
              competition={newCompetition}
              groups={sport.groups}
              onSave={handleAddCompetition} // Pass the add function
            />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
