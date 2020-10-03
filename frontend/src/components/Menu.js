import React from 'react';
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import WithSession from './WithSession';

function Menu() {

  const [menuSelection, setMenuSelection] = useState(null)                 

  const logout = () => {
    localStorage.removeItem('token', 'set');
    setMenuSelection('logout');
  };

  switch(menuSelection) {
    case 'logout':
      return (<Redirect push to={'/'} />);
    default:
      return (
        <nav>
          <header>Hi User</header>
          <Link to="/sell">SELL</Link>
          <button onClick={logout}>LOGOUT</button>
        </nav>
      );
  }

}

export default WithSession(Menu);
