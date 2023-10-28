import express from "express";
import { Market, validateMarket } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "kdhas9opydu91q123j124bmsadajhgjbaseuywgw4";

router.post("/", async (req, res) => {
  const { error } = validateMarket(req.body);
  if (error) return res.json({ status: "error", error: error.message });

  const { name, email, password: plainTextPassword } = req.body;

  if (!name || !email || !plainTextPassword)
    return res.json({ status: "error", error: "All fields must be provided" });

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const market = await Market.create({
      name,
      email,
      password,
    });
    console.log("Market created successfully", market);
    const token = jwt.sign({ id: market._id, email: market.email }, JWT_SECRET);
    res.json({ status: "ok", data: token });
  } catch (err) {
    if (err.code === 11000)
      return res.json({
        status: "error",
        error: "Market with the email registered already exists",
      });
    return res.json({ status: "error", error: err.message });
  }
});

export default router;
