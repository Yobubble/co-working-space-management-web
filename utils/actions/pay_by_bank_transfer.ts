"use server";
import { MEMBERSHIP } from "../enums/membership";
import { SERVICES } from "../enums/services";
import { RoomModel } from "../types/room";
import { ServerResponse } from "../types/server_response";
import { UpdateMembership } from "./update_membership";

export async function PayByBankTransfer(
  formData: FormData,
  service: SERVICES,
  data: MEMBERSHIP | RoomModel,
): Promise<ServerResponse> {
  const accNum = formData.get("account_number") as string | null;
  const accName = formData.get("account_name") as string | null;

  if (!accNum || !accName) {
    return { errorMsg: "Fill the form", data: null };
  }
  if (service === SERVICES.membership) {
    await UpdateMembership(data as MEMBERSHIP);
    switch (data as MEMBERSHIP) {
      case MEMBERSHIP.daily:
        return { errorMsg: "", data: 200 };
      case MEMBERSHIP.monthly:
        return { errorMsg: "", data: 350 };
      case MEMBERSHIP.yearly:
        return { errorMsg: "", data: 700 };
    }
  } else {
    // TODO: payment implementation here
    return { errorMsg: "", data: 150 };
  }
}
