import { deleteTasks } from 'service/taskService';

const DeleteTodo = ({ deleteAllTodo }) => {
  const deleteAllTasks = async _ => {
    try {
      await deleteTasks();
      deleteAllTodo();
    } catch (error) {
      alert('Ошибка удаления задач');
    };
  };

  return (
    <button
      type="button"
      onClick={deleteAllTasks}
    >
      Удалить все
    </button>
  );
};

export default DeleteTodo;