import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { SignUp } from "./Page/LogIn/SignUp/SignUp";
import { SignIn } from "./Page/LogIn/SignIn/SignIn";
import { TodoList } from "./Container/TodoList/TodoList/TodoList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
import { ImportantTask } from "./Page/ImportantTask/ImportantTask";
import { ResetPassword } from "./Page/LogIn/ResetPassword/ResetPassword";

function App() {
  const [Data, setData] = useState([]);
  // const navigate = useNavigate();
  const getData = async () => {
    let jwt = localStorage.getItem("jwt");
    await axios
      .get("http://localhost:5000/todos", { headers: { auth: jwt } })
      .then((res) => {
        setData(res.data);
      });
  };

  return (
    <div className="App">
      <ToastContainer theme="colored" position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />}>
            <Route path="/" element={<DailyTask />}></Route>
            <Route path="CompleteTask" element={<CompleteTask />}></Route>
            <Route path="Important" element={<ImportantTask />}></Route>
          </Route>
          <Route path="/Admin" element={<Admin />}>
            <Route path="/Admin" element={<Users />}></Route>
            {/* <Route path="/Admin/Users" element={}></Route> */}
            <Route path="/Admin/Users/:id" element={<UserInfo />}></Route>
          </Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/resetPassword" element={<ResetPassword />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
