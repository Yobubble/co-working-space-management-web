"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReserveForm } from "@/utils/actions/reserve_form";
import { useToast } from "@/hooks/use-toast";
import { useRoomsStore } from "@/utils/stores/use_rooms_store";
import ReserveRoom from "./reserve_room";
import { RoomModel } from "@/utils/types/room";

export default function ReserveContainer() {
  const { updateRooms } = useRoomsStore();
  const { toast } = useToast();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // TODO: optimize readability and flow by migrating to use tanstack query instead
    const response = await ReserveForm(formData);
    if (response.errorMsg !== "") {
      toast({
        variant: "destructive",
        title: response.errorMsg,
      });
      updateRooms([]);
    } else {
      updateRooms(response.data as RoomModel[]);
    }
  }
  return (
    <main className="w-full h-full flex flex-col gap-6">
      <h1 className="font-semibold text-c2 text-4xl">Reserve a Space!</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input type="date" name="start_date" />
        <Input type="date" name="end_date" />
        <Input type="number" name="num_desks" placeholder="number of desks" />
        <Input type="number" name="num_chairs" placeholder="number of chairs" />
        <Button type="submit" className="bg-c2 hover:bg-c1">
          Find Rooms
        </Button>
      </form>
      <ReserveRoom />
    </main>
  );
}
