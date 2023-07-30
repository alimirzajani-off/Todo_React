import { useState } from "react";
import { Input } from "../../../Components/Inputs/Input/Input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";

export const SignUp = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const HandleSignUp = () => {
    const data = {
      username,
      password,
      email,
    };
    axios.post("http://localhost:5000/user/signup", data).then((res) => {
      navigate("/SignIn");
    });
  };

  return (
    <form className="SignUp">
      <div className="SignUpBox">
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
        <Input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          label="ایمیل"
        />
        <button
          className="btn btn-success SingUp-button"
          onClick={HandleSignUp}
        >
          ثبت نام
        </button>
        <div>
          <Link to="/SignIn">ورود</Link>
        </div>
      </div>
    </form>
  );
};