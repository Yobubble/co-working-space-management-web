import { create } from "zustand";
import { RoomModel, UseRoomStoreProps } from "../types/room";

export const useRoomsStore = create<UseRoomStoreProps>((set) => ({
  rooms: [],
  updateRooms: (rooms: RoomModel[]) => set(() => ({ rooms: rooms })),
}));
