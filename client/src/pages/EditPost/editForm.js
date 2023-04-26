import Form from 'react-bootstrap/Form';
import React, {Component, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class EditForm extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            validated: false,
            itemId: "",
            item: ""
        };
        // this.updateState = this.updateState.bind(this);

    }

    componentDidMount () {

        const params = new URLSearchParams(window.location.search);

        let id = params.get('itemId');

        this.setState({
            itemId: id
        });

        itemGetFields(id)
        .then((response) => {
            let items = response;
            this.setState({
                item: items
            });
        })

    }
    

    render() {
        
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            if(form.checkValidity() === true) {
                prepareData(this.state.itemId);
            }
        
            this.setState({validated: true});
            
          };
          


        return (
            <Form className="registerFormGrid" noValidate validated={this.state.validated}>
                <Row className="mb-3">
                        <Form.Group as={Col}>
                            <FloatingLabel label="Product Title">
                                <Form.Control type="text" id="productTitle" placeholder="Product Title" required defaultValue={this.state.item.title}/>
                            </FloatingLabel>
                        </Form.Group>
                

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <FloatingLabel label="Description">
                            <Form.Control as="textarea" id="productDesc" placeholder="Description" required defaultValue={this.state.item.description}/>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <InputGroup hasValidation>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" min="0" max="999" id="productPrice" required placeholder="Price or 0" defaultValue={this.state.item.price}/>
                        <InputGroup.Text>.00</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Price must be between 0-999
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Select aria-label="Default select example" required id="payPref">
                            <option>Payment Preference (None)</option>
                            <option value="CashApp">CashApp</option>
                            <option value="Venmo">Venmo</option>
                            <option value="Zelle">Zelle</option>
                            <option value="Cash">Cash</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Label id="fileLabel">Upload Photos (Optional)</Form.Label>
                    <Form.Group as={Col} controlId="formFileMultiple" className="mb-3">
                        <Form.Control name="image" id="images" type="file" accept="image/*" multiple />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="button" onClick={(handleSubmit)} size="lg" id="sellButton">
                    Edit
                </Button>

            </Form>
        );
    }
}

function prepareData(id) {

    let title = document.getElementById("productTitle").value + "";
    let description = document.getElementById("productDesc").value + "";
    let price = document.getElementById("productPrice").value + "";
    let payPref = document.getElementById("payPref").value + "";

    let image = document.getElementById("images").files;

    if(price > 999 || price < 0) {
        return;
    }

    if(title === "" || description === "" || price === "" || payPref === "") {
        return;
    }
    

    const data = {"title": title, "description": description, "price": price, "payPref": payPref, email: sessionStorage.getItem("email"), itemId: id, "token": sessionStorage.getItem("token")};

    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('email', sessionStorage.getItem("email"));

    if(image.length != 0) {

        for(let i = 0; i < image.length; i++) {
            formData.append('images', image[i]);
        }
    }


    sendSell(data, formData);
      

}

async function sendSell(data, formData) {
    try {
        const response = await fetch("/api/marketplace/edit-sell", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);

        if(result.success === "true") {
            window.location.href = '/marketplace/my-items'

        }
        if(result.success === false) {
            alert("failed");
        }

        } catch(error) {
        console.error("Error:", error);

    }

    try {
        const response = await fetch("/api/marketplace/edit-sell/images", {
            method: "POST",
            body: formData,
            // headers: {
            //     "Content-Type": "multipart/form-data"
            //   }
        });

        const result = await response.json();
        console.log("Success:", result);

        if(result.success === "true") {
            // window.location.href = '/marketplace/user/my-listings'
            alert("images success!");

        }
        if(result.success === false) {
            alert("images failed");
        }

        } catch(error) {
        console.error("Error:", error);

    }


}

async function itemGetFields(itemId) {
    const data = {'itemId': itemId};

    try {
        const response = await fetch("/api/marketplace/edit-item/getInfo", {
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
export default EditForm;