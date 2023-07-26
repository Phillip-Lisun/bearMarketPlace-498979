import Form from 'react-bootstrap/Form';
import React, {Component, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Fade from 'react-bootstrap/Fade';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';





class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {open: false, validated: false};
    }

    render() {
        
        const sendData = async() => {
            if(await prepareData() === false) {
                this.setState({open: true});
            }
        };

        const handleSubmit = (event) => {
            const form = event.currentTarget;

            if(form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            if(form.checkValidity() === true)  {
                sendData();
            }
        
            this.setState({validated: true});
            
          };

        const handleKeypress = (event) => {
            //it triggers by pressing the enter key
          if (event.key === "Enter") {
            handleSubmit();
          }
        };

        return(

            <div className="loginFormDiv">

                <h2 id="loginHead">Login</h2>
          

                <Form className="loginFormGrid" noValidate validated={this.state.validated}>
                    {/* <Row className="mb-3"> */}
                    <div className="mb-3">

                        <InputGroup>
                            <FloatingLabel label="Email">
                                <Form.Control id="formGridEmail" type="text" placeholder="" required/>
                            </FloatingLabel>
                            <InputGroup.Text id="emailIG">@wustl.edu</InputGroup.Text>
                        </InputGroup>
                    {/* </Row> */}
                    </div>


                    {/* <Row className="mb-3"> */}
                    <div className="mb-3">

                        <FloatingLabel label="Password">
                            <Form.Control id="password" type="password" placeholder="" required />
                        </FloatingLabel>
                    {/* </Row> */}
                    </div>

                    <div className="mb-3">

                    <Button variant="primary" type="button" onClick={handleSubmit} onKeyDown={handleKeypress} size="lg" id="loginButton">
                        Login
                    </Button>
                    </div>


                </Form>
                

                <Fade in={this.state.open}>
                    <div>
                        <Alert id="fieldAlert" variant="danger">Missing Field: </Alert>
                    </div>                    
                </Fade>

            </div>


        );
    }
}

async function prepareData() {

    let email = document.getElementById("formGridEmail").value + "@wustl.edu";
    let pwd = document.getElementById("password").value + "";

    if(email === "@wustl.edu") {
        return;
    }
    if(pwd === "") {
        return;
    }
    else {
        if(await login() === false) {
            return false;
        }
    }
}

async function login() {


    let email = document.getElementById("formGridEmail").value + "@wustl.edu";
    let pwd = document.getElementById("password").value + "";

    const data = {"email": email, "pwd": pwd};
    if(await sendLogin(data) === false) {
        return false;
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
            return false;
        }

        } catch(error) {
        console.error("Error:", error);

    }


}


export default LoginForm;