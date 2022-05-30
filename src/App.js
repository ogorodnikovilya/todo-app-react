
import PageRouter from 'components/PageRouter/PageRouter';
import TodoApp from 'components/TodoApp/TodoApp';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

function App() {
  return (
  <div className='wrapper'>
    <h1>To do list on React</h1>
      <Switch>
        <Route path='/pageRouter' component={PageRouter}/>
        <Route path='/tasks' component={TodoApp}/>
        <Redirect from='/' to='/tasks'/>
      </Switch>
  </div>
  );
};

export default App;