/* eslint-disable */
"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would typically come from an API call
const mockSport = {
  id: "1",
  name: "Fußball",
  description: "Fußball für alle Altersgruppen",
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
      name: "Erwachsene",
      description: "Ab 18 Jahren",
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

const daysOfWeek = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

export default function EditSportPage() {
  //const router = useRouter();
  //const { id } = "hallo"; //router.query;

  const [sport, setSport] = useState(mockSport);
  const [editingCard, setEditingCard] = useState(null);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [newCompetition, setNewCompetition] = useState({
    name: "",
    date: "",
    description: "",
    groups: [],
    image: "",
  });
  const [newTrainingTime, setNewTrainingTime] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const [newTrainingPlan, setNewTrainingPlan] = useState({
    date: "",
    description: "",
  });
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    // Fetch sport data based on id
    // For now, we're using mock data
    setSport(mockSport);
  }, []);

  const handleSportChange = (e: { target: { name: any; value: any } }) => {
    setSport({ ...sport, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    id = null
  ) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "sport") {
          setSport({ ...sport, image: reader.result });
        } else if (type === "group") {
          const updatedGroups = sport.groups.map((group) =>
            group.id === id ? { ...group, image: reader.result } : group
          );
          setSport({ ...sport, groups: updatedGroups });
        } else if (type === "competition") {
          const updatedCompetitions = sport.competitions.map((comp) =>
            comp.id === id ? { ...comp, image: reader.result } : comp
          );
          setSport({ ...sport, competitions: updatedCompetitions });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGroup = () => {
    setSport({
      ...sport,
      groups: [
        ...sport.groups,
        {
          ...newGroup,
          id: Date.now().toString(),
          trainingTimes: [],
          trainingPlans: [],
        },
      ],
    });
    setNewGroup({ name: "", description: "", image: "" });
  };

  const handleUpdateGroup = (updatedGroup: {
    id: any;
    name?: string;
    description?: string;
    image?: string;
    trainingTimes?: {
      id: string;
      day: string;
      startTime: string;
      endTime: string;
    }[];
    trainingPlans?: { id: string; date: string; description: string }[];
  }) => {
    const updatedGroups = sport.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setSport({ ...sport, groups: updatedGroups });
    setEditingCard(null);
  };

  const handleRemoveGroup = (id: string) => {
    setSport({
      ...sport,
      groups: sport.groups.filter((group) => group.id !== id),
    });
  };

  const handleAddCompetition = () => {
    setSport({
      ...sport,
      competitions: [
        ...sport.competitions,
        { ...newCompetition, id: Date.now().toString() },
      ],
    });
    setNewCompetition({
      name: "",
      date: "",
      description: "",
      groups: [],
      image: "",
    });
  };

  const handleUpdateCompetition = (updatedCompetition: {
    id: any;
    name?: string;
    date?: string;
    description?: string;
    groups?: string[];
    image?: string;
  }) => {
    const updatedCompetitions = sport.competitions.map((comp) =>
      comp.id === updatedCompetition.id ? updatedCompetition : comp
    );
    setSport({ ...sport, competitions: updatedCompetitions });
    setEditingCard(null);
  };

  const handleRemoveCompetition = (id: string) => {
    setSport({
      ...sport,
      competitions: sport.competitions.filter(
        (competition) => competition.id !== id
      ),
    });
  };

  const handleAddTrainingTime = () => {
    const updatedGroups = sport.groups.map((group) => {
      if (group.id === selectedGroupId) {
        return {
          ...group,
          trainingTimes: [
            ...group.trainingTimes,
            { ...newTrainingTime, id: Date.now().toString() },
          ],
        };
      }
      return group;
    });
    setSport({ ...sport, groups: updatedGroups });
    setNewTrainingTime({ day: "", startTime: "", endTime: "" });
  };

  const handleAddTrainingPlan = () => {
    const updatedGroups = sport.groups.map((group) => {
      if (group.id === selectedGroupId) {
        return {
          ...group,
          trainingPlans: [
            ...group.trainingPlans,
            { ...newTrainingPlan, id: Date.now().toString() },
          ],
        };
      }
      return group;
    });
    setSport({ ...sport, groups: updatedGroups });
    setNewTrainingPlan({ date: "", description: "" });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Here you would typically send the updated sport data to your API
    console.log("Updated sport:", sport);
    // Then redirect back to the sports list or show a success message
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Sportart bearbeiten: {sport.name}
      </h1>

      {/* Sport Details Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sportart Details</CardTitle>
        </CardHeader>
        <CardContent>
          {editingCard === "sport" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditingCard(null);
              }}
            >
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={sport.name}
                    onChange={handleSportChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Beschreibung</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={sport.description}
                    onChange={handleSportChange}
                  />
                </div>
                <div>
                  <Label htmlFor="sportImage">Bild</Label>
                  <Input
                    id="sportImage"
                    type="file"
                    onChange={(e) => handleImageUpload(e, "sport")}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Speichern
              </Button>
            </form>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {sport.name}
              </p>
              <p>
                <strong>Beschreibung:</strong> {sport.description}
              </p>
              {sport.image && (
                <div className="mt-4">
                  <Image
                    src={sport.image}
                    alt={sport.name}
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          {editingCard === "sport" ? (
            <Button onClick={() => setEditingCard(null)}>
              <Save className="h-4 w-4 mr-2" /> Speichern
            </Button>
          ) : (
            <Button onClick={() => setEditingCard("sport")}>
              <Edit2 className="h-4 w-4 mr-2" /> Bearbeiten
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Age Groups Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Altersgruppen</CardTitle>
        </CardHeader>
        <CardContent>
          {sport.groups.map((group) => (
            <Card key={group.id} className="mb-4">
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {editingCard === `group-${group.id}` ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateGroup(group);
                    }}
                  >
                    <Tabs defaultValue="details">
                      <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="training-times">
                          Trainingszeiten
                        </TabsTrigger>
                        <TabsTrigger value="training-plans">
                          Trainingspläne
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="details">
                        <div className="grid gap-4">
                          <div>
                            <Label htmlFor={`group-name-${group.id}`}>
                              Name
                            </Label>
                            <Input
                              id={`group-name-${group.id}`}
                              value={group.name}
                              onChange={(e) => (group.name = e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`group-description-${group.id}`}>
                              Beschreibung
                            </Label>
                            <Textarea
                              id={`group-description-${group.id}`}
                              value={group.description}
                              onChange={(e) =>
                                (group.description = e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`group-image-${group.id}`}>
                              Bild
                            </Label>
                            <Input
                              id={`group-image-${group.id}`}
                              type="file"
                              onChange={(e) =>
                                handleImageUpload(e, "group", group.id)
                              }
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="training-times">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tag</TableHead>
                              <TableHead>Startzeit</TableHead>
                              <TableHead>Endzeit</TableHead>
                              <TableHead>Aktion</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {group.trainingTimes.map((time, index) => (
                              <TableRow key={time.id}>
                                <TableCell>
                                  <Select
                                    value={time.day}
                                    onValueChange={(value) =>
                                      (group.trainingTimes[index].day = value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {daysOfWeek.map((day) => (
                                        <SelectItem key={day} value={day}>
                                          {day}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="time"
                                    value={time.startTime}
                                    onChange={(e) =>
                                      (group.trainingTimes[index].startTime =
                                        e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="time"
                                    value={time.endTime}
                                    onChange={(e) =>
                                      (group.trainingTimes[index].endTime =
                                        e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      (group.trainingTimes =
                                        group.trainingTimes.filter(
                                          (_, i) => i !== index
                                        ))
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="mt-2"
                              onClick={() => setSelectedGroupId(group.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Trainingszeit
                              hinzufügen
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Neue Trainingszeit hinzufügen
                              </DialogTitle>
                              <DialogDescription>
                                Fügen Sie hier die Details für die neue
                                Trainingszeit hinzu.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="training-day"
                                  className="text-right"
                                >
                                  Tag
                                </Label>
                                <Select
                                  value={newTrainingTime.day}
                                  onValueChange={(value) =>
                                    setNewTrainingTime({
                                      ...newTrainingTime,
                                      day: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Tag auswählen" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {daysOfWeek.map((day) => (
                                      <SelectItem key={day} value={day}>
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="start-time"
                                  className="text-right"
                                >
                                  Startzeit
                                </Label>
                                <Input
                                  id="start-time"
                                  type="time"
                                  value={newTrainingTime.startTime}
                                  onChange={(e) =>
                                    setNewTrainingTime({
                                      ...newTrainingTime,
                                      startTime: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="end-time"
                                  className="text-right"
                                >
                                  Endzeit
                                </Label>
                                <Input
                                  id="end-time"
                                  type="time"
                                  value={newTrainingTime.endTime}
                                  onChange={(e) =>
                                    setNewTrainingTime({
                                      ...newTrainingTime,
                                      endTime: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleAddTrainingTime}>
                                Hinzufügen
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TabsContent>
                      <TabsContent value="training-plans">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Datum</TableHead>
                              <TableHead>Beschreibung</TableHead>
                              <TableHead>Aktion</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {group.trainingPlans.map((plan, index) => (
                              <TableRow key={plan.id}>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={plan.date}
                                    onChange={(e) =>
                                      (group.trainingPlans[index].date =
                                        e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={plan.description}
                                    onChange={(e) =>
                                      (group.trainingPlans[index].description =
                                        e.target.value)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      (group.trainingPlans =
                                        group.trainingPlans.filter(
                                          (_, i) => i !== index
                                        ))
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="mt-2"
                              onClick={() => setSelectedGroupId(group.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Trainingsplan
                              hinzufügen
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Neuen Trainingsplan hinzufügen
                              </DialogTitle>
                              <DialogDescription>
                                Fügen Sie hier die Details für den neuen
                                Trainingsplan hinzu.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="plan-date"
                                  className="text-right"
                                >
                                  Datum
                                </Label>
                                <Input
                                  id="plan-date"
                                  type="date"
                                  value={newTrainingPlan.date}
                                  onChange={(e) =>
                                    setNewTrainingPlan({
                                      ...newTrainingPlan,
                                      date: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="plan-description"
                                  className="text-right"
                                >
                                  Beschreibung
                                </Label>
                                <Input
                                  id="plan-description"
                                  value={newTrainingPlan.description}
                                  onChange={(e) =>
                                    setNewTrainingPlan({
                                      ...newTrainingPlan,
                                      description: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleAddTrainingPlan}>
                                Hinzufügen
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TabsContent>
                    </Tabs>
                    <Button type="submit" className="mt-4">
                      Speichern
                    </Button>
                  </form>
                ) : (
                  <>
                    <p>
                      <strong>Beschreibung:</strong> {group.description}
                    </p>
                    {group.image && (
                      <div className="mt-4">
                        <Image
                          src={group.image}
                          alt={group.name}
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                    <h4 className="font-semibold mt-4 mb-2">
                      Trainingszeiten:
                    </h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tag</TableHead>
                          <TableHead>Startzeit</TableHead>
                          <TableHead>Endzeit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.trainingTimes.map((time) => (
                          <TableRow key={time.id}>
                            <TableCell>{time.day}</TableCell>
                            <TableCell>{time.startTime}</TableCell>
                            <TableCell>{time.endTime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <h4 className="font-semibold mt-4 mb-2">Trainingspläne:</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Datum</TableHead>
                          <TableHead>Beschreibung</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.trainingPlans.map((plan) => (
                          <TableRow key={plan.id}>
                            <TableCell>{plan.date}</TableCell>
                            <TableCell>{plan.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </CardContent>
              <CardFooter>
                {editingCard === `group-${group.id}` ? (
                  <Button onClick={() => handleUpdateGroup(group)}>
                    <Save className="h-4 w-4 mr-2" /> Speichern
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => setEditingCard(`group-${group.id}`)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Bearbeiten
                    </Button>
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => handleRemoveGroup(group.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Entfernen
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Input
              placeholder="Name"
              value={newGroup.name}
              onChange={(e) =>
                setNewGroup({ ...newGroup, name: e.target.value })
              }
            />
            <Input
              placeholder="Beschreibung"
              value={newGroup.description}
              onChange={(e) =>
                setNewGroup({ ...newGroup, description: e.target.value })
              }
            />
            <Button onClick={handleAddGroup}>
              <Plus className="h-4 w-4 mr-2" /> Gruppe hinzufügen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Competitions Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Wettbewerbe</CardTitle>
        </CardHeader>
        <CardContent>
          {sport.competitions.map((competition) => (
            <Card key={competition.id} className="mb-4">
              <CardHeader>
                <CardTitle>{competition.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {editingCard === `competition-${competition.id}` ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateCompetition(competition);
                    }}
                  >
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor={`comp-name-${competition.id}`}>
                          Name
                        </Label>
                        <Input
                          id={`comp-name-${competition.id}`}
                          value={competition.name}
                          onChange={(e) => (competition.name = e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`comp-date-${competition.id}`}>
                          Datum
                        </Label>
                        <Input
                          id={`comp-date-${competition.id}`}
                          type="date"
                          value={competition.date}
                          onChange={(e) => (competition.date = e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`comp-description-${competition.id}`}>
                          Beschreibung
                        </Label>
                        <Textarea
                          id={`comp-description-${competition.id}`}
                          value={competition.description}
                          onChange={(e) =>
                            (competition.description = e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`comp-image-${competition.id}`}>
                          Bild
                        </Label>
                        <Input
                          id={`comp-image-${competition.id}`}
                          type="file"
                          onChange={(e) =>
                            handleImageUpload(e, "competition", competition.id)
                          }
                        />
                      </div>
                      <div>
                        <Label>Gruppen</Label>
                        {sport.groups.map((group) => (
                          <div
                            key={group.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`group-${group.id}-${competition.id}`}
                              checked={competition.groups.includes(group.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  competition.groups = [
                                    ...competition.groups,
                                    group.id,
                                  ];
                                } else {
                                  competition.groups =
                                    competition.groups.filter(
                                      (id) => id !== group.id
                                    );
                                }
                              }}
                            />
                            <Label
                              htmlFor={`group-${group.id}-${competition.id}`}
                            >
                              {group.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="mt-4">
                      Speichern
                    </Button>
                  </form>
                ) : (
                  <>
                    <p>
                      <strong>Datum:</strong> {competition.date}
                    </p>
                    <p>
                      <strong>Beschreibung:</strong> {competition.description}
                    </p>
                    <p>
                      <strong>Gruppen:</strong>{" "}
                      {competition.groups
                        .map(
                          (id) => sport.groups.find((g) => g.id === id)?.name
                        )
                        .join(", ")}
                    </p>
                    {competition.image && (
                      <div className="mt-4">
                        <Image
                          src={competition.image}
                          alt={competition.name}
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                  </>
                )}
              </CardContent>
              <CardFooter>
                {editingCard === `competition-${competition.id}` ? (
                  <Button onClick={() => handleUpdateCompetition(competition)}>
                    <Save className="h-4 w-4 mr-2" /> Speichern
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() =>
                        setEditingCard(`competition-${competition.id}`)
                      }
                    >
                      <Edit2 className="h-4 w-4 mr-2" /> Bearbeiten
                    </Button>
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => handleRemoveCompetition(competition.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Entfernen
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Wettbewerb hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neuen Wettbewerb hinzufügen</DialogTitle>
                <DialogDescription>
                  Fügen Sie hier die Details für den neuen Wettbewerb hinzu.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comp-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="comp-name"
                    value={newCompetition.name}
                    onChange={(e) =>
                      setNewCompetition({
                        ...newCompetition,
                        name: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comp-date" className="text-right">
                    Datum
                  </Label>
                  <Input
                    id="comp-date"
                    type="date"
                    value={newCompetition.date}
                    onChange={(e) =>
                      setNewCompetition({
                        ...newCompetition,
                        date: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comp-description" className="text-right">
                    Beschreibung
                  </Label>
                  <Textarea
                    id="comp-description"
                    value={newCompetition.description}
                    onChange={(e) =>
                      setNewCompetition({
                        ...newCompetition,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="comp-image" className="text-right">
                    Bild
                  </Label>
                  <Input
                    id="comp-image"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setNewCompetition({
                            ...newCompetition,
                            image: reader.result,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Gruppen</Label>
                  <div className="col-span-3">
                    {sport.groups.map((group) => (
                      <div
                        key={group.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`group-${group.id}`}
                          checked={newCompetition.groups.includes(group.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewCompetition({
                                ...newCompetition,
                                groups: [...newCompetition.groups, group.id],
                              });
                            } else {
                              setNewCompetition({
                                ...newCompetition,
                                groups: newCompetition.groups.filter(
                                  (id) => id !== group.id
                                ),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={`group-${group.id}`}>
                          {group.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddCompetition}>Hinzufügen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Button type="submit" onClick={handleSubmit}>
        Alle Änderungen speichern
      </Button>
    </div>
  );
}
