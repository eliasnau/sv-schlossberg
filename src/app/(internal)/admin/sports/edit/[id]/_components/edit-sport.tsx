// EditSport.tsx
import { useState } from "react";
import { GroupCard } from "./GroupCard";
import { CompetitionCard } from "./CompetitionCard";
import { NewCompetitionDialog } from "./NewCompetitionDialog";

export function EditSport({ mockSport }) {
  const [editingCard, setEditingCard] = useState<string | null>(null);

  const handleEditGroup = (id: string) => setEditingCard(`group-${id}`);
  const handleSaveGroup = (updatedGroup) => {
    /* logic to save group */
  };
  const handleRemoveGroup = (id: string) => {
    /* logic to remove group */
  };

  const handleEditCompetition = (id: string) =>
    setEditingCard(`competition-${id}`);
  const handleSaveCompetition = (updatedCompetition) => {
    /* logic to save competition */
  };
  const handleRemoveCompetition = (id: string) => {
    /* logic to remove competition */
  };

  const handleAddCompetition = (newCompetition) => {
    /* logic to add competition */
  };

  return (
    <div>
      {mockSport.groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          isEditing={editingCard === `group-${group.id}`}
          onEdit={handleEditGroup}
          onSave={handleSaveGroup}
          onRemove={handleRemoveGroup}
        />
      ))}
      {mockSport.competitions.map((competition) => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
          isEditing={editingCard === `competition-${competition.id}`}
          onEdit={handleEditCompetition}
          onSave={handleSaveCompetition}
          onRemove={handleRemoveCompetition}
        />
      ))}
      <NewCompetitionDialog onAdd={handleAddCompetition} />
    </div>
  );
}
