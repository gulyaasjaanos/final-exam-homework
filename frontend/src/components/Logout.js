import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Logout() {

  const [loggedOut, setLoggedOut] = useState(false)                 

  const logout = () => {
    localStorage.removeItem('token', 'set');
    setLoggedOut(true);
  };

  if (!loggedOut) {
    return (
      <nav>
        <header>Hi User</header>
        <button onClick={logout}>LOGOUT</button>
      </nav>
    );
  } else {
    return (<Redirect push to={'/'} />);
  }
    
}

export default Logout;
