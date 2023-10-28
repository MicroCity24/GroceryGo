import express from "express";
import { User } from "../models/user.js";
import { jwtDecode } from "jwt-decode";

const router = express.Router();



router.delete("/:token", async (req, res) => {
    try{
        const token = req.params.token;
        const decoded = jwtDecode(token);
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.send({ status: "error", error: "User not found" });
        }
        await User.findByIdAndRemove(decoded.id);
        return res.json({ status: "ok"});
    }
    catch (err) {
        return res.json({ status: "error", error: err.message });
    }
})

export default router;