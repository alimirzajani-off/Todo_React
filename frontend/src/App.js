import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { SignUp } from "./Page/LogIn/SignUp/SignUp";
import { SignIn } from "./Page/LogIn/SignIn/SignIn";
import { TodoList } from "./Container/TodoList/TodoList/TodoList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { DailyTask } from "./Page/DailyTask/DailyTask";
import { CompleteTask } from "./Page/CompleteTask/CompleteTask";
import { UserProfile } from "./Page/UserProfile/UserProfile";
import { Admin } from "./Page/Admin/Admin";
import { Users } from "./Page/Users/Users";
import { UserInfo } from "./Page/Users/UserInfo/UserInfo";

function App() {
  const [Data, setData] = useState([]);
  const getData = async () => {
    let jwt = localStorage.getItem("jwt");
    await axios
      .get("http://localhost:5000/todos", { headers: { auth: jwt } })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <ToastContainer theme="colored" position="bottom-right" />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<TodoList DataList={Data} Update={getData} />}
          >
            <Route
              path="/"
              element={<DailyTask DataList={Data} Update={getData} />}
            ></Route>
            <Route
              path="CompleteTask"
              element={<CompleteTask DataList={Data} Update={getData} />}
            ></Route>
          </Route>
          <Route path="/Admin" element={<Admin />}>
            <Route path="/Admin" element={<>hids</>}></Route>
            <Route path="/Admin/Users" element={<Users />}></Route>
            <Route path="/Admin/Users/:id" element={<UserInfo />}></Route>
          </Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
