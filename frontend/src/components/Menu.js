import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import WithSession from './WithSession';

function Menu() {

  const [menuSelection, setMenuSelection] = useState(null)                 

  const logout = () => {
    localStorage.removeItem('token', 'set');
    setMenuSelection('logout');
  };

  const sell = () => {
    setMenuSelection('sell');
  };

  switch(menuSelection) {
    case 'logout':
      return (<Redirect push to={'/'} />);
    case 'sell':
      return (<Redirect push to={'/sell'} />);
    default:
      return (
        <nav>
          <header>Hi User</header>
          <button onClick={sell}>SELL</button>
          <button onClick={logout}>LOGOUT</button>
        </nav>
      );
  }

}

export default WithSession(Menu);
