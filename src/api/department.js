import axios from "axios";

const addDepartment = async (data) => {
  const res = await axios.post(`http://localhost:8000/department`, data);
  return res.data;
};

const getDepartmentByEmployee = async (id) => {
 const res = await axios.get(`http://localhost:8000/department/byemployee`,
 {
    params: { id }
 })
 return res.data;
};


const getDepartments = async () => {
  const res = await axios.get(`http://localhost:8000/department`);
  return res.data;
};

const getDepartmentById = async (id) => {
  const res = await axios.get(`http://localhost:8000/department/edit/${id}`);
  return res.data;
};

const updateDepartment = async (id, data) => {
  const res = await axios.put(
    `http://localhost:8000/department/edit/${id}`,
    data
  );
  return res.data;
};

const deleteDepartment = async (id) => {
  const res = await axios.delete(`http://localhost:8000/department`, {
    params: {
      id,
    },
  });
  return res.data;
};

const getDailyCount = async () => {
  const res = await axios.get(`http://localhost:8000/department/count/daily`)
  return res.data;
}

const getWeeklyCount = async () => {
  const res = await axios.get(`http://localhost:8000/department/count/weekly`)
  return res.data;
}
const getMonthlyCount = async () => {
  const res = await axios.get(`http://localhost:8000/department/count/monthly`)
  return res.data;
}

export {
  addDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  getDailyCount,
  getWeeklyCount,
  getMonthlyCount,
  getDepartmentByEmployee,
};
