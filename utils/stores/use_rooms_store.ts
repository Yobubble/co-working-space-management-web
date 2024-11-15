import { create } from "zustand";
import { RoomModel, UseRoomStoreProps } from "../types/room";

export const useRoomsStore = create<UseRoomStoreProps>((set) => ({
  rooms: [],
  changeRooms: (rooms: RoomModel[]) => set(() => ({ rooms: rooms })),
}));
