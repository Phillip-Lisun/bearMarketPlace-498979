import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MarketNav from '../../components/marketNavBar';
import ProductNav from '../../components/productNav';

import './style.css';

class Marketplace extends Component {

    componentDidMount () {
        onloadCheck();
    }

    render () {

        return (
            <div className="App">
                <MarketNav />
                <h1>Welcome to MarketPlace</h1>
            </div>

        );
    }
}

function onloadCheck() {
    if(sessionStorage.getItem("email") == null) {
        return window.location.href = '/login';
    }
}

export default Marketplace;