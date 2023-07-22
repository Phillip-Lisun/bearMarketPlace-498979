import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './style.css';

class MarketNav extends Component {
    render() {
        return ( //start of copied code https://react-bootstrap.github.io/components/navbar/
            <Navbar collapseOnSelect expand="lg" variant="dark" className="marketNav">
            <Container>
              <Navbar.Brand href="/marketplace">Bear Marketplace</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/market">Market</Nav.Link>
                  <Nav.Link href="/meal-points">Meal Points</Nav.Link>
                </Nav>            
                <Nav className="justify-content-center" id="centerNav">
                    <Form >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            id="searchField"
                            aria-label="Search"
                            
                        />
                    </Form>    
                   <Button variant="primary" id="searchButton">Search</Button>
                </Nav>
                <Nav className="d-flex">
                    <Nav.Link href="/marketplace/create-sell">Sell</Nav.Link>

                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={myItems}>My Items</NavDropdown.Item>
                        <NavDropdown.Item>
                            My Buys
                        </NavDropdown.Item>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item id="logoutButton" onClick={logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar> //end of copied code
        );
    }
}

async function logout() {

    let email = sessionStorage.getItem("email");
    let token = sessionStorage.getItem("token");

    let data = {'email': email, 'token': token};

    try {
        const response = await fetch("/api/marketplace/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);

        if(result.success) {
            sessionStorage.clear();
            window.location.href = '/';
        }
        else {
            console.log(sessionStorage.getItem("token"));
            alert("Forgery Detected");
            return result.message;
        }

        // return result;

        } catch(error) {
        console.error("Error:", error);

    }




    // sessionStorage.clear();
    // window.location.href = '/';
}

function myItems() {
    window.location.href = '/marketplace/my-items';
}

export default MarketNav;