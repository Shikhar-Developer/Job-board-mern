import User from "../models/User.js";
import Candidate from "../models/Candidate.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employer from "../models/Employer.js";
import { registrationCompletedEmail } from "../service/email.service.js";

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
        if (user.role == "CANDIDATE") {
            await Candidate.create({ user: user._id });
        }

        if (user.role == "EMPLOYER") {
            await Employer.create({ user: user._id });
        }

        //Email Sending Function:
        await registrationCompletedEmail(user.email);

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

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password"
            })
        }

        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email or Password"
            })
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        res.status(200).json({
            success: true,
            message: "Login Successful!",
            token,
            data: { id: user._id, name: user.name, email: user.email, role: user.role }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server error"
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current and new Password are required!"
            })
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Succesfully!"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}