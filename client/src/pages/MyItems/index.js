import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MarketNav from '../../components/marketNavBar';
import ItemCard from '../../components/itemCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './style.css';

class MyItems extends Component {

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
                                            <ItemCard title={item.title} description={item.description} price={item.price} itemId={item._id} imageSrc={item.imageRef}>
                                            </ItemCard>

                                            <div className="buyerActions">

                                                <div>Buyers: {item.buyRequest}</div> <br/>
                                                <Button name="delete" id={item._id} onClick={() => deleteItem(item._id)}>Delete</Button>                         
                                                <Button name="edit" id={item._id} onClick={() => editItem(item._id)}>Edit</Button>


                                            </div>


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

    let data = {'startIndex': 1, 'email': sessionStorage.getItem('email')};

    try {
        const response = await fetch("/api/marketplace/my-items", {
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

async function deleteItem(itemId) {

    let data = {'itemId': itemId, 'token': sessionStorage.getItem("token")};

    try {
        const response = await fetch("/api/marketplace/my-items/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
        
        if(result.success = true) {
            window.location.reload(false);
        }
        else {
            alert("Item not deleted");
        }

        } catch(error) {
        console.error("Error:", error);

    }
}

async function editItem(itemId) {
    return window.location.href = '/marketplace/edit-item?itemId=' + itemId;


}


export default MyItems;