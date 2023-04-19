import React, { Component } from 'react';
import MarketNav from '../../components/marketNavBar';
import SellForm from './sellForm';
import './style.css';

class Sell extends Component {

    componentDidMount () {
        onloadCheck();
    }

    render () {

        return (
            <div className="App">
                <MarketNav />
                <div className="body" id="sell">
                    <div className="sellFormDiv">
                        <h2 id="sellHead">Sell Item</h2>
                            <SellForm />
                    </div>
                </div>
            </div>

        );
    }
}

function onloadCheck() {
    if(sessionStorage.getItem("email") == null) {
        return window.location.href = '/login';
    }
}


export default Sell;