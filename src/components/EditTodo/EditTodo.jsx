import { useState } from 'react';
import { saveChangeTask } from 'components/service/taskService';
import { isValidValueInput } from 'components/helpers';
import 'components/Todos/style.scss'

const EditTodo = ({allTasks, text, _id, setbuttonEditTask, setAllTasks}) => {
  const [valueChangeInput, setValueChangeInput] = useState(text);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      saveTask();
    };
  };

  const saveTask = async() => {
    try {
      if (isValidValueInput(valueChangeInput)) {
        setValueChangeInput('');
        throw new Error();
      };
      const resp = (await saveChangeTask(_id, valueChangeInput)).data;

      allTasks.map(item => {
        if (item._id === _id) {
          item.text = resp.text;
        };
        return item;
      });

      setAllTasks(allTasks);
      setbuttonEditTask();
    } catch (error) {
      alert('Введите данные');
    };
  };

  return (
    <>
      <div className="todo__buttons">
        <input 
          value={valueChangeInput} 
          onChange={(e) => setValueChangeInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder='Измените задачу...'
        />
      </div>

      <div className="todo__buttons">
        <button onClick={saveTask}>Сохранить</button>
      </div>
    </>
  );
};

export default EditTodo;