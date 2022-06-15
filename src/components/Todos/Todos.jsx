import { useState } from 'react';
import EditTodo from 'components/EditTodo/EditTodo';
import { deleteOneTask, completedOneTask, saveChangeTask } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';
import './style.scss';

const Todos = ({ task, allTasks, setAllTasks }) => {
  const { _id, text, isCheck } = task;
  const [buttonIdEditTask, setButtonIdEditTask] = useState('');

  const editTask = () => { 
    setButtonIdEditTask(_id);
  };

  const deleteTask = async() => {
    try {
      await deleteOneTask(_id);
      const updateTasks = allTasks.filter(oneTodo => oneTodo._id !== _id);
      setAllTasks(updateTasks);
    } catch (error) {
      alert('Ошибка в удалении задачи');
    };
  };

  const completedTask = async() => {
    try {
      const resp = await completedOneTask(_id, !isCheck);
      const sortArr = [...resp.data];
      setAllTasks(sortArr.sort((a, b) => a.isCheck - b.isCheck));
    } catch (error) {
      alert('Ошибка в выполнении задачи');
    };
  };

  const updateTask = async(text) => {
    try {
      if (!isValidValueInput(text)) {
        throw new Error();
      };
      const response = await saveChangeTask(_id, text);

      const updatedTasks = allTasks.map(item => {
        const newItem = {...item};
        if (newItem._id === _id) {
          newItem.text = response.data.text;
        }
        return newItem;
    });

      setAllTasks(updatedTasks);
      setButtonIdEditTask();
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <div className='todo__item'>
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
                type='button'
                onClick={editTask}
              >
                Редактировать
              </button>
            )}
            <button
              type='button'
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

export default Todos;