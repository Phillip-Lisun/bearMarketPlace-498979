import React, {Component } from 'react';
import WelcomeNav from '../../components/welcomeNavBar';
import LoginForm from './loginForm.js';
import './style.css';




class Login extends Component {

    render() {
        
        return (
            <div className="App" id="loginPage">
                <WelcomeNav></WelcomeNav>
                <div className="body" id="login">
                    <LoginForm />
                </div>
            </div>

            
            
        );

    }
}


export default Login;