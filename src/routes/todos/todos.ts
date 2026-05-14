import { Router } from "express";
import { getAllTodos } from "./todos.query";

const router = Router();

router.get("/todos", async (req, res) => {
    try {
        const todos = await getAllTodos();
        return res.json(todos);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

export default router;
