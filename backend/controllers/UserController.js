import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { check, validationResult } from "express-validator";

export const signUp = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ message: error.message });
  }
  const newuser = new User(req.body);
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    if (
      email.toLowerCase().includes("admin") ||
      username.toLowerCase().includes("admin")
    ) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    newuser.password = await bcrypt.hash(password, salt);
    await newuser.save();
    const payload = {
      newuser: {
        id: newuser.id,
      },
    };
    jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(500).send({ message: "Error In Saving" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrent Password" });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "secret", { expiresIn: 3600 }, async (error, token) => {
      if (error) throw error;
      const updateTodo = await User.updateOne(
        { _id: user.id },

        { $set: { token } }
      );
      res.status(200).json({ token, id: user.id });
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch {
    json.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.json(user);
  } catch {
    res.send({ message: "Error in Fetching user" });
  }
};
