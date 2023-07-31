import axios from "axios";
import { useEffect, useState } from "react";
import "./Users.scss";
import { UserItem } from "../../Container/UserList/UserItem/UserItem";

export const Users = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios.get(`http://localhost:5000/user/getusers`).then((res) => {
      setData(res.data);
    });
  };

  return (
    <div className="AUsers">
      <table className="AUTable">
        <tr className="AUTHeader">
          <th>نام کاربری</th>
          <th>ایمیل</th>
        </tr>
        {Data.map((item) => (
          <UserItem {...item} />
        ))}
      </table>
    </div>
  );
};
