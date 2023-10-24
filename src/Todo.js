import { BrowserRouter, Link, useLocation, useNavigate } from 'react-router-dom';
import './Todo.css'
import { useEffect, useReducer, useState } from 'react';

const taskReducer = (tasks, action) => {

    switch(action.type){
        case 'add':
            return [...tasks, action.todo];

        case 'toggle':

            tasks.map((val, i) =>{
                if(i===action.index){
                    val.isCompleted = action.value;
                    if(val.isCompleted){
                        val.dateCompleted =  new Date().toLocaleDateString();
                    }
                    else{
                        val.dateCompleted =  '';
                    }
                }

            });
            return [...tasks];

        case 'delete':
            tasks = tasks.filter((val, i) => i != action.index);
            console.log("Hellooo");

            return[...tasks];
        default:
            return tasks;

    }
};

function Todo({todoEventBind, loggedInUser}) {

    const [id, setID] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState(loggedInUser.user.userName);

    const location = useLocation();
    const[tasks, dispatchTasks] = useReducer(taskReducer, loggedInUser.todos);
    const navigate = useNavigate();
    function addTask(e){
        e.preventDefault();
       
        setID(id + 1);
        const item ={
            id,
            "title" : task,
            "description": description,
            "author": author,
            "dateCreated": new Date().toLocaleDateString(),
            "isCompleted": false, 
            "dateCompleted": ''
        }
        dispatchTasks({type: 'add', todo: item});
        setTask('');
        setDescription('');
    }

    

    const handleCheckboxChange=(event, i)=>{
        dispatchTasks({type: 'toggle', index: i, value: event.target.checked })
    }
    
    const deleteTask = (event, i) => {
        dispatchTasks({type: 'delete', index: i})
    };

    const onLogoutHandler =()=>{

        todoEventBind({user: loggedInUser.user, todos: tasks});
        navigate('/');

    };

    useEffect(() => {

    });

    return (
        <div className="container container-todo">
            <div className='wrapper-todo'>
                <div className='row '>
                    <div className='col justify-content-start'>
                        <label>Logged in User: {loggedInUser.user.userName} </label>
                    </div>
                    <div className='col justify-content-end button-signout-justify'>
                        <button to="/" type="submit" className='button-logout button-add' onClick={onLogoutHandler}> SIGN OUT </button>
                        
                    </div>
                </div>
                <div className='row justify-content-end'>
                    <form className='card' onSubmit={addTask}>
                        <label className='label-todo'>TO-DO LIST</label>
                        <div className='details-todo'>
                            <div className='row row-details-todo'>
                                <div className='left-content'>
                                    <div className='row'>
                                        <input type="text" value={task} name="addToDo" placeholder="Add ToDo" 
                                        onChange = {(e) => setTask(e.target.value)} className='todo-row-margin input-addTodo' required/>
                                    </div>
                                    <div className='row'>
                                        <input type="text" value={description} name="username" placeholder="Description" 
                                        onChange = {(e) => setDescription(e.target.value)} className='todo-row-margin input-addTodo' required/>
                                    </div>
                                </div>
                                <div className="right-content row justify-content-center">
                                    <button type="submit" className='button-add'> ADD </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='row tasks-wrapper'>

                {
                    tasks?.map((val,i) => {
                        return (
                            <div className='todo-wrapper' key={i}>
                               <div className='row row-width'>
                                    <div className='col-1'>
                                        <label >
                                            <input type="checkbox" checked={val.isCompleted} onClick={(e) => handleCheckboxChange(e, i)}>
                                            </input>
                                        </label>
                                    </div>
                                    <div className='col content-col'>
                                        <div className='row'>
                                            <label>Title:{val.title}</label>
                                        </div>
                                        <div className='row'>
                                            <label>Description:{val.description}</label>
                                        </div>
                                        <div className='row'>
                                            <label>Author:{val.author}</label>
                                        </div>
                                        <div className='row'>
                                            <label>Complete:{val.isCompleted ? "Yes" : "No"}</label>
                                        </div>
                                        <div className='row'>
                                            <label>Date created:{val.dateCreated}</label>
                                        </div> 
                                        <div className='row'>
                                            <label>Date completed:{val.dateCompleted}</label>
                                        </div>
                                    </div>

                                    <div className='col-1 button-delete-div'>
                                        <button className='button-delete' onClick={(e) => deleteTask(e, i)}>
                                         </button>

                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
                 </div>

            </div>    
        </div>
    );
  }
  
  export default Todo;