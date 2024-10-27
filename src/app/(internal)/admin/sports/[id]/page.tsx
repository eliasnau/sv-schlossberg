"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SportDetails } from "./_components/edit-sport";
import { AgeGroups } from "./_components/age-groups";
import { Competitions } from "./_components/competitions";
import axios from "axios";
import { useParams } from "next/navigation";

// Mock data (this would typically come from an API call)
const mockSport = {
  id: "1",
  name: "Laden...",
  description: "Laden...",
  image: "/placeholder.svg?height=200&width=200",
  groups: [
    {
      id: "1",
      name: "Jugend U12",
      description: "Für Kinder von 10-12 Jahren",
      image: "/placeholder.svg?height=200&width=200",
      trainingTimes: [
        { id: "1", day: "Montag", startTime: "16:00", endTime: "17:30" },
        { id: "2", day: "Mittwoch", startTime: "16:00", endTime: "17:30" },
      ],
      trainingPlans: [
        { id: "1", date: "2024-07-01", description: "Sommertraining Woche 1" },
        { id: "2", date: "2024-07-08", description: "Sommertraining Woche 2" },
      ],
    },
    {
      id: "2",
      name: "Laden...",
      description: "Laden...",
      image: "/placeholder.svg?height=200&width=200",
      trainingTimes: [
        { id: "3", day: "Dienstag", startTime: "19:00", endTime: "21:00" },
        { id: "4", day: "Donnerstag", startTime: "19:00", endTime: "21:00" },
      ],
      trainingPlans: [
        {
          id: "3",
          date: "2024-07-01",
          description: "Saisonvorbereitung Woche 1",
        },
        {
          id: "4",
          date: "2024-07-08",
          description: "Saisonvorbereitung Woche 2",
        },
      ],
    },
  ],
  competitions: [
    {
      id: "1",
      name: "Stadtmeisterschaft",
      date: "2024-06-15",
      description: "Jährliche Stadtmeisterschaft",
      groups: ["1", "2"],
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      name: "Jugendturnier",
      date: "2024-07-20",
      description: "Sommerturnier für Jugendliche",
      groups: ["1"],
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
};

export default function EditSportPage() {
  const [sport, setSport] = useState(mockSport);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await axios.get(`/api/admin/sports/${params.id}`);
        const data = res.data;
        console.log(data);
        if (!data || !data.sport) return; // Ensure data is valid
        console.log(data);
        setSport(data.sport);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send the updated sport data to your API
  //   console.log("Updated sport:", sport);
  //   // Then redirect back to the sports list or show a success message
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Sportart bearbeiten: {sport.name}
      </h1>

      <Tabs defaultValue="details" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Sportart Details</TabsTrigger>
          <TabsTrigger value="groups">Altersgruppen</TabsTrigger>
          <TabsTrigger value="competitions">Wettbewerbe</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <SportDetails sport={sport} setSport={setSport} />
        </TabsContent>
        <TabsContent value="groups">
          <AgeGroups sport={sport} setSport={setSport} />
        </TabsContent>
        <TabsContent value="competitions">
          <Competitions sport={sport} setSport={setSport} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
