import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTodo from 'components/AddTodo/AddTodo';
import Todos from 'components/Todos/Todos';
import { getTasks } from 'service/taskService';
import './style.scss';

const TodoApp = () => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async() => {
    try {
      const resp = await getTasks();
      setAllTasks(resp.data);
    } catch (error) {
      alert('Ошибка в получении задач');
    };
  };

  return (
    <>
      <Link to='/pageRouter'>Пустая страница с сообщением</Link>
      <div className='todo-list'>
        <AddTodo 
          allTasks={allTasks}
          setAllTasks={setAllTasks}
        />
      </div>
      <div className='todo__items'>
        {allTasks.map(task => (
            <Todos
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              task={task}
              key={task._id}
            />
          )
        )}
      </div>
    </>
  );
};

export default TodoApp;
