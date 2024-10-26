// group-item.tsx
import { AgeGroup } from "@prisma/client"; // Import the AgeGroup type

interface GroupItemProps {
  group: AgeGroup; // Ensure this is the complete AgeGroup type
  onUpdate: (group: AgeGroup) => void; // Accepts the full AgeGroup type
  onRemove: (id: string) => void;
}

export function GroupItem({ group, onUpdate, onRemove }: GroupItemProps) {
  const handleUpdate = () => {
    // Logic to update the group
    onUpdate(group); // Call the onUpdate prop with the current group
  };

  return (
    <div>
      {/* Render group information */}
      <span>{group.name}</span>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => onRemove(group.id)}>Remove</button>
    </div>
  );
}
