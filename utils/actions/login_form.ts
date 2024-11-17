"use server";
import { mysqlRead } from "../datasources/mysql";
import { cookies } from "next/headers";
import { CustomerModel } from "../types/customer";
import { ServerResponse } from "../types/server_response";

export async function LoginForm(formData: FormData): Promise<ServerResponse> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { errorMsg: "Fulfill the form", data: null };
  }

  const cookiestore = await cookies();

  const sql = "SELECT * FROM customers WHERE username = ? AND password = ?";
  const values = [username, password];
  const result = await mysqlRead<CustomerModel>(sql, values);

  if (result.length === 0) {
    return { errorMsg: "Incorrect username or password", data: null };
  } else {
    // TODO: specify expiration date for cookie
    cookiestore.set("username", username);
    return { errorMsg: "", data: null };
  }
}
