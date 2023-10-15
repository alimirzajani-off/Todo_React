import axios from "axios";
import { IoStarOutline } from "react-icons/io5";
import { Input } from "../../../Components/Inputs/Input/Input";
import "./TodoItem.scss";

export const TodoItem = (props) => {
  const handleUpdate = async (e) => {
    let status;
    if (e.target.checked) {
      status = "done";
    } else {
      status = "todo";
    }
    console.log(e);
    const data = await {
      name: props.name,
      status,
    };
    console.log(data);
    await axios.patch(`http://localhost:5000/todos/${props._id}`, data);
    props.Update("update");
  };

  const handleFavorite = async (e) => {
    let favorite;
    if (props.favorite == "true") {
      favorite = "false";
    } else {
      favorite = "true";
    }

    const data = await {
      name: props.name,
      favorite,
    };

    await axios.patch(`http://localhost:5000/todos/${props._id}`, data);
    props.Update();
  };

  const handleOpenDetail = () => {
    props.changeDetail(props._id);
  };

  let value;
  if (props.status == "todo") {
    value = false;
  } else {
    value = true;
  }

  return (
    <div className={`TodoItem`}>
      <div className="TICDetail">
        <div className="TIContent">
          <Input type="checkbox" onChange={handleUpdate} value={value} />
        </div>
        <div
          className={`TIContent TITitle ${value ? "TITitleDone" : ""}`}
          onClick={handleOpenDetail}
        >
          {props.name}
        </div>
      </div>
      <div
        className={`TIContent FavoriteIcon ${
          props.favorite == "true" ? "FavoritedIcon" : ""
        }`}
      >
        <IoStarOutline onClick={handleFavorite} />
      </div>
    </div>
  );
};
