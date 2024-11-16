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

  const startDate = formData.get("start_date") as string | null | undefined;
  const endDate = formData.get("end_date") as string | null | undefined;
  const numDesks = formData.get("num_desks") as string | null | undefined;
  const numChairs = formData.get("num_chairs") as string | null | undefined;

  if (!startDate || !endDate || !numDesks || !numChairs) {
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
      if (startDate !== endDate) {
        return {
          errorMsg:
            "You can reserve only 1 day with the daily membership or upgrade to a higher plan.",
          data: null,
        };
      }
      break;

    case MEMBERSHIP.monthly:
      const startMonth = new Date(startDate).getMonth();
      const endMonth = new Date(endDate).getMonth();
      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();

      if (startYear !== endYear || startMonth !== endMonth) {
        return {
          errorMsg:
            "Reservations for the monthly membership must stay within the same month.",
          data: null,
        };
      }
      break;

    case MEMBERSHIP.yearly:
      const startYearly = new Date(startDate).getFullYear();
      const endYearly = new Date(endDate).getFullYear();

      if (startYearly !== endYearly) {
        return {
          errorMsg:
            "Reservations for the yearly membership must stay within the same year.",
          data: null,
        };
      }
      break;

    case MEMBERSHIP.none:
      return {
        errorMsg:
          "No membership found. Please subscribe to a membership plan to make a reservation.",
        data: null,
      };

    default:
      return {
        errorMsg: "Invalid membership type.",
        data: null,
      };
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
