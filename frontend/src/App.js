import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Content from './components/Content';
import Console from './components/Console';

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
            <Menu />
            <Console />
            <Content />
          </Route>
        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
