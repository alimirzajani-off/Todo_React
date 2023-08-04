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
  const [email, setemail] = useState("");
  const HandleSignIn = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:5000/user/signIn", data)
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("id", res.data.id);
        if (
          email.toLowerCase().includes("admin") ||
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
            value={email}
            onChange={(e) => setemail(e.target.value)}
            label="ایمیل"
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
            ورود <IoLogInOutline />
          </button>
          <div>
            <Link to="/SignUp">ثبت نام</Link>
          </div>
        </div>
      </form>
    </>
  );
};
