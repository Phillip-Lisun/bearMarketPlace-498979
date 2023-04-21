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
                                <ListGroup.Item action className="buyButton" variant="primary">Buy Request</ListGroup.Item>                            
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


{/* <img ></img>

<h1>{this.state.item.title}</h1>

<p>{this.state.item.description}</p>

<h2>{this.state.item.price}</h2>
<h3>{this.state.item.payPref}</h3>
<h3>{this.state.item.username}</h3> */}

{/* <div>
<div className="itemPrice">Price: ${this.state.item.price}.00</div>
<div className="itemPayPref">Payment Preference: {this.state.item.payPref}</div>
</div>

<div>
<div className="itemUsername">Seller: {this.state.item.username}</div>
<Button variant="Primary" className="buyRequest">Buy Request</Button>
</div> */}

export default ViewItem;