import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  getDailyCount,
  getWeeklyCount,
  getMonthlyCount,
} from "../../api/employee";

const EmployeeChart = () => {
  const [employees, setEmployees] = useState([]);
  const employeesData = [];
  const fetchEmployees = async () => {
    const response = await getDailyCount();
    employeesData.push(response);
  };

  const fetchEmployees1 = async () => {
    const response1 = await getWeeklyCount();
    employeesData.push(response1);
  };
  const fetchEmployees2 = async () => {
    const response2 = await getMonthlyCount();
    employeesData.push(response2);
    setEmployees(employeesData);
  };

  const employeesArray = [];
  employees.map((employee) => employeesArray.push(employee.count));
  employeesArray.push(0);
  employeesArray.push(0);
  console.log(employeesArray);

  useEffect(() => {
    fetchEmployees();
    fetchEmployees1();
    fetchEmployees2();
  }, []);

  const data = {
    labels: employees.map((employee) => employee.name),
    datasets: [
      {
        label: "New Employees",
        data: employeesArray,
        fill: true,
        backgroundColor: [
          "rgba(94, 214, 132, 0.4)",
          "rgba(240, 216, 156, 0.4)",
          "rgba(240, 156, 220, 0.4)",
        ],
        borderColor: ["rgba(0, 0, 0, 0.6)"],
        borderWidth: 1,
        barThickness: 150,
        barPercentage: 0.5,
        maxBarThickness: 200,
        minBarLength: 2,
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "New Employees",
      fontSize: 20,
    },
    tooltips: {
      xPadding: 10,
    },
  };

  console.log(data);

  return (
    <div className="col-lg-10 col-md-12 col-sm-12 m-auto">
      <div className="d-flex justify-content-center mb-2"></div>
      {employees ? <Bar data={data} options={options} /> : null}
    </div>
  );
};

export default EmployeeChart;
