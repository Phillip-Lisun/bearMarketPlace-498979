import React, { Component } from 'react';
import { Link } from 'react-router-dom';

console.log("In Register!");


class Register extends Component {
    render() {
        return (
            <div className="App">
                <h1>Register!</h1>
                <Link to={'/'}>
                <button variant="raised">
                    Welcome!
                </button>
            </Link>

            </div>
            
        );

    }
}
export default Register;