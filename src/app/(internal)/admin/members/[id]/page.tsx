"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MemberEditForm } from "./member-edit-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data (this would typically come from an API call)
const mockMember = {
  id: "1",
  name: "Max Mustermann",
  email: "max.mustermann@example.com",
  age: 28,
  bio: "Enthusiastischer Fußballspieler und Trainer",
  image: "/placeholder.svg?height=200&width=200",
  sports: ["1", "2"],
  groups: ["1"],
};

const mockSports = [
  { id: "1", name: "Fußball" },
  { id: "2", name: "Volleyball" },
  { id: "3", name: "Basketball" },
];

const mockGroups = [
  { id: "1", name: "Erwachsene Fußball" },
  { id: "2", name: "Erwachsene Volleyball" },
  { id: "3", name: "Jugend Basketball" },
];

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch member data based on params.id
    // For now, we'll use mock data
    setMember({ ...mockMember, id: params.id });
    setIsLoading(false);
  }, [params.id]);

  const handleSave = async (updatedMember) => {
    // Here you would typically send the updated member data to your API
    console.log("Saving updated member:", updatedMember);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // After successful save, redirect to the members list
    router.push("/admin/members");
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!member) {
    return <div className="container mx-auto px-4 py-8">Member not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/members")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Mitgliederliste
      </Button>
      <h1 className="text-3xl font-bold mb-8">
        Mitglied bearbeiten: {member.name}
      </h1>
      <MemberEditForm
        member={member}
        sports={mockSports}
        groups={mockGroups}
        onSave={handleSave}
      />
    </div>
  );
}
