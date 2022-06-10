import { useState } from 'react';
import EditTodo from 'components/EditTodo/EditTodo';
import { deleteOneTask, completedOneTask } from 'service/taskService';
import './style.scss';

const Todos = ({ task, allTasks, changeTask }) => {
  const { _id, text, isCheck } = task;
  const [buttonIdEditTask, setButtonIdEditTask] = useState('');

  const editTask = (id) => { // Здесь передаю айди, потому что данную функцию отправляю в нижний компонент (EditTodo), чтобы напрямую не передавать изменение стейта setButtonIdEditTask
    setButtonIdEditTask(id);
  };

  const deleteTask = async() => {
    try {
      await deleteOneTask(_id);
      const updateTasks = allTasks.filter(oneTodo => oneTodo._id !== _id);
      changeTask(updateTasks);
    } catch (error) {
      alert('Ошибка в удалении задачи');
    };
  };

  const completedTask = async() => {
    try {
      const resp = await completedOneTask(_id, !isCheck);
      const sortArr = [...resp.data];
      changeTask(sortArr.sort((a, b) => a.isCheck - b.isCheck));
    } catch (error) {
      alert('Ошибка в выполнении задачи');
    };
  };

  return (
    <div className='todo__item'>
      { buttonIdEditTask === _id ? (
        <EditTodo
          text={text}
          _id={_id}
          allTasks={allTasks}
          editTask={editTask}
          changeTask={changeTask}
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
              onClick={() => editTask(_id)}
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