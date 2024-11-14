"use server";
import { redirect } from "next/navigation";
import { pool } from "../datasources/mysql";
import { cookies } from "next/headers";
import { CustomerModel } from "../types/customer";

export async function LoginForm(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const sql = "SELECT * FROM customers WHERE username = ? AND password = ?";
  const values = [username, password];

  const result = await pool<CustomerModel>(sql, values);

  if (result.length === 0) {
    console.log("---Invalid username or password---");
    redirect("/");
  } else {
    console.log("---Login successful---");
    (await cookies()).set("username", username);
    redirect("/reservation");
  }
}
