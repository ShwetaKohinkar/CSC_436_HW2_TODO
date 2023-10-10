import { BrowserRouter, Link, useNavigate } from 'react-router-dom';

import './Register.css'
function Register() {
    const navigate = useNavigate();
    return (
        <div className="container-register">
             <form className='card card-register' onSubmit={() => navigate('/todo')} >
                <label className='label' >SIGN UP</label>
                <div className='details'>
                    <div className='row'>
                        <input className='input-register row-margin-register' type="text" id="username" name="username" placeholder="Name"  required/>
                        <input className='input-register row-margin-register' type="text" id="username" name="username" placeholder="Username" required/>
                        <input className='input-register row-margin-register' type="text" id="username" name="username" placeholder="Password" required/>
                        <input className='input-register row-margin-register' type="text" id="username" name="username" placeholder="Confirm Password" required/>
                    </div>
                    <div className="button-div-register">
                        <button type="submit" className='button-submit'> Sign Up </button>
                    </div>
                    <Link to="/" >Have an Account? Login Here</Link>
                </div>
            </form>
        </div>
    );
  }
  
  export default Register;