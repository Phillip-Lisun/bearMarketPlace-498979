import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import RegisterForm from './registerForm';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import WelcomeNav from '../../components/welcomeNavBar';
import './style.css';


console.log("In Register!");


class Register extends Component {

    render() {
        return (
            <div className="App">
                <WelcomeNav></WelcomeNav>
                <br />
                <Alert id="fieldAlert" variant="danger">Missing Field: </Alert>
                <div className="body" id="register">
                    <div className="registerFormDiv">
                        <h2 id="registerHead">Register</h2>
                            <RegisterForm>
                            </RegisterForm>

                            <Button variant="primary" type="button" size="lg" id="registerButton" onClick={register}>
                                    Register
                            </Button>
                    </div>
                </div>
            </div>

            
            
        );

    }
}


function register() {
    let fieldAlert = "";
    document.getElementById("fieldAlert").style.display = "none";
    let check = true;


    let firstname = document.getElementById("formGridFirstName").value;
    let lastname = document.getElementById("formGridLastName").value;
    let username = document.getElementById("formGridUsername").value;
    let email = document.getElementById("formGridEmail").value + "@wustl.edu";
    let pwd = document.getElementById("password").value;
    let pwdCheck = document.getElementById("passwordCheck").value;

    if(firstname.trim() == "") {
        fieldAlert = fieldAlert + "First Name ";
    }
    if(lastname.trim() == "") {
        fieldAlert = fieldAlert + "Last Name ";
    }
    if(username.trim() == "") {
        fieldAlert = fieldAlert + "Username ";
    }
    if(email.trim() == "@wustl.edu") {
        fieldAlert = fieldAlert + "Email ";
    }
    if(pwd.trim() == "") {
        fieldAlert = fieldAlert + "Password ";
    }
    if(pwdCheck.trim() == "") {
        fieldAlert = fieldAlert + "Renter Password ";
    }
    if(fieldAlert != "") {
        addAlert(fieldAlert);
    }

    function addAlert(field) {
        check = false;
        document.getElementById("fieldAlert").innerText = "Missing Field: ";
        document.getElementById("fieldAlert").innerText += field;
        document.getElementById("fieldAlert").style.display = "block";
    }

    if(check == true) {
        const data = {"firstName": firstname, "lastName": lastname, "username": username, "email": email, "pwd": pwd};
        sendRegister(data);
    }   
    

}

async function sendRegister(data) {
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
        } catch(error) {
        console.error("Error:", error);
    }
}


export default Register;