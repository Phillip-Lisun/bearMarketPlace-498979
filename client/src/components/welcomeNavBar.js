import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';

class WelcomeNav extends Component {
    render() {
        return (
            <>
                <Navbar sticky="top" variant="dark" className="welcomeNav">
                    <Container>
                        <Navbar.Brand href="/">Bear Marketplace</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/how-it-works">How It Works</Nav.Link>
                            <Nav.Link href="/about">About Us</Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <Nav.Link href="/login">Login</Nav.Link>
                            {/* <Nav.Link href="/register">Register</Nav.Link> */}
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default WelcomeNav;