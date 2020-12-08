import "./App.css"
import { Map } from "../src/Components/Map"
import PrivateRoute from "./Components/PrivateRoute"
import PublicRoute from "./Components/PublicRoute"
//import { Header } from "../src/Components/Header/index"
import React from "react"


// import { Route, Switch } from 'react-router';
import { BrowserRouter,  Route, Router, Switch } from "react-router-dom"
import history from './history'



import { Button } from '@material-ui/core';
import { Register } from './Components/Register/index';
import { Login } from './Components/Login/index';
import { mainModule } from "process"
import { MainPage } from "./Components/MainPage"




// Conversion du Hook en classù
function App() {
  return (
    <Router history={history}>
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

        <PublicRoute exact={true}  path="/login"  component={() => <Login.Display />}   />
        <PublicRoute exact={true}  path="/register"  component={() => <Register.Display />}   />

        <PrivateRoute exact={true}  path="/mainpage"  component={() => <MainPage.Display />}   />
        
      </Switch>
    </Router>


  )
}

export default App
