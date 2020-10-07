import React, { Fragment, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getEmployees } from "../api/employee";
import { getDepartments } from "../api/department";
import { getTasks } from "../api/task";
import { getJobs } from "../api/job";
import EmployeeChart from "./home/EmployeeChart";
import DepartmentChart from "./home/DepartmentChart";
import Footer from "./Footer";
import TaskChart from "./home/TaskChart";

const Home = (params) => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [taskDetails, setTaskDetails] = useState([]);
  const [departmentDetails, setDepartmentDetails] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const { t } = useTranslation();

  const allEmployees = async () => {
    const response = await getEmployees();
    setEmployeeDetails(response);
  };

  useEffect(() => {
    allEmployees();
  }, []);

  const allJobs = async () => {
    const response = await getJobs();
    setJobDetails(response);
  };

  useEffect(() => {
    allJobs();
  }, []);

  const allTasks = async () => {
    const response = await getTasks();
    setTaskDetails(response);
  };

  useEffect(() => {
    allTasks();
  }, []);
  const allDepartments = async () => {
    const response = await getDepartments();
    setDepartmentDetails(response);
  };
  useEffect(() => {
    allDepartments();
  }, []);

  return (
    <Fragment>
      <div className="wrapper">
        {/* <!-- Navbar --> */}

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className="content-wrapper" style={{ marginLeft: "0px" }}>
          {/* <!-- Content Header (Page header) --> */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">{t("dashboard")}</h1>
                </div>
                {/* <!-- /.col --> */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <NavLink to>Home</NavLink>
                    </li>
                    <li className="breadcrumb-item active">Dashboard v1</li>
                  </ol>
                </div>
                {/* <!-- /.col --> */}
              </div>
              {/* <!-- /.row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- /.content-header --> */}

          {/* <!-- Main content --> */}
          <section className="content">
            <div className="container-fluid">
              {/* <!-- Small boxes (Stat box) --> */}
              <div className="row">
                <div className="col-lg-3 col-6">
                  {/* <!-- small box --> */}
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{jobDetails.length}</h3>

                      <p>{t("job")}</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-briefcase"></i>
                    </div>
                    <Link to="/createjob" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- ./col --> */}
                <div className="col-lg-3 col-6">
                  {/* <!-- small box --> */}
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>
                        {taskDetails.length}
                        <sup styles="font-size: 20px"></sup>
                      </h3>

                      <p>{t("tasks")}</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-clipboard"></i>
                    </div>
                    <Link to="/createtasks" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- ./col --> */}
                <div className="col-lg-3 col-6">
                  {/* <!-- small box --> */}
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{employeeDetails.length}</h3>

                      <p>{t("employees")}</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <Link to="/createemployee" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- ./col --> */}

                <div className="col-lg-3 col-6">
                  {/* <!-- small box --> */}
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{departmentDetails.length}</h3>

                      <p>{t("departments")}</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-grid"></i>
                    </div>
                    <Link to="/createdepartment" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
                {/* <!-- ./col --> */}
              </div>
            </div>
          </section>
          {/* <!-- /.row -->
        <!-- Main row --> */}
          <div className="row">
            <EmployeeChart />
          </div>
          <div className="row">
            <DepartmentChart />
            <TaskChart />
          </div>
          <div className="row mt-5">
            <div className="col-lg-12 p-0 d-flex justify-content-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
