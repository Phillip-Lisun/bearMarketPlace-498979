import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Welcome from './pages/Welcome/index.js';
import Register from './pages/Register/index.js';
import Login from './pages/Login/index.js';
import Marketplace from './pages/Marketplace/index.js';
import Sell from './pages/Sell/index.js';

import './App.css';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Routes>
          <Route path="/" exact element={ <Welcome/> } />
          <Route path='/register' exact element={<Register/>}/>
          <Route path='/login' exact element={<Login/>} />
          <Route path='/marketplace' exact element={<Marketplace/>} />
          <Route path='/marketplace/create-sell' exact element={<Sell/>} />
        </Routes>
      </div>
    )
    return (
      <App/>
    );
  }
}

export default App;
