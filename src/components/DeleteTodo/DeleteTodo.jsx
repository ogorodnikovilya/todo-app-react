import { deleteTasks } from 'service/taskService';

const DeleteTodo = ({ setAllTasks }) => {
  const deleteAllTasks = async() => {
    try {
      await deleteTasks();
      setAllTasks([]);
    } catch (error) {
      alert('Ошибка удаления задач');
    };
  };

  return (
    <button
      type='button'
      onClick={deleteAllTasks}
    >
      Удалить все
    </button>
  );
};

export default DeleteTodo;