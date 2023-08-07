import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate } from 'react-router-dom';
import RegisterForm from './registerForm';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import WelcomeNav from '../../components/welcomeNavBar';
import './style.css';


console.log("In Register!");


class Register extends Component {

    render() {
        return (
            <div className="App" id='registerPage'>
                <WelcomeNav></WelcomeNav>

                <div className="body" id="register">
                    <div className="registerFormDiv">
                        <h2 id="registerHead">Create Account</h2>
                            <RegisterForm />
                    </div>
                </div>
            </div>

            
            
        );

    }
}

export default Register;