import axios from "axios";

const addTask = async (data) => {
  const res = await axios.post(`http://localhost:8000/task`, data);
  return res.data;
};

const getTasks = async () => {
  const res = await axios.get(`http://localhost:8000/task`);
  return res.data;
};

const getTaskById = async (id) => {
  const res = await axios.get(`http://localhost:8000/task/edit/${id}`);
  return res.data;
};

const updateTask = async (id, data) => {
  const res = await axios.put(`http://localhost:8000/task/edit/${id}`, data);
  return res.data;
};

const deleteTask = async (id) => {
  const res = await axios.delete(`http://localhost:8000/task`, {
    params: {
      id,
    },
  });
  return res.data;
};

const getDailyCount = async () => {
  const res = await axios.get(`http://localhost:8000/task/count/daily`);
  return res.data;
};

const getWeeklyCount = async () => {
  const res = await axios.get(`http://localhost:8000/task/count/weekly`);
  return res.data;
};
const getMonthlyCount = async () => {
  const res = await axios.get(`http://localhost:8000/task/count/monthly`);
  return res.data;
};

export {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDailyCount,
  getWeeklyCount,
  getMonthlyCount,
};
