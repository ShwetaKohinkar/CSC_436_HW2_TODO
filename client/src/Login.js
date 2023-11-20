import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';

function Login() {

    const navigate = useNavigate();
    const {state, dispatch} = useContext(StateContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let loggedInUser = null;
    const [loginResponse, attemptLogin] = useResource(()=>({
        url: '/auth/login',
        method: 'post',
        data: {username: email, password: password}
    }));

    const login = (e)=>{
        e.preventDefault();

        attemptLogin();

    }

    useEffect(() => {
        console.log(loginResponse.data);

        if(!loginResponse.isLoading && loginResponse?.data){
            console.log(loginResponse.data);
            dispatch({type: 'LOGIN', user: {username: email, access_token: loginResponse.data.access_token}});
            navigate("/todo");
        }

    },[loginResponse]);

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
                                <label for="email">Email:</label>
                                <input  type="email" id="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Enter Email" required/>
                            </div>
                            <div className='row'>
                                <label for="password">Password:</label>
                                <input type="password"  onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter Password" required/>
                            </div>
                           {errorMsg !=='' && ( <div className='label-error'>
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