import { TodoItem } from "../../Container/TodoList/TodoItem/TodoItem";
import { useOutletContext } from "react-router-dom";
import "./DailyTask.scss";
export const DailyTask = (props) => {
  const [changeDetail, Detail] = useOutletContext();
  return (
    <div className="DailyTask">
      <div className="DTTodo">
        <h4>برنامه هایی که باید انجام شوند</h4>
        {props.DataList?.filter((item) => item.status == "todo").length > 0
          ? props.DataList?.filter((item) => item.status == "todo")?.map(
              (items) => (
                <TodoItem
                  key={items._id}
                  Update={props.Update}
                  changeDetail={changeDetail}
                  Detail={Detail}
                  {...items}
                />
              )
            )
          : "موردی وجود ندارد"}
      </div>
      <div className="DTDone">
        <h4>برنامه های انجام شده</h4>
        {props.DataList?.filter((item) => item.status == "done").length > 0
          ? props.DataList?.filter((item) => item.status == "done").map(
              (items) => (
                <TodoItem
                  key={items._id}
                  Update={props.Update}
                  changeDetail={changeDetail}
                  Detail={Detail}
                  {...items}
                />
              )
            )
          : "موردی وجود ندارد"}
      </div>
    </div>
  );
};
