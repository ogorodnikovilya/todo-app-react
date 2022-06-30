import axios from "axios";
import { url } from "constant";

const getTasks = () => axios.get(`${url}/allTasks`);

const deleteTasks = () => axios.delete(`${url}/deleteAllTask`);

const deleteOneTask = (_id) => axios.delete(`${url}/deleteTask/?id=${_id}`);

const addTask = (text) => {
  return axios.post(`${url}/createTask`, {
    text,
    isCheck: false
  });
};

const completedOneTask = (_id, isCheck) => {
  return axios.patch(`${url}/updateTaskCheck`, {
    _id,
    isCheck
  });
};

const saveChangeTask = (_id, text) => {
  return axios.patch(`${url}/updateTaskText`, {
    _id,
    text
  });
};

export {
  addTask, 
  deleteTasks,
  getTasks,
  deleteOneTask,
  completedOneTask,
  saveChangeTask
};
