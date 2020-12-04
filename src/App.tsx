import "./App.css"
import { Map } from "../src/Components/Map"
import { Header } from "../src/Components/Header/index"
import React from "react"


// import { Route, Switch } from 'react-router';
import { BrowserRouter, Route, Switch } from "react-router-dom"




import { Button } from '@material-ui/core';
import { Register } from './Components/Register/index';

// Conversion du Hook en classù
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Register />
        <Map />

      </header>
    </div>
  )
}

export default App
