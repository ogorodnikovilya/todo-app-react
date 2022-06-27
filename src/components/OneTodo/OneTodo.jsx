import { useState } from 'react';
import EditTodo from 'components/EditTodo/EditTodo';
import { deleteOneTask, completedOneTask, saveChangeTask } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';
import './style.scss';

const OneTodo = ({ task, checkedTask, modifyTask, deleteOneTodo }) => {
  const [buttonIdEditTask, setButtonIdEditTask] = useState('');

  const editTask = () => {
    setButtonIdEditTask(task._id);
  };

  const deleteTask = async () => {
    try {
      await deleteOneTask(task._id);
      deleteOneTodo(task._id);
    } catch (error) {
      alert('Ошибка в удалении задачи');
    };
  };

  const completedTask = async () => {
    try {
      const resp = await completedOneTask(task._id, !task.isCheck);
      checkedTask(resp.data);
    } catch (error) {
      alert('Ошибка в выполнении задачи');
    };
  };

  const updateTask = async (text) => {
    try {
      if (!isValidValueInput(text)) {
        throw new Error();
      };

      const response = await saveChangeTask(task._id, text);
      modifyTask(response.data, task._id);
      setButtonIdEditTask();
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <div className="todo__item">
      { buttonIdEditTask === task._id ? (
        <EditTodo
          text={task.text}
          updateTask={updateTask}
        />
      ) : (
        <>
          <div className="todo__item-text">{task.text}</div>
          <div className="todo__item-buttons">
            <input
              type="checkbox"
              checked={task.isCheck}
              onChange={completedTask}
            />
            { !task.isCheck && (
              <button
                type="button"
                onClick={editTask}
              >
                Редактировать
              </button>
            )}
            <button
              type="button"
              onClick={deleteTask}
            >
              Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OneTodo;