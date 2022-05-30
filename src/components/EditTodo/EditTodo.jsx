import { useState } from 'react';
import { saveChangeTask } from 'components/Service/service';
import 'components/Todos/style.scss'

const EditTodo = ({allTasks, text, _id, setbuttonEditTask, setAllTasks}) => {
  const [valueChangeInput, setValueChangeInput] = useState(text);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      saveTask();
    };
  };

  const isValidChangeInputText = (valueChangeInput) => {
    let validText = true;
    return valueChangeInput.trim() === '' ? !validText : validText;
  };

  const saveTask = async() => {
    try {
      if (!isValidChangeInputText(valueChangeInput)) {
        setValueChangeInput('')
        throw new Error();
      }
      const resp = await saveChangeTask(_id, valueChangeInput)

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
        />
      </div>

      <div className="todo__buttons">
        <button onClick={saveTask}>Сохранить</button>
      </div>
    </>
  );
};

export default EditTodo;