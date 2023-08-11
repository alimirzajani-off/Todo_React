import Todo from "../models/TodoModel.js";
import User from "../models/UserModel.js";
export const getTodo = async (req, res) => {
  try {
    const token = req.headers.auth;
    const user = await User.findOne({ token: token });
    const Todos = await Todo.find({ userId: user.id });
    res.json(Todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTodo = async (req, res) => {
  const token = req.headers.auth;
  const user = await User.findOne({ token: token });
  const params = { ...req.body, ...{ userId: user.id } };
  const todo = new Todo(params);
  try {
    const insertedTodo = await todo.save();
    res.json(insertedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
