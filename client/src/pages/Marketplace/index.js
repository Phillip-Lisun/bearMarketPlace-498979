import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WelcomeNav from '../../components/welcomeNavBar';

class Marketplace extends Component {

    render () {

        return (
            <div className="App">
            <WelcomeNav />
            <h1>Welcome to MarketPlace</h1>

            {functionCheck()}

            </div>


        );
    }
}

function functionCheck() {
    alert(sessionStorage.getItem("email"));
}

export default Marketplace;