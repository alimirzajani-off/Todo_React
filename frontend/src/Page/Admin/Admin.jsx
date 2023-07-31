import { Outlet } from "react-router-dom";
import { SideBar } from "../../Container/SideBar/SideBar";
import Menu from "../../utils/AdminMenu.json";
import "./Admin.scss";
export const Admin = () => {
  return (
    <>
      <SideBar Menu={Menu} />
      <div className="AdminContent">
        <Outlet />
      </div>
    </>
  );
};
