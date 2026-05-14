import pool from "../../config/db";

export async function getAllTodos() {
    const [rows] = await pool.execute("SELECT * FROM todo");
    return rows;
}
