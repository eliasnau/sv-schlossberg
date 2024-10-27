"use client";
/* eslint-disable */
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { MemberEditForm } from "./member-edit-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

// Define types for member, sport, and group
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

// Mock data (this would typically come from an API call)
const mockMember: Member = {
  id: "1",
  name: "Max Mustermann",
  email: "max.mustermann@example.com",
  age: 28,
  bio: "Enthusiastischer Fußballspieler und Trainer",
  image: "/placeholder.svg?height=200&width=200",
  sports: ["1", "2"],
  groups: ["1"],
};

const mockSports: Sport[] = [
  { id: "1", name: "Fußball" },
  { id: "2", name: "Volleyball" },
  { id: "3", name: "Basketball" },
];

const mockGroups: Group[] = [
  { id: "1", name: "Erwachsene Fußball" },
  { id: "2", name: "Erwachsene Volleyball" },
  { id: "3", name: "Jugend Basketball" },
];

export default function EditMemberPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`/api/admin/members/${params.id}`);
        const data = res.data;
        if (!data || !data.member) throw new Error("Member not found");
        setMember(data.member);
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGroups = async () => {
      try {
        const res = await axios.get(`/api/admin/groups`);
        const data = res.data;
        if (!data || !data.groups) throw new Error("Groups not found");
        setGroups(data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchMember();
    fetchGroups();
  }, [params.id]);

  const handleSave = async (updatedMember: Member) => {
    console.log("Saving updated member:", updatedMember);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Redirect to the members list
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
        onClick={() => router.push("/admin/members")} // Redirecting to the members list
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
        groups={groups}
        onSave={handleSave}
      />
    </div>
  );
}
