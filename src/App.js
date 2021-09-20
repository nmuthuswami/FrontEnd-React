import React from "react";
import Header from './components/Header/Header';
import LoginForm from "./components/LoginForm/LoginForm";
import HomeForm from "./components/HomeForm/HomeForm";
import {BrowserRouter as Router,
        Switch,
        Route
      } from 'react-router-dom';

function App() {
  return (
      <Router>      
          <div className="App">
            <Header/> 
            <div className="container d-flex align-items-center flex-column">
                <Switch>
                    <Route path="/" exact={true}>
                      <LoginForm />
                    </Route>
                    <Route path="/Login">
                      <LoginForm />
                    </Route>
                    <Route path="/Home">                      
                      <HomeForm />
                    </Route>
                </Switch>
            </div>
          </div>
      </Router>
      
  );
}

export default App;
