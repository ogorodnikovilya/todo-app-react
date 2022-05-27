import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import AddTodo from '../AddTodo/AddTodo';
import Todos from '../Todos/Todos';

function TodoApp() {
  const [allTasks, setAllTasks] = useState([]);
  const url = 'http://localhost:8080';

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async() => {
    try {
      const resp = await axios.get(`${url}/allTasks`);
      setAllTasks(resp.data);
    } catch (error) {
      alert('Ошибка в получении всех задач')
    };
  };

  const addTask = async(userInput) => {
    if (userInput.trim() === '') {
      userInput = ''
      return;
    };
    try {
      const resp = await axios.post(`${url}/createTask`, {
        text: userInput,
        isCheck: false
      })
      setAllTasks([...allTasks, resp.data]);
    } catch (error) {
      alert('Ошибка в добавлении задачи');
    };
  };

  const delelteTask = async(_id) => {
    try {
      await axios.delete(`${url}/deleteTask/?id=${_id}`, {
        data: {_id},
        headers: {
          'Content-type': 'application/json'
        }
      });
      setAllTasks([...allTasks.filter(task => task._id !== _id)]);
    } catch (error) {
      alert('Ошибка в удалении задачи')
    };
  };

  const completedTask = async(_id,) => {
    try {
      const findTask = allTasks.find(item => item._id === _id);
      const resp = await axios.patch(`${url}/updateTaskCheck`, {
        _id: _id,
        isCheck: !findTask.isCheck
      });
      
      const sortArr = resp.data.sort((a, b) => a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0);
      setAllTasks(sortArr);
    } catch (error) {
      alert('Ошибка');
    };
  };

  const deleteAllTasks = async() => {
    try {
      await axios.delete(`${url}/deleteAllTask`);
      setAllTasks([]);
    } catch (error) {
      alert('Ошибка удаления задач');
    };
  };

  const saveTask = async(_id, obj) => {
    try {
      if (obj.value.trim() !== '') {
        const resp = await axios.patch(`${url}/updateTaskText`, {
          _id,
          text: obj.value
        });
      
        allTasks.map(item => {
          if (item._id === _id) {
            item.text = resp.data.text;
          }
          return item;
        });

        setAllTasks(allTasks);
        obj.setEdit(null);
      } else {
        obj.setValue('');
        throw new Error();
      }
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <>
      <div className='todo-list'>
        <AddTodo 
          addTask={addTask}
          deleteAllTasks={deleteAllTasks}
        />
      </div>
      <div className='todo__items'>
        {allTasks.map((task, index) => {
          return (
            <Todos
              task={task}
              key={task._id}
              delelteTask={delelteTask}
              completedTask = {completedTask}
              saveTask = {saveTask}
            />
          )
        })}
      </div>
    </>
  );
};

export default TodoApp;
