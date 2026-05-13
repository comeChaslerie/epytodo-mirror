import Router from "express";
const router = Router();
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../user/user.query";

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, firstname } = req.body;
    if (!email || !password || !name || !firstname)
      return res.status(404).json({ msg: "Incorrect arg\n" });
    const already_exist = await findUserByEmail(email);
    if (already_exist)
      return res.status(404).json({ msg: "User already exist\n" });
    const hashed = await bcrypt.hash(password, 10);
    const id = await createUser(email, hashed, name, firstname);
    if (!id)
      return res.status(404).json({ msg: "User creation failed\n" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error\n" });
  }
});

export default router;
