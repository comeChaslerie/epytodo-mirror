import pool from "../../config/db";

export async function findUserByEmail(email: string) {
  const [rows] = await pool.execute(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );
  return (rows as any[])[0];
}

export async function createUser(email: string, password: string, name: string, firstname: string) {
  const [result] = await pool.execute(
    "INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)",
    [email, password, name, firstname]
  );
  return (result as any).insertId;
}
