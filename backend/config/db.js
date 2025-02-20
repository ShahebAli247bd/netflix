import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error: Can't Connect to MongoDB due to -" + error.message);
        process.exit(1);
    }
};
