/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { SportsDataTable } from "./sports-data-table";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SportsForm } from "./_components/new-sport-form";

export default function MemberManagementPage() {
  const [sportsList, setSportsList] = useState<any[]>([]); // Initialize as an empty array
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog open/close

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await axios.get("/api/admin/sports");
        const data = res.data;
        console.log(data);
        if (!data || !data.sports) return; // Ensure data is valid
        console.log(data);
        setSportsList(data.sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, []);

  const handleSubmit = async (name: string, description: string) => {
    try {
      const response = await axios.post("/api/admin/sports", {
        name,
        description,
      }); // Make request to add new sport
      const newSport = response.data; // Assuming the API returns the new sport
      setSportsList((prev) => [...prev, newSport]); // Update sports list with the new sport
      setDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Error adding sport:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sportarten</h1>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Sportart hinzufügen
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neue Sportart hinzufügen</DialogTitle>
          </DialogHeader>
          <SportsForm onSubmit={handleSubmit} />{" "}
          {/* Pass the handleSubmit function */}
        </DialogContent>
      </Dialog>
      {sportsList.length > 0 ? (
        <SportsDataTable data={sportsList} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
