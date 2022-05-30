import { useState } from 'react';
import { addTask, deleteTasks } from 'components/Service/service';
import './style.scss';

const AddTodo = ({allTasks, setAllTasks}) => {
  const [userInput, setUserInput] = useState('');

  const onChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      addNewTask(userInput);
    };
  };

  const isValidValueInput = (userInput) => {
    let validValue = true;
    return userInput.trim() === '' ? !validValue : validValue;
  };

  const addNewTask = async(userInput) => {
    try {
      if (!isValidValueInput(userInput)) {
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
      const resp = await deleteTasks();
      if (resp.message !== 'Deleted') {
        throw new Error();
      };

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
          onChange={onChange}
        />
      </div>
      <div className="todo-list__buttons-group">
        <button 
          className="todo-list__button-add"
          onClick={() => addNewTask(userInput)}>Добавить</button>
        <button
          className="todo-list__button-delete"
          onClick={deleteAllTasks}>Удалить все</button>
      </div>
    </div>
  );
};

export default AddTodo;