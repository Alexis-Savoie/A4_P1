import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  testAxios()
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React (TEST)
        </a>
      </header>
    </div>
  );

  
}


function testAxios() {
  axios.get(`http://localhost:8020/test`)
      .then(res => {
          console.log("Ceci est un test !")
          console.log(res.data)
      })
  }




export default App;
