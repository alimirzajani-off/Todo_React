import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/TodoController.js";

const router = express.Router();

router.get("/todos", getTodo);
router.get("/todos/:id", getTodoById);
router.post("/todos", addTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", updateTodo);
export default router;
