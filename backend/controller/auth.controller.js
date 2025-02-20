import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTonenAndSetCookie } from "./../lib/jwtToken.js";

export const SingUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //Check field are empty or not
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //Check Password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be atleast 6 Char",
            });
        }

        //Check Email with Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid Email" });
        }

        //Check User already exists in DB?
        const isUserExistsByUsername = await User.findOne({ username });
        if (isUserExistsByUsername) {
            return res
                .status(400)
                .json({ success: false, message: "Username already exists" });
        }

        //Check Email already exists in DB?
        const isEmailExistsInDB = await User.findOne({ email });
        if (isEmailExistsInDB) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }

        //create dummy image and add to the user Object as a dummy
        const dummyImage = ["/avater1.jpg", "/avater2.jpg", "/avater3.jpg"];
        const image = dummyImage[Math.floor(Math.random() * dummyImage.length)];

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //Create new User
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            image,
        });
        //Generate Token for Authentication
        const token = generateTonenAndSetCookie(newUser._id, res);
        console.log("JWT_TOKEN:" + token);
        //If new User Created then send response with new User details, keep password empty
        if (newUser) {
            await newUser.save();
            return res.status(201).json({
                success: true,
                message: {
                    user: {
                        ...newUser._doc,
                        password: "",
                    },
                },
            });
        }
    } catch (error) {
        console.log("Error:" + error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const SignIn = (req, res) => {};

export const SignOut = (req, res) => {};
