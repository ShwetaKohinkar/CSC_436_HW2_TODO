function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
        console.log(action.user);
        return action.user;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }
  
  function todoReducer(state, action) {
    switch (action.type) {
      case "add":
        return [action.todo, ...state];
      case "delete":
        return state.filter((todo) => todo._id !== action._id);
      case "toggle":
        return state.map((todo) =>
          todo._id === action._id ? { ...todo, isCompleted: action.value } : todo
        );  
      case "fetch":
        return action.todos;
      default:
        return state;
    }
  }
  
  export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      todos: todoReducer(state.todos, action),
    };
  }