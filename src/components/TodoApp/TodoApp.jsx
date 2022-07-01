import { useState, useEffect } from 'react';
import AddTodo from 'components/AddTodo/AddTodo';
import OneTodo from 'components/OneTodo/OneTodo';
import DeleteTodo from 'components/DeleteTodo/DeleteTodo';
import { getTasks } from 'service/taskService';

const TodoApp = () => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const resp = await getTasks();
      setAllTasks(resp.data.sort((a, b) => a.isCheck > b.isCheck));
    } catch (error) {
      alert('Ошибка в получении задач');
    };
  };

  const addNewTaskCallback = (task) => {
    setAllTasks([...allTasks, task]);
  };

  const checkedTaskCallback = (listTasks) => {
    const sortArr = [...listTasks];
    setAllTasks(sortArr.sort((a, b) => a.isCheck > b.isCheck));
  };

  const modifyTaskCallback = (changedTask, _id) => {
    const updatedTasks = allTasks.map(item => {
      const newItem = {...item};
      if (newItem._id === _id) {
        newItem.text = changedTask.text;
      }
      return newItem;
    });
    setAllTasks(updatedTasks.sort((a, b) => a.isCheck > b.isCheck));
  };

  const deleteOneTodoCallback = (_id) => {
    const updateTasks = allTasks.filter(oneTodo => oneTodo._id !== _id);
    setAllTasks(updateTasks);
  };

  const deleteAllTodoCallback = () => {
    setAllTasks([]);
  };

  return (
    <>
      <AddTodo 
        addNewTask={addNewTaskCallback}
      />
      {allTasks.map(task => (
        <OneTodo
          checkedTask={checkedTaskCallback}
          modifyTask={modifyTaskCallback}
          deleteOneTodo={deleteOneTodoCallback}
          task={task}
          key={task._id}
        />
      ))}
      <DeleteTodo
        deleteAllTodo={deleteAllTodoCallback}
      />
    </>
  );
};

export default TodoApp;
