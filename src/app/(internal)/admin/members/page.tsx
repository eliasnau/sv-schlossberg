"use client";

import { useState, useEffect } from "react";
import { MembersDataTable } from "./members-data-table";
import axios from "axios";

// Mock data (this would typically come from an API call)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [membersList, setMembersList] = useState();

  useEffect(() => {
    const fetchMembers = async () => {
      await axios
        .get("/api/admin/members")
        .then((res) => {
          const data = res.data;
          console.log(data);
          if (!data || !data.members) return <p>Error</p>;
          setMembersList(data.members);
        })
        .catch((error) => {
          console.error("Error fetching members:", error);
          return <p>Error</p>;
        });
    };

    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mitgliederverwaltung</h1>
      {membersList ? (
        <MembersDataTable data={membersList} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
