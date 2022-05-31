import axios from "axios";
import { url } from "components/constant";

const getTasks = async() => await axios.get(`${url}/allTasks`);

const deleteTasks = async() => await axios.delete(`${url}/deleteAllTask`);

const deleteOneTask = async(_id) => await axios.delete(`${url}/deleteTask/?id=${_id}`);

const addTask = async(userInput) => {
  return await axios.post(`${url}/createTask`, {
    text: userInput,
    isCheck: false
  });
};

const completedOneTask = async(_id, isCheck) => {
  return await axios.patch(`${url}/updateTaskCheck`, {
    _id: _id,
    isCheck: !isCheck
  });
};

const saveChangeTask = async(_id, text) => {
  return await axios.patch(`${url}/updateTaskText`, {
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
