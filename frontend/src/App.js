import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Content from './components/Content';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/items">
            <Logout />
            <Content />
          </Route>
        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
