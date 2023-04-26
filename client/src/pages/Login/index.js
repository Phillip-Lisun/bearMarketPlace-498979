import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import WelcomeNav from '../../components/welcomeNavBar';
import LoginForm from './loginForm.js';
import './style.css';



class Login extends Component {

    render() {
        
        return (
            <div className="App" id="loginPage">
                <WelcomeNav></WelcomeNav>
                <br />
                <div id='alertDiv'>
                    <Alert id="fieldAlert" variant="danger">Missing Field: </Alert>
                </div>

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
    let fieldAlert = "";
    document.getElementById("fieldAlert").style.display = "none";
    let check = true;

    let email = document.getElementById("formGridEmail").value + "@wustl.edu";
    let pwd = document.getElementById("password").value + "";

    if(email === "@wustl.edu") {
        fieldAlert = fieldAlert + "Email ";
    }
    if(pwd === "") {
        fieldAlert = fieldAlert + "Password ";
    }
    if(fieldAlert !== "") {
        addAlert(fieldAlert);
    }

    function addAlert(field) {
        check = false;
        document.getElementById("fieldAlert").innerText = "Missing Field: ";
        document.getElementById("fieldAlert").innerText += field;
        document.getElementById("fieldAlert").style.display = "block";
    }

    if(check === true) {
        const data = {"email": email, "pwd": pwd};
        sendLogin(data);
    }  

}

async function sendLogin(data) {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);

        if(result.success === "true") {
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("token", result.token);
            window.location.href = '/marketplace'
        }
        if(result.success === false) {
            document.getElementById("fieldAlert").innerText = "Incorrect Username or Password";
            document.getElementById("fieldAlert").style.display = "block";
            
        }

        } catch(error) {
        console.error("Error:", error);

    }


}

export default Login;