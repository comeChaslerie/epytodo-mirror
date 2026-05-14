import pool from "../../config/db";

export async function getAllTodosForUser(userId: number) {
    const [rows] = await pool.execute(
        "SELECT * FROM todo WHERE user_id = ?", [userId]);
    return rows;
}
