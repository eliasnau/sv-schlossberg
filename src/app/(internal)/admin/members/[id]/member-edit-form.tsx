"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

// Define types for the props
interface Member {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
  image: string;
  sports: string[];
  groups: string[];
}

interface Sport {
  id: string;
  name: string;
}

interface Group {
  id: string;
  name: string;
}

interface MemberEditFormProps {
  member: Member;
  sports: Sport[];
  groups: Group[];
  onSave: (member: Member) => Promise<void>;
}

export function MemberEditForm({
  member,
  groups,
  onSave,
}: MemberEditFormProps) {
  const [editedMember, setEditedMember] = useState<Member>(member);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedMember({ ...editedMember, [name]: value });
  };

  const handleSportChange = (sportId: string) => {
    const updatedSports = editedMember.groups.includes(sportId)
      ? editedMember.sports.filter((id) => id !== sportId)
      : [...editedMember.sports, sportId];
    setEditedMember({ ...editedMember, sports: updatedSports });
  };

  const handleGroupChange = (groupId: string) => {
    const updatedGroups = editedMember.groups.includes(groupId)
      ? editedMember.groups.filter((id) => id !== groupId)
      : [...editedMember.groups, groupId];
    setEditedMember({ ...editedMember, groups: updatedGroups });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(editedMember);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList>
          <TabsTrigger value="personal">Persönliche Informationen</TabsTrigger>
          <TabsTrigger value="sports">Sportarten & Gruppen</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Persönliche Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={editedMember.image}
                  alt={editedMember.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <div>
                  <Label htmlFor="image">Profilbild</Label>
                  <Input id="image" name="image" type="file" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedMember.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedMember.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Alter</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={editedMember.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Biografie</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={editedMember.bio}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sports">
          <Card>
            <CardHeader>
              <CardTitle>Sportarten & Gruppen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Gruppen</h3>
                  {groups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={editedMember.groups.includes(group.id)}
                        onCheckedChange={() => handleGroupChange(group.id)}
                      />
                      <Label htmlFor={`group-${group.id}`}>{group.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Speichern..." : "Änderungen speichern"}
        </Button>
      </div>
    </form>
  );
}
