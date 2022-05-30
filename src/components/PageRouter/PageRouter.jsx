import { Link } from "react-router-dom";

const PageRouter = () => {
  return(
    <div>
      <h1>Страница создана с помощью роутера</h1>
      <Link to='/tasks'>Приложение ToDo-List</Link>
    </div>
  );
};

export default PageRouter;