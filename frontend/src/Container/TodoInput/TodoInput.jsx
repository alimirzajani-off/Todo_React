import { Input } from "../../Components/Inputs/Input/Input";
import React, { useState } from "react";
import axios from "axios";
import "./TodoInput.scss";

export const TodoInput = (props) => {
  const [Value, setValue] = useState("");

  const handleSubmit = async (e) => {
    const data = { name: Value, status: "todo" };
    let jwt = localStorage.getItem("jwt");
    await axios
      .post("http://localhost:5000/todos", data, { headers: { auth: jwt } })
      .then((res) => props.Update(res.data));
    setValue("");
  };

  return (
    <div className="todoInput" onSubmit={handleSubmit}>
      <Input
        value={Value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="عنوان کار خود را وارد کنید..."
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        افزودن
      </button>
    </div>
  );
};
