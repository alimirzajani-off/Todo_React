import { useState } from "react";
import { Input } from "../../../Components/Inputs/Input/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.scss";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const HandleSignUp = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    axios
      .patch(`http://localhost:5000/user/reset/${username}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        if (e.response.data.message == "new user is admin") {
          console.log(e.response);
          toast.error("با عنوان ادمین نمیتوانید اکانتی ایجاد کنید");
        } else if (e.response.data.message == "user already exists") {
          toast.error("کاربری با این نام کاربری موجود است");
        }
      });
  };

  return (
    <form className="ResetPassword">
      <div className="ResetPasswordBox">
        <Input
          value={username}
          onChange={(e) => setusername(e.target.value)}
          label="نام کاربری"
        />
        <Input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          label="رمز عبور"
        />
        <button
          className="btn btn-success ResetPassword-button"
          onClick={HandleSignUp}
        >
          تغییر رمز عبور
        </button>
        <div>
          <Link to="/SignIn">بازگشت</Link>
        </div>
      </div>
    </form>
  );
};
