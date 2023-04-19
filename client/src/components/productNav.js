import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './style.css';

class ProductNav extends Component {
    render() {
        return ( //start of copied code https://react-bootstrap.github.io/components/navs/
        <Nav fill variant="tabs" defaultActiveKey="/marketplace/dorm" className="justify-content-center" id="secondNav">
            <Nav.Item>
                <Nav.Link href="/marketplace/dorm">Dorm</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Other</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Meal Points</Nav.Link>
            </Nav.Item>
         </Nav> //end of copied code
        );
    }
}

export default ProductNav;