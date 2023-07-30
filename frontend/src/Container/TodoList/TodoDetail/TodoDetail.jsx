import axios from "axios";
import { Input } from "../../../Components/Inputs/Input/Input";
import { TextArea } from "../../../Components/Inputs/TextArea/TextArea";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import Priority from "../../../utils/Priority.json";
import "./TodoDetail.scss";
import {
  IoArrowBackOutline,
  IoStarOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { Select } from "../../../Components/DropDowns/Select/Select";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import { Select } from "antd";

export const TodoDetail = ({ ...rest }) => {
  const [Detail, setDetail] = useState("");
  const [Description, setDescription] = useState("");
  const [TimeStart, setTimeStart] = useState("");
  const [TimeEnd, setTimeEnd] = useState("");

  let value;
  if (Detail && Detail.status == "todo") {
    value = false;
  } else {
    value = true;
  }

  useEffect(() => {
    getData();
  }, [rest.id]);

  const getData = () => {
    axios.get(`http://localhost:5000/todos/${rest.id}`).then((res) => {
      setDetail(res.data);
      if (res.data.detail) {
        setDescription(res.data.detail);
      } else if (res.data.timeStart) {
        setTimeStart(res.data.timeStart);
        console.log(TimeStart);
      } else if (res.data.timeEnd) {
        setTimeEnd(res.data.timeEnd);
      } else {
        setDescription("");
      }
    });
  };
  console.log(
    new DateObject({
      date: new Date(TimeStart),
      calendar: persian,
    })
  );

  const handleCheckBox = async (e) => {
    let status;
    if (e.target.checked) {
      status = "done";
    } else {
      status = "todo";
    }

    const data = await {
      status,
    };

    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    rest.Update();
    getData();
  };

  const handleDetail = async (e) => {
    const data = await {
      detail: Description,
    };
    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    rest.Update();
  };

  const handleDate = async (e) => {
    let date = new DateObject({ date: new Date(e) });
    const data = await {
      date: date.format("YYYY-MM-DD"),
    };
    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    rest.Update();
    getData();
  };

  const handleTimeStart = async (e) => {
    let time = new DateObject({ date: new Date(e) }).format(
      "YYYY-DD-MMTHH:mm:ss"
    );
    console.log(time);
    setTimeStart(time);
    const data = {
      timeStart: time,
    };
    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    // rest.Update();
    // getData();
    // console.log(e);
  };

  const handleTimeEnd = async (e) => {
    let time = new DateObject({ date: new Date(e) }).format(
      "YYYY-DD-MMTHH:mm:ss"
    );
    setTimeEnd(time);
    const data = {
      timeEnd: time,
    };
    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    // rest.Update();
    // getData();
  };

  const handleFavorite = async (e) => {
    let favorite;
    console.log(Detail);
    if (Detail.favorite == "true") {
      favorite = "false";
    } else {
      favorite = "true";
    }
    const data = await {
      name: Detail.name,
      favorite,
    };
    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    rest.Update();
    getData();
  };

  const handlePriority = async (e) => {
    let priority = e.target.value;
    const data = await {
      name: Detail.name,
      priority,
    };
    await axios.patch(`http://localhost:5000/todos/${rest.id}`, data);
    rest.Update();
    getData();
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/todos/${rest.id}`);
    rest.Update();
    await rest.closeDetail(null);
  };

  return (
    <div className={`TodoDetail ${rest.id ? "" : "d-none"}`}>
      <div className="TIBody">
        <div className="TIHeader">
          <Input type="checkbox" value={value} onChange={handleCheckBox} />
          <div className="TIHDetail">
            <h3>{Detail.name}</h3>
          </div>
          <div
            className={`FavoriteIcon ${
              Detail.favorite == "true" ? "FavoritedIcon" : ""
            }`}
          >
            <IoStarOutline onClick={handleFavorite} />
          </div>
        </div>
        <div className="TIContents">
          <div className="TIContent TICPriority">
            <div className="TICTitle">
              <h5>اولویت</h5>
            </div>
            <Select
              onChange={handlePriority}
              value={Detail.priority}
              options={Priority}
            />
          </div>
          <div className="TIContent">
            <div className="TICTitle">
              <h5>توضیحات</h5>
            </div>

            <TextArea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDetail}
              style={{ width: "100%" }}
            />
          </div>
          <div className="TIContent">
            <div className="TICTitle">
              <h5>تاریخ اجرا</h5>
            </div>
            <DatePicker
              style={{
                width: "100%",
                boxSizing: "border-box",
                height: "26px",
              }}
              containerStyle={{
                width: "100%",
              }}
              onChange={handleDate}
              value={
                Detail.date &&
                new DateObject({
                  date: new Date(Detail.date),
                  calendar: persian,
                })
              }
              calendar={persian}
              locale={persian_fa}
            />
          </div>
          <div className="TIContent">
            <div className="TICTitle">
              <h5>ساعت شروع</h5>
            </div>
            <DatePicker
              disableDayPicker
              format="HH:mm:ss"
              plugins={[<TimePicker />]}
              style={{
                width: "100%",
                boxSizing: "border-box",
                height: "26px",
              }}
              containerStyle={{
                width: "100%",
              }}
              onChange={handleTimeStart}
              value={
                new DateObject({
                  date: new Date(TimeStart),
                  calendar: persian,
                })
              }
              calendar={persian}
              locale={persian_fa}
            />
          </div>
          <div className="TIContent">
            <div className="TICTitle">
              <h5>ساعت پایان</h5>
            </div>
            <DatePicker
              disableDayPicker
              format="HH:mm:ss"
              plugins={[<TimePicker />]}
              style={{
                width: "100%",
                boxSizing: "border-box",
                height: "26px",
              }}
              containerStyle={{
                width: "100%",
              }}
              onChange={handleTimeEnd}
              value={
                new DateObject({
                  date: new Date(TimeEnd),
                  calendar: persian,
                })
              }
              calendar={persian}
              locale={persian_fa}
            />
          </div>
        </div>
        <div className="TIFooter">
          <IoArrowBackOutline onClick={(e) => rest.closeDetail(null)} />
          <IoTrashOutline className="DeleteIcon" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};
