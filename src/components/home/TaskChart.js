import React, { useState, useEffect } from "react";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import {
  getDailyCount,
  getWeeklyCount,
  getMonthlyCount,
} from "../../api/task";

const TaskChart = () => {
  const [tasks, setTasks] = useState([]);
  const tasksData = [];
  const fetchTasks = async () => {
    const response = await getDailyCount();
    tasksData.push(response);
  };

  const fetchTasks1 = async () => {
    const response1 = await getWeeklyCount();
    tasksData.push(response1);
  };
  const fetchTasks2 = async () => {
    const response2 = await getMonthlyCount();
    tasksData.push(response2);
    setTasks(tasksData);
  };

  const tasksArray = [];
  tasks.map((task) => tasksArray.push(task.count));

  useEffect(() => {
    fetchTasks();
    fetchTasks1();
    fetchTasks2();
  }, []);

  const data = {
    labels: tasks.map((task) => task.name),
    datasets: [
      {
        label: "New Tasks",
        data: tasksArray,
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
      text: "New Tasks",
      fontSize: 20,
    },
    tooltips: {
      xPadding: 10,
    },
  };

  return (
    <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
      {tasks ? <Doughnut data={data} options={options} /> : null}
    </div>
  );
};

export default TaskChart;