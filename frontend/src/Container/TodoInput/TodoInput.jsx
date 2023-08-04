import { Input } from "../../Components/Inputs/Input/Input";
import React, { useState } from "react";
import axios from "axios";
import "./TodoInput.scss";
import { MdLowPriority } from "react-icons/md";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { Popover } from "antd";

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

  // const handleSort = (e, type) => {
  //   if (type == "priority") {
  //     let sortedData = props.data.sort((a, b) => a.priority - b.priority);
  //     props.changeData(sortedData);
  //   } else if (type == "alphabet") {
  //   }
  // };

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
      {/* <div className="todoSort">
        <Popover
          title="...مرتب کردن بر اساس"
          trigger={"click"}
          className="SideBarPopover"
          style={{ textAlign: "right", fontFamily: "KalamehWebBold" }}
          content={
            <div className="TSItems">
              <div
                className="TSItem"
                onClick={(e) => handleSort(e, "priority")}
              >
                اهمیت <MdLowPriority />
              </div>
              <div
                className="TSItem"
                onClick={(e) => handleSort(e, "alphabet")}
              >
                حروف الفبا <HiOutlineSwitchVertical />
              </div>
            </div>
          }
        >
          ترتیب بر اساس
          <HiOutlineSwitchVertical />
        </Popover>
      </div> */}
    </div>
  );
};
