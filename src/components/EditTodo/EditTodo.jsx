import { useState } from 'react';
import { saveChangeTask } from 'service/taskService';
import { isValidValueInput } from 'helpers/validation';

const EditTodo = ({ allTasks, text, _id, editTask, changeTask }) => {
  const [valueChangeInput, setValueChangeInput] = useState(text);

  const saveTask = async() => {
    try {
      if (!isValidValueInput(valueChangeInput)) {
        throw new Error();
      };
      const resp = await saveChangeTask(_id, valueChangeInput);

      const updateTasks = allTasks.map(item => {
        if (item._id === _id) {
          item.text = resp.data.text;
        };
        return item;
      });

      changeTask(updateTasks);
      editTask();
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <>
      <input 
        value={valueChangeInput} 
        onChange={(e) => setValueChangeInput(e.target.value)}
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