import { useState } from 'react';
import { deleteOneTask, completedOneTask } from 'components/service/taskService';
import EditTodo from 'components/EditTodo/EditTodo';
import './style.scss';

const Todos = ({task, allTasks, setAllTasks}) => {
  const {_id, text, isCheck} = task;
  const [buttonEditTask, setbuttonEditTask] = useState();

  const editTask = (_id) => {
    setbuttonEditTask(_id);
  };

  const deleteTask = async(_id) => {
    try {
      await deleteOneTask(_id);
      setAllTasks([...allTasks.filter(task => task._id !== _id)]);
    } catch (error) {
      alert('Ошибка в удалении задачи');
    };
  };

  const completedTask = async(_id, isCheck) => {
    try {
      const sortArr = [...(await completedOneTask(_id, isCheck)).data];
      sortArr.sort((a, b) => a.isCheck - b.isCheck);
      setAllTasks(sortArr);
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
                onChange={() => completedTask(_id, isCheck)}
              />
              <button 
                className={isCheck ? 'hidden': ''} 
                onClick={() => editTask(_id, text)}>Редактировать</button>
              <button onClick={() => deleteTask(_id)}>Удалить</button>
            </div>
          </>
      }
    </div>
  )
};

export default Todos;