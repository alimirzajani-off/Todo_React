import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TodoList.scss";
import Menu from "../../../utils/Menu.json";
import { useEffect, useState } from "react";
import { TodoInput } from "../../TodoInput/TodoInput";
import { TodoDetail } from "../TodoDetail/TodoDetail";
import { SideBar } from "../../SideBar/SideBar";
import axios from "axios";

export const TodoList = (props) => {
  const [DataList, setDataList] = useState([]);
  const [Data, setData] = useState([]);
  const [Detail, setDetail] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const [SearchValue, setSearchValue] = useState("");
  const [Sort, setSort] = useState({
    type: "",
  });
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

  useEffect(() => {
    if (SearchValue) {
      setData(SearchData);
    } else {
      setData(DataList);
    }
  }, [DataList, SearchData]);

  const getData = async (e) => {
    let jwt = localStorage.getItem("jwt");
    await axios
      .get("http://localhost:5000/todos", { headers: { auth: jwt } })
      .then((res) => {
        if (e == "update" && SearchValue) {
          setSearchData(
            res.data.filter((item) => item.name.includes(SearchValue))
          );
        } else {
          setDataList(res.data);
        }
      });
  };

  const changeDetail = (res) => {
    setDetail(res);
  };

  const handleSort = (e, type) => {
    setSort({
      type,
    });
    if (type.length > 0 && type !== Sort.type) {
      let data;
      let list = SearchData.length > 0 ? SearchData : DataList;
      if (type == "priority") {
        data = list.sort((a, b) => a[type] - b[type]);
      } else if (type == "name") {
        data = list.sort((a, b) => a[type].localeCompare(b[type]));
      }
      setData(data);
    } else {
      setSort({
        type: "",
      });
      setData(DataList);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      setSearchData(Data.filter((item) => item.name.includes(e.target.value)));
    } else {
      setSearchData(DataList);
    }
  };

  return (
    <div className="Todo">
      <SideBar Menu={Menu} />
      <div className={`TodoList ${Detail ? "DetailOn" : ""}`}>
        <TodoInput
          Update={getData}
          data={DataList}
          finalData={Data}
          SearchValue={SearchValue}
          handleSearch={handleSearch}
          sort={Sort.type}
          handleSort={handleSort}
        />
        <div className="TodoLists">
          <Outlet context={[changeDetail, Detail, Data, getData]} />
        </div>
      </div>
      <TodoDetail id={Detail} Update={getData} closeDetail={changeDetail} />
    </div>
  );
};
