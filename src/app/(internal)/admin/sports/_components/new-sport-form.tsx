"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SportsFormProps {
  onSubmit: (name: string, description: string) => void; // Prop for submission
}

export function SportsForm({ onSubmit }: SportsFormProps) {
  const [name, setName] = useState<string>(""); // Initialize as empty string
  const [description, setDescription] = useState<string>(""); // Initialize as empty string

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, description); // Call the onSubmit prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Corrected onChange
          />
        </div>
        <div>
          <Label htmlFor="description">Beschreibung</Label>
          <Textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Corrected onChange
          />
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Hinzufügen
      </Button>
    </form>
  );
}
