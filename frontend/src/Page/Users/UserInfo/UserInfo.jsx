import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./UserInfo.scss";

export const UserInfo = (props) => {
  const [Total, setTotal] = useState(0);
  const [Done, setDone] = useState(0);
  const [Todo, setTodo] = useState(0);
  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:5000/todos", {
        headers: { auth: location.state.token },
      })
      .then((res) => {
        setTotal(res.data.length);
        setDone(res.data.filter((item) => item.status === "done").length);
        setTodo(res.data.filter((item) => item.status === "todo").length);
      });
  };

  const labels = ["کار های انجام شده", "کار های انجام نشده"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: [],
        backgroundColor: ["rgb(132, 242, 151)", "rgb(249, 48, 13)"],
        borderColor: ["rgb(132, 242, 151)", "rgb(249, 48, 13)"],
        data: [Done, Todo],
      },
    ],
  };
  return (
    <div className="UserInfo">
      <div className="UIBox UIStatus">
        <h3>وضعیت کار ها</h3>
        {Total > 0 ? (
          <Doughnut data={data} height={100} />
        ) : (
          <h4>کاری وجود ندارد</h4>
        )}
      </div>
    </div>
  );
};
