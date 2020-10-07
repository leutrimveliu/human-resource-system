import axios from 'axios';

const addEmployee = async data => {
    const res = await axios.post(`http://localhost:8000/employee`, data);
    return res.data;
};

const getEmployees = async ()  => {
    const res = await axios.get(`http://localhost:8000/employee`);
    return res.data;
};

const getEmployeeById = async (id) => {
    const res = await axios.get(`http://localhost:8000/employee/edit/${id}`);
    return res.data;
};

const updateEmployee = async (id, data) => {
    const res = await axios.put(`http://localhost:8000/employee/edit/${id}`, data)
    return res.data;
};

const deleteEmployee = async (id) => {
    const res = await axios.delete(`http://localhost:8000/employee`, 
    {
        params:{
            id
        }
    })
    return res.data;
};

const getDailyCount = async () => {
    const res = await axios.get(`http://localhost:8000/employee/count/daily`)
    return res.data;
}

const getWeeklyCount = async () => {
    const res = await axios.get(`http://localhost:8000/employee/count/weekly`)
    return res.data;
}
const getMonthlyCount = async () => {
    const res = await axios.get(`http://localhost:8000/employee/count/monthly`)
    return res.data;
}



export { 
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getDailyCount,
    getWeeklyCount,
    getMonthlyCount,
}