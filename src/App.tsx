import "./App.css"

//import { Header } from "../src/Components/Header/index"
import React from "react"
import { Button } from '@material-ui/core';

// History to navigate the React app more easily
import { Redirect, BrowserRouter,  Route, Router, Switch } from "react-router-dom"

import history from './history'



import PrivateRoute from "./Components/PrivateRoute"
import PublicRoute from "./Components/PublicRoute"


import { Register } from './Components/Register/index';
import { Login } from './Components/Login/index';
import { mainModule } from "process"

import SimpleTabs from './Components/NavMenu'






// Conversion du Hook en classù
function App() {
  return (
    <Router history={history}>
      <Switch>

        <PublicRoute exact={true}  path="/"  component={() => <Redirect to="/login" />} />
        
        <PublicRoute exact={true}  path="/login"  component={() => <Login.Display />}   />
        <PublicRoute exact={true}  path="/register"  component={() => <Register.Display />}   />

        <PrivateRoute exact={true}  path="/mainpage"  component={() => <SimpleTabs />}   />

        <PublicRoute exact={true}  path="*"  component={() => <Redirect to="/login" />} />
        
      </Switch>
    </Router>


  )
}

export default App
