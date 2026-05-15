import { Router } from "express";
import bcrypt from "bcryptjs";
import { findUserById, findUserByEmail, updateUser, deleteUserById } from "./user.query";
import { getAllTodosForUser } from "../todos/todos.query";

const router = Router();

router.get("/user", async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const user = await findUserById(userId);
    if (!user)
      return res.status(404).json({ msg: "Not found" });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/user/todos", async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const todos = await getAllTodosForUser(userId);
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/users/:id", async (req, res, next) => {
  if (!/^\d+$/.test(req.params.id))
    return next();
  try {
    const user = await findUserById(Number(req.params.id));
    if (!user)
      return res.status(404).json({ msg: "Not found" });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/users/:email", async (req, res) => {
  try {
    const user = await findUserByEmail(req.params.email);
    if (!user)
      return res.status(404).json({ msg: "Not found" });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { email, password, firstname, name } = req.body;

    if (!email || !password || !firstname || !name)
      return res.status(400).json({ msg: "Bad parameter" });

    const existing = await findUserById(id);
    if (!existing)
      return res.status(404).json({ msg: "Not found" });

    const hashed = await bcrypt.hash(password, 10);
    await updateUser(id, email, hashed, name, firstname);
    const updated = await findUserById(id);
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteUserById(id);
    if (deleted === 0)
      return res.status(404).json({ msg: "Not found" });
    return res.json({ msg: `Successfully deleted record number: ${id}` });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
