import { useState } from 'react';
import { addTask } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';
import './style.scss';

const AddTodo = ({ addNewTask }) => {
  const [userInput, setUserInput] = useState('');

  const newTask = async _ => {
    try {
      if (!isValidValueInput(userInput)) {
        throw new Error();
      };

      const resp = await addTask(userInput);
      addNewTask(resp.data);
      setUserInput('');
    } catch (error) {
      alert('Ошибка в добавлении задачи');
    };
  };

  return (
    <div className="todo__add">
      <div className="todo__add-entry">
        <input
          className="todo__add-input"
          placeholder="Введите новую задачу..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
        <button
          type="button"
          onClick={newTask}
        >
          Добавить
        </button>
    </div>
  );
};

export default AddTodo;