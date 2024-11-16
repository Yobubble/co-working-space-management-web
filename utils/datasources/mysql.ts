import mysql, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

const access: ConnectionOptions = {
  user: "root",
  password: "myrootpassword",
  database: "co-working-space",
};

const connection = await mysql.createConnection(access);

export async function mysqlRead<Type extends RowDataPacket>(
  sql: string,
  values: string[],
): Promise<Type[]> {
  const [rows] = await connection.query<Type[]>(sql, values);
  console.log("result: ", rows);
  return rows;
}

// TODO: Implement mysqlCreate
// export async function mysqlCreate<Type extends RowDataPacket>(
//   sql: string,
//   values: string[],
// ): Promise<Type[]> {
//   const [rows] = await connection.query<Type[]>(sql, values);
//   console.log("result: ", rows);
//   return rows;
// }

export async function mysqlUpdate(sql: string, values: string[]) {
  const [rows] = await connection.query<ResultSetHeader>(sql, values);
  console.log("result: ", rows);
  return rows;
}

// TODO: Implement mysqlDelete
// export async function mysqlDelete<Type extends RowDataPacket>(
//   sql: string,
//   values: string[],
// ): Promise<Type[]> {
//   const [rows] = await connection.query<Type[]>(sql, values);
//   console.log("result: ", rows);
//   return rows;
// }
