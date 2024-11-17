"use server";
import { redirect } from "next/navigation";
import { mysqlRead } from "../datasources/mysql";
import { cookies } from "next/headers";
import { CustomerModel } from "../types/customer";
import { ServerResponse } from "../types/server_response";

export async function LoginForm(formData: FormData): Promise<ServerResponse> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const cookiestore = await cookies();

  const sql = "SELECT * FROM customers WHERE username = ? AND password = ?";
  const values = [username, password];
  const result = await mysqlRead<CustomerModel>(sql, values);

  if (result.length === 0) {
    return { errorMsg: "Login Failed", data: null };
  } else {
    // TODO: specify expiration date for cookie
    cookiestore.set("username", username);
    return { errorMsg: "", data: null };
  }
}
