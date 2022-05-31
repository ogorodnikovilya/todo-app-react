import { useState } from 'react';
import EditTodo from 'components/EditTodo/EditTodo';
import { deleteOneTask, completedOneTask } from 'service/taskService';
import './style.scss';

const Todos = ({task, allTasks, setAllTasks}) => {
  const {_id, text, isCheck} = task;
  const [buttonEditTask, setbuttonEditTask] = useState();

  const editTask = () => {
    setbuttonEditTask(_id);
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
      const resp = await completedOneTask(_id, isCheck);
      const sortArr = [...resp.data];
      setAllTasks(sortArr.sort((a, b) => a.isCheck - b.isCheck));
    } catch (error) {
      alert('Ошибка в выполнении задачи');
    };
  };

  return (
    <div className={isCheck ? 'todo__item checked' : 'todo__item'}>
      {
        buttonEditTask === _id
         ? 
          <EditTodo 
            text={text}
            _id={_id}
            allTasks={allTasks}
            setbuttonEditTask={setbuttonEditTask}
            setAllTasks={setAllTasks}
          /> 
         :
          <>
            <div className="todo__text">{text}</div>
            <div className="todo__buttons">
              <input 
                type="checkbox" 
                checked={isCheck} 
                onChange={completedTask}
              />
              <button 
                className={isCheck ? 'hidden': ''} 
                onClick={editTask}>
                  Редактировать
                </button>
              <button onClick={deleteTask}>Удалить</button>
            </div>
          </>
      }
    </div>
  )
};

export default Todos;