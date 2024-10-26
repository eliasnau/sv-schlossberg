// GroupCard.tsx
import { useState } from "react";
import { Edit2, Save, Trash2 } from "lucide-react";

interface GroupCardProps {
  group: GroupType;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onSave: (group: GroupType) => void;
  onRemove: (id: string) => void;
}

export function GroupCard({
  group,
  isEditing,
  onEdit,
  onSave,
  onRemove,
}: GroupCardProps) {
  const [editGroup, setEditGroup] = useState(group);

  const handleSave = () => onSave(editGroup);

  return (
    <Card key={group.id} className="mb-4">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Input
            value={editGroup.name}
            onChange={(e) =>
              setEditGroup({ ...editGroup, name: e.target.value })
            }
          />
        ) : (
          <p>{group.description}</p>
        )}
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        ) : (
          <>
            <Button onClick={() => onEdit(group.id)}>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" onClick={() => onRemove(group.id)}>
              <Trash2 className="h-4 w-4 mr-2" /> Remove
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
