import { RowDataPacket } from "mysql2";

export interface CustomerModel extends RowDataPacket {
  username: string;
  password: string;
}
