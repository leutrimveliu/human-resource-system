import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Home from "./components/Home";
import CreateEmployee from "./components/employee/addemployee/create-employee";
import CreateDepartment from "./components/department/adddepartment/create-department";
import CreateTasks from "./components/tasks/addtasks/create-task";
import "./custom.css";
import "./App.css";
import CreateJob from "./components/job/addjob/create-job";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { auth } from "./firebase";
import EditTask from "./components/tasks/edittask/EditTask";
import EditEmployee from "./components/employee/editemployee/EditEmployee";
import EditDepartment from "./components/department/editdepartment/EditDepartment";
import EditJob from "./components/job/editjob/EditJob";
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is >>>>", authUser);
      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div id="app">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-lg-2">{user ? <Sidebar /> : ""}</div>
          <div className="col-lg-10">
            <Switch>
              <Route path="/createemployee" component={CreateEmployee} />
              <Route path="/createdepartment" component={CreateDepartment} />
              <Route path="/createjob" component={CreateJob} />
              <Route path="/createtasks" component={CreateTasks} />
              <Route path="/login" component={Login} />
              <Route path="/job/edit/:id" component={EditJob} />
              <Route path="/employee/edit/:id" component={EditEmployee} />
              <Route path="/department/edit/:id" component={EditDepartment} />
              <Route path="/task/edit/:id" component={EditTask} />
              {user ? (
                <Route exact path="/" component={Home} />
              ) : (
                <Route exact path="/" component={Login} />
              )}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
