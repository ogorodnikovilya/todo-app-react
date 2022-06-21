import { useState } from 'react';
import EditTodo from 'components/EditTodo/EditTodo';
import { deleteOneTask, completedOneTask, saveChangeTask } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';
import './style.scss';

const OneTodo = ({ task, checkedTask, modifyTask, deleteOneTodo }) => {
  const { _id, text, isCheck } = task;
  const [buttonIdEditTask, setButtonIdEditTask] = useState('');

  const editTask = _ => {
    setButtonIdEditTask(_id);
  };

  const deleteTask = async _ => {
    try {
      await deleteOneTask(_id);
      deleteOneTodo(_id);
    } catch (error) {
      alert('Ошибка в удалении задачи');
    };
  };

  const completedTask = async _ => {
    try {
      const resp = await completedOneTask(_id, !isCheck);
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

      const response = await saveChangeTask(_id, text);
      modifyTask(response.data, _id);
      setButtonIdEditTask();
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <div className="todo__item">
      { buttonIdEditTask === _id ? (
        <EditTodo
          text={text}
          updateTask={updateTask}
        />
      ) : (
        <>
          <div className="todo__item-text">{text}</div>
          <div className="todo__item-buttons">
            <input
              type="checkbox"
              checked={isCheck}
              onChange={completedTask}
            />
            { !isCheck && (
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