import React, { Component } from 'react';
import { Link } from 'react-router-dom';

console.log("In welcome!");

class Welcome extends Component {

    constructor(props){
        super(props);
        this.state = {
          message: []
        }
      }
    
      // Fetch the list on first mount
      componentDidMount() {
        this.getMessage();
      }

    getMessage = () => {
        fetch('/api')
        .then(res => res.json())
        .then(message => this.setState({message}))
    }


    render () {

        const {message} = this.state;

        return (
            <div className="App">
            <h1>Welcome to Bear MarketPlace!</h1>
            <p>{message}</p>
            <Link to={'./register'}>
                <button variant="raised">
                    Register!
                </button>
            </Link>
            
            </div>
        );
    }
}

export default Welcome;