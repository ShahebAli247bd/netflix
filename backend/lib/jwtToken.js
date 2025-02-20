import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
export const generateTonenAndSetCookie = (userId, res) => {
    //generate token with userId
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: "15d",
    });

    //set cookie not cookies
    res.cookie("JWT_TOKEN", token, {
        maxAage: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV !== "development",
    });
    return token;
};
