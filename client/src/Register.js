import { Link, useNavigate } from 'react-router-dom';
import { useResource } from 'react-request-hook';

import './Register.css'
import { useContext, useState, useEffect } from 'react';
import { StateContext } from './context';
function Register() {


    const [registerResponse, registerUser] = useResource(()=>({
        url: '/users',
        method: 'post',
        data: {email: email, password: password}
    }));
    const stateContext = useContext(StateContext);
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const [passwordMatch, setPasswordMatch] =  useState(true);
    const navigate = useNavigate();

    const onSubmitHandler=(e) =>{
        e.preventDefault();
        registerUser();

    };

    const registerDispatcher = (registerResponseIn) =>{
        stateContext.dispatchUsers({type: 'REGISTER', user : registerResponseIn.data});
        navigate("/");
    }

    useEffect(()=>{
        if(registerResponse?.data){
         registerDispatcher(registerDispatcher);
        }

    },[registerResponse]);

    const registeredUser = {
       user: { "email": email, "password": password},
       todos: []
    }; 
    const handleConfirmPassword = (e) =>{
        setPasswordMatch(password === e.target.value);
    }

    return (
        <div className="container-register">
            <div className='wrapper-register'>
             <form className='card' onSubmit={(e) => onSubmitHandler(e) } >
                <label className='label' >SIGN UP</label>
                <div className='details'>
                    <div className='row'>
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