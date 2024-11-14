import mysql, { ConnectionOptions, RowDataPacket } from "mysql2/promise";

const access: ConnectionOptions = {
  user: "root",
  password: "myrootpassword",
  database: "co-working-space",
};

const connection = await mysql.createConnection(access);

export async function pool<Type extends RowDataPacket>(
  sql: string,
  values: string[],
): Promise<Type[]> {
  const [rows] = await connection.query<Type[]>(sql, values);
  console.log("result: ", rows);
  return rows;
}
