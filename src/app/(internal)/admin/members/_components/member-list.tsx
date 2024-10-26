import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export function MemberList({ members, onSelectMember, onDeleteMember }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mitgliederliste</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.id} className="flex items-center justify-between">
              <Button
                variant="ghost"
                className="text-left w-full"
                onClick={() => onSelectMember(member.id)}
              >
                {member.name}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDeleteMember(member.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
