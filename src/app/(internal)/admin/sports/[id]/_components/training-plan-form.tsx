"use client";

import { useState, useEffect } from "react";
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

interface TrainingPlan {
  id: string;
  date: string;
  description: string;
}

interface TrainingPlanFormProps {
  groupId: string; // Pass groupId as a prop
  trainingPlans: TrainingPlan[];
  onUpdate: (trainingPlans: TrainingPlan[]) => void;
}

export function TrainingPlanForm({
  groupId,
  trainingPlans,
  onUpdate,
}: TrainingPlanFormProps) {
  const [newPlan, setNewPlan] = useState<TrainingPlan>({
    date: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      const response = await fetch(
        `/api/admin/sports/groups/${groupId}/training-plans`
      );
      const data = await response.json();
      onUpdate(data); // Initialize state with fetched data
    };

    fetchTrainingPlans();
  }, [groupId, onUpdate]);

  const handleAddPlan = async () => {
    const response = await fetch(
      `/api/admin/sports/groups/${groupId}/training-plans`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlan),
      }
    );
    const addedPlan = await response.json();
    onUpdate([...trainingPlans, { ...addedPlan, id: Date.now().toString() }]);
    setNewPlan({ date: "", description: "", id: "" });
  };

  const handleRemovePlan = async (id: string) => {
    await fetch(`/api/admin/sports/groups/${groupId}/training-plans/${id}`, {
      method: "DELETE",
    });
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
