"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function MemberSports({ member, sports, groups, onUpdateMember }) {
  const [editedSports, setEditedSports] = useState(member.sports);
  const [editedGroups, setEditedGroups] = useState(member.groups);

  const handleSportChange = (sportId) => {
    setEditedSports(
      editedSports.includes(sportId)
        ? editedSports.filter((id) => id !== sportId)
        : [...editedSports, sportId]
    );
  };

  const handleGroupChange = (groupId) => {
    setEditedGroups(
      editedGroups.includes(groupId)
        ? editedGroups.filter((id) => id !== groupId)
        : [...editedGroups, groupId]
    );
  };

  const handleSubmit = () => {
    onUpdateMember({ ...member, sports: editedSports, groups: editedGroups });
  };

  return (
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
                  checked={editedSports.includes(sport.id)}
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
                  checked={editedGroups.includes(group.id)}
                  onCheckedChange={() => handleGroupChange(group.id)}
                />
                <Label htmlFor={`group-${group.id}`}>{group.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit}>Änderungen speichern</Button>
      </CardFooter>
    </Card>
  );
}
