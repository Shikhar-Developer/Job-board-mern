import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: true,
                message: "User already exist!"
            });
        }

        //10 Salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({
            succes: true,
            message: "User Registered!",
            data: { id: user._id, name: user.name, email: user.email, role: user.role }
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        });
    }





}