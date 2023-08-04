import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./UserInfo.scss";

export const UserInfo = (props) => {
  const [TodoData, setTodoData] = useState([]);
  const [UserData, setUserData] = useState();
  const [Total, setTotal] = useState(0);
  const [Done, setDone] = useState(0);
  const [Todo, setTodo] = useState(0);
  const [IsImportant, setIsImportant] = useState(0);
  const [IsNotImportant, setIsNotImportant] = useState(0);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    getTodoData();
    getUserData();
  }, []);

  const getTodoData = async () => {
    await axios
      .get("http://localhost:5000/todos", {
        headers: { auth: location.state.token },
      })
      .then((res) => {
        setTodoData(res.data);
        setTotal(res.data.length);
        setDone(res.data.filter((item) => item.status === "done").length);
        setTodo(res.data.filter((item) => item.status === "todo").length);
        setIsImportant(
          res.data.filter((item) => item?.favorite == "true").length
        );
        setIsNotImportant(
          res.data.filter(
            (item) => !item?.favorite || item?.favorite == "false"
          ).length
        );
      });
  };

  const getUserData = async () => {
    axios.get(`http://localhost:5000/user/${params.id}`).then((res) => {
      setUserData(res.data);
    });
  };

  const Statuslabels = ["کار های انجام شده", "کار های انجام نشده"];
  const StatusData = {
    labels: Statuslabels,
    datasets: [
      {
        label: [],
        backgroundColor: ["rgb(132, 242, 151)", "#aeafb0"],
        borderColor: ["rgb(132, 242, 151)", "#aeafb0"],
        data: [Done, Todo],
      },
    ],
  };

  const Favoritelabels = ["کار های مورد علاقه", "کار های معمولی"];
  const FavoriteData = {
    labels: Favoritelabels,
    datasets: [
      {
        label: [],
        backgroundColor: ["#e8d843", "#4377e8"],
        borderColor: ["#e8d843", "#4377e8"],
        data: [IsImportant, IsNotImportant],
      },
    ],
  };

  const Prioritylabels = [
    "اولویت اول",
    "اولیت دوم",
    "اولویت سوم",
    "اولویت چهارم",
  ];
  const PriorityData = {
    labels: Prioritylabels,
    datasets: [
      {
        label: [],
        backgroundColor: ["#751b05", "#8c2e16", "#ba4e32", "#e06e51"],
        borderColor: ["#751b05", "#8c2e16", "#ba4e32", "#e06e51"],
        data: [
          TodoData.filter((item) => item.priority === "1").length,
          TodoData.filter((item) => item.priority === "2").length,
          TodoData.filter((item) => item.priority === "3").length,
          TodoData.filter((item) => item.priority === "4").length,
        ],
      },
    ],
  };

  return (
    <div className="UserInfo">
      <div className="UIBox UIInfo">
        <div className="UIIColumn UIIColumn_1">
          <div className="UIICRow">نام: {UserData?.firstName}</div>
          <div className="UIICRow">نام خانوادگی: {UserData?.lastName}</div>
          <div className="UIICRow">
            تاریخ ساخت اکانت:
            {new DateObject({
              date: new Date(UserData?.createdAt),
              calendar: persian,
            }).format("YYYY/MM/DD")}
          </div>
        </div>
        <div className="UIIColumn UIIColumn_2">
          <div className="UIICRow">نام کاربری: {UserData?.username}</div>
          <div className="UIICRow">ایمیل: {UserData?.email}</div>
        </div>
      </div>
      <div className="UIBox UIChart">
        <div className="UICBox UIStatus">
          <h3>وضعیت کار ها</h3>
          {Total > 0 ? (
            <Doughnut data={StatusData} height={100} />
          ) : (
            <h4>کاری وجود ندارد</h4>
          )}
        </div>
        <div className="UICBox UIFavorite">
          <h3>وضعیت مورد علاقه بودن کار ها</h3>
          {Total > 0 ? (
            <Doughnut data={FavoriteData} height={100} />
          ) : (
            <h4>کاری وجود ندارد</h4>
          )}
        </div>
        <div className="UICBox UIPriority">
          <h3>وضعیت اهمیت کار ها</h3>
          {Total > 0 ? (
            <Doughnut data={PriorityData} height={100} />
          ) : (
            <h4>کاری وجود ندارد</h4>
          )}
        </div>
      </div>
    </div>
  );
};
