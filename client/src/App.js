import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


import Welcome from './pages/welcome';
import Register from './pages/register';



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
