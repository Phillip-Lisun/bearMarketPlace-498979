import React, {Component, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css';



class ItemCard extends Component {
    
    constructor(props) {
        super(props)

        this.title = props.title;
        this.description = props.description;
        this.price = props.price;
        this.imageSrc = "/images" + props.imageSrc;
        this.itemId = props.itemId;
        
    }

    render() { //copied code start: https://react-bootstrap.github.io/components/cards/



        return (

            <Card className='itemCardSingle'> 
            <Card.Img variant="top" id="cardImage" src={this.imageSrc} />
            <Card.Body>
              <Card.Title>{this.title}</Card.Title>
              <Card.Text>
                {this.description}
              </Card.Text>
              <Button variant="primary" onClick={ () => viewButton(this.itemId)}>View</Button>
            </Card.Body>
            <Card.Footer className="cardFooter">
            Price: ${this.price}.00
            </Card.Footer>
          </Card>

        );
    } //copied code end
}

function viewButton(id) {

    return window.location.href = '/marketplace/view-item?itemId=' + id;

}

export default ItemCard;