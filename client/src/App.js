import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Todo from './Todo';
import { useEffect, useReducer, useState } from 'react';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';
import  appReducer from './reducer'

function App() {
  

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const [loadUsersResponse, loadAllUsers] = useResource(() => ({
    url : '/users',
    method : 'get'
  }));
  useEffect(loadAllUsers, []);
  const [loggedInUser, setLoggedInUser] = useState({});
  // const userReducer = (users, action) => {

  //   switch(action.type){
  //     case 'REGISTER':
  //       return[...users, action.user];
      
  //     case 'LOGIN':
  //       setLoggedInUser(action.user);
  //       return users;
  //     case 'LOGOUT':
  //       return[...users, action.user];

  //     case 'LOADUSERS':
  //       return [...users, ...action.users];
  //     default:
  //         return users;
  //   }
  // };

  //const[users, dispatchUsers] = useReducer(userReducer, []);

  useEffect(()=>{
    if(loadUsersResponse?.data){
     // dispatchUsers({type: 'LOADUSERS', users: loadUsersResponse.data})
    }
  }, [loadUsersResponse])
  return (
    <StateContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  );
}

export default App;
