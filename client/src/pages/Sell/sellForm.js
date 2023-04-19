import Form from 'react-bootstrap/Form';
import React, {Component, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class SellForm extends Component {
    
    constructor(props) {
        super(props)

        this.state = {validated: false};
        // this.updateState = this.updateState.bind(this);

    }
    

    render() {
        
        const handleSubmit = (event) => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            if(form.checkValidity() === true) {
                prepareData();
            }
        
            this.setState({validated: true});
            
          };
          


        return (
            <Form className="registerFormGrid" noValidate validated={this.state.validated}>
                <Row className="mb-3">
                        <Form.Group as={Col}>
                            <FloatingLabel label="Product Title">
                                <Form.Control type="text" id="productTitle" placeholder="Product Title" required/>
                            </FloatingLabel>
                        </Form.Group>
                

                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <FloatingLabel label="Description">
                            <Form.Control as="textarea" id="productDesc" placeholder="Description" required />
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                    <InputGroup hasValidation>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" min="0" max="999" id="productPrice" required placeholder="Price or 0"/>
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

                <Button variant="primary" type="button" onClick={handleSubmit} size="lg" id="sellButton">
                    Post
                </Button>

            </Form>
        );
    }
}

function prepareData() {

    let title = document.getElementById("productTitle").value + "";
    let description = document.getElementById("productDesc").value + "";
    let price = document.getElementById("productPrice").value + "";
    let payPref = document.getElementById("payPref").value + "";

    let image = document.getElementById("images").files;

    if(title === "" || description === "" || price === "" || payPref === "") {
        return;
    }

    const data = {"title": title, "description": description, "price": price, "payPref": payPref};
    let formData = new FormData();

    if(image.length != 0) {

        for(let i = 0; i < image.length; i++) {
            formData.append('images', image[i]);
        }
    }


    sendSell(data, formData);
      

}

async function sendSell(data, formData) {
    try {
        const response = await fetch("/api/marketplace/create-sell", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);

        if(result.success === "true") {
            // window.location.href = '/marketplace/user/my-listings'
            alert("success!");

        }
        if(result.success === false) {
            alert("failed");
        }

        } catch(error) {
        console.error("Error:", error);

    }

    try {
        const response = await fetch("/api/marketplace/create-sell/images", {
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
export default SellForm;