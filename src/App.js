import { Route, Routes, Navigate } from 'react-router-dom';
import TodoApp from 'components/TodoApp/TodoApp';
import './App.scss';

const App = () => {
  return (
  <div className='wrapper'>
    <h1>To do list on React</h1>
    <Routes>
      <Route path='/tasks' element={<TodoApp />}/>
      <Route path='*' element={<Navigate to='/tasks' replace/>}/>
    </Routes>
  </div>
  );
};

export default App;