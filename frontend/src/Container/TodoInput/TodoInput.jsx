import { Input } from "../../Components/Inputs/Input/Input";
import React, { useState } from "react";
import axios from "axios";
import "./TodoInput.scss";
import { MdLowPriority } from "react-icons/md";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { Popover } from "antd";
import { TodoSearch } from "../TodoSearch/TodoSearch";

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
    <div className="todoInputs">
      <div className="todoInput" onSubmit={handleSubmit}>
        <Input
          value={Value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="عنوان کار خود را وارد کنید..."
        />
        <div className="todoButton">
          <button className="btn btn-primary" onClick={handleSubmit}>
            افزودن
          </button>
        </div>
      </div>
      <div className="TodoSearchBox">
        <TodoSearch value={props.SearchValue} onChange={props.handleSearch} />
        <div className="todoSort">
          <Popover
            title="...مرتب کردن بر اساس"
            trigger={"click"}
            className="SideBarPopover"
            style={{ textAlign: "right", fontFamily: "KalamehWebBold" }}
            content={
              <div className="TSItems">
                <div
                  className={`TSItem ${
                    props.sort == "priority" ? "TSIActive" : ""
                  }`}
                  onClick={(e) => props.handleSort(e, "priority")}
                >
                  اهمیت <MdLowPriority />
                </div>
                <div
                  className={`TSItem ${
                    props.sort == "name" ? "TSIActive" : ""
                  }`}
                  onClick={(e) => props.handleSort(e, "name")}
                >
                  حروف الفبا <HiOutlineSwitchVertical />
                </div>
              </div>
            }
          >
            ترتیب بر اساس
            <HiOutlineSwitchVertical />
          </Popover>
        </div>
      </div>
    </div>
  );
};
