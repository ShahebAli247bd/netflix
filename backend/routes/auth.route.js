import express from "express";
import { SignIn, SignOut, SingUp } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", SingUp);

router.post("/signin", SignIn);

router.post("/signout", SignOut);

export default router;
