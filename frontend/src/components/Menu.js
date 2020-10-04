import React from 'react';
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import WithSession from './WithSession';
import { connect } from 'react-redux';

function Menu({username}) {

  const [menuSelection, setMenuSelection] = useState(null)                 

  const logout = () => {
    localStorage.removeItem('token', 'set');
    localStorage.removeItem('username', 'set');
    setMenuSelection('logout');
  };

  switch(menuSelection) {
    case 'logout':
      return (<Redirect push to={'/'} />);
    default:
      return (
        <nav>
          <header>Hi {username}</header>
          <Link to="/sell">SELL</Link>
          <button onClick={logout}>LOGOUT</button>
        </nav>
      );
  }

};

const mapStateToProps = state => (
  {
    username: state.session,
  }
);

export default connect(mapStateToProps)( WithSession(Menu) );
