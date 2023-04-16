import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class RegisterForm extends Component {
    render() {
        return (
            <Form className="registerFormGrid" method="post">
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        {/* <Form.Label>First Name</Form.Label> */}
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGirdLastName">
                        {/* <Form.Label>Last Name</Form.Label> */}
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <InputGroup>
                            {/* <Form.Label>Email Address</Form.Label> */}
                            <Form.Control type="text" placeholder="example.p" />
                            <InputGroup.Text>@wustl.edu</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="password">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="passwordCheck">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control type="password" placeholder="Reenter Password" />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit" size="lg" id="registerButton" onClick="regiser()">
                    Register
                </Button>


            </Form>
        );
    }

}

export default RegisterForm