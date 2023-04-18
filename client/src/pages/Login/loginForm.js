import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class LoginForm extends Component {
    render() {
        return(
            <Form className="loginFormGrid">
                <Form.Group class="mb-3" controlId="formGridEmail">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Example.p" />
                        <InputGroup.Text>@wustl.edu</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group class="mb-3" controlId="password">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>

        );
    }
}

export default LoginForm;