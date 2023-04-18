import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import WelcomeNav from '../../components/welcomeNavBar';
import LoginForm from './loginForm.js';
import './style.css';



class Login extends Component {

    render() {
        return (
            <div className="App">
                <WelcomeNav></WelcomeNav>
                <br />

                <div className="body" id="login">
                    <div className="loginFormDiv">
                        <h2 id="loginHead">Login</h2>
                            <LoginForm />
                            <Button variant="primary" type="button" size="lg" id="loginButton" onClick={login}>
                                    Login
                            </Button>
                    </div>
                </div>
            </div>

            
            
        );

    }
}

function login() {
    alert("Login!");
}

export default Login;