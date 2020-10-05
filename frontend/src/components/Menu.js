import React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import WithSession from './WithSession';
import { setUserDataAction } from '../actions';
import { connect } from 'react-redux';
import '../styling/menu.css';

function Menu({userData, setUserData}) {

  const [menuSelection, setMenuSelection] = useState(null)                 

  useEffect( () => {  

    setUserData();

  }, [setUserData]);

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
          <header>Hi <span>{userData.username}</span>! Your balance is: <span>{userData.dollar}</span> GB$.</header>
          <Link to="/sell">SELL</Link>
          <button onClick={logout}>LOGOUT</button>
        </nav>
      );
  }

};

const mapStateToProps = state => (
  {
    userData: state.session,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setUserData: () => dispatch( setUserDataAction() )
  }
);

export default connect(mapStateToProps, mapDispatchToProps)( WithSession(Menu) );
