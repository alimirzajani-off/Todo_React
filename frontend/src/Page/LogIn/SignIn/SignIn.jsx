import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../../Components/Inputs/Input/Input";
import "./SignIn.scss";
import { IoLogInOutline } from "react-icons/io5";
export const SignIn = () => {
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const HandleSignIn = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    axios
      .post("http://localhost:5000/user/signIn", data)
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("id", res.data.id);
        if (
          username.toLowerCase().includes("admin") ||
          password.toLowerCase().includes("admin")
        ) {
          localStorage.setItem("admin", true);
          navigate("/Admin");
        } else {
          localStorage.setItem("admin", false);
          navigate("/");
        }
      })
      .catch((res) => toast.error("!نام کاربری و یا رمز عبور نادرست است"));
  };
  return (
    <>
      <form className="SignIn">
        <div className="SingInBox">
          <Input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            label="نام کاربری"
          />
          <Input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            label="رمز عبور"
          />
          <button
            className="btn btn-success SingIn-button"
            onClick={HandleSignIn}
          >
            <IoLogInOutline />
            ورود
          </button>
          <div className="SingInLink">
            <Link to="/SignUp">ثبت نام</Link>
            <Link to="/resetPassword">فراموشی رمز عبور</Link>
          </div>
        </div>
      </form>
    </>
  );
};
