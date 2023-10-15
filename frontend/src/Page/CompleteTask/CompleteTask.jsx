import { useEffect, useState } from "react";
import { TodoItem } from "../../Container/TodoList/TodoItem/TodoItem";
import { useOutletContext } from "react-router-dom";

export const CompleteTask = (props) => {
  const [changeDetail, Detail, Data, getData] = useOutletContext();

  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(Data);
  }, [Data]);
  return (
    <div className="DT">
      {Data.length
        ? Data?.filter((item) => item.status == "done").map((items) => (
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
