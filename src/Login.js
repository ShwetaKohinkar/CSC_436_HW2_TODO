import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';



function Login({loginEventBind, users}) {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let loggedInUser = null;
    

    const login = (e)=>{
        e.preventDefault();

        users.map((val, i) => {
            if(val.user.userName === user ){
                if(val.user.password === password){ 
                    loggedInUser = val;
                    setErrorMsg('');
                }
                else{
                    setErrorMsg('Password doesn\'t match');
                }
            }
        });
        if(loggedInUser != null && loggedInUser.length !=0 ){
            loginEventBind(loggedInUser)
            navigate("/todo");
        }
        else if(loggedInUser === null || loggedInUser.length === 0 || errorMsg === ''){
            setErrorMsg('User not regsitered');
        }
    }

    return (
        <div className="container container-login">
            <div className='wrapper-login'>
                <div className='row justify-content-end custom-btn'>
                    <Link to="/"  className='button-login' > LOGIN </Link>
                    <Link to="register" className='button-register'> REGISTER </Link>
                </div>
                <div className='login-form'>
                    <form className='card' onSubmit={(e) => login(e)}>
                        <label className='label'>LOGIN</label>
                        <div className='details-login'>
                            <div className='row login-row-margin'>
                                <label for="username">Username:</label>
                                <input  type="text" id="username" onChange={(e) => setUser(e.target.value)} name="username" placeholder="Enter Username" required/>
                            </div>
                            <div className='row'>
                                <label for="password">Password:</label>
                                <input type="password"  onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter Password" required/>
                            </div>
                           {errorMsg !='' && ( <div className='label-error'>
                                <label id='lblError'>{errorMsg}</label>
                            </div>)}
                            <div className="button-div-login">
                                <button type="submit" className='button-submit-login'> Sign In </button>
                            </div>
                            <Link to="/register" type='submit'>Not registered? Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
  
  export default Login;