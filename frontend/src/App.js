import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import Items from './components/Items';
import SingleItem from './components/SingleItem';
import Console from './components/Console';
import Sell from './components/Sell';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
            <Console />
          </Route>
          <Route exact path="/items"  >
            <Menu />
            <Console />
            <Items />
          </Route>
          <Route path="/items/:id"  >
            <Menu />
            <Console />
            <SingleItem />
          </Route>
          <Route path="/sell"  >
            <Menu />
            <Console />
            <Sell />
          </Route>
        </Switch>  
      </BrowserRouter>
    </div>
  );
}

export default App;
