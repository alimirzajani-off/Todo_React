import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { Popover } from "antd";
import "./SideBar.scss";
import { SideBarItem } from "./SideBarItem/SideBarItem";

export const SideBar = ({ Menu = [] }) => {
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    window.location.reload(false);
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
                {/* <Link className="SBPSItem SBPSIProfile" to={"/UserProfile"}>
                  <div className="SBPSTitle">پروفایل کاربر</div>
                  <div className="SBPSIcon">
                    <IoPersonCircleOutline />
                  </div>
                </Link> */}
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
