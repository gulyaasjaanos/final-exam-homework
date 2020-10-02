import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import Logout from './components/Logout';
import Content from './components/Content';
import { Console } from './components/Console';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
            <Console />
          </Route>
          <Route path="/items">
            <Logout />
            <Console />
            <Content />
          </Route>
        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
