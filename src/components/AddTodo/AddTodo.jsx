import React, { useState } from "react";
import './style.css'

const AddTodo = ({addTask, deleteAllTasks}) => {
  const [userInput, setUserInput] = useState('');

  const onChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = () => {
    addTask(userInput);
    setUserInput('');
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    };
  };

  return (
    <div className="todo-list__add">
      <div className="todo-list__entry-field">
        <input 
          className="todo-list__input-value" 
          onKeyDown={handleKey} 
          placeholder="Введите новую задачу..." 
          value={userInput} onChange={onChange}
        />
      </div>
      <div className="todo-list__buttons-group">
        <button 
          className="todo-list__button-add"
          onClick={handleSubmit}
        >Добавить</button>
        <button
          className="todo-list__delete"
          onClick={deleteAllTasks}
        >Удалить все</button>
      </div>
    </div>
  );
};

export default AddTodo;