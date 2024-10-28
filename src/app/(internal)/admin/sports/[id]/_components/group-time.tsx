"use client";
import { Trash2, Plus } from "lucide-react";
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
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
/* eslint-disable */

interface Group {
  day: string;
  startTime: string;
  endTime: string; // Optional image URL
}

interface GroupDetailsProps {
  initialData: any;
  groupId: string;
}
const daysOfWeek = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];

export function GroupTime({ initialData, groupId }: GroupDetailsProps) {
  const router = useRouter();

  const formSchema = z.object({
    startTime: z.coerce.string().min(1),
    endTime: z.coerce.string().min(1),
    day: z.coerce.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      day: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await axios.patch(`/api/admin/sports/groups/${groupId}/time`, values);
      toast.success("Erfolg!");
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

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`/api/admin/sports/groups/${id}/time`);
      toast.success("Erfolg!");
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

  console.log(initialData);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Trainingszeiten</CardTitle>
      </CardHeader>
      <CardContent>
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
            {initialData.trainingTimes.map((time: any) => (
              <TableRow key={time.id}>
                <TableCell>{time.day}</TableCell>
                <TableCell>{time.startTime}</TableCell>
                <TableCell>{time.endTime}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      deleteItem(time.id);
                    }} //handleRemoveTime(time.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 gap-2 mt-4">
              <FormField
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="day">Tag</Label>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle einen Tag aus" />
                        </SelectTrigger>
                        <SelectContent>
                          {daysOfWeek.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="startTime">Anfang</Label>
                    <FormControl>
                      <Input
                        id="startTime"
                        placeholder="17:00"
                        type="time"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="description">Ende</Label>
                    <FormControl>
                      <Input
                        id="endTime"
                        type="time"
                        placeholder="19:00"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-6 self-end" // Adjusted to align
                disabled={!isValid || isSubmitting}
              >
                <Plus className="h-4 w-4 mr-2" /> Hinzufügen
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
