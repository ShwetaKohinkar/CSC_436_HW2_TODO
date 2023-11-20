import { Link, useNavigate } from 'react-router-dom';
import { useResource } from 'react-request-hook';

import './Register.css'
import { useContext, useState, useEffect } from 'react';
import { StateContext } from './context';
function Register() {

    const [registerResponse, registerUser] = useResource(()=>({
        url: 'auth/register',
        method: 'post',
        data: {username: username, password: password, passwordConfirmation: passwordConfirmation}
    }));
    const {state, dispatch} = useContext(StateContext);
    const [username, setUsername] =  useState('');
    const [password, setPassword] =  useState('');
    const [passwordConfirmation, setPasswordConfirmation] =  useState("");
    const navigate = useNavigate();

    const onSubmitHandler=(e) =>{
        e.preventDefault();
        registerUser();

    };

    useEffect(()=>{
        if(registerResponse.isLoading === false && registerResponse?.data){
            navigate("/");
        }

    },[registerResponse]);

    const handleConfirmPassword = (e) =>{
        setPasswordConfirmation(password === e.target.value);
    }

    return (
        <div className="container-register">
            <div className='wrapper-register'>
             <form className='card' onSubmit={(e) => onSubmitHandler(e) } >
                <label className='label' >SIGN UP</label>
                <div className='details'>
                    <div className='row'>
                        <input className='input-register' onChange={(e) => setUsername(e.target.value)} type="email"name="email" placeholder="Email" required/>
                        <input className='input-register' onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" required/>
                        <input className='input-register' onChange={(e) => setPasswordConfirmation(e.target.value) } type="password" name="confirmPassword" placeholder="Confirm Password" required/>
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