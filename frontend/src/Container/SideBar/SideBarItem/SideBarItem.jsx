import { Link, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoCheckboxOutline,
  IoStarOutline,
} from "react-icons/io5";
import "./SideBarItem.scss";
import { useEffect, useState } from "react";

export const SideBarItem = (rest) => {
  const [IsActive, setIsActive] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname == rest.to) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  const RenderIcon = () => {
    if (rest.icon == "IoHomeOutline") {
      return <IoHomeOutline />;
    } else if (rest.icon == "IoCheckboxOutline") {
      return <IoCheckboxOutline />;
    } else if (rest.icon == "IoStarOutline") {
      return <IoStarOutline />;
    }
  };

  return (
    <div className={`SBItem ${IsActive ? "SBIActive" : ""}`}>
      <Link to={rest.to} className="SBIFormName">
        <div className="SBIIcon">{RenderIcon()}</div>
        <div className="SBITitle">{rest.name}</div>
      </Link>
    </div>
  );
};
