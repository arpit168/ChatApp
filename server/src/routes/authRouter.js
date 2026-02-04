import express from "express";
import { loginUser } from "../controllers/authcontroller.js";
import { registerUser } from "../controllers/authcontroller.js"


const router = express.Router();
router.post("/register", UserRegister);
router.post("/login", UserLogin);

export default router;

