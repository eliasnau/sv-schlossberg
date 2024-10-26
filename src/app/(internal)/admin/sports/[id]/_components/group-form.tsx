"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingTimeForm } from "./training-time-form";
import { TrainingPlanForm } from "./training-plan-form";
import { AgeGroup as PrismaAgeGroup } from "@prisma/client"; // Import AgeGroup type

interface TrainingTime {
  day: string; // e.g., "Monday"
  startTime: string; // e.g., "18:00"
  endTime: string; // e.g., "19:00"
}

interface TrainingPlan {
  id: string; // Add id for key usage
  day: string; // e.g., "Monday"
  description: string; // e.g., "Beginner Plan"
}

interface GroupFormProps {
  group: PrismaAgeGroup; // Use AgeGroup type here
  onSave: (group: AgeGroup) => void;
}

export function GroupForm({ group, onSave }: GroupFormProps) {
  const [updatedGroup, setUpdatedGroup] = useState<AgeGroup>(group);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedGroup({ ...updatedGroup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedGroup);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="training-times">Trainingszeiten</TabsTrigger>
          <TabsTrigger value="training-plans">Trainingspläne</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={updatedGroup.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                name="description"
                value={updatedGroup.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Bild</Label>
              <Input
                id="image"
                name="image"
                type="file"
                // Image upload functionality removed as requested
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="training-times">
          <TrainingTimeForm
            trainingTimes={updatedGroup.trainingTimes}
            onUpdate={(newTrainingTimes: TrainingTime[]) =>
              setUpdatedGroup({
                ...updatedGroup,
                trainingTimes: newTrainingTimes,
              })
            }
          />
        </TabsContent>
        <TabsContent value="training-plans">
          <TrainingPlanForm
            trainingPlans={updatedGroup.trainingPlans}
            onUpdate={(newTrainingPlans: TrainingPlan[]) =>
              setUpdatedGroup({
                ...updatedGroup,
                trainingPlans: newTrainingPlans,
              })
            }
          />
        </TabsContent>
      </Tabs>
      <Button type="submit" className="mt-4">
        Speichern
      </Button>
    </form>
  );
}
