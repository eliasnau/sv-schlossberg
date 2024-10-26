"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function CompetitionForm({ competition, groups, onSave }) {
  const [updatedCompetition, setUpdatedCompetition] = useState(competition);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedCompetition({
      ...updatedCompetition,
      [e.target.name]: e.target.value,
    });
  };

  const handleGroupChange = (groupId: string, checked: boolean) => {
    if (checked) {
      setUpdatedCompetition({
        ...updatedCompetition,
        groups: [...updatedCompetition.groups, groupId],
      });
    } else {
      setUpdatedCompetition({
        ...updatedCompetition,
        groups: updatedCompetition.groups.filter((id) => id !== groupId),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedCompetition);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={updatedCompetition.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="date">Datum</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={updatedCompetition.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Beschreibung</Label>
          <Textarea
            id="description"
            name="description"
            value={updatedCompetition.description}
            onChange={handleChange}
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
        <div>
          <Label>Gruppen</Label>
          {groups.map((group) => (
            <div key={group.id} className="flex items-center space-x-2">
              <Checkbox
                id={`group-${group.id}`}
                checked={updatedCompetition.groups.includes(group.id)}
                onCheckedChange={(checked) =>
                  handleGroupChange(group.id, checked)
                }
              />
              <Label htmlFor={`group-${group.id}`}>{group.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Speichern
      </Button>
    </form>
  );
}
