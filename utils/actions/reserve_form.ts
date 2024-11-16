"use server";

import { cookies } from "next/headers";
import { mysqlRead } from "../datasources/mysql";
import { CustomerModel } from "../types/customer";
import { MEMBERSHIP } from "../enums/membership";
import { ServerResponse } from "../types/server_response";
import { RoomModel } from "../types/room";

export async function ReserveForm(formData: FormData): Promise<ServerResponse> {
  const cookiestore = await cookies();
  const username = cookiestore.get("username");
  if (username === undefined) {
    // TODO: return instead
    console.log("------No username found in cookies");
    return { errorMsg: "No username found in cookies", data: null };
  }

  const startDate = formData.get("start_date") as string;
  const endDate = formData.get("end_date") as string;
  const numDesks = formData.get("num_desks") as string;
  const numChairs = formData.get("num_chairs") as string;

  if (
    startDate === "" ||
    endDate === "" ||
    numDesks === "" ||
    numChairs === ""
  ) {
    return { errorMsg: "Fill the form", data: null };
  }

  const sqlMemberCheck = "SELECT * FROM customers WHERE username = ?";
  const valuesMemberCheck = [username.value];

  const result = await mysqlRead<CustomerModel>(
    sqlMemberCheck,
    valuesMemberCheck,
  );

  switch (result[0].membership) {
    case MEMBERSHIP.daily:
      break;
    // TODO: start date and end date should be the same
    case MEMBERSHIP.monthly:
      break;
    // TODO: start date and end date should be within
    case MEMBERSHIP.yearly:
      break;
    // TODO: start date and end date should be within
    case MEMBERSHIP.none:
      return { errorMsg: "No membership found", data: null };
  }

  const sqlGetRooms =
    "SELECT r.room_id, r.desk_num, r.chair_num FROM rooms r LEFT JOIN reservations r2 on r.room_id = r2.room_id AND ? < r2.end_time AND ? > r2.start_time WHERE r.desk_num > ? AND r.chair_num > ? AND r2.reservation_id IS NULL";
  const valuesGetRooms = [startDate, endDate, numDesks, numChairs];

  const resultGetRooms = await mysqlRead<RoomModel>(
    sqlGetRooms,
    valuesGetRooms,
  );

  if (resultGetRooms.length === 0) {
    return { errorMsg: "No rooms available", data: null };
  }

  return { errorMsg: "", data: resultGetRooms };
}
