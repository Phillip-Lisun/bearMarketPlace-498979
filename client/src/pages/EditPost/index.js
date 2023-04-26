import React, { Component } from 'react';
import MarketNav from '../../components/marketNavBar';
import EditForm from './editForm';
import './style.css';

class Edit extends Component {

    componentDidMount () {
        onloadCheck();

    }

    render () {

        return (
            <div className="App">
                <MarketNav />
                <div className="body" id="sell">
                    <div className="sellFormDiv">
                        <h2 id="sellHead">Edit Item</h2>
                            <EditForm />
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


export default Edit;