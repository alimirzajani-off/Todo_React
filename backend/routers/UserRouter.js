import express from "express";
import {
  getAllUser,
  getUserById,
  signIn,
  signUp,
} from "../controllers/UserController.js";

const router = express.Router();

router.post("/user/signup", signUp);
router.post("/user/signin", signIn);
router.get("/user/getusers", getAllUser);
router.get("/user/:id", getUserById);

export default router;
