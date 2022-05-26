import React, { useState } from "react";
import './style.css'

const Todos = ({task, delelteTask, completedTask, saveTask}) => {
  const {_id, text, isCheck} = task;
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');
  const editTask = (_id, text) => {;
    setEdit(_id)
    setValue(text)
  }

  const obj = {
    value,
    setEdit
  };

  return (
    <div className={isCheck ? 'todo__item checked' : 'todo__item'}>
      {
        edit === _id ? 
          <div className="todo__buttons">
            <input 
              value={value} 
              onChange={(e) => setValue(e.target.value)}
            />
          </div> : 
          <div className="todo__text">{text}</div>
      }
      {
        edit === _id ? 
        <div className="todo__buttons">
          <button  onClick={() => saveTask(_id, obj)}>Сохранить</button>
        </div> :
        <div className="todo__buttons">
          <input 
            type="checkbox" 
            checked={isCheck} 
            onChange={() => completedTask(_id)}
          />
          <button 
            className={isCheck ? 'hidden': ''} 
            onClick={() => editTask(_id, text)}
          >Редактировать</button>
          <button onClick={() => delelteTask(_id)}>Удалить</button>
      </div>
      }
    </div>
  )
}

export default Todos;