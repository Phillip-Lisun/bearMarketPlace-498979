import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Welcome from './pages/Welcome/index.js';
import Register from './pages/Register/index.js';

import './App.css';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Routes>
          <Route path="/" exact element={ <Welcome/> } />
          <Route path='/register' exact element={<Register/>}/>
        </Routes>
      </div>
    )
    return (
      <App/>
    );
  }
}

export default App;
