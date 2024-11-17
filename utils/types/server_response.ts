import { RoomModel } from "./room";

export interface ServerResponse {
  errorMsg: string;
  // NOTE: type of data can be add more in the future
  data: RoomModel[] | number | null;
}
