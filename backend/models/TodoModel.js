import mongoose from "mongoose";

const Todo = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
    default: "1",
  },
  favorite: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  detail: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  timeStart: {
    type: String,
    required: false,
  },
  timeEnd: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Todos", Todo);
