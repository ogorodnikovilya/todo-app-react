import axios from "axios";
import constant from "components/constant";

const getTasks = async() => {
  try {
    const resp = await axios.get(`${constant}/allTasks`);
    return resp.data
  } catch (error) {
    alert('Ошибка в получении всех задач');
  };
};

const addTask = async(userInput) => {
  try {
    const resp = await axios.post(`${constant}/createTask`, {
      text: userInput,
      isCheck: false
    });
    return resp;
  } catch (error) {
    alert('Ошибка добавления задачи');
  };
};

const deleteTasks = async() => {
  try {
    const resp = await axios.delete(`${constant}/deleteAllTask`);
    return resp.data;
  } catch (error) {
    alert('Ошибка удаления задач');
  };
};

const deleteOneTask = async(_id) => {
  try {
    const resp = await axios.delete(`${constant}/deleteTask/?id=${_id}`);
    return resp.data;
  } catch (error) {
    alert('Ошибка в удалении задачи');
  };
};

const completedOneTask = async(_id, isCheck) => {
  try {
    const resp = await axios.patch(`${constant}/updateTaskCheck`, {
      _id: _id,
      isCheck: !isCheck
    });
    return resp.data;
  } catch (error) {
    alert('Ошибка в графе выполнения задачи');
  };
};

const saveChangeTask = async(_id, text) => {
  try {
    const resp = await axios.patch(`${constant}/updateTaskText`, {
      _id,
      text: text
    });
    return resp.data;
  } catch (error) {
    alert('Ошибка в изменении задачи');
  };
};

export {
  addTask, 
  deleteTasks,
  getTasks,
  deleteOneTask,
  completedOneTask,
  saveChangeTask
};
