import express from "express";
import { getUser, signIn, signUp } from "../controllers/UserController.js";

const router = express.Router();

router.post("/user/signup", signUp);
router.post("/user/signin", signIn);
router.get("/user/getuser", getUser);

export default router;
