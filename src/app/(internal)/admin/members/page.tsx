"use client";

import { useState, useEffect } from "react";
import { MembersDataTable } from "./members-data-table";

// Mock data (this would typically come from an API call)
const mockMembers = [
  {
    id: "1",
    name: "Max Mustermann",
    email: "max.mustermann@example.com",
    age: 28,
    sports: ["Fußball", "Volleyball"],
  },
  {
    id: "2",
    name: "Anna Schmidt",
    email: "anna.schmidt@example.com",
    age: 32,
    sports: ["Volleyball"],
  },
  {
    id: "3",
    name: "Lukas Weber",
    email: "lukas.weber@example.com",
    age: 25,
    sports: ["Fußball", "Basketball"],
  },
];

export default function MemberManagementPage() {
  const [members, setMembers] = useState(mockMembers);

  useEffect(() => {
    // Fetch members data
    // For now, we're using mock data
    setMembers(mockMembers);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mitgliederverwaltung</h1>
      <MembersDataTable data={members} />
    </div>
  );
}
