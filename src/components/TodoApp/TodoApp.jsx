import { useState, useEffect } from 'react';
import AddTodo from 'components/AddTodo/AddTodo';
import Todos from 'components/Todos/Todos';
import DeleteTodo from 'components/DeleteTodo/DeleteTodo';
import { getTasks } from 'service/taskService';

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

    const addNewTask = (task) => {
      setAllTasks([...allTasks, task]);
    };

    const changeTask = (state) => {
      setAllTasks(state);
    };

  return (
    <>
      <AddTodo 
        allTasks={allTasks}
        addNewTask={addNewTask}
      />
      {allTasks.map(task => (
        <Todos
          allTasks={allTasks}
          changeTask={changeTask}
          task={task}
          key={task._id}
        />
      ))}
      <DeleteTodo
        changeTask={changeTask}
      />
    </>
  );
};

export default TodoApp;
