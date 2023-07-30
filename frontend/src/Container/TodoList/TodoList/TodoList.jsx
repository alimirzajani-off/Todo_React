import { TodoItem } from "../TodoItem/TodoItem";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TodoList.scss";
import Menu from "../../../utils/Menu.json";
import { useEffect, useState } from "react";
import { TodoInput } from "../../TodoInput/TodoInput";
import { TodoDetail } from "../TodoDetail/TodoDetail";
import { SideBar } from "../../SideBar/SideBar";

export const TodoList = (props) => {
  const [Detail, setDetail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) {
      navigate("/signin");
    }
    props.Update();
  }, []);

  const changeDetail = (res) => {
    setDetail(res);
  };

  return (
    <div className="Todo">
      <SideBar Menu={Menu} />
      <div className={`TodoList ${Detail ? "DetailOn" : ""}`}>
        <TodoInput Update={props.Update} />
        <Outlet context={[changeDetail, Detail]} />
      </div>
      <TodoDetail
        id={Detail}
        Update={props.Update}
        closeDetail={changeDetail}
      />
    </div>
  );
};
