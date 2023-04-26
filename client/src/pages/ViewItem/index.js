import React, { Component } from 'react';
import MarketNav from '../../components/marketNavBar';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



import './style.css';

class ViewItem extends Component {

    constructor() {
        super()

        this.state = {
            item: ""
        }
        
    }

    componentDidMount () {
        onloadCheck();

        const params = new URLSearchParams(window.location.search);

        let itemId = params.get('itemId');

        getItems(itemId)
        .then((response) => {
            let items = response;
            this.setState({
                item: items
            });
        })

    }

    render () {

        return (
            <div className="App" id="viewItem">
                <MarketNav />

                <div className="viewItemBody"> 

                    <div className="itemTitle">{this.state.item.title}</div>

                    <div id="titleUnderline"></div>

                    <div className="imageInfoContainer">

                        <Carousel className="imageCarousel">
                            <Carousel.Item>
                                <img className="d-block w-100"
                                src={"/images" + this.state.item.imageRef}
                                alt="Image"
                                />
                            </Carousel.Item>
                        </Carousel>

                        <div className="infoContainer">



                        <Card className="itemInfoCard" style={{ width: '18rem' }}>
                            <Card.Header>Price: ${this.state.item.price}.00</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item variant="primary">Seller: {this.state.item.username}</ListGroup.Item>
                                <ListGroup.Item variant="primary">Payment Preference: {this.state.item.payPref}</ListGroup.Item>
                                <ListGroup.Item action className="buyButton" variant="primary" onClick={() => buyRequest(this.state.item.email, this.state.item._id)}>Buy Request</ListGroup.Item>                            
                            </ListGroup>
                        </Card>

                        </div>


                    </div>

                    <div className="itemDescription">{this.state.item.description}</div>






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

async function getItems(itemId) {

    const data = {'itemId': itemId};

    try {
        const response = await fetch("/api/marketplace/view-item", {
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

async function buyRequest(email, itemId) {
    if(email != sessionStorage.getItem("email")) {

        const data = {'itemId': itemId, 'buyerEmail': sessionStorage.getItem("email")};

        try {
            const response = await fetch("/api/marketplace/buy-item", {
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


}


export default ViewItem;