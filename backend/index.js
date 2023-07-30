import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TodoRouter from "./routers/TodoRouter.js";
import UserRouter from "./routers/UserRouter.js";

const app = express();
const port = 5000;

mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("data base is open"));

app.use(cors());
app.use(express.json());
app.use(TodoRouter);
app.use(UserRouter);

app.listen(port, () => console.log("server is running"));
