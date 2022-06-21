import { useState, useEffect } from 'react';
import AddTodo from 'components/AddTodo/AddTodo';
import OneTodo from 'components/OneTodo/OneTodo';
import DeleteTodo from 'components/DeleteTodo/DeleteTodo';
import { getTasks } from 'service/taskService';

const TodoApp = () => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect( _ => {
    getAllTasks();
  }, []);

  const getAllTasks = async _ => {
    try {
      const resp = await getTasks();
      setAllTasks(resp.data.sort((a, b) => a.isCheck > b.isCheck));
    } catch (error) {
      alert('Ошибка в получении задач');
    };
  };

  const addNewTask = (task) => {
    setAllTasks([...allTasks, task]);
  };

  const checkedTask = (listTasks) => {
    const sortArr = [...listTasks];
    setAllTasks(sortArr.sort((a, b) => a.isCheck > b.isCheck));
  };

  const modifyTask = (changedTask, _id) => {
    const updatedTasks = allTasks.map(item => {
      const newItem = {...item};
      if (newItem._id === _id) {
        newItem.text = changedTask.text;
      }
      return newItem;
    });
    setAllTasks(updatedTasks.sort((a, b) => a.isCheck > b.isCheck));
  };

  const deleteOneTodo = (_id) => {
    const updateTasks = allTasks.filter(oneTodo => oneTodo._id !== _id);
    setAllTasks(updateTasks);
  };

  const deleteAllTodo = _ => {
    setAllTasks([]);
  };

  return (
    <>
      <AddTodo 
        addNewTask={addNewTask}
      />
      {allTasks.map(task => (
        <OneTodo
          checkedTask={checkedTask}
          modifyTask={modifyTask}
          deleteOneTodo={deleteOneTodo}
          task={task}
          key={task._id}
        />
      ))}
      <DeleteTodo
        deleteAllTodo={deleteAllTodo}
      />
    </>
  );
};

export default TodoApp;
