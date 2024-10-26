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

export function MemberDetails({ member, onUpdateMember }) {
  const [editedMember, setEditedMember] = useState(member);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember({ ...editedMember, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateMember(editedMember);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mitgliedsdetails</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                <Label htmlFor="age">Alter</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={editedMember.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="bio">Biografie</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={editedMember.bio}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="image">Profilbild</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(e) => {
                    // Image upload functionality would be implemented here
                    console.log("File selected:", e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <Button type="submit" className="mt-4">
              Speichern
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src={member.image}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">Alter: {member.age}</p>
              </div>
            </div>
            <p>{member.bio}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Bearbeiten</Button>
        )}
      </CardFooter>
    </Card>
  );
}
