import pool from "../../config/db";
import { ResultSetHeader } from "mysql2";

export interface Todo {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  due_time: Date;
  status: string;
  user_id: number;
}

export async function getAllTodosForUser(userId: number) {
    const [rows] = await pool.execute(
        "SELECT * FROM todo WHERE user_id = ?", [userId]);
    return (rows as Todo[]);
}

export async function createTodo(title: string, description: string, due_time: string, status: string, user_id: number) {
    const [result] = await pool.execute(
        "INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)",
        [title, description, due_time, status, user_id]
    );
    return (result as ResultSetHeader).insertId;
}

export async function getTodoById(id: number) {
    const [rows] = await pool.execute(
        "SELECT * FROM todo WHERE id = ?",
        [id]
    );
    return (rows as Todo[])[0];
}

export async function deleteTodoById(id: number) {
    const [result] = await pool.execute(
        "DELETE FROM todo WHERE id = ?",
        [id]
    );
    return (result as ResultSetHeader).affectedRows;
}

export async function updateTodo(id: number, title: string, description: string, due_time: string, status: string, user_id: number) {
    const [result] = await pool.execute(
        "UPDATE todo SET title = ?, description = ?, due_time = ?, status = ?, user_id = ? WHERE id = ?",
        [title, description, due_time, status, user_id, id]
    );
    return (result as ResultSetHeader).affectedRows;
}

