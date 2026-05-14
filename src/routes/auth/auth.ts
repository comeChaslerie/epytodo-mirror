import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../user/user.query";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, firstname } = req.body;
    if (!email || !password || !name || !firstname)
      return res.status(400).json({ msg: "Bad parameter" });

    const already_exist = await findUserByEmail(email);
    if (already_exist)
      return res.status(409).json({ msg: "Account already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const id = await createUser(email, hashed, name, firstname);

    const token = jwt.sign({ id }, process.env.SECRET!, { expiresIn: "1h" });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Bad parameter" });

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(401).json({ msg: "Bad parameter" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ msg: "Bad parameter" });

    const token = jwt.sign({ id: user.id }, process.env.SECRET!, { expiresIn: "1h" });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
