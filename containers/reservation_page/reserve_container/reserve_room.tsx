"use client";
import { useRoomsStore } from "@/utils/stores/use_rooms_store";
import { RoomModel } from "@/utils/types/room";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/utils/stores/use_payment_store";
import { SERVICES } from "@/utils/enums/services";

export default function ReserveRoom() {
  const { rooms } = useRoomsStore();
  const { updateService, updateData } = usePaymentStore();

  function handleConfirm(room: RoomModel) {
    updateService(SERVICES.roomReservation);
    updateData(room);
  }

  return (
    <main className="w-full h-full">
      <h1>Rooms Available</h1>
      {rooms.map((val: RoomModel) => {
        return (
          <Dialog key={val.room_id}>
            <DialogTrigger className="flex gap-2 bg-c3 m-2 p-3">
              <h2>{val.room_id}</h2>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm?</DialogTitle>
                <DialogDescription>
                  <section className="flex flex-col gap-3 justify-center items-center">
                    <h1>Room ID: {val.room_id}</h1>
                    <p>Number of Desk: {val.desk_num}</p>
                    <p>Number of Chair: {val.chair_num}</p>
                    <a href="/payment">
                      <Button
                        className="bg-c3"
                        onClick={() => handleConfirm(val)}
                      >
                        Confirm
                      </Button>
                    </a>
                  </section>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
    </main>
  );
}
