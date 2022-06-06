import { useState } from 'react';
import { addTask, deleteTasks } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';
import './style.scss';

const AddTodo = ({allTasks, setAllTasks}) => {
  const [userInput, setUserInput] = useState('');

  const handleKey = (e) => {
    if (e.key === "Enter") {
      addNewTask(userInput);
    };
  };

  const addNewTask = async() => {
    try {
      if (!isValidValueInput(userInput)) {
        setUserInput('');
        throw new Error();
      };

      const resp = await addTask(userInput);
      setAllTasks([...allTasks, resp.data]);
      setUserInput('');
    } catch (error) {
      alert('Ошибка в добавлении задачи');
    };
  };

  const deleteAllTasks = async() => {
    try {
      await deleteTasks();
      setAllTasks([]);
    } catch (error) {
      alert('Ошибка удаления задач');
    };
  };

  return (
    <div className="todo-list__add">
      <div className="todo-list__entry-field">
        <input
          className="todo-list__input-value"
          onKeyDown={handleKey} 
          placeholder="Введите новую задачу..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <div className="todo-list__buttons-group">
        <button
          type='button'
          className="todo-list__button-add"
          onClick={addNewTask}>
            Добавить
        </button>
        <button
          type='button'
          className="todo-list__button-delete"
          onClick={deleteAllTasks}>
            Удалить все
        </button>
      </div>
    </div>
  );
};

export default AddTodo;