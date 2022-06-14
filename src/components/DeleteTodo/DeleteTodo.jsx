import { deleteTasks } from 'service/taskService';

const DeleteTodo = ({ changeTask }) => {
  const deleteAllTasks = async() => {
    try {
      await deleteTasks();
      changeTask([]);
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