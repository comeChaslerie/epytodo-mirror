import pool from "../../config/db";

export async function findUserByEmail(email: string) {
  const result = await pool.execute(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );
  return (result as any);
}

export async function createUser(email: string, password: string, name: string, firstname: string) {
  const result = pool.execute(
    "INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)",
    [email, password, name, firstname]
  );
  return (result as any);
}
