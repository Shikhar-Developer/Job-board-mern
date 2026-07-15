import jwt from "jsonwebtoken";
import User from "../models/User.js";

const Authenticator = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            })
        }
        const token = auth.split(" ")[1];
        //Returns Payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user;
        next();


    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        })
    }
}

export default Authenticator;