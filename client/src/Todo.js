import { useNavigate } from 'react-router-dom';
import './Todo.css'
import { useContext, useEffect, useReducer, useState } from 'react';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';

function Todo() {

    const {state, dispatch} = useContext(StateContext);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const {user, todos} = state;

    const navigate = useNavigate();
    
    const [todoResponse, getTodos]  = useResource(()=>({
        url: `/todo`,
        method: 'get',
        headers: {'Authorization': `${user?.access_token}`}
    }));

    useEffect(() => {
        console.log(user);
        getTodos();
    }, [user?.access_token]);

    useEffect(() => {
        if(!todoResponse.isLoading && todoResponse?.data){
            dispatch({type: 'fetch', todos: todoResponse.data  })
        }
    }, [todoResponse]);


    //Add Todo
    const [addResponse, addTodoFunc] = useResource((item)=>({
        url: `/todo`,
        method: 'post',
        data: item,
        headers: {'Authorization': `${user?.access_token}`}
    }));

    useEffect(() => {
        if(!addResponse.isLoading && addResponse?.data){
            dispatch({type: 'add', todo: addResponse.data});
        }
    },[addResponse]);

    //Delete Todo
    const [deleteResponse, deleteTodo]  = useResource((item)=>({
        url: `/todo/${item._id}`,
        method: 'delete',
        headers: {'Authorization': `${user?.access_token}`}
    }));

    useEffect(() => {
        if(!deleteResponse.isLoading && deleteResponse?.data){
            dispatch({type: 'delete', _id: deleteResponse.data._id});
        }
    }, [deleteResponse]);

    //Toggle Todo
    const [toggleResponse, toggleTodo] = useResource((item)=>({
        url: `/todo/${item._id}`,
        method: 'put',
        data: item,
        headers: {'Authorization': `${user?.access_token}`}
    }));

    useEffect(() => {
        if(!toggleResponse.isLoading && toggleResponse?.data){
            dispatch({type: 'toggle', id: toggleResponse.data._id});
        }
    }, [toggleResponse]);

    function addTask(e){
        e.preventDefault();
       
        const item ={
            "title" : task,
            "description": description,
            "dateCreated": new Date().toLocaleDateString(),
            "isCompleted": false, 
            "dateCompleted": null
        } 
        setDescription('');
        setTask('');  
        addTodoFunc(item);
    }

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
    };

   
    const onLogoutHandler =()=>{
        dispatch({type: 'LOGOUT', user : state?.user});
        navigate('/');

    };

    return (
        <div className="container container-todo">
            <div className='wrapper-todo'>
                <div className='row '>
                    <div className='col justify-content-start'>
                        <label>Logged in User: {user.username} </label>
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
                    todos?.map((val,i) => {
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