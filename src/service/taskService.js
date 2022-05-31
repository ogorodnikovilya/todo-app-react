import axios from "axios";
import { url } from "constant";

const getTasks = () => axios.get(`${url}/allTasks`);

const deleteTasks = () => axios.delete(`${url}/deleteAllTask`);

const deleteOneTask = (_id) => axios.delete(`${url}/deleteTask/?id=${_id}`);

const addTask = (userInput) => {
  return axios.post(`${url}/createTask`, {
    text: userInput,
    isCheck: false
  });
};

const completedOneTask = (_id, isCheck) => {
  return axios.patch(`${url}/updateTaskCheck`, {
    _id: _id,
    isCheck: !isCheck
  });
};

const saveChangeTask = (_id, text) => {
  return axios.patch(`${url}/updateTaskText`, {
    _id,
    text: text
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
