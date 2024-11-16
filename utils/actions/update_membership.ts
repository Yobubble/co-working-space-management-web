"use server";

import { cookies } from "next/headers";
import { mysqlUpdate } from "../datasources/mysql";
import { MEMBERSHIP } from "../enums/membership";

export async function UpdateMembership(membership: MEMBERSHIP) {
  const cookiestore = await cookies();
  const username = cookiestore.get("username");
  if (username === undefined) {
    // TODO: use return instead
    console.log("------No username found in cookies");
    return;
  }

  const sql = "UPDATE customers SET membership = ? WHERE username = ?";
  const values = [membership, username.value];
  const result = await mysqlUpdate(sql, values);
  if (result.affectedRows === 0) {
    console.log("------Update Membership Failed");
  }
  console.log(
    "------Update Membership Successful",
    username!.value,
    membership,
  );
}
