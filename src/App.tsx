import "./App.css"

//import { Header } from "../src/Components/Header/index"
import React from "react"
import { Button } from '@material-ui/core';

// History to navigate the React app more easily
import { BrowserRouter,  Route, Router, Switch } from "react-router-dom"
import history from './history'



import PrivateRoute from "./Components/PrivateRoute"
import PublicRoute from "./Components/PublicRoute"
import{HistoriquePage}from "./Components/Historique"
import{ForgotPassword} from "./Components/ForgotPassWord"
import { Register } from './Components/Register/index';
import { Login } from './Components/Login/index';
import { mainModule } from "process"
import{Footer} from "./Components/Footer"
import SimpleTabs from './Components/NavMenu'






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
        <PublicRoute exact={true}  path="/forgotpassword"  component={() => <ForgotPassword.Display />}   />
        <PrivateRoute exact={true}  path="/HistoriquePage"  component={() => <HistoriquePage.Display />}   />
        <PublicRoute  exact={true}  path="/Footer"  component={() => <Footer.Display />}   />

        <PrivateRoute exact={true}  path="/mainpage"  component={() => <SimpleTabs />}   />
        
      </Switch>
    </Router>


  )
}

export default App
