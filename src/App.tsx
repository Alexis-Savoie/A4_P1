import "./App.css"
import { Map } from "../src/Components/Map"
//import { Header } from "../src/Components/Header/index"
import React from "react"


// import { Route, Switch } from 'react-router';
import { BrowserRouter, Route, Switch } from "react-router-dom"




import { Button } from '@material-ui/core';
import { Register } from './Components/Register/index';
import { Login } from './Components/Login/index';

// Conversion du Hook en classù
function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact={true} path={'/'} render={() => (
          <header className="App-header">
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="/login"
              rel="nofowo"
            >
              Learn React
          </a>
          </header>
        )} />
        <Route exact={true} path="/login">
          <Login.Display />
        </Route>
        <Route exact={true} path="/register">
          <Register.Display />
        </Route>

      </Switch>
    </BrowserRouter>


  )
}

export default App
