import jwt from "jsonwebtoken";
import { ENV_VARS } from "./../config/envVars.js";
import { User } from "./../models/user.model.js";
export const ProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies["JWT_TOKEN"];
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorize Access!" });
        }
        const decode = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decode) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid Token" });
        }

        const user = await User.findById(decode.userId).select("-password");
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.status == 404) {
            return res.status(404).send(null);
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
