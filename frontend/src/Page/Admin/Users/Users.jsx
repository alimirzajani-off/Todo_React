import axios from "axios";
import { useEffect, useState } from "react";
import "./Users.scss";

export const Users = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    getData();
    let id = "64a3009f3a40ab2c4753f3a0";
    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      console.log(res);
      // setData(res.data);
    });
  }, []);

  const getData = async () => {
    axios.get(`http://localhost:5000/user/getusers`).then((res) => {
      setData(res.data);
    });
  };

  return (
    <div>
      <table>
        <tr>
          <th>نام کاربری</th>
          <th>ایمیل</th>
          <th>پسورد</th>
        </tr>
        {Data.map((item) => (
          <tr>
            <td>{item.username}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
