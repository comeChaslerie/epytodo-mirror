import { Router } from "express";
import { getAllTodosForUser, createTodo, getTodoById, deleteTodoById, updateTodo } from "./todos.query";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const todos = await getAllTodosForUser(userId);
        return res.json(todos);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const { title, description, due_time, status } = req.body;
        const actualStatus = status || "not started";

        if (!title || !description || !due_time)
            return res.status(400).json({ msg: "Bad parameter" });

        const idTodo = await createTodo(title, description, due_time, actualStatus, userId);
        return res.status(201).json({ msg: "Todo created" })
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const todo_id = Number(req.params.id);
        const todo = await getTodoById(todo_id);
        if (!todo)
            return res.status(404).json({ msg: "Not found" });
        return res.json(todo);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;
        const { title, description, due_time, status } = req.body;
        const actualStatus = status || "not started";

        if (!title || !description || !due_time)
            return res.status(400).json({ msg: "Bad parameter" });

        const affectedRows = await updateTodo(id, title, description, due_time, actualStatus, userId);
        if (affectedRows === 0)
            return res.status(404).json({ msg: "Not found" });
        return res.json({ msg: "Todo updated" });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const affectedRows = await deleteTodoById(id);
        if (affectedRows === 0)
            return res.status(404).json({ msg: "Not found" });
        return res.json({ msg: "Todo deleted" });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

export default router;
