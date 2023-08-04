import {
  IoSettingsOutline,
  IoExitOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { Popover } from "antd";
import "./SideBar.scss";
import { SideBarItem } from "./SideBarItem/SideBarItem";
import { Link, useNavigate } from "react-router-dom";

export const SideBar = ({ Menu = [] }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("admin");
    navigate("/SignIn");
  };

  return (
    <div className="SideBar">
      <div className="SideBarItems">
        {Menu.map((item, index) => (
          <SideBarItem {...item} key={index} />
        ))}
      </div>
      <div className="SideBarFooter">
        <Popover
          title="تنظیمات"
          trigger={"click"}
          className="SideBarPopover"
          style={{ textAlign: "right", fontFamily: "KalamehWebBold" }}
          content={
            <div>
              <div className="SBPSetting">
                <Link
                  className={`SBPSItem SBPSIProfile ${
                    localStorage.getItem("admin") == "true" ? "d-none" : ""
                  }`}
                  to={"/UserProfile"}
                >
                  <div className="SBPSTitle">پروفایل کاربر</div>
                  <div className="SBPSIcon">
                    <IoPersonCircleOutline />
                  </div>
                </Link>
                <div className="SBPSItem SBPSIExite" onClick={handleLogOut}>
                  <div className="SBPSTitle">خروج</div>
                  <div className="SBPSIcon">
                    <IoExitOutline />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <IoSettingsOutline />
        </Popover>
      </div>
    </div>
  );
};
