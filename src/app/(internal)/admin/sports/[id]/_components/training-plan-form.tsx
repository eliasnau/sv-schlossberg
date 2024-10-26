"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
/* eslint-disable */

// Define the TrainingPlan interface
interface TrainingPlan {
  id: string; // Unique identifier for each plan
  date: string; // Date of the training
  description: string; // Description of the training
}

// Define the props for TrainingPlanForm
interface TrainingPlanFormProps {
  trainingPlans: TrainingPlan[];
  onUpdate: (trainingPlans: TrainingPlan[]) => void;
}

export function TrainingPlanForm({
  trainingPlans,
  onUpdate,
}: TrainingPlanFormProps) {
  const [newPlan, setNewPlan] = useState<TrainingPlan>({
    date: "",
    description: "",
    id: "",
  });

  const handleAddPlan = () => {
    const newTrainingPlan: TrainingPlan = {
      ...newPlan,
      id: Date.now().toString(),
    };
    onUpdate([...trainingPlans, newTrainingPlan]);
    setNewPlan({ date: "", description: "", id: "" });
  };

  const handleRemovePlan = (id: string) => {
    onUpdate(trainingPlans.filter((plan) => plan.id !== id));
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Datum</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Aktion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainingPlans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.date}</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemovePlan(plan.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <Input
          type="date"
          value={newPlan.date}
          onChange={(e) =>
            setNewPlan({ ...newPlan, date: e.target.value, id: newPlan.id })
          }
        />
        <Input
          value={newPlan.description}
          onChange={(e) =>
            setNewPlan({
              ...newPlan,
              description: e.target.value,
              id: newPlan.id,
            })
          }
          placeholder="Beschreibung"
        />
        <Button onClick={handleAddPlan}>
          <Plus className="h-4 w-4 mr-2" /> Hinzufügen
        </Button>
      </div>
    </div>
  );
}
