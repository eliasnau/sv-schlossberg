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
/* eslint-disable */

interface Sport {
  name: string;
  description: string;
  image?: string; // Optional image URL
}

interface SportDetailsProps {
  sport: Sport;
  setSport: any;
}

export function SportDetails({ sport, setSport }: SportDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSportChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSport({ ...sport, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // You might want to handle image upload here
      // For now, let's set the image to a placeholder URL
      // setSport({ ...sport, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You might want to add any validation logic here
    setIsEditing(false);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Sportart Details</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
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
                  accept="image/*"
                  onChange={handleImageUpload}
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
