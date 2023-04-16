import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './registerForm';
import WelcomeNav from '../../components/welcomeNavBar';
import './style.css';


console.log("In Register!");


class Register extends Component {
    render() {
        return (
            <div className="App">
                <WelcomeNav></WelcomeNav>
                <br />
                <div className="body" id="register">
                    <div className="registerFormDiv">
                        <h2 id="registerHead">Register</h2>
                            <RegisterForm />
                    </div>
                </div>
            </div>

            
            
        );

    }
}


function register() {
    alert("Hello!");
}

export default Register;