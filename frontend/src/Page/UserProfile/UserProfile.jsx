import axios from "axios";
import { Input } from "../../Components/Inputs/Input/Input";
import { SideBar } from "../../Container/SideBar/SideBar";
import Menu from "../../utils/Menu.json";
import "./UserProfile.scss";
import { useEffect, useState } from "react";
import { Button } from "../../Components/Buttons/Button/Button";
import { toast } from "react-toastify";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
export const UserProfile = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [FormChanged, setFormChanged] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get(`http://localhost:5000/user/${localStorage.getItem("id")}`)
      .then((res) => {
        setfirstName(res.data.firstName);
        setlastName(res.data.lastName);
        setusername(res.data.username);
        setemail(res.data.email);
      });
  };

  const onChange = (e, type) => {
    if (type == "firstName") {
      setfirstName(e.target.value);
    } else if (type == "lastName") {
      setlastName(e.target.value);
    } else if (type == "email") {
      setemail(e.target.value);
    }
    setFormChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { firstName, lastName, email, username };
    await axios.patch(
      `http://localhost:5000/user/${localStorage.getItem("id")}`,
      data
    );
    setFormChanged(false);
    toast.success("تغییرات با موفقیت اعمال شد.");
  };

  const handleClose = (e) => {
    navigate("/");
  };

  return (
    <div className="UserProfile">
      <SideBar Menu={Menu} />
      <form>
        <Input
          label={"نام"}
          value={firstName}
          onChange={(e) => onChange(e, "firstName")}
          placeholder="اسمت رو میتونی اینجا وارد کنی..."
        />
        <Input
          label={"نام خانوادگی"}
          value={lastName}
          onChange={(e) => onChange(e, "lastName")}
          placeholder="فامیلیت رو میتونی اینجا وارد کنی..."
        />
        <Input
          label={"نام کاربری"}
          value={username}
          // onChange={(e) => setusername(e.target.value)}
          readOnly={true}
        />
        <Input
          label={"ایمیل"}
          value={email}
          onChange={(e) => onChange(e, "email")}
        />
        <div className="UPBtnsbox">
          <Button onClick={handleSubmit} className={"UPBbox btn-success"}>
            ذخیره
          </Button>
          {FormChanged ? (
            <Popconfirm
              title="بستن پروفایل کاربر"
              description="با بستن فرم تغییرات اعمال شده ذخیره نخواهند شد.
            آیا از بستن فرم مطمئن هستید؟"
              onConfirm={handleClose}
              onCancel={(e) => console.log(e)}
              okText="بله"
              cancelText="خیر"
            >
              <Button
                onClick={(e) => e.preventDefault()}
                className={"UPBbox btn-danger"}
              >
                بستن
              </Button>
            </Popconfirm>
          ) : (
            <Button
              onClick={(e) => navigate("/")}
              className={"UPBbox btn-danger"}
            >
              بستن
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
