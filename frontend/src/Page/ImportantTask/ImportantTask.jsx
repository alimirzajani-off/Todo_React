import { TodoItem } from "../../Container/TodoList/TodoItem/TodoItem";
import { useOutletContext } from "react-router-dom";

export const ImportantTask = (props) => {
  const [changeDetail, Detail, Data, getData] = useOutletContext();
  return (
    <div className="DT">
      {Data.length
        ? Data?.filter((item) => item.favorite == "true").map((items) => (
            <TodoItem
              key={items._id}
              Update={getData}
              changeDetail={changeDetail}
              {...items}
            />
          ))
        : "موردی وجود ندارد"}
    </div>
  );
};
