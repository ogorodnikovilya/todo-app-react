import React from 'react';
import './App.css';
import PageRouter from './components/PageRouter/PageRouter';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import TodoApp from './components/todo-app/TodoApp';

function App() {
  return (
  <div className='wrapper'>
    <h1>To do list on React</h1>
      <Switch>
        <Route path='/pageRouter'>
          <PageRouter/>
        </Route>
        <Route path='/tasks'>
          <TodoApp/>
        </Route>
        <Redirect to='/tasks'/>
      </Switch>
    <Link to='/pageRouter'>Пустая страница с сообщением</Link>
    <Link to='/tasks'>Приложение ToDo-List</Link>
  </div>
  );
};

export default App;