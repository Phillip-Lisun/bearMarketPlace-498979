import Form from 'react-bootstrap/Form';
import React, {Component, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Fade from 'react-bootstrap/Fade';
import Alert from 'react-bootstrap/Alert';

class RegisterForm extends Component {
    
    constructor(props) {
        super(props)

        this.state = {validated: false};
        // this.updateState = this.updateState.bind(this);

    } 

    render() {
        
        const handleSubmit = (event) => {
            const form = event.currentTarget;


            if(form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            if(form.checkValidity() === true) {
                requestRegister();
            }
        
            this.setState({validated: true});
            
          }

        const requestRegister = async() => {
            if(await prepareData() === false) {
                this.setState({open: true});
            }
        };

        const handleKeypress = (event) => {
            //it triggers by pressing the enter key
            if (event.key === "Enter") {
                document.getElementById("registerButton").click();
        };

    }
          


        return (

            <div id="mainForm">
                <Form className="registerFormGrid"  validated={this.state.validated}>

                    <FloatingLabel label="First Name">
                        <Form.Control required className="formControl" type="text" id="firstName" placeholder="" onKeyDown={handleKeypress}/>
                    </FloatingLabel>

                    <FloatingLabel label="Last Name">
                        <Form.Control className="formControl" type="text" id="lastName" placeholder="" required onKeyDown={handleKeypress}/>
                    </FloatingLabel>

                    <FloatingLabel label="Username">
                        <Form.Control className="formControl" type="text" id="username" placeholder="" required onKeyDown={handleKeypress}/>
                    </FloatingLabel>

                    <div className=''>
                        <Form.Group controlId="formGridEmail" >
                                <InputGroup>

                                    <FloatingLabel label="Email">
                                        <Form.Control className="formControl" type="text" id="email" placeholder="Example.p" required onKeyDown={handleKeypress}/>
                                    </FloatingLabel>
                                    <InputGroup.Text className="formControl" >@wustl.edu</InputGroup.Text>
                                </InputGroup>
                        </Form.Group>

                    </div>

                    <FloatingLabel label="Password">
                        <Form.Control className="formControl" type="password" id="passwordFirst" placeholder="Password" required onKeyDown={handleKeypress}/>
                    </FloatingLabel>

                    <FloatingLabel label="Retype Password">
                        <Form.Control className="formControl" type="password" id="passwordSecond" placeholder="Retype Password" required onKeyDown={handleKeypress}/>
                    </FloatingLabel>

                    <Button variant="primary" type="button" onClick={handleSubmit} size="lg" id="registerButton" onKeyDown={handleKeypress}>
                        Create Account
                    </Button>

                </Form>

                

                <Fade in={this.state.open}>
                    <div>
                        <Alert id="fieldAlert" variant="danger">Email in Use</Alert>
                    </div>                    
                </Fade>

                <div>
                    <Button href="./login" variant="link">Already have an account? Login Here!</Button>
                </div>

            </div>

        );
    }
}

async function prepareData() {

    let firstName = document.getElementById("firstName").value + "";
    let lastName = document.getElementById("lastName").value + "";
    let username = document.getElementById("username").value + "";
    let email = document.getElementById("email").value + "@wustl.edu";
    let password1 = document.getElementById("passwordFirst").value + "";
    let password2 = document.getElementById("passwordSecond").value + "";

    if(firstName === "" || lastName === "" || username === "" || email === "@wustl.edu" || password1 === "" || password2 === "" ) {
        return;
    }
    if(password1 != password2) {
        document.getElementById("fieldAlert").innerHTML = "Passwords Do Not Match";
        return false;
    }

    const data = {"firstName": firstName, "lastName": lastName, "email": email, "pwd": password1};

    return await sendRegister(data);








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

        if(result.success === "true") {
            window.location.href = '/login'
        }
        if(result.success === false) {
            if(result.type === "Email") {

                document.getElementById("fieldAlert").innerHTML = "Email in Use";
                return false;
            }
        }

        } catch(error) {
        console.error("Error:", error);

    }


}

export default RegisterForm