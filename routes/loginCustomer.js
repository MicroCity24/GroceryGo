import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "kdhas9opydu91q123j124bmsadajhgjbaseuywgw4"; // Same JWT secret used for registration

router.post("/", async (req, res) => {
  const { email, password: plainTextPassword } = req.body;

  if (!email || !plainTextPassword)
    return res.json({ status: "error", error: "All fields must be provided" });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ status: "error", error: "Invalid email or password" });

    if (await bcrypt.compare(plainTextPassword, user.password)) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error", error: "Invalid email or password" });
    }
  } catch (err) {
    return res.json({ status: "error", error: err.message });
  }
});

export default router;
