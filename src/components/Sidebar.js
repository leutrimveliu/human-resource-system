import React from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import ChooseLanguage from "../ChooseLanguage";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import Button from "@material-ui/core/Button";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import WorkIcon from "@material-ui/icons/Work";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "./Sidebar.css";

const Sidebar = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const signOut = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };
  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ width: "100%" }}
    >
      {/* <!-- Brand Logo --> */}
      <NavLink to className="brand-link">
        <span className="brand-text font-weight-light">HR System</span>
      </NavLink>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <NavLink to className="d-block">
              {t("welcome")},{" "}
              {auth.currentUser ? auth.currentUser.email : "Guest"}
            </NavLink>
          </div>
        </div>

        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon className
             with font-awesome or any other icon font library --> */}
            <li className="nav-item has-treeview menu-open my-2">
              <Link to="/" className="nav-link active">
                <DashboardIcon fontSize="large" className="DashboardIcons" />
                <p>
                  {t("dashboard")}
                  {/* <i className="right fas fa-angle-left"></i> */}
                </p>
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link to="/createdepartment" className="nav-link">
                <AccountTreeIcon fontSize="large" className="DashboardIcons" />
                <p>{t("departments")}</p>
              </Link>
            </li>
            <li className="nav-item has-treeview my-2">
              <Link to="/createemployee" className="nav-link">
                {/* <i className="nav-icon fas fa-user-plus"></i> */}
                <GroupAddIcon
                  fontSize="large"
                  className="DashboardIcons"
                />{" "}
                <p>{t("employees")}</p>
              </Link>
            </li>
            <li className="nav-item has-treeview my-2">
              <Link to="/createjob" className="nav-link">
                <WorkIcon fontSize="large" className="DashboardIcons" />
                <p>{t("job")}</p>
              </Link>
            </li>
            <li className="nav-item has-treeview my-2">
              <Link to="/createtasks" className="nav-link">
                <AssignmentTurnedInIcon
                  fontSize="large"
                  className="DashboardIcons"
                />
                <p>
                  {t("tasks")}
                  {/* <i className="fas fa-angle-left right"></i> */}
                </p>
              </Link>
            </li>

            <li className="nav-item has-treeview languageButton">
              <div className="language_container ">
                <ChooseLanguage />
              </div>
            </li>
            <li className="nav-item has-treeview">
              {auth.currentUser ? (
                <Button
                  onClick={signOut}
                  className="mt-3"
                  variant="contained"
                  color="primary"
                >
                  Sign Out
                </Button>
              ) : (
                ""
              )}
            </li>
          </ul>
        </nav>
        {/* <!-- /.sidebar-menu --> */}
      </div>
      {/* <!-- /.sidebar --> */}
    </aside>
  );
};

export default Sidebar;
