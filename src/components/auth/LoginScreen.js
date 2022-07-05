import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/actions';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    
    // manejo de forms de login y register!

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        lEmail: '',
        lPassword: '',
    } );
    
    const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
    } );
    
    
    const { lEmail , lPassword } = formLoginValues 
    
    const { rName, rEmail , rPassword1 ,rPassword2 } = formRegisterValues
    
   
    const handleLogin = ( e ) => {
        e.preventDefault();

        dispatch(startLogin( lEmail, lPassword ))
    }
    
    const handleRegister = (event) => {
        event.preventDefault();

        if( rPassword1 !== rPassword2 ) return Swal.fire('Error', `Passwords aren't equal`, 'error');

        dispatch( startRegister( rEmail, rPassword1, rName) )
    }
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Log In</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value= {lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value= {lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name='rName'
                                value={ rName }
                                onChange={ handleRegisterInputChange}    
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='rEmail'
                                value={ rEmail }
                                onChange={ handleRegisterInputChange}    
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name = "rPassword1"
                                value = { rPassword1 } 
                                onChange={ handleRegisterInputChange}    
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password" 
                                name='rPassword2'
                                value = { rPassword2 }
                                onChange={ handleRegisterInputChange}    
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
