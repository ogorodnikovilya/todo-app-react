import { useState } from 'react';
import { saveChangeTask } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';
import './style.scss';

const EditTodo = ({ allTasks, text, _id, setButtonEditTask, setAllTasks }) => {
  const [valueChangeInput, setValueChangeInput] = useState(text);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      saveTask();
    };
  };

  const saveTask = async() => {
    try {
      if (!isValidValueInput(valueChangeInput)) {
        setValueChangeInput('');
        throw new Error();
      };
      const resp = await saveChangeTask(_id, valueChangeInput);

      allTasks.map(item => {
        if (item._id === _id) {
          item.text = resp.data.text;
        };
        return item;
      });

      setAllTasks(allTasks);
      setButtonEditTask();
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <>
        <input 
          value={valueChangeInput} 
          onChange={(e) => setValueChangeInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder='Измените задачу...'
        />

        <button
          onClick={saveTask}
          type='button'
        >
          Сохранить
        </button>
    </>
  );
};

export default EditTodo;