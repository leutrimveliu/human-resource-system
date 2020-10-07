import axios from "axios";

const addJob = async (data) => {
  const res = await axios.post(`http://localhost:8000/job`, data);
  return res.data;
};

const getJobs = async () => {
  const res = await axios.get(`http://localhost:8000/job`);
  return res.data;
};

const getJobById = async (id) => {
  const res = await axios.get(`http://localhost:8000/job/edit/${id}`);
  return res.data;
};

const updateJob = async (id, data) => {
  const res = await axios.put(`http://localhost:8000/job/edit/${id}`, data);
  return res.data;
};

const deleteJob = async (id) => {
  const res = await axios.delete(`http://localhost:8000/job`, {
    params: {
      id,
    },
  });
  return res.data;
};

export { addJob, getJobs, getJobById, updateJob, deleteJob };
