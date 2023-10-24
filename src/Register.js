import { BrowserRouter, Link, useNavigate } from 'react-router-dom';

import './Register.css'
import { useState } from 'react';
function Register({registerEventBind}) {

    const [userName, setUserName] =  useState('');
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const [passwordMatch, setPasswordMatch] =  useState(true);
    const navigate = useNavigate();

    const onSubmitHandler=(e) =>{
        e.preventDefault();
        registerEventBind(registeredUser);
        navigate("/");
    };


    const registeredUser = {
       user: {"userName" : userName, "email": email, "password": password},
       todos: []
    }; 
    const handleConfirmPassword = (e) =>{
        console.log("password");
        setPasswordMatch(password === e.target.value);
    }

    return (
        <div className="container-register">
            <div className='wrapper-register'>
             <form className='card' onSubmit={(e) => onSubmitHandler(e) } >
                <label className='label' >SIGN UP</label>
                <div className='details'>
                    <div className='row'>
                        <input className='input-register' onChange={(e) => setUserName(e.target.value)} type="text" name="username" placeholder="Username" required/>
                        <input className='input-register' onChange={(e) => setEmail(e.target.value)} type="email"name="email" placeholder="Email" required/>
                        <input className='input-register' onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required/>
                        <input className='input-register' onBlur={(e) => handleConfirmPassword(e) } type="password" name="confirmPassword" placeholder="Confirm Password" required/>
                        {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
                    </div>
                    <div className="button-div-register">
                        <button type="submit" className='button-submit' > Sign Up </button>
                    </div>
                    <Link to="/" >Have an Account? Login Here</Link>
                </div>
            </form>
            </div>
        </div>
    );
  }
  
  export default Register;