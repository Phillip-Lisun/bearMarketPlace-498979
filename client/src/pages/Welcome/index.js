import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WelcomeNav from '../../components/welcomeNavBar';
import "./style.css";


console.log("In welcome!");

class Welcome extends Component {

    render () {

        return (
            <div className="App">
            <WelcomeNav />

                <div className="welcome">
                    <h1>Welcome to Bear MarketPlace!</h1>
                </div>

                <div className="sectionOne">
                    <h1>What We Are</h1>
                </div>
                <div className="sectionTwo">
                    <h1>Current Stats</h1>
                </div>

            </div>
        );
    }
}

export default Welcome;