import { Link } from "react-router-dom";
import "./UserItem.scss";
import { IoEyeOutline } from "react-icons/io5";
export const UserItem = (props) => {
  return (
    <tr className="AURow">
      <td>{props.username}</td>
      <td>{props.email}</td>
      <Link to={`/Admin/Users/${props._id}`} state={{ token: props.token }}>
        <td className="AURDetail">
          <IoEyeOutline />
        </td>
      </Link>
    </tr>
  );
};
