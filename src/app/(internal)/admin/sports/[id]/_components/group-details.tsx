"use client";
import { useState } from "react";
import Image from "next/image";
import { Edit2, Save, X } from "lucide-react";
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
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
/* eslint-disable */

interface Group {
  name: string;
  description: string;
  image?: string; // Optional image URL
}

interface GroupDetailsProps {
  initialData: Group;
  groupId: string;
}

export function GroupDetails({ initialData, groupId }: GroupDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const cancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  const formSchema = z.object({
    name: z.coerce.string().min(1),
    description: z.coerce.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  });

  const {
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/admin/sports/groups/${groupId}`, values);
      toast.success("Erfolg!");
      toggleEdit();
      router.refresh();
    } catch (error: any) {
      if (error.response) {
        toast.error(`Server responded with ${error.response.status} error`);
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      // handle image upload logic here, if needed
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Gruppen Details</CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Name</Label>
                      <FormControl>
                        <Input
                          id="name"
                          disabled={isSubmitting}
                          placeholder="Sportname"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="description">Beschreibung</Label>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Dies ist der beste Sport"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormItem>
                  <Label htmlFor="sportImage">Bild</Label>
                  <FormControl>
                    <Input
                      id="sportImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </FormControl>
                </FormItem>
              </div>
              <div className="space-x-2">
                <Button
                  type="submit"
                  className="mt-4"
                  disabled={!isValid || isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" /> Speichern
                </Button>
                <Button
                  className="mt-4"
                  disabled={isSubmitting}
                  type="reset"
                  variant="secondary"
                  onClick={cancelEdit}
                >
                  <X className="h-4 w-4 mr-2" /> Abbrechen
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {initialData.name}
            </p>
            <p>
              <strong>Beschreibung:</strong> {initialData.description}
            </p>
            {initialData.image && (
              <div className="mt-4">
                <Image
                  src={initialData.image}
                  alt={initialData.name}
                  width={200}
                  height={200}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        {!isEditing ? (
          <Button onClick={toggleEdit}>
            <Edit2 className="h-4 w-4 mr-2" /> Bearbeiten
          </Button>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  );
}
