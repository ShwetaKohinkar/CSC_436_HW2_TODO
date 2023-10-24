import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Todo from './Todo';
import { useReducer, useState } from 'react';

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const userReducer = (users, action) => {

    switch(action.type){
      case 'REGISTER':
        return[...users, action.user];
      
      case 'LOGIN':
        setLoggedInUser(action.user);
        return users;
      case 'LOGOUT':
        return[...users, action.user];

      default:
          return users;
    }

  };

  const[users, dispatchUsers] = useReducer(userReducer, []);
 

  const loginEventBind = (data)=>{
    console.log(data);

    dispatchUsers({type: 'LOGIN', user: data});
  }

  const registerEventBind = (userRegister)=>{
    dispatchUsers({type: 'REGISTER', user : userRegister});
  }

  const todoEventBind = (userData)=>{
    console.log(userData);
    dispatchUsers({type: 'LOGOUT', user : userData});

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login loginEventBind = {loginEventBind} users = {users} />} />
        <Route path="/register" element={<Register registerEventBind = {registerEventBind} />} />
        <Route path="/todo" element={<Todo todoEventBind = {todoEventBind} loggedInUser = {loggedInUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
