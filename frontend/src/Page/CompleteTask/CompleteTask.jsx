import { TodoItem } from "../../Container/TodoList/TodoItem/TodoItem";
import { useOutletContext } from "react-router-dom";

export const CompleteTask = (props) => {
  const [changeDetail] = useOutletContext();
  return (
    <>
      {props.DataList?.filter((item) => item.status == "done").map((items) => (
        <TodoItem
          key={items._id}
          Update={props.Update}
          changeDetail={changeDetail}
          {...items}
        />
      ))}
    </>
  );
};
