import { useState } from 'react';
import EditTodo from 'components/EditTodo/EditTodo';
import { deleteOneTask, completedOneTask } from 'service/taskService';
import './style.scss';

const Todos = ({ task, allTasks, setAllTasks }) => {
  const { _id, text, isCheck } = task;
  const [buttonEditTask, setButtonEditTask] = useState();

  const editTask = () => {
    setButtonEditTask(_id);
  };

  const deleteTask = async() => {
    try {
      await deleteOneTask(_id);
      setAllTasks([...allTasks.filter(task => task._id !== _id)]);
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

  return (
    <div className={isCheck ? 'todo__items-item checked' : 'todo__items-item'}>
      { buttonEditTask === _id ? (
        <EditTodo
          text={text}
          _id={_id}
          allTasks={allTasks}
          setButtonEditTask={setButtonEditTask}
          setAllTasks={setAllTasks}
        />
      ) : (
        <>
          <div className="todo__items-item-text">{text}</div>
          <div className="todo__items-item-buttons">
            <input
              type="checkbox"
              checked={isCheck}
              onChange={completedTask}
            />
            { !isCheck && (
            <button
              className='todo__items-item-buttons-edit'
              type='button'
              onClick={editTask}
            >
              Редактировать
            </button> 
            )}
            <button
              className='todo__items-item-buttons-delete'
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