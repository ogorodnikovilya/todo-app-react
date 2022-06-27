import { useState } from 'react';

const EditTodo = ({ text, updateTask }) => {
  const [valueChangeInput, setValueChangeInput] = useState(text);

  const saveTask = () => {

    // Проверка находится в компоненте выше (OneTodo), там, где есть блоки try/catch
    updateTask(valueChangeInput);
  };

  return (
    <>
      <input
        value={valueChangeInput}
        onChange={(e) => setValueChangeInput(e.target.value)}
        placeholder="Измените задачу..."
      />

      <button
        onClick={saveTask}
        type="button"
      >
        Сохранить
      </button>
    </>
  );
};

export default EditTodo;