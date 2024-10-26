"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const daysOfWeek = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

export function TrainingTimeForm({ trainingTimes, onUpdate }) {
  const [newTime, setNewTime] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleAddTime = () => {
    onUpdate([...trainingTimes, { ...newTime, id: Date.now().toString() }]);
    setNewTime({ day: "", startTime: "", endTime: "" });
  };

  const handleRemoveTime = (id: string) => {
    onUpdate(trainingTimes.filter((time) => time.id !== id));
  };

  return (
    <div>
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
          {trainingTimes.map((time) => (
            <TableRow key={time.id}>
              <TableCell>{time.day}</TableCell>
              <TableCell>{time.startTime}</TableCell>
              <TableCell>{time.endTime}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveTime(time.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="grid grid-cols-4 gap-2 mt-4">
        <Select
          value={newTime.day}
          onValueChange={(value) => setNewTime({ ...newTime, day: value })}
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
        <Input
          type="time"
          value={newTime.startTime}
          onChange={(e) =>
            setNewTime({ ...newTime, startTime: e.target.value })
          }
        />
        <Input
          type="time"
          value={newTime.endTime}
          onChange={(e) => setNewTime({ ...newTime, endTime: e.target.value })}
        />
        <Button onClick={handleAddTime}>
          <Plus className="h-4 w-4 mr-2" /> Hinzufügen
        </Button>
      </div>
    </div>
  );
}
