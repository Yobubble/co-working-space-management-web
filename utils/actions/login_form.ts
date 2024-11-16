"use server";
import { redirect } from "next/navigation";
import { mysqlRead } from "../datasources/mysql";
import { cookies } from "next/headers";
import { CustomerModel } from "../types/customer";

export async function LoginForm(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const cookiestore = await cookies();

  const sql = "SELECT * FROM customers WHERE username = ? AND password = ?";
  const values = [username, password];

  const result = await mysqlRead<CustomerModel>(sql, values);

  if (result.length === 0) {
    console.log("Login Failed - Invalid username or password");
    redirect("/");
  } else {
    console.log("Login Successful");
    // TODO: specify expiration date for cookie
    cookiestore.set("username", username);
    redirect("/reservation");
  }
}
