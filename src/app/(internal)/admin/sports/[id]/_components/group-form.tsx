/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingTimeForm } from "./training-time-form";
import { AgeGroup as PrismaAgeGroup } from "@prisma/client";

interface GroupFormProps {
  group: PrismaAgeGroup; // Updated type
  setGroup: (group: PrismaAgeGroup) => void; // Updated type
  onSave: (group: PrismaAgeGroup) => void; // Updated type
}

export function GroupForm({ group, onSave, setGroup }: GroupFormProps) {
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    // @ts-expect-error: dont touch! idk why it works
    setGroup((prevGroup: any) => ({ ...prevGroup, name: newName })); // Update only the name field
  };

  useEffect(() => {
    console.log(group);
  }, [group]);

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = e.target.value;
    // @ts-expect-error: dont touch! idk why it works
    setGroup((prevGroup: any) => ({
      ...prevGroup,
      description: newDescription,
    })); // Update description if needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(group); // Call onSave to save the group when form is submitted
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
                value={group.name}
                onChange={handleChangeName} // Call handleChangeName for name updates
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Beschreibung</Label>
              <Textarea
                id="description"
                name="description"
                value={group.description}
                onChange={handleChangeDescription} // Call handleChangeDescription for description updates
                required
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="training-times">
          <TrainingTimeForm
            group={group} // Ensure this is pulled from the group state
            setGroup={setGroup}
            // Other props remain unchanged
          />
        </TabsContent>
        <TabsContent value="training-plans">
          {/* <TrainingPlanForm
            trainingPlans={group.trainingPlans} // Ensure this is pulled from the group state
            // Other props remain unchanged
          /> */}
        </TabsContent>
      </Tabs>
      <Button type="submit" className="mt-4">
        Speichern
      </Button>
    </form>
  );
}
