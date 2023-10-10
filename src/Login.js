import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="container container-login">
            <div className='row justify-content-end custom-btn'>
                <Link to="/"  className='button-login' > LOGIN </Link>
                <Link to="register" className='button-register'> REGISTER </Link>
            </div>
            <form className='card card-login' onSubmit={() => navigate('/todo', {state : {user:user}})}>
                <label className='label'>LOGIN</label>
                <div className='details-login'>
                    <div className='row login-row-margin'>
                        <label for="username">Username:</label>
                        <input className='input-login' type="text" id="username" onChange={(e) => setUser(e.target.value)} name="username" placeholder="Enter Username" required/>
                    </div>
                    <div className='row'>
                        <label for="password">Password:</label>
                        <input className='input-login' type="password"  onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter Password" required/>

                    </div>
                    <div className="button-div-login">
                        <button type="submit" className='button-submit-login'> Sign In </button>
                    </div>
                    <Link to="/register" relative='path'>Not registered? Create an account</Link>
                </div>
            </form>
        </div>
    );
  }
  
  export default Login;