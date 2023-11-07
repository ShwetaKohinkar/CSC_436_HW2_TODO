import { useNavigate } from 'react-router-dom';
import './Todo.css'
import { useContext, useEffect, useReducer, useState } from 'react';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';


const taskReducer = (tasks, action) => {

    switch(action.type){
        case 'add':
            return [...tasks, action.todo];

        case 'toggle':

            tasks.map((val) =>{
                if(val.id===action.value.id){
                    val = action.value;
                }
            });
            return [...tasks];

        case 'delete':
            tasks = tasks.filter((val) => val.id != action.value);

            return[...tasks];

        case 'loadTodos':
                
                return [...action.todos];
        default:
            return tasks;

    }
};

function Todo() {

    const stateContext = useContext(StateContext);
    const [id, setID] = useState('');
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState(stateContext?.loggedInUser?.user?.email);

    const[tasks, dispatchTasks] = useReducer(taskReducer, []);
    const navigate = useNavigate();
    
    const [todoResponse, getTodos]  = useResource(()=>({
        url: `/todos?email=${email}`,
        method: 'get'
    }));

    const [deleteResponse, deleteTodo]  = useResource((item)=>({
        url: `/todos/${item.id}`,
        method: 'delete'
    }));

    const [prevAddId, setPrevID] = useState();
    const [addResponse, addTodoFunc] = useResource((item)=>({
        url: '/todos',
        method: 'post',
        data: item
    }));

    const [toggleResponse, toggleTodo] = useResource((item)=>({
        url: `/todos/${item.id}`,
        method: 'put',
        data: item
    }));

    function addTask(e){
        e.preventDefault();
       
        const item ={
            "title" : task,
            "description": description,
            "email": email,
            "dateCreated": new Date().toLocaleDateString(),
            "isCompleted": false, 
            "dateCompleted": null
        }   
        addTodoFunc(item);
    }

    const addDispatcher=(dataResponse)=>{
        if(dataResponse?.data && prevAddId !== dataResponse.data.id){
            dispatchTasks({type: 'add', todo: dataResponse.data});
            setTask('');
            setDescription('');
            setPrevID(dataResponse.data.id);
        }
    }
    
    useEffect(getTodos, []);

    const toggleDispatcher=()=>{
        if(toggleResponse?.data){
            dispatchTasks({type: 'toggle', value: toggleResponse.data })
            toggleResponse.data = undefined;
        }
    };

    const handleCheckboxChange=(val)=>{
        val.isCompleted = !val.isCompleted;
        if(val.isCompleted)
            val.dateCompleted = new Date().toLocaleDateString();
        else
            val.dateCompleted = null;

        toggleTodo(val);
    }


    
    const deleteTask = (val) => {

       deleteTodo(val);
       dispatchTasks({type: 'delete', value: val.id});
    };

   
    const onLogoutHandler =()=>{
       
        stateContext.loggedInUser.todos = tasks;
        stateContext.dispatchUsers({type: 'LOGOUT', user : stateContext?.loggedInUser});

        navigate('/');

    };

    useEffect(() => {
        if(todoResponse?.data && tasks.length === 0){
            dispatchTasks({type: 'loadTodos', todos: todoResponse.data})
        }
        addDispatcher(addResponse);
        toggleDispatcher();
    }, [todoResponse, addResponse, toggleResponse]);

    return (
        <div className="container container-todo">
            <div className='wrapper-todo'>
                <div className='row '>
                    <div className='col justify-content-start'>
                        <label>Logged in User: {stateContext?.loggedInUser.user.email} </label>
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
                                            <input type="checkbox" checked={val.isCompleted} onClick={(e) => handleCheckboxChange(val)}>
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
                                        <button className='button-delete' onClick={(e) => deleteTask(val)}>
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