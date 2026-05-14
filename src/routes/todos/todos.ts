import { Router } from "express";
import { getAllTodosForUser } from "./todos.query";

const router = Router();

router.get("/todos", async (req, res) => {
    try {
        const userId = (req as any).user.id;
        const todos = await getAllTodosForUser(userId);
        return res.json(todos);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
    }
});

export default router;
