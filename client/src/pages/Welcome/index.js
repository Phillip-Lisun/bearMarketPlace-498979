import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WelcomeNav from '../../components/welcomeNavBar';


console.log("In welcome!");

class Welcome extends Component {

    render () {

        return (
            <div className="App">
            <WelcomeNav />
            <h1>Welcome to Bear MarketPlace!</h1>
            </div>
        );
    }
}

export default Welcome;