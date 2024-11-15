import { RowDataPacket } from "mysql2";

export interface RoomModel extends RowDataPacket {
  room_id: number;
  desk_num: number;
  chair_num: number;
}

export interface UseRoomStoreProps {
  rooms: RoomModel[];
  changeRooms: (rooms: RoomModel[]) => void;
}
