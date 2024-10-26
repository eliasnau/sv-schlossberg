import { useState } from "react";
import Image from "next/image";
import { Edit2, Save } from "lucide-react";
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

export function SportDetails({ sport, setSport }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSportChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSport({ ...sport, [e.target.name]: e.target.value });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Sportart Details</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
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
                  // Image upload functionality removed as requested
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
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)}>
            <Save className="h-4 w-4 mr-2" /> Speichern
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" /> Bearbeiten
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
