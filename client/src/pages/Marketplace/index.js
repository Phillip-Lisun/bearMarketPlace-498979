import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MarketNav from '../../components/marketNavBar';
import ItemCard from './itemCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './style.css';

class Marketplace extends Component {

    constructor() {
        super()

        this.state = {
            itemList: []
        }
        
    }

    componentDidMount () {
        onloadCheck();

        getItems()
        .then((response) => {
            let items = response;
            this.setState({
                itemList: items
            });
        })

    }

    render () {

        return (
            <div className="App" id="marketHome">
                <MarketNav />

                <div className="mainBody">

                    <div className="itemContainer">

                        <Container className="items">

                            <Row id="itemRow" className="g-4">
                                { (this.state.itemList).map((item, index) => {
                                    return (
                                        <Col >
                                            <ItemCard title={item.title} description={item.description} price={item.price} itemId={item._id} imageSrc={item.imageRef} />
                                        </Col>       
                                    )
                                })}
                            </Row>

                        </Container>

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

async function getItems() {

    let data = {'startIndex': 1};

    try {
        const response = await fetch("/api/marketplace", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
        return result;



        } catch(error) {
        console.error("Error:", error);

    }
}

export default Marketplace;