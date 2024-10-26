"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MemberEditForm({ member, sports, groups, onSave }) {
  const [editedMember, setEditedMember] = useState(member);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember({ ...editedMember, [name]: value });
  };

  const handleSportChange = (sportId) => {
    const updatedSports = editedMember.sports.includes(sportId)
      ? editedMember.sports.filter((id) => id !== sportId)
      : [...editedMember.sports, sportId];
    setEditedMember({ ...editedMember, sports: updatedSports });
  };

  const handleGroupChange = (groupId) => {
    const updatedGroups = editedMember.groups.includes(groupId)
      ? editedMember.groups.filter((id) => id !== groupId)
      : [...editedMember.groups, groupId];
    setEditedMember({ ...editedMember, groups: updatedGroups });
  };

  const handleSubmit = async (e) => {
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
                  <h3 className="text-lg font-semibold mb-2">Sportarten</h3>
                  {sports.map((sport) => (
                    <div key={sport.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sport-${sport.id}`}
                        checked={editedMember.sports.includes(sport.id)}
                        onCheckedChange={() => handleSportChange(sport.id)}
                      />
                      <Label htmlFor={`sport-${sport.id}`}>{sport.name}</Label>
                    </div>
                  ))}
                </div>
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
