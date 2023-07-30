import axios from "axios";
import { Input } from "../../Components/Inputs/Input/Input";
import { SideBar } from "../../Container/SideBar/SideBar";
import "./UserProfile.scss";
import { useEffect, useState } from "react";
export const UserProfile = () => {
  const [Data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const data = { id: "64a300c63a40ab2c4753f3b0" };
    await axios.get(`http://localhost:5000/user/getuser`, data).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  return (
    <div className="UserProfile">
      <SideBar />
      <form>
        <Input label={"نام کاربری"} value={"hi"} />
        <Input label={"نام کاربری"} value={"hi"} />
        <Input label={"نام کاربری"} value={"hi"} />
        <Input label={"نام کاربری"} value={"hi"} />
      </form>
    </div>
  );
};
