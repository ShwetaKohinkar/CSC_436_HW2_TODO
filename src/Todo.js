import { BrowserRouter, Link, useLocation } from 'react-router-dom';
import './Todo.css'
import { useEffect, useState } from 'react';

function Todo() {

    const [id, setID] = useState('');
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');

    const location = useLocation();
   
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
        tasks.push(item);
        setTask('');
        setDescription('');
    }


    const handleCheckboxChange=(i)=>{
        const updatedTask = [...tasks];
        updatedTask[i].isCompleted = !updatedTask[i].isCompleted;
        if(updatedTask[i].isCompleted){
            updatedTask[i].dateCompleted =  new Date().toLocaleDateString();
        }
        else{
            updatedTask[i].dateCompleted =  '';
        }
        setTasks(updatedTask);
    }
    
    useEffect(() => {
        setAuthor(location.state.user);
    });

    return (
        <div className="container container-todo">
            <div className='row justify-content-end'>
                <Link to="/" type="submit" className='button-submit button-add'> SIGN OUT </Link>
            </div>
            <div className='wrapper'>
                <form className='card' onSubmit={addTask}>
                    <label className='label-todo'>TO-DO LIST</label>
                    <div className='details-todo'>
                        <div className='row row-details-todo justify-content-center'>
                                <div className='row'>
                                    <input type="text" value={task} name="addToDo" placeholder="Add ToDo" 
                                    onChange = {(e) => setTask(e.target.value)} className='todo-row-margin input-addTodo' required/>
                                </div>
                                <div className='row'>
                                    <input type="text" value={description} name="username" placeholder="Description" 
                                     onChange = {(e) => setDescription(e.target.value)} className='todo-row-margin input-addTodo' required/>
                                </div>
                                <div className="row justify-content-center">
                                <button type="submit" className='button-add'> ADD </button>
                            </div>
                        </div>
                    </div>
                </form>

                {
                    tasks.map((val,i) => {
                        return (
                            <div className='task-wrapper' key={i}>
                               <div className='row'>
                                <div className='col-1'>
                                    <label >
                                        <input type="checkbox" checked={val.isCompleted} onClick={() => handleCheckboxChange(i)}>
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
                            </div>
                            </div>
                        )
                    })
                }

            </div>    
        </div>
    );
  }
  
  export default Todo;