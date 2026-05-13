import pool from "../../config/db";
import { ResultSetHeader } from "mysql2";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  firstname: string;
  created_at: Date;
}

export async function findUserByEmail(email: string) {
  const [rows] = await pool.execute(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );
  return (rows as User[])[0];
}

export async function createUser(email: string, password: string, name: string, firstname: string) {
  const [result] = await pool.execute(
    "INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)",
    [email, password, name, firstname]
  );
  return (result as ResultSetHeader).insertId;
}
