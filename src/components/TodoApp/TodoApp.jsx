import AddTodo from 'components/AddTodo/AddTodo';
import Todos from 'components/Todos/Todos';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTasks } from 'components/Service/service';
import './style.scss';

function TodoApp() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async() => {
    const resp = await getTasks();
    setAllTasks(resp);
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
