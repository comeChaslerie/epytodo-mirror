import { Router } from "express";
import { findUserById } from "./user.query";

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

export default router;
