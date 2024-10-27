/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface TrainingTime {
  id: string; // Make sure you have an ID for each training time
  day: string;
  startTime: string;
  endTime: string;
}

interface TrainingTimeFormProps {
  group: any; // Use the appropriate type for your group
  setGroup: (group: any) => void; // Update the type as needed
}

export function TrainingTimeForm({ group, setGroup }: TrainingTimeFormProps) {
  const [newTrainingTime, setNewTrainingTime] = useState<TrainingTime>({
    id: "", // Add an ID for the new training time
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleAddTrainingTime = () => {
    if (
      !newTrainingTime.day ||
      !newTrainingTime.startTime ||
      !newTrainingTime.endTime
    ) {
      return; // Do not proceed if any field is empty
    }

    // Update the group with the new training time
    const updatedTrainingTimes = [...group.trainingTimes, newTrainingTime];

    setGroup({ ...group, trainingTimes: updatedTrainingTimes }); // Update the group state

    // Reset the new training time
    setNewTrainingTime({ id: "", day: "", startTime: "", endTime: "" });
  };

  const handleEdit = (time: TrainingTime) => {
    setNewTrainingTime(time); // Set the time for editing (optional, based on your needs)
  };

  return (
    <div>
      <ul>
        {group.trainingTimes.map((time: TrainingTime) => (
          <li key={time.id}>
            {time.day}: {time.startTime} - {time.endTime}
            <Button onClick={() => handleEdit(time)}>Edit</Button>
          </li>
        ))}
      </ul>
      <Input
        placeholder="Day"
        value={newTrainingTime.day}
        onChange={(e) =>
          setNewTrainingTime({ ...newTrainingTime, day: e.target.value })
        }
      />
      <Input
        placeholder="Start Time"
        value={newTrainingTime.startTime}
        onChange={(e) =>
          setNewTrainingTime({ ...newTrainingTime, startTime: e.target.value })
        }
      />
      <Input
        placeholder="End Time"
        value={newTrainingTime.endTime}
        onChange={(e) =>
          setNewTrainingTime({ ...newTrainingTime, endTime: e.target.value })
        }
      />
      <Button onClick={handleAddTrainingTime}>Add Training Time</Button>
    </div>
  );
}
