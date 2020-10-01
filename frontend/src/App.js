import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/items">
            <Logout/>
          </Route>
        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
