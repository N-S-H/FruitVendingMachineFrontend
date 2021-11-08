import logo from './logo.svg';
import './App.css';
import Nav from './Navigation';
import Entry from './HomeComponent/Entry'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import LoginForm from './FormComponent/LoginForm';
import Admin from './AdminComponent/Admin';
import InventoryForm from './FormComponent/InventoryForm'
import User from './UserComponent/User'
import UserResult from './UserComponent/UserResult'

function App() {
  return (
    <Router>
    <div className="App" >
      <Nav/>
      <Switch>
          <Route path='/' exact component = {Entry}/> 
          <Route path = '/loginform' component = {LoginForm}/>
          <Route path = '/inventoryform' component = {InventoryForm}/>
          <Route path='/user' component = {User}/>
          <Route path='/admin' component = {Admin}/>
          <Route path='/result/:amount/:id' component={UserResult}/>
        </Switch>
        </div>
        </Router>
  );
}

export default App;
