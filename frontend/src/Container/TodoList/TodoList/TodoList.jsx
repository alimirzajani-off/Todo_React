import { TodoItem } from "../TodoItem/TodoItem";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TodoList.scss";
import Menu from "../../../utils/Menu.json";
import { useEffect, useState } from "react";
import { TodoInput } from "../../TodoInput/TodoInput";
import { TodoDetail } from "../TodoDetail/TodoDetail";
import { SideBar } from "../../SideBar/SideBar";
import axios from "axios";

export const TodoList = (props) => {
  const [Data, setData] = useState([]);
  const [Detail, setDetail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) {
      navigate("/signin");
    }

    if (localStorage.getItem("admin") == "true") {
      navigate("/Admin");
    }

    getData();
  }, []);

  const getData = async () => {
    let jwt = localStorage.getItem("jwt");
    await axios
      .get("http://localhost:5000/todos", { headers: { auth: jwt } })
      .then((res) => {
        setData(res.data);
      });
  };

  const changeDetail = (res) => {
    setDetail(res);
  };

  return (
    <div className="Todo">
      <SideBar Menu={Menu} />
      <div className={`TodoList ${Detail ? "DetailOn" : ""}`}>
        <TodoInput Update={getData} data={Data} />
        <div className="TodoLists">
          <Outlet context={[changeDetail, Detail, Data, getData]} />
        </div>
      </div>
      <TodoDetail id={Detail} Update={getData} closeDetail={changeDetail} />
    </div>
  );
};
